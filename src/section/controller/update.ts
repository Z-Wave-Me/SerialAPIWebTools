import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassBoardInfo, ControllerSapiClassCapabilities} from "../../sapi/controller_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {arrayToStringHex, versionNumberToString} from "../../other/utilities";

import {ControllerUiDefineClass, ControllerUiDefineClassReBeginFunc} from "../../ui_define"

export {ControllerUiSectionUpdateClass};

interface ControllerUiClassUpdateInfoData
{
	version:number;
	url:string;
	beta:boolean;
}

interface ControllerUiClassUpdateInfo
{
	version:number;
	data:Array<ControllerUiClassUpdateInfoData>;
}

interface ControllerUiClassJsonUpdateInfo
{
	targetAppVersionMajor:string;
	targetAppVersionMinor:string;
	fileURL:string;
	enabled:string;
	type:string;
}

interface ControllerUiSectionUpdateButtonClickClass {
	(): Promise<void>
}

interface ControllerUiSectionUpdateInfoClass
{
	url_current:string;
	url_new:string;
	el_select:HTMLSelectElement;
	el_span:HTMLSpanElement;
	el_button:HTMLButtonElement;
}

class ControllerUiSectionUpdateClass extends CommonUiSectionClass {
	private readonly URL_UPDATE_FIMWARE:string								= "https://service.z-wave.me/expertui/uzb/";

	private readonly LOCAL_STORAGE_KEY_UPDATE_BETA:string					= ControllerUiDefineClass.NAME_APP + '_update_beta';
	private readonly LOCAL_STORAGE_VALUE_TRUE:string						= 'true';
	private readonly LOCAL_STORAGE_VALUE_FALSE:string						= 'false';

	private readonly TABLE_NAME_UPDATE_JSON_ENABLED:string					= "enabled";
	private readonly TABLE_NAME_UPDATE_JSON_TYPE_FINWARE:string				= "firmware";

	private readonly update_info_xhr_timeout:number							= 5000;
	private readonly update_info_xhr_timer_timeout:number					= 3000;
	private readonly update_finware_xhr_timout:number						= 10000;
	private readonly update_finware_xhr_timer_timout:number					= 3000;
	private readonly update_bus_timout:number								= 3000;

	private readonly SELECTOR_DEFAULT:string								= 'data-default';
	private readonly SELECTOR_BETA:string									= 'data-beta';

	private readonly finware:ControllerUiSectionUpdateInfoClass;
	private readonly bootloader:ControllerUiSectionUpdateInfoClass;

	private readonly update_info_xhr:XMLHttpRequest								= new XMLHttpRequest();
	private readonly update_finware_xhr:XMLHttpRequest							= new XMLHttpRequest();

	private readonly razberry:ControllerSapiClass;
	private update_info_xhr_timer_id?:number;
	private update_finware_timer_id?:number;

	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	private _update_change(event:Event, title:ControllerUiLangClassId, info:ControllerUiSectionUpdateInfoClass): void {
		const el_target:HTMLSelectElement|null = this.event_get_element_select(event);
		if (el_target == null)
			return ;
		info.url_new = el_target.value;
		this.common_button_atrr(info.el_button, title, (info.url_new == info.url_current) ? true:false);
	}

	private async _update_bootloader_click(): Promise<void> {
	}

	private async _update_finware_click_add(data:Uint8Array): Promise<ControllerSapiClassStatus> {
		const el_progress:HTMLElement = document.createElement('progress');
		const el_span:HTMLElement = document.createElement('span');
		el_progress.setAttribute('max', '100');
		this.finware.el_span.innerHTML = '';
		this.finware.el_span.appendChild(el_progress);
		this.finware.el_span.appendChild(el_span);
		el_progress.setAttribute('value', "66");
		const status:ControllerSapiClassStatus = await this.razberry.updateFinware(data, (percentage:number) => {
				el_progress.setAttribute('value', percentage.toFixed().toString());
				el_span.textContent = ' ' + percentage.toFixed(0x2).padStart(6, '0') + '%';
				if (percentage >= 100.00) {
					this._constructor_struct_progress(this.finware, ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE);
				}
			}
		);
		return (status);
	}

