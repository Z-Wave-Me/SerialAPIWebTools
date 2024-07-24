import {ControllerUiLangClassId} from "../lang/ui_lang_define"
import {ControllerUiLangClass} from "../lang/ui_lang"
import {ControllerUiLogClass} from "../log/ui_log"
import {CommonUiSectionHtmlClass} from "./common"
import { ControllerUiDefineClassReBeginFunc, ControllerUiDefineClass} from "../ui_define"
import {SapiClassDetectType, SapiClassUpdateProcess} from "./../sapi/sapi";
import {CommonUiSectionClass} from "./common"
import {versionNumberToString, versionNumberToStringSlave} from "../other/utilities";

export {
	UpdateUiSectionClass, UpdateUiSectionClassJsonInfo, UpdateUiSectionClassButton, UpdateUiSectionClassFirmwareStatus, UpdateUiSectionClassFirmware,
	PaketUiClassUpdateInfo, PaketUiClassUpdateInfoData,
};

interface UpdateUiSectionClassFirmwareStatus
{
	ok:boolean;
	code:number;
}

type UpdateUiSectionClassFirmware = (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType) => Promise<UpdateUiSectionClassFirmwareStatus>;

type UpdateUiSectionClassButtonClick =  () => void;


interface PaketUiClassUpdateInfoData
{
	version:number;
	version_name:string;
	url:string;
	type:SapiClassDetectType;
	beta:boolean;
}

interface PaketUiClassUpdateInfo
{
	version:number;
	version_name:string;
	type:SapiClassDetectType;
	data:Array<PaketUiClassUpdateInfoData>;
}

interface UpdateUiSectionClassJson
{
	targetBootloaderVersion:string;
	targetAppVersionMajor:string;
	targetAppVersionMinor:string;
	fileURL:string;
	enabled:string;
	type:string;
	target_fw_family:string;
}

interface UpdateUiSectionClassJsonInfo
{
	data:Array<UpdateUiSectionClassJson>
}

interface UpdateUiSectionClassButton
{
	url_current:string;
	url_new:string;
	el_select:HTMLSelectElement;
	el_span:HTMLSpanElement;
	el_button:HTMLButtonElement;
	info?:PaketUiClassUpdateInfo;
}


class UpdateUiSectionClass extends CommonUiSectionHtmlClass {
	private readonly URL_UPDATE:string								= "https://service.z-wave.me/expertui/uzb/";
	private readonly URL_UPDATE_LIST:string							= this.URL_UPDATE + "?";

	private readonly JSON_UPDATE_DISABLED:string					= "disabled";
	private readonly JSON_UPDATE_TYPE_FIRMWARE:string				= "firmware";
	private readonly JSON_UPDATE_TYPE_BOOTLOADER:string				= "bootloader";

	private readonly SELECTOR_BETA:string							= 'data-beta';
	private readonly SELECTOR_DEFAULT:string						= 'data-default';


	private readonly info_xhr_timeout:number						= 5000;
	private readonly info_xhr_timer_timeout:number					= 3000;
	private readonly firmware_xhr_timout:number						= 10000;
	private readonly firmware_xhr_timer_timout:number				= 3000;
	private readonly bus_timout:number								= 3000;

	private readonly info_xhr:XMLHttpRequest						= new XMLHttpRequest();
	private readonly firmware_xhr:XMLHttpRequest						= new XMLHttpRequest();

	info_xhr_timer_id?:number;
	firmware_timer_id?:number;

	private readonly log:ControllerUiLogClass;
	private readonly commom_ui:CommonUiSectionClass;
	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	readonly firmware:UpdateUiSectionClassButton;
	readonly bootloader:UpdateUiSectionClassButton;

	private _update_change(event:Event, title:ControllerUiLangClassId, info:UpdateUiSectionClassButton): void {
		const el_target:HTMLSelectElement|null = this.event_get_element_select(event);
		if (el_target == null)
			return ;
		info.url_new = el_target.value;
		this.common_button_atrr(info.el_button, title, (info.url_new == info.url_current) ? true:false);
	}

