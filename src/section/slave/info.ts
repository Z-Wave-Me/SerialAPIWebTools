import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"

export {SlaveUiSectionInfoClass};

interface ControllerUiSectionInfoClassReBegin {
	(): Promise<void>
}


class SlaveUiSectionInfoClass extends CommonUiSectionClass {
	private readonly zuno:ZunoSapiClass;
	private readonly re_begin_func:ControllerUiSectionInfoClassReBegin;

	private async _begin(): Promise<boolean> {
		let display:boolean;

		display = false;
		return (display);
	}

	private async _end(): Promise<void> {

	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, zuno:ZunoSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiSectionInfoClassReBegin) {
		super(el_section, locale, zuno, log, ControllerUiLangClassId.CONTROLER_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.zuno = zuno;
		this.re_begin_func = re_begin_func;
	}
}