	private async _update_finware_click(): Promise<void> {
		this._constructor_struct_progress(this.finware, ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE);
		this.common_button_atrr(this.finware.el_button, '', true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
		const url:string = this.URL_UPDATE_FIMWARE + this.finware.url_new;
		const fun_xhr_timer:TimerHandler = () => {
			this.update_finware_timer_id = undefined;
			this.update_finware_xhr.open("POST", url, true);
			this.update_finware_xhr.responseType = "arraybuffer";
			this.update_finware_xhr.timeout = this.update_finware_xhr_timout;
			this.update_finware_xhr.ontimeout = () => {
				this.log.errorXhrTimeout(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				this.update_finware_timer_id = window.setTimeout(fun_xhr_timer, this.update_finware_xhr_timer_timout);
			};
			this.update_finware_xhr.onerror = () => {
				this.log.errorXhrError(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				this.update_finware_timer_id = window.setTimeout(fun_xhr_timer, this.update_finware_xhr_timer_timout);
			};
			this.update_finware_xhr.onload = () => {
				this.log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				const gbl:Uint8Array = new Uint8Array(this.update_finware_xhr.response);
				const fun_bus_timer:TimerHandler = async () => {
					this.update_finware_timer_id = undefined;
					if (this.is_busy() == true) {
						this.update_finware_timer_id = window.setTimeout(fun_bus_timer, this.update_bus_timout);
						return ;
					}
					this.log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE);
					const status:ControllerSapiClassStatus = await this._update_finware_click_add(gbl);
					if (status != ControllerSapiClassStatus.OK) {
						this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE, status);
						this.finware.el_span.innerHTML = "";
						this.finware.el_span.appendChild(this.finware.el_select);
						this.common_button_atrr(this.finware.el_button, '', false);
						return ;
					}
					this.log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE);
					this.re_begin_func(false);
					return ;
	
				};
				this._constructor_struct_progress(this.finware, ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_BUS_SERIAL);
				this.update_finware_timer_id = window.setTimeout(fun_bus_timer, 0x0);
			};
			this.update_finware_xhr.send();
		};
		this.update_finware_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
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

		const update_beta:string|null = localStorage.getItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA);
		if (update_beta === this.LOCAL_STORAGE_VALUE_TRUE)
			beta = true;
		else
			beta = false;
		this._update_beta_change_all_select(beta, this.finware.el_select, ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_SELECT_TITLE);
		this.finware.url_new = "";
		this.common_button_atrr(this.finware.el_button, '', true);
		this._update_beta_change_all_select(beta, this.bootloader.el_select, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE);
		this.bootloader.url_new = "";
		this.common_button_atrr(this.bootloader.el_button, '', true);
	}

	private _update_beta_change(event:Event): void {
		const el_target:HTMLInputElement|null = this.event_get_element_input(event);
		if (el_target == null)
			return ;
		localStorage.setItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA, ((el_target.checked == true) ? this.LOCAL_STORAGE_VALUE_TRUE: this.LOCAL_STORAGE_VALUE_FALSE));
		this._update_beta_change_all();
	}

	private _update_init_set_select(paket:ControllerUiSectionUpdateInfoClass, info:ControllerUiClassUpdateInfo): void {
		let i:number, el_option_str:string;

		paket.el_span.innerHTML = "";
		paket.el_span.appendChild(paket.el_select);
		info.data.sort(function (a:ControllerUiClassUpdateInfoData, b:ControllerUiClassUpdateInfoData):number {
			return (a.version - b.version);
		});
		i = 0x0;
		el_option_str = '<option ' + this.SELECTOR_DEFAULT + ' value="">'+ versionNumberToString(info.version) +'</option>';
		while (i < info.data.length) {
			el_option_str = el_option_str + '<option ' + ((info.data[i].beta == true)? this.SELECTOR_BETA + '=""':'')  + ' value="' + info.data[i].url +'">'+ versionNumberToString(info.data[i].version) +'</option>';
			i++;
		}
		paket.el_select.innerHTML = el_option_str;
	}

	private _update_init(): boolean {
		let i:number, version:number;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
		const board_info:ControllerSapiClassBoardInfo = this.razberry.getBoardInfo();
		if (board_info.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO, board_info.status);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
		const capabilities_info:ControllerSapiClassCapabilities = this.razberry.getCapabilities();
		if (capabilities_info.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES, capabilities_info.status);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
		const app_update_info:ControllerUiClassUpdateInfo = {version:(capabilities_info.ApiVersion << 0x8) | capabilities_info.ApiRevision, data: []};
		const bootloader_update_info:ControllerUiClassUpdateInfo = {version:board_info.bootloader_version, data: []};
		const fun_xhr_timer:TimerHandler = () => {
			this.update_info_xhr_timer_id = undefined;
			this.log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
			const bootloaderCRC:string = "&bootloaderCRC=" + board_info.bootloader_crc32.toString();
			const url:string = this.URL_UPDATE_FIMWARE + '?vendorId=' + capabilities_info.VendorID.toString() + '&appVersionMajor=' + capabilities_info.ApiVersion.toString() + '&appVersionMinor=' + capabilities_info.ApiRevision.toString() + bootloaderCRC + '&token=all&uuid=' + arrayToStringHex(board_info.chip_uuid);
			this.update_info_xhr.open("POST", url, true);
			this.update_info_xhr.responseType = 'json';
			this.update_info_xhr.timeout = this.update_info_xhr_timeout;
			this.update_info_xhr.ontimeout = () => {
				this.log.errorXhrTimeout(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
				this.update_info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.update_info_xhr_timer_timeout);
			};
			this.update_info_xhr.onerror = () => {
				this.log.errorXhrError(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
				this.update_info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.update_info_xhr_timer_timeout);
			};
			this.update_info_xhr.onload = () => {
				const in_json:{data:Array<ControllerUiClassJsonUpdateInfo>} = this.update_info_xhr.response;
				try {
					i = 0x0;
					while (i < in_json.data.length) {
						version = (Number(in_json.data[i].targetAppVersionMajor) << 0x8) | Number(in_json.data[i].targetAppVersionMinor);
						if (in_json.data[i].type == this.TABLE_NAME_UPDATE_JSON_TYPE_FINWARE && version > app_update_info.version) {
							const update_info_data:ControllerUiClassUpdateInfoData = {version:version, url:in_json.data[i].fileURL, beta:((in_json.data[i].enabled == this.TABLE_NAME_UPDATE_JSON_ENABLED ? false:true))};
							app_update_info.data.push(update_info_data);
						}
						i++;
					}
				} catch (error) {
					this.log.errorXhrInvalidData(url);
					this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
					this.update_info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.update_info_xhr_timer_timeout);
					return ;
				}
				this._update_init_set_select(this.finware, app_update_info);
				this._update_init_set_select(this.bootloader, bootloader_update_info);
				this._update_beta_change_all();
				this.log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
			}
			this.update_info_xhr.send();
		};
		const update_beta:string|null = localStorage.getItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA);
		const el_input:HTMLInputElement = document.createElement("input");
		el_input.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_SELECT_TITLE);
		el_input.type = "checkbox";
		if (update_beta === this.LOCAL_STORAGE_VALUE_TRUE)
			el_input.checked = true;
		el_input.addEventListener("change", (event:Event) => {this._update_beta_change(event);});
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA, ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_TITLE, el_input, "");
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE, ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_TITLE, this.finware.el_span,  this.finware.el_button);
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_TITLE, this.bootloader.el_span, this.bootloader.el_button);
		this.update_info_xhr_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
		return (true);
	}

	private async _begin(): Promise<boolean> {
		if (this.razberry.isRazberry7() == false)
			return (false);
		return (this._update_init());
	}

	private _end_struct(info:ControllerUiSectionUpdateInfoClass) {
		info.url_current = "";
		info.url_new = "";
		info.el_button.disabled = true;
		this._constructor_struct_progress(info, ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO);
	}

	private async _end(): Promise<void> {
		this._end_struct(this.finware);
		this._end_struct(this.bootloader);
		this.update_info_xhr.abort();
		if (this.update_info_xhr_timer_id != undefined) {
			window.clearTimeout(this.update_info_xhr_timer_id);
			this.update_info_xhr_timer_id = undefined;
		}
		this.update_finware_xhr.abort();
		if (this.update_finware_timer_id != undefined) {
			window.clearTimeout(this.update_finware_timer_id);
			this.update_finware_timer_id = undefined;
		}
	}

	private _constructor_struct_progress(info:ControllerUiSectionUpdateInfoClass, text:ControllerUiLangClassId): void {
		info.el_span.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' +  this.locale.getLocale(text) +'</div>';
	}

	private _constructor_struct(button_text:ControllerUiLangClassId, click:ControllerUiSectionUpdateButtonClickClass, change:EventListener):ControllerUiSectionUpdateInfoClass {
		const el_span:HTMLSpanElement = document.createElement("span");
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.textContent = this.locale.getLocale(button_text);
		el_button.addEventListener("click", click);
		el_button.type = "button";
		const el_select:HTMLSelectElement = document.createElement("select");
		el_select.addEventListener("change", change);
		const info:ControllerUiSectionUpdateInfoClass = {url_current:'', url_new:'', el_span:el_span, el_button:el_button, el_select:el_select};
		return (info);
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, razberry, log, ControllerUiLangClassId.UPDATE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.razberry = razberry;
		this.finware = this._constructor_struct(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON, async () => { await this._update_finware_click();},
			(event:Event) => {this._update_change(event, ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON_TITLE, this.finware);});
		this.bootloader = this._constructor_struct(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON, async () => {await this._update_bootloader_click();},
			(event:Event) =>{ this._update_change(event, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE, this.bootloader);});
		this.re_begin_func = re_begin_func;
	}
}