	private _progress(info:UpdateUiSectionClassButton, text:ControllerUiLangClassId): void {
		info.el_span.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' +  this.locale.getLocale(text) +'</div>';
	}

	private _end_struct(info:UpdateUiSectionClassButton) {
		info.url_current = "";
		info.url_new = "";
		info.el_button.disabled = true;
		this._progress(info, ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO);
	}

	private async _update_process(paket:UpdateUiSectionClassButton, data:Uint8Array, target_type:SapiClassDetectType, update_firmware:UpdateUiSectionClassFirmware): Promise<UpdateUiSectionClassFirmwareStatus> {
		const el_progress:HTMLElement = document.createElement('progress');
		const el_span:HTMLElement = document.createElement('span');
		el_progress.setAttribute('max', '100');
		paket.el_span.innerHTML = '';
		paket.el_span.appendChild(el_progress);
		paket.el_span.appendChild(el_span);
		el_progress.setAttribute('value', "66");
		const status:UpdateUiSectionClassFirmwareStatus = await update_firmware(data, (percentage:number) => {
				el_progress.setAttribute('value', percentage.toFixed().toString());
				el_span.textContent = ' ' + percentage.toFixed(0x2).padStart(6, '0') + '%';
				if (percentage >= 100.00) {
					this._progress(paket, ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE);
				}
			}, target_type
		);
		return (status);
	}

	private async _update_process_common(txt:ControllerUiLangClassId, paket:UpdateUiSectionClassButton, gbl:Uint8Array, type:SapiClassDetectType, update_firmware:UpdateUiSectionClassFirmware): Promise<void> {
		this.log.infoStart(txt);
		const status:UpdateUiSectionClassFirmwareStatus = await this._update_process(paket, gbl, type, update_firmware);
		if (status.ok == false) {
			this.log.errorFalledCode(txt, status.code);
			paket.el_span.innerHTML = "";
			paket.el_span.appendChild(paket.el_select);
			this.common_button_atrr(paket.el_button, '', false);
			this.re_begin_func(true);
			return ;
		}
		this.log.infoDone(txt);
		this.re_begin_func(false);
		return ;
	}

