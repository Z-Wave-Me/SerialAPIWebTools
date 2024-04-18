import {ControllerUiLangClassId} from "../lang/controller_ui_lang_define"
import {ControllerUiLangClass} from "../lang/controller_ui_lang"
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassBoardInfo, ControllerSapiClassLicense} from "../sapi/controller_sapi";
import {ControllerUiLogClass} from "../log/controller_ui_log"
import {ControllerUiSectionClass} from "./controller_ui_section"
import {arrayToStringHex, hexToBytes} from "../utilities";

export {ControllerUiSectionLicenseClass};

interface ControllerUiClassNewLicenseXhr
{
	uuid:string;
	license:string;
	crc:string;
}

class ControllerUiSectionLicenseClass extends ControllerUiSectionClass {
	private readonly TABLE_NAME_LICENSE_MORE_OPTIONS_LINK:string			= "https://z-wave.me/hardware-capabilities/?uuid=";
	private readonly TABLE_NAME_LICENSE_SERVISE_LINK:string					= "https://service.z-wave.me/hardware/capabilities/?uuid=";
	private readonly TABLE_NAME_LICENSE_YES:string							= '<input disabled="disabled" checked type="checkbox">';
	private readonly TABLE_NAME_LICENSE_NO:string							= '<input disabled="disabled" type="checkbox">';

	private readonly ms_timeout_get_new_license:number						= 10000;
	private readonly ms_timeout_get_new_license_xhr:number					= 3000;
	private readonly ms_timeout_get_new_license_port:number					= 1000;

	private license_timer_id?:number;
	private license_xhr?:XMLHttpRequest;

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

	private _license_timer_get_pack(in_json:ControllerUiClassNewLicenseXhr, uuid:string, crc16_old:number): undefined|string {
		if (uuid.toLowerCase() != in_json.uuid.toLowerCase())
			return (undefined);
		const crc16:number = Number(in_json.crc);
		if (crc16 == 0x0)
			return (undefined);
		if (crc16 == crc16_old)
			return (undefined);
		return (in_json.license);
	}

	private _license_timer_init(uuid:string, crc16:number): void {
		this.license_xhr = new XMLHttpRequest();
		const url = this.TABLE_NAME_LICENSE_SERVISE_LINK + uuid;
		const fun_xhr_timer:TimerHandler = () => {
			this.license_timer_id = undefined;
			if (this.license_xhr == undefined)
				return ;
			this.license_xhr.open("POST", url, true);
			this.license_xhr.responseType = 'json';
			this.license_xhr.timeout = this.ms_timeout_get_new_license_xhr;
			this.license_xhr.ontimeout = () => {
				this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
				this.log.errorXhrTimeout(url);
			};
			this.license_xhr.onerror = () => {
				this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
				this.log.errorXhrError(url);
			};
			this.license_xhr.onload = () => {
				if (this.license_xhr == undefined)
					return ;
				const in_json:ControllerUiClassNewLicenseXhr = this.license_xhr.response;
				if (this._license_timer_valid_data(in_json) == false) {
					this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
					this.log.errorXhrInvalidData(url);
					return ;
				}
				const pack:string|undefined = this._license_timer_get_pack(in_json, uuid, crc16);
				if (pack == undefined) {
					this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
					return ;
				}
				const pack_array = hexToBytes(pack);
				if (pack_array == undefined) {
					this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
					this.log.errorXhrInvalidData(url);
					return ;
				}
				const fun_controller_timer:TimerHandler = async () => {
					this.license_timer_id = undefined;
					this.log.infoStart(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_LICENSE));
					if (this.razberry.busy() == true) {
						this.log.warning(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_PLEASE_WAIT));
						this.license_timer_id = window.setTimeout(fun_controller_timer, this.ms_timeout_get_new_license_port);
						return ;
					}
					const status:ControllerSapiClassStatus = await this.razberry.setLicense(pack_array);
					if (status != ControllerSapiClassStatus.OK) {
						this.log.errorFalledCode(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_LICENSE), status);
						this.license_timer_id = window.setTimeout(fun_controller_timer, this.ms_timeout_get_new_license_port);
						return ;
					}
					this.log.infoDone(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_SET_LICENSE));
					this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
					this.begin();
				}
				this.license_timer_id = window.setTimeout(fun_controller_timer, 0x0);
			};
			this.license_xhr.send();
			
		};
		this.license_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
	}

	private _license_init(): number|undefined {
		let key:string, flag_status:string;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_LICENSE);
		const license:ControllerSapiClassLicense = this.razberry.getLicense();
		if (license.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_LICENSE, license.status);
			return (undefined);
		}
		if (license.vallid == true) {
			this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID, ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE, String(license.vendor_id), "");
			this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE, ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE_TITLE, String(license.max_nodes), "");
			this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT, ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT_TITLE, String(license.count_support), "");
		}
		for (key in license.flags) {
			if (license.flags[key].active == true)
				flag_status = this.TABLE_NAME_LICENSE_YES;
			else
				flag_status = this.TABLE_NAME_LICENSE_NO;
			this.create_tr_el(license.flags[key].name + ":", license.flags[key].title, flag_status, "");
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_LICENSE);
		if (license.vallid == true)
			return (license.crc16);
		return (0x0);
	}
	
	private _board_info_init(): string|undefined {
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
		const board_info:ControllerSapiClassBoardInfo = this.razberry.getBoardInfo();
		if (board_info.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO, board_info.status);
			return (undefined);
		}
		const uuid_str_hex:string = arrayToStringHex(board_info.chip_uuid);
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID, ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID_TITLE, uuid_str_hex, "");
		const more_options_link:string = '<a target="_blank" href="'+ this.TABLE_NAME_LICENSE_MORE_OPTIONS_LINK + uuid_str_hex +'">'+ 'link' +'</a>';
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS, ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE, more_options_link, "");
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
		return (uuid_str_hex);
	}

	private async _begin(): Promise<boolean> {
		if (this.razberry.isRazberry() == false)
			return (false);
		const uuid_str_hex:string|undefined = this._board_info_init();
		const crc16:number|undefined = this._license_init();
		if (uuid_str_hex == undefined && crc16 == undefined)
			return (false);
		if (uuid_str_hex != undefined && crc16 != undefined)
			this._license_timer_init(uuid_str_hex, crc16);
		return (true);
	}

	private async _end(): Promise<void> {
		if (this.license_timer_id != undefined) {
			window.clearTimeout(this.license_timer_id);
			this.license_timer_id = undefined;
		}
		if (this.license_xhr != undefined) {
			this.license_xhr.abort();
			this.license_xhr = undefined;
		}
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass) {
		super(el_section, locale, razberry, log, ControllerUiLangClassId.LICENSE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
	}
}