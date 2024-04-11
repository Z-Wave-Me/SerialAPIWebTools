import {html_modal} from "./modal.js";

import {ControllerUiLogClass} from "./controller_ui_log"

import {ControllerUiLangClassId} from "./controller_ui_lang_define"
import {ControllerUiLangClass} from "./controller_ui_lang"

import {sleep, hexToBytes, arrayToStringHex, versionNumberToString} from "./utilities";
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassCapabilities, ControllerSapiClassRegion, ControllerSapiClassLicense, ControllerSapiClassBoardInfo, ControllerSapiClassPower} from "./controller_sapi";

export {ControllerUiClass};

interface ControllerUiClassJsonUpdateInfo
{
	targetAppVersionMajor:string;
	targetAppVersionMinor:string;
	fileURL:string;
	enabled:string;
	type:string;
}

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

interface ControllerUiClassNewLicenseXhr
{
	uuid:string;
	license:string;
	crc:string;
}

interface ControllerUiClassNewLicense
{
	uuid_hex?:string;
	crc16?:number;
	timer_id?:number;
	xhr?:XMLHttpRequest;
}

class ControllerUiClass {
	private readonly TABLE_NAME_LICENSE_MORE_OPTIONS_LINK:string			= "https://z-wave.me/hardware-capabilities/?uuid=";
	private readonly TABLE_NAME_LICENSE_SERVISE_LINK:string					= "https://service.z-wave.me/hardware/capabilities/?uuid=";
	private readonly URL_UPDATE_FIMWARE:string								= "https://service.z-wave.me/expertui/uzb/";

	private readonly NAME_APP:string										= "SerialAPIWebTools";
	private readonly VERSION_LOG											= this.NAME_APP + " 0.0.1";

	private readonly LOCAL_STORAGE_KEY_UPDATE_BETA:string					= this.NAME_APP + '_update_beta';
	private readonly LOCAL_STORAGE_VALUE_TRUE:string						= 'true';
	private readonly LOCAL_STORAGE_VALUE_FALSE:string						= 'false';

	private readonly TABLE_NAME_LICENSE_YES:string							= '<input disabled="disabled" checked type="checkbox">';
	private readonly TABLE_NAME_LICENSE_NO:string							= '<input disabled="disabled" type="checkbox">';

	private readonly TABLE_NAME_UPDATE_JSON_ENABLED:string					= "enabled";
	private readonly TABLE_NAME_UPDATE_JSON_TYPE_FINWARE:string				= "firmware";

	private readonly SELECTOR_DEFAULT:string								= 'data-default';
	private readonly SELECTOR_BETA:string									= 'data-beta';
	private readonly SELECTOR_ID:string										= 'data-id-';
	private readonly SELECTOR_FUNCTION:string								= 'data-func-';
	private readonly SELECTOR_FUNCTION_CHANGE:string						= this.SELECTOR_FUNCTION + 'change';
	private readonly SELECTOR_FUNCTION_CLICK:string							= this.SELECTOR_FUNCTION + 'click';

	private readonly SECTION_ID_BUTTON_APPLE_REGION:string					= this.SELECTOR_ID + 'apple_region';
	private readonly SECTION_ID_BUTTON_APPLE_POWER:string					= this.SELECTOR_ID + 'apple_power';
	private readonly SECTION_ID_BUTTON_UPDATE_FINWARE:string				= this.SELECTOR_ID + 'update_finware';
	private readonly SECTION_ID_BUTTON_UPDATE_BOOTLOADER:string				= this.SELECTOR_ID + 'update_bootloader';

	private readonly SECTION_ID_DATA_UPDATE_INFO:string						= '[' + this.SELECTOR_ID + 'update_info]';
	private readonly SECTION_ID_DATA_UPDATE_INFO_TBODY:string				= this.SECTION_ID_DATA_UPDATE_INFO + ' tbody';
	private readonly SECTION_ID_DATA_UPDATE_INFO_FINWARE_SELECT:string		= this.SECTION_ID_DATA_UPDATE_INFO_TBODY + ' tr:nth-child(2) td:nth-child(2)';
	private readonly SECTION_ID_DATA_UPDATE_INFO_BOOTLOADER_SELECT:string	= this.SECTION_ID_DATA_UPDATE_INFO_TBODY + ' tr:nth-child(3) td:nth-child(2)';
	private readonly SECTION_ID_DATA_LICENSE_INFO:string					= '[' + this.SELECTOR_ID + 'license_info]';
	private readonly SECTION_ID_DATA_LICENSE_INFO_TBODY:string				= this.SECTION_ID_DATA_LICENSE_INFO + ' tbody';
	private readonly SECTION_ID_DATA_CONTROLLER_INFO:string					= '[' + this.SELECTOR_ID + 'controller_info]';
	private readonly SECTION_ID_DATA_CONTROLLER_INFO_TBODY:string			= this.SECTION_ID_DATA_CONTROLLER_INFO + ' tbody';

