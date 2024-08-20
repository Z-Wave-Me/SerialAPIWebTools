import {ControllerUiLangClassId} from "../lang/ui_lang_define"
import {ControllerUiLangClass} from "../lang/ui_lang"
import {ControllerUiLogClass} from "../log/ui_log"
import {CommonUiSectionHtmlClass} from "./common"
import {ControllerUiDefineClass} from "../ui_define"
import {SapiClassDetectType, SapiClassUpdateProcess, SapiClassStatus} from "./../sapi/sapi";
import {CommonUiSectionClass} from "./common"
import {ControllerUiDefineClassReBeginFunc} from "../section/detection"
import {versionNumberToString, versionNumberToStringSlave} from "../other/utilities";

export {
	UpdateUiSectionClass, UpdateUiSectionClassJsonInfo, UpdateUiSectionClassButton, UpdateUiSectionClassFirmware,
	PaketUiClassUpdateInfo, PaketUiClassUpdateInfoData, PaketUiClassUpdateInfoPaket, UpdateUiSectionClassPaket
};

type UpdateUiSectionClassFirmware = (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType) => Promise<SapiClassStatus>;

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
	update:boolean;
	update_type:boolean;
	version:number;
	version_name:string;
	type:SapiClassDetectType;
	data:Array<PaketUiClassUpdateInfoData>;
}

interface PaketUiClassUpdateInfoPaket
{
	url:string;
	app:PaketUiClassUpdateInfo;
	boot:PaketUiClassUpdateInfo;
}

interface UpdateUiSectionClassPaket
{
	xhr:XMLHttpRequest;
	timer_id?:number;
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
	private static readonly URL_UPDATE:string						= "https://service.z-wave.me/expertui/uzb/";
	private static readonly URL_UPDATE_LIST:string					= UpdateUiSectionClass.URL_UPDATE + "?";

	private static readonly JSON_UPDATE_DISABLED:string				= "disabled";
	private static readonly JSON_UPDATE_TYPE_FIRMWARE:string		= "firmware";
	private static readonly JSON_UPDATE_TYPE_BOOTLOADER:string		= "bootloader";

	private readonly SELECTOR_BETA:string							= 'data-beta';
	private readonly SELECTOR_DEFAULT:string						= 'data-default';


	private static readonly info_xhr_timeout:number					= 5000;
	private static readonly info_xhr_timer_timeout:number			= 3000;
	private static readonly firmware_xhr_timout:number				= 10000;
	private static readonly firmware_xhr_timer_timout:number		= 3000;
	private readonly bus_timout:number								= 3000;

	private readonly download_process:UpdateUiSectionClassPaket		= {xhr:new XMLHttpRequest()};

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

	public static async updateProcess(txt:ControllerUiLangClassId, el:HTMLElement, data:Uint8Array, target_type:SapiClassDetectType, update_firmware:UpdateUiSectionClassFirmware, locale:ControllerUiLangClass, log:ControllerUiLogClass): Promise<boolean> {
		log.infoStart(txt);
		const el_progress:HTMLElement = document.createElement('progress');
		const el_span:HTMLElement = document.createElement('span');
		el_progress.setAttribute('max', '100');
		el.innerHTML = '';
		el.appendChild(el_progress);
		el.appendChild(el_span);
		el_progress.setAttribute('value', "66");
		const status:SapiClassStatus = await update_firmware(data, (percentage:number) => {
				el_progress.setAttribute('value', percentage.toFixed().toString());
				el_span.textContent = ' ' + percentage.toFixed(0x2).padStart(6, '0') + '%';
				if (percentage >= 100.00) {
					el.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' +  locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE) +'</div>';
				}
			}, target_type
		);
		el.innerHTML = '';
		if (status != SapiClassStatus.OK) {
			log.errorFalledCode(txt, status);
			return (false);
		}
		log.infoDone(txt);
		return (true);
	}

