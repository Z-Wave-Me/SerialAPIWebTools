
import {controller_lang_en} from "./controller_ui_lang_en"
import {ControllerUiLangClassList, ControllerUiLangClassId} from "./controller_ui_lang_define"

export {ControllerUiLangClass};

class ControllerUiLangClass {
	private locale:ControllerUiLangClassList							= controller_lang_en;

	public getLocale(id:ControllerUiLangClassId): string {
		if (Object.hasOwn(this.locale, id) == true)
			return (this.locale[id]);
		return ("");
	}

	constructor() {
	}
}