	private readonly BAUDRATE												= [115200, 230400, 460800, 921600];
	private readonly dtr_timeout:number										= 250;
	private readonly ms_timeout_get_new_license:number						= 10000;
	private readonly ms_timeout_get_new_license_xhr:number					= 3000;
	private readonly ms_timeout_get_new_license_port:number					= 1000;
	private readonly ms_timeout_get_update_xhr:number						= 10000;
	private readonly ms_timeout_get_update_gbl_xhr:number					= 30000;
	private readonly ms_timeout_get_update_gbl_timer_bus:number				= 3000;
	private readonly razberry:ControllerSapiClass							= new ControllerSapiClass();
	private readonly locale:ControllerUiLangClass							= new ControllerUiLangClass();
	private readonly log:ControllerUiLogClass;
	private readonly el_modal:HTMLElement									= document.createElement("div");
	private readonly el_section:HTMLElement									= document.createElement("section");

	private capabilities_info?:ControllerSapiClassCapabilities				= undefined;
	private board_info?:ControllerSapiClassBoardInfo						= undefined;
	private url_finware_current:string										= "";
	private url_finware_new:string											= "";
	private url_bootloader_current:string									= "";
	private url_bootloader_new:string										= "";
	private region_current:string											= "";
	private region_new:string												= "";
	private power_current:number											= 0x0;
	private power_new:number												= 0x0;
	private new_license_timer:ControllerUiClassNewLicense					= {};
	private get_update_info_xhr:XMLHttpRequest|undefined					= undefined;
	private get_update_finware_xhr:XMLHttpRequest|undefined					= undefined;
	private get_update_finware_timer_id?:number								= undefined;
	private app_update_info?:ControllerUiClassUpdateInfo					= undefined;

	private _destructors_update(): void {
		if (this.get_update_info_xhr != undefined) {
			this.get_update_info_xhr.abort();
			this.get_update_info_xhr = undefined;
		}
		if (this.get_update_finware_xhr != undefined) {
			this.get_update_finware_xhr.abort();
			this.get_update_finware_xhr = undefined;
		}
		if (this.get_update_finware_timer_id != undefined) {
			window.clearTimeout(this.get_update_finware_timer_id);
			this.get_update_finware_timer_id = undefined;
		}
		this.app_update_info = undefined;
	}

	private _destructors_license(): void {
		if (this.new_license_timer.timer_id != undefined) {
			window.clearTimeout(this.new_license_timer.timer_id);
			this.new_license_timer.timer_id = undefined;
		}
		if (this.new_license_timer.xhr != undefined) {
			this.new_license_timer.xhr.abort();
			this.new_license_timer.xhr = undefined;
		}
		this.new_license_timer.crc16 = undefined;
		this.new_license_timer.uuid_hex = undefined;
	}

	private _destructors_capabilities(): void {
		this.capabilities_info = undefined;
	}

	private _destructors_board_info(): void {
		this.board_info = undefined;
	}

	private _destructors(): void {
		this._destructors_license();
		this._destructors_update();
		this._destructors_capabilities();
		this._destructors_board_info();
	}

