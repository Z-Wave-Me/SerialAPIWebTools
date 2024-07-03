import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {arrayToStringHex} from "../../other/utilities";
import {ControllerUiDefineClassReBeginFunc, TABLE_NAME_LICENSE_YES, TABLE_NAME_LICENSE_NO} from "../../ui_define"

export {SlaveUiSectionLicenseClass};

class SlaveUiSectionLicenseClass extends CommonUiSectionClass {
	private readonly zuno:ZunoSapiClass;
	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	private _license_init(): boolean {
		let key:string, flag_status:string;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_LICENSE);
		const board_info:ZunoSapiClassBoardInfo = this.zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_LICENSE, board_info.status);
			return (false);
		}
		if (board_info.license == undefined) {
			this.log.errorUnsupport(ControllerUiLangClassId.MESSAGE_READ_LICENSE);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_LICENSE);
		const uuid_str_hex:string = arrayToStringHex(board_info.chip_uuid);
		const more_options_link:string = '<a target="_blank" href="'+ this.URL_LICENSE_MORE_OPTIONS + uuid_str_hex +'">'+ 'link' +'</a>';
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS, ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE, more_options_link, "");
		for (key in board_info.license.lic_flags) {
			if (board_info.license.lic_flags[key].active == true)
				flag_status = TABLE_NAME_LICENSE_YES;
			else
				flag_status = TABLE_NAME_LICENSE_NO;
			this.create_tr_el(board_info.license.lic_flags[key].name + ":", board_info.license.lic_flags[key].title, flag_status, "");
		}
		return (true);
	}

	private async _begin(): Promise<boolean> {
		let display:boolean;

		display = false;
		if (this._license_init() == true)
			display = true;
		return (display);
	}

	private async _end(): Promise<void> {

	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, zuno:ZunoSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, zuno, log, ControllerUiLangClassId.LICENSE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.zuno = zuno;
		this.re_begin_func = re_begin_func;
	}
}