	public static async downloadFile(file_process:UpdateUiSectionClassPaket, url:string, log:ControllerUiLogClass): Promise<Uint8Array> {
		const promise:Promise<Uint8Array> = new Promise((resolve) => {
			log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE);
			url = UpdateUiSectionClass.URL_UPDATE + url;
			const fun_xhr_timer:TimerHandler = () => {
				file_process.timer_id = undefined;
				file_process.xhr.open("POST", url, true);
				file_process.xhr.responseType = "arraybuffer";
				file_process.xhr.timeout = UpdateUiSectionClass.firmware_xhr_timout;
				file_process.xhr.ontimeout = () => {
					log.errorXhrTimeout(url);
					log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE);
					file_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.firmware_xhr_timer_timout);
				};
				file_process.xhr.onerror = () => {
					log.errorXhrError(url);
					log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE);
					file_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.firmware_xhr_timer_timout);
				};
				file_process.xhr.onload = () => {
					log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE);
					const gbl:Uint8Array = new Uint8Array(file_process.xhr.response);
					resolve(gbl);
				};
				file_process.xhr.send();
			};
			file_process.timer_id = window.setTimeout(fun_xhr_timer, 0x0);
		});
		return (promise);
	}

	private async _download_xhr_start(paket:UpdateUiSectionClassButton, update_firmware:UpdateUiSectionClassFirmware|null, txt:ControllerUiLangClassId,): Promise<void> {
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
		const gbl:Uint8Array = await UpdateUiSectionClass.downloadFile(this.download_process, paket.url_new, this.log);
		const fun_bus_timer:TimerHandler = async () => {
			this.download_process.timer_id = undefined;
			if (this.commom_ui.is_busy() == true) {
				this.download_process.timer_id = window.setTimeout(fun_bus_timer, this.bus_timout);
				return ;
			}
			await UpdateUiSectionClass.updateProcess(txt, paket.el_span, gbl, type, update_firmware, this.locale, this.log);
			this.re_begin_func(true);
			return ;

		};
		this._progress(paket, ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_BUS_SERIAL);
		this.download_process.timer_id = window.setTimeout(fun_bus_timer, 0x0);
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

	public end(): void {
		this._end_struct(this.firmware);
		this._end_struct(this.bootloader);
		this.download_process.xhr.abort();
		if (this.download_process.timer_id != undefined) {
			window.clearTimeout(this.download_process.timer_id);
			this.download_process.timer_id = undefined;
		}
	}

	public init_select_firmware(): void {
		this._init_select(this.firmware, ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE);
	}

	public init_select_bootloader(): void {
		this._init_select(this.bootloader, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE);
	}

	private static _downloadInfo_process(response: UpdateUiSectionClassJsonInfo, app:PaketUiClassUpdateInfo, boot:PaketUiClassUpdateInfo, locale:ControllerUiLangClass): void {
		let i:number, version:number, version_name:string, temp_data:PaketUiClassUpdateInfoData;

		i = 0x0;
		const add_data:Array<PaketUiClassUpdateInfoData> = [];
		while (i < response.data.length) {
			const target_fw_family:number = Number(response.data[i].target_fw_family);
			switch (response.data[i].type) {
				case UpdateUiSectionClass.JSON_UPDATE_TYPE_FIRMWARE:
					if (app.update == false) {
						i++;
						continue ;
					}
					if (app.update_type == false && app.type != target_fw_family) {
						i++;
						continue ;
					}
					switch (target_fw_family) {
						case SapiClassDetectType.ZUNO:
							version = (Number(response.data[i].targetAppVersionMajor) << 0x10) | Number(response.data[i].targetAppVersionMinor);
							if (app.type == SapiClassDetectType.ZUNO && version <= app.version) {
								i++;
								continue ;
							}
							version_name = versionNumberToStringSlave(version) + " - " + locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE);
							temp_data = {version:version, version_name:version_name, url:response.data[i].fileURL, type:SapiClassDetectType.ZUNO, beta:((response.data[i].enabled == UpdateUiSectionClass.JSON_UPDATE_DISABLED ? true:false))};
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
							version_name = versionNumberToString(version) + " - " + locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_CONTROLER);
							temp_data = {version:version, version_name:version_name, url:response.data[i].fileURL, type:SapiClassDetectType.RAZBERRY, beta:((response.data[i].enabled == UpdateUiSectionClass.JSON_UPDATE_DISABLED ? true:false))};
							if (app.type == SapiClassDetectType.RAZBERRY)
								app.data.push(temp_data);
							else
								add_data.push(temp_data);
							break ;
					}
					break ;
				case UpdateUiSectionClass.JSON_UPDATE_TYPE_BOOTLOADER:
					if (boot.update == false) {
						i++;
						continue ;
					}
					version = Number(response.data[i].targetBootloaderVersion);
					if (version <= boot.version) {
						i++;
						continue ;
					}
					version_name = versionNumberToString(version);
					temp_data = {version:version, version_name:version_name, url:response.data[i].fileURL, type:SapiClassDetectType.UNKNOWN, beta:((response.data[i].enabled == UpdateUiSectionClass.JSON_UPDATE_DISABLED ? true:false))};
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

	public static async downloadInfo(info_process:UpdateUiSectionClassPaket, in_paket:PaketUiClassUpdateInfoPaket, log:ControllerUiLogClass, locale:ControllerUiLangClass): Promise<void> {
		const promise:Promise<void> = new Promise((resolve) => {
			const url:string = UpdateUiSectionClass.URL_UPDATE_LIST + in_paket.url + '&token=internal';//'&token=internal' '&token=all';
			const fun_xhr_timer:TimerHandler = () => {
				info_process.timer_id = undefined;
				log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
				info_process.xhr.open("POST", url, true);
				info_process.xhr.responseType = 'json';
				info_process.xhr.timeout = UpdateUiSectionClass.info_xhr_timeout;
				info_process.xhr.ontimeout = () => {
					log.errorXhrTimeout(url);
					log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
					info_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.info_xhr_timer_timeout);
				};
				info_process.xhr.onerror = () => {
					log.errorXhrError(url);
					log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
					info_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.info_xhr_timer_timeout);
				};
				info_process.xhr.onload = () => {
					try {
						UpdateUiSectionClass._downloadInfo_process(info_process.xhr.response, in_paket.app, in_paket.boot, locale);
					} catch (error) {
						log.errorXhrInvalidData(url);
						log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
						info_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.info_xhr_timer_timeout);
						return ;
					}
					log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
					resolve();
				};
				info_process.xhr.send();
			};
			info_process.timer_id = window.setTimeout(fun_xhr_timer, 0x0);
		});
		return (promise);
	}

	public async info_download_xhr(in_paket:PaketUiClassUpdateInfoPaket): Promise<void> {
		this.firmware.info = in_paket.app;
		this.bootloader.info = in_paket.boot;
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
		await UpdateUiSectionClass.downloadInfo(this.download_process, in_paket, this.log, this.locale);
		this.init_select_firmware();
		this.init_select_bootloader();
		this._update_beta_change_all();
	}

	constructor(log:ControllerUiLogClass, locale:ControllerUiLangClass, commom_ui:CommonUiSectionClass, re_begin_func:ControllerUiDefineClassReBeginFunc,
					update_firmware:UpdateUiSectionClassFirmware, update_bootloader:UpdateUiSectionClassFirmware|null
	) {
		super(locale);
		this.log = log;
		this.commom_ui = commom_ui;
		this.re_begin_func = re_begin_func;
		this.firmware = this._constructor_struct(ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON, () => {this._download_xhr_start(this.firmware, update_firmware, ControllerUiLangClassId.MESSAGE_UPDATE_START_FIRMWARE);},
			(event:Event) => {this._update_change(event, ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE, this.firmware);});
		this.bootloader = this._constructor_struct(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON, () => {this._download_xhr_start(this.bootloader, update_bootloader, ControllerUiLangClassId.MESSAGE_UPDATE_START_BOOTLOADER);},
			(event:Event) =>{ this._update_change(event, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE, this.bootloader);});
	}
}
