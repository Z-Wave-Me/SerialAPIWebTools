
import {controller_lang_en} from "./ui_lang_en"
import {ControllerUiLangClassList, ControllerUiLangClassId} from "./ui_lang_define"

export {ControllerUiLangClass};

class ControllerUiLangClass {
	private locale:ControllerUiLangClassList							= controller_lang_en;

	public getLocale(id:ControllerUiLangClassId): string {
		if (this.locale[id] != undefined)
			return (this.locale[id]);
		return ("");
	}

	constructor() {
	}
}