	private _download_xhr_start(paket:UpdateUiSectionClassButton, update_firmware:UpdateUiSectionClassFirmware|null): void {
		let i:number, type:SapiClassDetectType|undefined;

		if (update_firmware == null)
			return ;
		const info:PaketUiClassUpdateInfo|undefined = paket.info;
		if (info == undefined) {
			this.log.error(ControllerUiLangClassId.ERROR_ARGUMENT_FOR_UPDATE_SELECT);
			return ;
		}
		i = 0x0;
		while (i < info.data.length) {
			if (paket.url_new == info.data[i].url) {
				type = info.data[i].type;
				break ;
			}
			i++;
		}
		if (type == undefined) {
			this.log.error(ControllerUiLangClassId.ERROR_ARGUMENT_FIND_TYPE);
			return ;
		}
		this._progress(paket, ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE);
		this.common_button_atrr(paket.el_button, '', true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
		const url:string = this.URL_UPDATE + paket.url_new;
		const fun_xhr_timer:TimerHandler = () => {
			this.firmware_timer_id = undefined;
			this.firmware_xhr.open("POST", url, true);
			this.firmware_xhr.responseType = "arraybuffer";
			this.firmware_xhr.timeout = this.firmware_xhr_timout;
			this.firmware_xhr.ontimeout = () => {
				this.log.errorXhrTimeout(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				this.firmware_timer_id = window.setTimeout(fun_xhr_timer, this.firmware_xhr_timer_timout);
			};
			this.firmware_xhr.onerror = () => {
				this.log.errorXhrError(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				this.firmware_timer_id = window.setTimeout(fun_xhr_timer, this.firmware_xhr_timer_timout);
			};
			this.firmware_xhr.onload = () => {
				this.log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				const gbl:Uint8Array = new Uint8Array(this.firmware_xhr.response);
				const fun_bus_timer:TimerHandler = async () => {
					this.firmware_timer_id = undefined;
					if (this.commom_ui.is_busy() == true) {
						this.firmware_timer_id = window.setTimeout(fun_bus_timer, this.bus_timout);
						return ;
					}
					await this._update_process_common(ControllerUiLangClassId.MESSAGE_UPDATE_START_FIRMWARE, paket, gbl, type, update_firmware);
					return ;

				};
				this._progress(paket, ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_BUS_SERIAL);
				this.firmware_timer_id = window.setTimeout(fun_bus_timer, 0x0);
			};
			this.firmware_xhr.send();
		};
		this.firmware_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
	}

	private _constructor_struct(button_text:ControllerUiLangClassId, click:UpdateUiSectionClassButtonClick, change:EventListener):UpdateUiSectionClassButton {
		const el_span:HTMLSpanElement = document.createElement("span");
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.textContent = this.locale.getLocale(button_text);
		el_button.addEventListener("click", click);
		el_button.type = "button";
		const el_select:HTMLSelectElement = document.createElement("select");
		el_select.addEventListener("change", change);
		const info:UpdateUiSectionClassButton = {url_current:'', url_new:'', el_span:el_span, el_button:el_button, el_select:el_select};
		return (info);
	}

	private _init_select(paket:UpdateUiSectionClassButton, title:ControllerUiLangClassId): void {
		let i:number, el_option_str:string;

		const info:PaketUiClassUpdateInfo|undefined = paket.info;
		if (info == undefined) {
			this.log.error(ControllerUiLangClassId.ERROR_ARGUMENT_FOR_UPDATE_SELECT);
			return ;
		}
		paket.el_span.innerHTML = "";
		paket.el_span.appendChild(paket.el_select);
		i = 0x0;
		el_option_str = '<option ' + this.SELECTOR_DEFAULT + ' value="">'+ info.version_name +'</option>';
		while (i < info.data.length) {
			el_option_str = el_option_str + '<option ' + ((info.data[i].beta == true)? this.SELECTOR_BETA + '=""':'') + ' value="' + info.data[i].url +'">'+ info.data[i].version_name +'</option>';
			i++;
		}
		paket.el_select.innerHTML = el_option_str;
		this.common_button_atrr(paket.el_button, '', true);
		if (info.data.length != 0x0) {
			paket.el_select.title = this.locale.getLocale(title);
			return ;
		}
		paket.el_select.innerHTML = el_option_str;
		paket.el_select.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE);
		paket.el_select.disabled = true;
	}

	private _update_beta_change_all_select(beta:boolean, el_select:HTMLSelectElement, title:ControllerUiLangClassId): void {
		let number:number;

		const list_option:NodeListOf<HTMLElement> = el_select.querySelectorAll('option');
		number = 0x0;
		list_option.forEach((item:HTMLElement) => {
			if (item.getAttribute('selected') != null) {
				item.removeAttribute("selected");
			}
			if (beta == false && item.getAttribute(this.SELECTOR_BETA) != null)
				return ;
			if (item.getAttribute(this.SELECTOR_DEFAULT) != null) {
				item.setAttribute("selected", "");
			}
			number++;
		});
		if (beta == false)
			el_select.setAttribute(this.SELECTOR_BETA, "");
		else
			el_select.removeAttribute(this.SELECTOR_BETA);
		if (number > 0x1) {
			el_select.title = this.locale.getLocale(title);
			el_select.removeAttribute("disabled");
			return ;
		}
		el_select.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE);
		el_select.setAttribute("disabled", "");
	}

	private _update_beta_change_all(): void {
		let beta:boolean;

		const update_beta:string|null = localStorage.getItem(ControllerUiDefineClass.KEY_UPDATE_BETA);
		if (update_beta === ControllerUiDefineClass.STORAGE_VALUE_TRUE)
			beta = true;
		else
			beta = false;
		this._update_beta_change_all_select(beta, this.firmware.el_select, ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE);
		this.firmware.url_new = "";
		this.common_button_atrr(this.firmware.el_button, '', true);
		this._update_beta_change_all_select(beta, this.bootloader.el_select, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE);
		this.bootloader.url_new = "";
		this.common_button_atrr(this.bootloader.el_button, '', true);
	}

	private _update_beta_change(event:Event): void {
		const el_target:HTMLInputElement|null = this.event_get_element_input(event);
		if (el_target == null)
			return ;
		localStorage.setItem(ControllerUiDefineClass.KEY_UPDATE_BETA, ((el_target.checked == true) ? ControllerUiDefineClass.STORAGE_VALUE_TRUE: ControllerUiDefineClass.STORAGE_VALUE_FALSE));
		this._update_beta_change_all();
	}

	private _info_download_xhr_process(response: UpdateUiSectionClassJsonInfo, app:PaketUiClassUpdateInfo, boot:PaketUiClassUpdateInfo): void {
		let i:number, version:number, version_name:string, temp_data:PaketUiClassUpdateInfoData;

		i = 0x0;
		const add_data:Array<PaketUiClassUpdateInfoData> = [];
		while (i < response.data.length) {
			switch (response.data[i].type) {
				case this.JSON_UPDATE_TYPE_FIRMWARE:
					switch (Number(response.data[i].target_fw_family)) {
						case SapiClassDetectType.ZUNO:
							version = (Number(response.data[i].targetAppVersionMajor) << 0x10) | Number(response.data[i].targetAppVersionMinor);
							if (app.type == SapiClassDetectType.ZUNO && version <= app.version) {
								i++;
								continue ;
							}
							version_name = versionNumberToStringSlave(version) + " - " + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE);
							temp_data = {version:version, version_name:version_name, url:response.data[i].fileURL, type:SapiClassDetectType.ZUNO, beta:((response.data[i].enabled == this.JSON_UPDATE_DISABLED ? true:false))};
							if (app.type == SapiClassDetectType.ZUNO)
								app.data.push(temp_data);
							else
								add_data.push(temp_data);
							break ;
						case SapiClassDetectType.RAZBERRY:
							version = (Number(response.data[i].targetAppVersionMajor) << 0x8) | Number(response.data[i].targetAppVersionMinor);
							if (app.type == SapiClassDetectType.RAZBERRY && version <= app.version) {
								i++;
								continue ;
							}
							version_name = versionNumberToString(version) + " - " + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_CONTROLER);
							temp_data = {version:version, version_name:version_name, url:response.data[i].fileURL, type:SapiClassDetectType.RAZBERRY, beta:((response.data[i].enabled == this.JSON_UPDATE_DISABLED ? true:false))};
							if (app.type == SapiClassDetectType.RAZBERRY)
								app.data.push(temp_data);
							else
								add_data.push(temp_data);
							break ;
					}
					break ;
				case this.JSON_UPDATE_TYPE_BOOTLOADER:
					version = Number(response.data[i].targetBootloaderVersion);
					if (version <= boot.version) {
						i++;
						continue ;
					}
					version_name = versionNumberToString(version);
					temp_data = {version:version, version_name:version_name, url:response.data[i].fileURL, type:SapiClassDetectType.UNKNOWN, beta:((response.data[i].enabled == this.JSON_UPDATE_DISABLED ? true:false))};
					boot.data.push(temp_data);
					break ;
			}
			i++;
		}
		boot.data.sort(function (a:PaketUiClassUpdateInfoData, b:PaketUiClassUpdateInfoData):number {
			return (a.version - b.version);
		});
		app.data.sort(function (a:PaketUiClassUpdateInfoData, b:PaketUiClassUpdateInfoData):number {
			return (a.version - b.version);
		});
		add_data.sort(function (a:PaketUiClassUpdateInfoData, b:PaketUiClassUpdateInfoData):number {
			return (a.version - b.version);
		});
		i = 0x0;
		while ( i < add_data.length) {
			app.data.push(add_data[i]);
			i++;
		}
	}

	public end(): void {
		this._end_struct(this.firmware);
		this._end_struct(this.bootloader);
		this.info_xhr.abort();
		if (this.info_xhr_timer_id != undefined) {
			window.clearTimeout(this.info_xhr_timer_id);
			this.info_xhr_timer_id = undefined;
		}
		this.firmware_xhr.abort();
		if (this.firmware_timer_id != undefined) {
			window.clearTimeout(this.firmware_timer_id);
			this.firmware_timer_id = undefined;
		}
	}

	public init_select_firmware(): void {
		this._init_select(this.firmware, ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE);
	}

	public init_select_bootloader(): void {
		this._init_select(this.bootloader, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE);
	}

	public info_download_xhr(url:string, app:PaketUiClassUpdateInfo, boot:PaketUiClassUpdateInfo): void {
		this.firmware.info = app;
		this.bootloader.info = boot;
		const update_beta:string|null = localStorage.getItem(ControllerUiDefineClass.KEY_UPDATE_BETA);
		const el_input:HTMLInputElement = document.createElement("input");
		el_input.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_SELECT_TITLE);
		el_input.type = "checkbox";
		if (update_beta === ControllerUiDefineClass.STORAGE_VALUE_TRUE)
			el_input.checked = true;
		el_input.addEventListener("change", (event:Event) => {this._update_beta_change(event);});
		this.commom_ui.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA, ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_TITLE, el_input, "");
		this.commom_ui.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE, ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_TITLE, this.firmware.el_span,  this.firmware.el_button);
		this.commom_ui.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_TITLE, this.bootloader.el_span, this.bootloader.el_button);
		url = this.URL_UPDATE_LIST + url + '&token=internal';//'&token=internal' '&token=all';
		const fun_xhr_timer:TimerHandler = () => {
			this.info_xhr_timer_id = undefined;
			this.log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
			this.info_xhr.open("POST", url, true);
			this.info_xhr.responseType = 'json';
			this.info_xhr.timeout = this.info_xhr_timeout;
			this.info_xhr.ontimeout = () => {
				this.log.errorXhrTimeout(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
				this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.info_xhr_timer_timeout);
			};
			this.info_xhr.onerror = () => {
				this.log.errorXhrError(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
				this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.info_xhr_timer_timeout);
			};
			this.info_xhr.onload = () => {
				try {
					this._info_download_xhr_process(this.info_xhr.response, app, boot);
				} catch (error) {
					this.log.errorXhrInvalidData(url);
					this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
					this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.info_xhr_timer_timeout);
					return ;
				}
				this.init_select_firmware();
				this.init_select_bootloader();
				this._update_beta_change_all();
				this.log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
			};
			this.info_xhr.send();
		};
		this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
	}

	constructor(log:ControllerUiLogClass, locale:ControllerUiLangClass, commom_ui:CommonUiSectionClass, re_begin_func:ControllerUiDefineClassReBeginFunc,
					update_firmware:UpdateUiSectionClassFirmware, update_bootloader:UpdateUiSectionClassFirmware|null
	) {
		super(locale);
		this.log = log;
		this.commom_ui = commom_ui;
		this.re_begin_func = re_begin_func;
		this.firmware = this._constructor_struct(ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON, () => {this._download_xhr_start(this.firmware, update_firmware);},
			(event:Event) => {this._update_change(event, ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE, this.firmware);});
		this.bootloader = this._constructor_struct(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON, () => {this._download_xhr_start(this.bootloader, update_bootloader);},
			(event:Event) =>{ this._update_change(event, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE, this.bootloader);});
	}
}