	private _is_busy(): boolean {
		if (this.razberry.busy() == true) {
			this.log.warning(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_PLEASE_WAIT));
			return (true);
		}
		return (false);
	}

	private _aplle_common_change(id:string, title:string, change:boolean): void {
		const find:string = '['+ id +']';
		const el_apple:HTMLElement|null = this.el_modal.querySelector(find);
		if (el_apple == null) {
			this.log.errorNotFindElement(find);
			return ;
		}
		if (change == true) {
			el_apple.setAttribute("disabled", "");
			el_apple.removeAttribute("title");
			return ;
		}
		el_apple.setAttribute("title", title);
		el_apple.removeAttribute("disabled");
	}

	private _region_change(event:Event): void {
		if (event.target == null)
			return ;
		const el_target:any = (event.target as any);
		this.region_new = (el_target.value as string);
		this._aplle_common_change(this.SECTION_ID_BUTTON_APPLE_REGION, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE), (this.region_new == this.region_current) ? true:false);
	}

	private async _region_apple(): Promise<void> {
		if (this._is_busy() == true)
			return ;
		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_REGION));
		const status:ControllerSapiClassStatus = await this.razberry.setRegion(this.region_new);
		if (status == ControllerSapiClassStatus.OK) {
			this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_REGION));
			this.region_current = this.region_new;
			this._aplle_common_change(this.SECTION_ID_BUTTON_APPLE_REGION, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE), (this.region_new == this.region_current) ? true:false);
			return ;
		}
		this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_REGION), status);
	}

	private _power_change(event:Event): void {
		if (event.target == null)
			return ;
		const el_target:any = (event.target as any);
		this.power_new = Number(el_target.value as string);
		this._aplle_common_change(this.SECTION_ID_BUTTON_APPLE_POWER, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE), (this.power_new == this.power_current) ? true:false);
	}

	private async _power_apple(): Promise<void> {
		if (this._is_busy() == true)
			return ;
		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_POWER));
		const status:ControllerSapiClassStatus = await this.razberry.setPower(this.power_new);
		if (status == ControllerSapiClassStatus.OK) {
			this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_POWER));
			this.power_current = this.power_new;
			this._aplle_common_change(this.SECTION_ID_BUTTON_APPLE_POWER, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE), (this.power_new == this.power_current) ? true:false);
			return ;
		}
		this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_POWER), status);
	}

	private async _reset_default(): Promise<void> {
		if (this._is_busy() == true)
			return ;
		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_DEFAULT));
		const status:ControllerSapiClassStatus = await this.razberry.setDefault();
		if (status == ControllerSapiClassStatus.OK) {
			this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_DEFAULT));
			return ;
		}
		this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_DEFAULT), status);
	}

	private _update_beta_aplle_select(beta:boolean, find:string, title:string): void {
		let number:number;
		const el_select:HTMLElement|null = this.el_modal.querySelector(find);
		if (el_select == null) {
			this.log.errorNotFindElement(find);
			return ;
		}
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
			el_select.title = title;
			el_select.removeAttribute("disabled");
			return ;
		}
		el_select.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE);
		el_select.setAttribute("disabled", "");
	}

	private _update_beta_aplle(): void {
		let beta:boolean;

		const update_beta:string|null = localStorage.getItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA);
		if (update_beta === this.LOCAL_STORAGE_VALUE_TRUE)
			beta = true;
		else
			beta = false;
		if (this.get_update_finware_xhr == undefined) {
			this._update_beta_aplle_select(beta, this.SECTION_ID_DATA_UPDATE_INFO_FINWARE_SELECT + ' select', this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_SELECT_TITLE));
			this.url_finware_new = "";
			this._aplle_common_change(this.SECTION_ID_BUTTON_UPDATE_FINWARE, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON_TITLE), (this.url_finware_new == this.url_finware_current) ? true:false);
		}
		this._update_beta_aplle_select(beta, this.SECTION_ID_DATA_UPDATE_INFO_BOOTLOADER_SELECT + ' select', this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE));
	}

	private _update_beta_change(event:Event): void {
		if (event.target == null)
			return ;
		const el_target:any = (event.target as any);
		localStorage.setItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA, ((el_target.checked == true) ? this.LOCAL_STORAGE_VALUE_TRUE: this.LOCAL_STORAGE_VALUE_FALSE));
		this._update_beta_aplle();
	}

	private _event_get_element(event:Event, tag:string): HTMLElement|null {
		if (event.target == null)
			return (null);
		const el_target:HTMLElement = (event.target as HTMLElement);
		try {
			if (el_target.tagName.toLowerCase() !== tag.toLowerCase())
				return (null);
		} catch (error) {
			return (null);
		}
		return (el_target);
	}

	private _update_finware_select_change(event:Event): void {
		const el_target:HTMLElement|null = this._event_get_element(event, "select");
		if (el_target == null)
			return ;
		this.url_finware_new = (el_target as any).value;
		this._aplle_common_change(this.SECTION_ID_BUTTON_UPDATE_FINWARE, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON_TITLE), (this.url_finware_new == this.url_finware_current) ? true:false);
	}

	private _update_bootloader_select_change(event:Event): void {
		const el_target:HTMLElement|null = this._event_get_element(event, "select");
		if (el_target == null)
			return ;
		this.url_bootloader_new = (el_target as any).value;
		this._aplle_common_change(this.SECTION_ID_BUTTON_UPDATE_BOOTLOADER, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE), (this.url_bootloader_new == this.url_bootloader_current) ? true:false);
	}

	private async _update_finware_apple_add(find:string, data:Uint8Array): Promise<ControllerSapiClassStatus> {
		const el_continer:HTMLElement|null = this.el_modal.querySelector(find);
		if (el_continer == null) {
			this.log.errorNotFindElement(find);
			return (ControllerSapiClassStatus.UNKNOWN);
		}
		const el_progress:HTMLElement = document.createElement('progress');
		const el_span:HTMLElement = document.createElement('span');
		el_progress.setAttribute('max', '100');
		el_continer.innerHTML = '';
		el_continer.appendChild(el_progress);
		el_continer.appendChild(el_span);
		const status:ControllerSapiClassStatus = await this.razberry.updateFinware(data, (percentage:number) => {
				el_progress.setAttribute('value', percentage.toFixed().toString());
				el_span.textContent = ' ' + percentage.toFixed(0x2).padStart(6, '0') + '%';
				if (percentage >= 100.00) {
					this._start_update_info_create_progress(find, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE));
				}
			}
		);
		return (status);
	}

	private async _update_finware_apple(): Promise<void> {
		this._aplle_common_change(this.SECTION_ID_BUTTON_UPDATE_FINWARE, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON_TITLE), true);
		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE));
		this._start_update_info_create_progress(this.SECTION_ID_DATA_UPDATE_INFO_FINWARE_SELECT, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE));
		this.get_update_finware_xhr = new XMLHttpRequest();
		const url:string = this.URL_UPDATE_FIMWARE + this.url_finware_new;
		this.get_update_finware_xhr.open("POST", url, true);
		this.get_update_finware_xhr.responseType = "arraybuffer";
		this.get_update_finware_xhr.timeout = this.ms_timeout_get_update_gbl_xhr;
		this.get_update_finware_xhr.ontimeout = () => {
			this.get_update_finware_xhr = undefined;
			this.log.errorXhrTimeout(url);
			this.log.errorFalled(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE));
			this._aplle_common_change(this.SECTION_ID_BUTTON_UPDATE_FINWARE, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON_TITLE), false);
		};
		this.get_update_finware_xhr.onerror = () => {
			this.get_update_finware_xhr = undefined;
			this.log.errorXhrError(url);
			this.log.errorFalled(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE));
			this._aplle_common_change(this.SECTION_ID_BUTTON_UPDATE_FINWARE, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON_TITLE), false);
		};
		this.get_update_finware_xhr.onload = () => {
			if (this.get_update_finware_xhr == undefined)
				return ;
			this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE));
			const gbl:Uint8Array = new Uint8Array(this.get_update_finware_xhr.response);
			const fun_xhr_timer:TimerHandler = async () => {
				this.get_update_finware_timer_id = undefined;
				if (this._is_busy() == true) {
					this.get_update_finware_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_update_gbl_timer_bus);
					return ;
				}
				this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE));
				const status:ControllerSapiClassStatus = await this._update_finware_apple_add(this.SECTION_ID_DATA_UPDATE_INFO_FINWARE_SELECT, gbl);
				if (status != ControllerSapiClassStatus.OK) {
					this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE), status);
					if (this.app_update_info != undefined) {
						this._start_update_info_create_select_finware(this.app_update_info);
						this.get_update_finware_xhr = undefined;
						this._update_beta_aplle();
					}
					return ;
				}
				this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE));
				this._start_update();

			};
			this._start_update_info_create_progress(this.SECTION_ID_DATA_UPDATE_INFO_FINWARE_SELECT, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_BUS_SERIAL));
			this.get_update_finware_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
		};
		this.get_update_finware_xhr.send();
	}


	private _html_event(el:HTMLElement, data:string): void {
		const list:NodeListOf<HTMLElement> = el.querySelectorAll('[' + this.SELECTOR_FUNCTION + ''+ data + ']');
		list.forEach((item:HTMLElement) => {
			const value:string|null = item.getAttribute(this.SELECTOR_FUNCTION + data);
			if (value == null)
				return ;
			item.addEventListener(data, () => {
					eval("this." + value);
				}
			);
		});
	}

	private _create_table_element(find:string, name:string, value:string, action:string, title:string): HTMLElement {
		const el_tr: HTMLElement = document.createElement("tr");
		const el_td_1: HTMLElement = document.createElement("td");
		const el_td_2: HTMLElement = document.createElement("td");
		const el_td_3: HTMLElement = document.createElement("td");
		el_td_1.title = title;
		el_td_1.innerHTML = name;
		el_td_2.innerHTML = value;
		el_td_3.innerHTML = action;
		el_tr.appendChild(el_td_1);
		el_tr.appendChild(el_td_2);
		el_tr.appendChild(el_td_3);
		const tbody:HTMLElement|null = this.el_modal.querySelector(find);
		if (tbody == null) {
			this.log.errorNotFindElement(find);
			return (el_tr);
		}
		tbody.appendChild(el_tr);
		return (el_tr);
	}

	private _create_table_element_controler_info(name:string, value:string, action:string = "", title:string = ""): HTMLElement {
		return (this._create_table_element(this.SECTION_ID_DATA_CONTROLLER_INFO_TBODY, name, value, action, title));
	}

	private _create_table_element_license_info(name:string, value:string, action:string = "", title:string = ""): HTMLElement {
		return (this._create_table_element(this.SECTION_ID_DATA_LICENSE_INFO_TBODY, name, value, action, title));
	}

	private _create_table_element_update_info(name:string, value:string, action:string = "", title:string = ""): HTMLElement {
		return (this._create_table_element(this.SECTION_ID_DATA_UPDATE_INFO_TBODY, name, value, action, title));
	}

	private async _connect(): Promise<boolean> {
		let i:number;

		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_CONNECT));
		i = 0x0;
		while (i < this.BAUDRATE.length) {
			if (await this.razberry.open(this.BAUDRATE[i]) == false) {
				this.log.error(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_PORT_USE));
				return (false);
			}
			if (await this.razberry.connect() == true) {
				this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_CONNECT));
				return (true);
			}
			await this.razberry.close();
			await sleep(this.dtr_timeout);// The time for the capacitor on the DTR line to recharge
			i++;
		}
		this.log.errorFalled(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_CONNECT));
		return (false);
	}

	private _section_hide(find:string):boolean {
		const el_section:HTMLElement|null = this.el_modal.querySelector(find);
		if (el_section == null) {
			this.log.errorNotFindElement(find);
			return (false);
		}
		el_section.style.display = 'none';
		return (true);
	}

	private _section_clear(find:string):boolean {
		const el_section:HTMLElement|null = this.el_modal.querySelector(find);
		if (el_section == null) {
			this.log.errorNotFindElement(find);
			return (false);
		}
		el_section.innerHTML = '';
		return (true);
	}

	private _section_show(find:string): void {
		const el_section:HTMLElement|null = this.el_modal.querySelector(find);
		if (el_section == null) {
			this.log.errorNotFindElement(find);
			return ;
		}
		el_section.style.display = '';
		return ;
	}

	private _get_capabilities(): boolean {
		this._destructors_capabilities();
		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES));
		const capabilities_info:ControllerSapiClassCapabilities = this.razberry.getCapabilities();
		if (capabilities_info.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES), capabilities_info.status);
			return (false);
		}
		this.capabilities_info = capabilities_info;
		this._create_table_element_controler_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION), capabilities_info.ApiVersion + "." + capabilities_info.ApiRevision, "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION_TITLE));
		if (capabilities_info.VendorIDWebpage == undefined)
			this._create_table_element_controler_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_VENDOR), capabilities_info.VendorIDName, "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_VENDOR_TITLE));
		else
			this._create_table_element_controler_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_VENDOR), '<a target="_blank" href="'+ capabilities_info.VendorIDWebpage +'">'+ capabilities_info.VendorIDName +'</a>', "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_VENDOR_TITLE));
		this._create_table_element_controler_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_VENDOR_ID), String(capabilities_info.VendorID), "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_VENDOR_ID_TITLE));
		this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES));
		return (true);
	}

	private async _get_region(): Promise<boolean> {
		let i:number, el_str:string, el_button_str:string;

		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_REGION));
		const region_info:ControllerSapiClassRegion = await this.razberry.getRegion();
		switch (region_info.status) {
			case ControllerSapiClassStatus.OK:
				this.region_current = region_info.region;
				this.region_new = region_info.region;
				this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_REGION));
				i = 0x0;
				el_str = "";
				while (i < region_info.region_array.length) {
					if (region_info.region_array[i] == region_info.region) {
						el_str = el_str + '<option selected="true">'+ region_info.region_array[i] +'</option>';
					}
					else {
						el_str = el_str + '<option>'+ region_info.region_array[i] +'</option>';
					}
					i++;
				}
				el_str = '<select title="' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION_SELECT_TITLE) + '"' + this.SELECTOR_FUNCTION_CHANGE + '="_region_change(event)">' + el_str +'</select>';
				el_button_str = '<button '+ this.SECTION_ID_BUTTON_APPLE_REGION + ' ' + this.SELECTOR_FUNCTION_CLICK + '="_region_apple()" disabled type="button">' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON) + '</button>';
				this._create_table_element_controler_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION), el_str, el_button_str, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION_TITLE));
				return (true);
				break ;
			case ControllerSapiClassStatus.UNSUPPORT_CMD:
				this.log.errorUnsupport(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_REGION));
				break ;
			default:
				this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_REGION), region_info.status);
				break ;
		}
		return (false);
	}

	private async _get_power(): Promise<boolean> {
		if (this.razberry.isRazberry() == false)
			return (false);
		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_POWER));
		const power:ControllerSapiClassPower = await this.razberry.getPower();
		if (power.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_POWER), power.status);
			return (false);
		}
		this.power_current = power.power_raw;
		const el_value:string = '<input title="' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_POWER_SELECT_TITLE) + '" type="number"'+ this.SELECTOR_FUNCTION_CHANGE + '="_power_change(event)"' +' min="' + power.min.toString() + '" max="' + power.max.toString()+ '" step="'+ + power.step.toString() + '" value="' + power.power_raw.toString() + '"><span></span>';
		const el_action:string = '<button ' + this.SECTION_ID_BUTTON_APPLE_POWER + ' ' + this.SELECTOR_FUNCTION_CLICK + '="_power_apple()" disabled type="button">' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON) + '</button>';
		this._create_table_element_controler_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_POWER), el_value, el_action, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_POWER_TITLE));
		this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_POWER));
		return (true);
	}

	private _get_controller_default(): boolean {
		const value:string = '<button class="ZUnoRazberryModal_color_warning_info" ' + this.SELECTOR_FUNCTION_CLICK + '="_reset_default()" title="' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE) + '" type="button">' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON) + '</button>';
		this._create_table_element_controler_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT), "", value, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_TITLE));
		return (true);
	}

	private async _start_controller_info(): Promise<void> {
		let display:boolean;

		if (this._section_hide(this.SECTION_ID_DATA_CONTROLLER_INFO) == false)
			return ;
		if (this._section_clear(this.SECTION_ID_DATA_CONTROLLER_INFO_TBODY) == false)
			return ;
		display = false;
		if (this._get_capabilities() == true)
			display = true;
		if (await this._get_region() == true)
			display = true;
		if (await this._get_power() == true)
			display = true;
		if (this._get_controller_default() == true)
			display = true;
		if (display == false)
			return ;
		this._section_show(this.SECTION_ID_DATA_CONTROLLER_INFO);
	}

	private _get_license(): boolean {
		let key:string, flag_status:string;

		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_LICENSE));
		const license:ControllerSapiClassLicense = this.razberry.getLicense();
		if (license.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_LICENSE), license.status);
			return (false);
		}
		if (license.vallid == true) {
			this._create_table_element_license_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID), String(license.vendor_id), "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE));
			this._create_table_element_license_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE), String(license.max_nodes), "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE_TITLE));
			this._create_table_element_license_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT), String(license.count_support), "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT_TITLE));
			this.new_license_timer.crc16 = license.crc16;
		}
		else
			this.new_license_timer.crc16 = 0x0;
		for (key in license.flags) {
			if (license.flags[key].active == true)
				flag_status = this.TABLE_NAME_LICENSE_YES;
			else
				flag_status = this.TABLE_NAME_LICENSE_NO;
			this._create_table_element_license_info(license.flags[key].name + ":", flag_status, "", license.flags[key].title);
		}
		this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_LICENSE));
		return (true);
	}

	private _get_board_info(): boolean {
		this._destructors_board_info();
		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO));
		const board_info:ControllerSapiClassBoardInfo = this.razberry.getBoardInfo();
		if (board_info.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO), board_info.status);
			return (false);
		}
		this.board_info = board_info;
		const uuid_str_hex:string = arrayToStringHex(board_info.chip_uuid);
		this.new_license_timer.uuid_hex = uuid_str_hex;
		this._create_table_element_license_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID), uuid_str_hex, "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID_TITLE));
		const more_options_link:string = '<a target="_blank" href="'+ this.TABLE_NAME_LICENSE_MORE_OPTIONS_LINK + uuid_str_hex +'">'+ 'link' +'</a>';
		this._create_table_element_license_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS), more_options_link, "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE));
		this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO));
		return (true);
	}

	private _license_timer_valid_data(in_json:ControllerUiClassNewLicenseXhr): boolean {
		if (Object.hasOwn(in_json, "crc") == false || Object.hasOwn(in_json, "uuid") == false || Object.hasOwn(in_json, "license") == false)
			return (false);
		if (typeof (in_json.crc) != "string")
			return (false);
		if (typeof (in_json.license) != "string")
			return (false);
		if (typeof (in_json.uuid) != "string")
			return (false);
		return (true);
	}

	private _license_timer_get_pack(in_json:ControllerUiClassNewLicenseXhr): undefined|string {
		if (this.new_license_timer.crc16 == undefined || this.new_license_timer.uuid_hex == undefined)
			return (undefined);
		if (this.new_license_timer.uuid_hex.toLowerCase() != in_json.uuid.toLowerCase())
			return (undefined);
		const crc16:number = Number(in_json.crc);
		if (crc16 == 0x0)
			return (undefined);
		if (crc16 == this.new_license_timer.crc16)
			return (undefined);
		return (in_json.license);
	}

	private _license_timer(): void {
		if (this.new_license_timer.crc16 == undefined || this.new_license_timer.uuid_hex == undefined)
			return ;
		this.new_license_timer.xhr = new XMLHttpRequest();
		const url = this.TABLE_NAME_LICENSE_SERVISE_LINK + this.new_license_timer.uuid_hex;
		const fun_xhr_timer:TimerHandler = () => {
			this.new_license_timer.timer_id = undefined;
			if (this.new_license_timer.xhr == undefined)
				return ;
			this.new_license_timer.xhr.open("POST", url, true);
			this.new_license_timer.xhr.responseType = 'json';
			this.new_license_timer.xhr.timeout = this.ms_timeout_get_new_license_xhr;
			this.new_license_timer.xhr.ontimeout = () => {
				this.new_license_timer.timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
				this.log.errorXhrTimeout(url);
			};
			this.new_license_timer.xhr.onerror = () => {
				this.new_license_timer.timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
				this.log.errorXhrError(url);
			};
			this.new_license_timer.xhr.onload = () => {
				if (this.new_license_timer.xhr == undefined)
					return ;
				const in_json:ControllerUiClassNewLicenseXhr = this.new_license_timer.xhr.response;
				if (this._license_timer_valid_data(in_json) == false) {
					this.new_license_timer.timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
					this.log.errorXhrInvalidData(url);
					return ;
				}
				const pack:string|undefined = this._license_timer_get_pack(in_json);
				if (pack == undefined) {
					this.new_license_timer.timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
					return ;
				}
				const pack_array = hexToBytes(pack);
				if (pack_array == undefined) {
					this.new_license_timer.timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
					this.log.errorXhrInvalidData(url);
					return ;
				}
				const fun_controller_timer:TimerHandler = async () => {
					this.new_license_timer.timer_id = undefined;
					this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_LICENSE));
					if (this.razberry.busy() == true) {
						this.log.warning(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_PLEASE_WAIT));
						this.new_license_timer.timer_id = window.setTimeout(fun_controller_timer, this.ms_timeout_get_new_license_port);
						return ;
					}
					const status:ControllerSapiClassStatus = await this.razberry.setLicense(pack_array);
					if (status != ControllerSapiClassStatus.OK) {
						this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_LICENSE), status);
						this.new_license_timer.timer_id = window.setTimeout(fun_controller_timer, this.ms_timeout_get_new_license_port);
						return ;
					}
					this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_LICENSE));
					this.new_license_timer.timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
					this._start_license_info();
				}
				this.new_license_timer.timer_id = window.setTimeout(fun_controller_timer, 0x0);
			};
			this.new_license_timer.xhr.send();
			
		};
		this.new_license_timer.timer_id = window.setTimeout(fun_xhr_timer, 0x0);
	}

	private _start_license_info(): void {
		let display:boolean;

		if (this._section_hide(this.SECTION_ID_DATA_LICENSE_INFO) == false)
			return ;
		if (this._section_clear(this.SECTION_ID_DATA_LICENSE_INFO_TBODY) == false)
			return ;
		this._destructors_license();
		display = false;
		if (this._get_board_info() == true)
			display = true;
		if (this._get_license() == true)
			display = true;
		if (display == false)
			return ;
		this._license_timer();
		this._section_show(this.SECTION_ID_DATA_LICENSE_INFO);
	}

	private _start_update_info_create_progress(find:string, text:string): void {
		const el_continer:HTMLElement|null = this.el_modal.querySelector(find);
		if (el_continer == null) {
			this.log.errorNotFindElement(find);
			return ;
		}
		el_continer.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' + text +'</div>';
	}

	private _start_update_info_create_select(find:string, info:ControllerUiClassUpdateInfo, change:EventListener): void {
		let i:number, el_option_str:string;

		const el_continer:HTMLElement|null = this.el_modal.querySelector(find);
		if (el_continer == null) {
			this.log.errorNotFindElement(find);
			return ;
		}
		const el_select:HTMLElement = document.createElement("select");
		el_continer.innerHTML = "";
		el_continer.appendChild(el_select);
		info.data.sort(function (a:ControllerUiClassUpdateInfoData, b:ControllerUiClassUpdateInfoData):number {
			return (a.version - b.version);
		});
		i = 0x0;
		el_option_str = '<option ' + this.SELECTOR_DEFAULT + ' value="">'+ versionNumberToString(info.version) +'</option>';
		while (i < info.data.length) {
			el_option_str = el_option_str + '<option ' + ((info.data[i].beta == true)? this.SELECTOR_BETA + '=""':'')  + ' value="' + info.data[i].url +'">'+ versionNumberToString(info.data[i].version) +'</option>';
			i++;
		}
		el_select.innerHTML = el_option_str;
		el_select.addEventListener("change", change);
	}

	private _start_update_info_create_select_finware(info:ControllerUiClassUpdateInfo): void {
		const change:EventListener = (event:Event) => {
			this._update_finware_select_change(event);
		};
		this._start_update_info_create_select(this.SECTION_ID_DATA_UPDATE_INFO_FINWARE_SELECT, info, change);
	}

	private _start_update_info_create_select_bootloader(info:ControllerUiClassUpdateInfo): void {
		const change:EventListener = (event:Event) => {
			this._update_bootloader_select_change(event);
		};
		this._start_update_info_create_select(this.SECTION_ID_DATA_UPDATE_INFO_BOOTLOADER_SELECT, info, change);
	}

	private _start_update_info(): void {
		let i:number, version:number;

		if (this._section_hide(this.SECTION_ID_DATA_UPDATE_INFO) == false)
			return ;
		if (this._section_clear(this.SECTION_ID_DATA_UPDATE_INFO_TBODY) == false)
			return ;
		if (this.capabilities_info == undefined || this.board_info == undefined)
			return ;
		const app_update_info:ControllerUiClassUpdateInfo = {version:(this.capabilities_info.ApiVersion << 0x8) | this.capabilities_info.ApiRevision, data: []};
		const bootloader_update_info:ControllerUiClassUpdateInfo = {version:this.board_info.bootloader_version, data: []};
		this._destructors_update();
		this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO));
		this.get_update_info_xhr = new XMLHttpRequest();
		const url:string = this.URL_UPDATE_FIMWARE + '?vendorId=' + this.capabilities_info.VendorID.toString() + '&appVersionMajor=' + this.capabilities_info.ApiVersion.toString() + '&appVersionMinor=' + this.capabilities_info.ApiRevision.toString() + '&bootloaderCRC=1766938484&token=all&uuid=' + arrayToStringHex(this.board_info.chip_uuid);
		this.get_update_info_xhr.open("POST", url, true);
		this.get_update_info_xhr.responseType = 'json';
		this.get_update_info_xhr.timeout = this.ms_timeout_get_update_xhr;
		this.get_update_info_xhr.ontimeout = () => {
			this.log.errorXhrTimeout(url);
			this.log.errorFalled(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO));
			this._start_update_info_create_select_finware(app_update_info);
			this._start_update_info_create_select_bootloader(bootloader_update_info);
			this.get_update_info_xhr = undefined;
		};
		this.get_update_info_xhr.onerror = () => {
			this.log.errorXhrError(url);
			this.log.errorFalled(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO));
			this._start_update_info_create_select_finware(app_update_info);
			this._start_update_info_create_select_bootloader(bootloader_update_info);
			this._update_beta_aplle();
			this.get_update_info_xhr = undefined;
		};
		this.get_update_info_xhr.onload = () => {
			if (this.get_update_info_xhr == undefined)
				return ;
			const in_json:{data:Array<ControllerUiClassJsonUpdateInfo>} = this.get_update_info_xhr.response;
			this.get_update_info_xhr = undefined;
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
				this._start_update_info_create_select_finware(app_update_info);
				this._start_update_info_create_select_bootloader(bootloader_update_info);
				this._update_beta_aplle();
				this.log.errorXhrInvalidData(url);
				this.log.errorFalled(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO));
				return ;
			}
			const update_info_data:ControllerUiClassUpdateInfoData = {version:65756, url:"in_json.data[i].fileURL", beta:true};
			app_update_info.data.push(update_info_data);
			this.app_update_info = app_update_info;
			this._start_update_info_create_select_finware(app_update_info);
			this._start_update_info_create_select_bootloader(bootloader_update_info);
			this._update_beta_aplle();
			this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO));
		}
		const update_beta:string|null = localStorage.getItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA);
		const el_beta_str:string = '<input '+ this.SELECTOR_FUNCTION_CHANGE + '="_update_beta_change(event)"'+ ((update_beta === this.LOCAL_STORAGE_VALUE_TRUE) ? ' checked': '') + ' type="checkbox" title="' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_SELECT_TITLE) + '">';
		this._create_table_element_update_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA), el_beta_str, "", this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_TITLE));
		const el_load_str:string = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO) +'</div>';
		const el_action_finware:string = '<button ' + this.SECTION_ID_BUTTON_UPDATE_FINWARE + ' ' + this.SELECTOR_FUNCTION_CLICK + '="_update_finware_apple()" disabled type="button">' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON) + '</button>';
		this._create_table_element_update_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE), el_load_str, el_action_finware, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_TITLE));
		const el_action_bootloader:string = '<button ' + this.SECTION_ID_BUTTON_UPDATE_BOOTLOADER + ' ' + this.SELECTOR_FUNCTION_CLICK + '="_power_apple()" disabled type="button">' + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON) + '</button>';
		this._create_table_element_update_info(this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER), el_load_str, el_action_bootloader, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_TITLE));
		this.get_update_info_xhr.send();
		this._section_show(this.SECTION_ID_DATA_UPDATE_INFO);
	}

	private async _start_update(): Promise<void> {
		await this._start_controller_info();
		if (this.razberry.isRazberry() == true) {
			this._start_license_info();
			this._start_update_info();
		}
		this._html_event(this.el_modal, "change");
		this._html_event(this.el_modal, "click");
	}

	private async _start(): Promise<void> {
		if (this.razberry.supported() == false)
			return (this.log.error(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER)));
		this.log.info(this.VERSION_LOG);
		if (await this.razberry.request() == false)
			return (this.log.error(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_PORT_NOT_SELECT)));
		if (await this._connect() == false)
			return ;
		await this._start_update();
	}

	private _constructor_button_create(el_section_button:HTMLElement, func:EventListener, text:string, title:string): void {
		const el_button = document.createElement("button");
		el_button.textContent = text;
		el_button.title = title;
		el_button.addEventListener("click", func);
		el_section_button.appendChild(el_button);
	}

	private _constructor_button(): void {
		const el_section_button:HTMLElement  = document.createElement("section");
		el_section_button.className = "ZUnoRazberryModalContentSectionButton";
		const event_copy:EventListener = () => {
			navigator.clipboard.writeText(this.log.getLog());
		};
		const event_close:EventListener = async () => {
			if (this._is_busy() == true)
				return ;
			this._destructors();
			await this.razberry.close();
			this.el_modal.remove();
		};
		this._constructor_button_create(el_section_button, event_copy, this.locale.getLocale(ControllerUiLangClassId.BUTTON_COPY_TEXT), this.locale.getLocale(ControllerUiLangClassId.BUTTON_COPY_TITLE));
		this._constructor_button_create(el_section_button, event_close, this.locale.getLocale(ControllerUiLangClassId.BUTTON_CLOSE_TEXT), this.locale.getLocale(ControllerUiLangClassId.BUTTON_CLOSE_TITLE));
		this.el_section.appendChild(el_section_button);
	}

	constructor(el:HTMLElement) {
		this.el_modal.className = "ZUnoRazberryModal";
		this.el_modal.appendChild(this.el_section);
		this._constructor_button();
		this.log = new ControllerUiLogClass(this.el_section, this.locale);
		const el_section_tmp:HTMLElement = document.createElement("section");
		el_section_tmp.innerHTML = html_modal;
		this.el_section.appendChild(el_section_tmp);
		el.appendChild(this.el_modal);
		this._start();
	}
}