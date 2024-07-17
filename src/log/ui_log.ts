import {ControllerUiLangClassId} from "../lang/ui_lang_define"
import {ControllerUiLangClass} from "../lang/ui_lang"

export {ControllerUiLogClass};

class ControllerUiLogClass {
	private readonly locale:ControllerUiLangClass;
	private readonly el_log:HTMLElement;

	private _log(txt:string): void {
		this.el_log.innerHTML += txt;
		this.el_log.scrollTop = this.el_log.scrollHeight;
	}

	public getLog(): string {
		let i:number, txt:string;

		const childNodes:NodeListOf<ChildNode> = this.el_log.childNodes;
		i = 0x0;
		txt = "";
		while (i < childNodes.length) {
			const child = childNodes[i];
			txt = txt + child.textContent + "\n";
			i++;
		}
		return (txt);
	}

	public info(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this._log('<div class="ZUnoRazberryModal_color_info">' + txt + "</div>");
	}

	public warning(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this._log('<div class="ZUnoRazberryModal_color_warning">' + txt + "</div>");
	}

	public error(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this._log('<div class="ZUnoRazberryModal_color_error">' + txt + "</div>");
	}

	public infoStart(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this.info(txt + "...");
	}

	public infoDone(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this.info(txt + this.locale.getLocale(ControllerUiLangClassId.LOG_DONE));
	}

	public errorFalled(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this.error(txt + this.locale.getLocale(ControllerUiLangClassId.LOG_FALLED));
	}

	public errorFalledCode(txt:string|ControllerUiLangClassId, code:number): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this.error(txt + this.locale.getLocale(ControllerUiLangClassId.LOG_FALLED_CODE).replace('{{code}}', code.toString()));
	}

	public errorUnsupport(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this.error(txt + this.locale.getLocale(ControllerUiLangClassId.LOG_UNSUPPORTED));
	}

	public errorNotFindElement(txt:string): void {
		this.error(this.locale.getLocale(ControllerUiLangClassId.LOG_NOT_FIND_ELEMENT).replace('{{element}}', txt));
	}

	public errorXhrTimeout(url:string): void {
		this.error(this.locale.getLocale(ControllerUiLangClassId.LOG_XHR_TIMEOUT).replace('{{url}}', url));
	}

	public errorXhrError(url:string): void {
		this.error(this.locale.getLocale(ControllerUiLangClassId.LOG_XHR_ERROR).replace('{{url}}', url));
	}

	public errorXhrInvalidData(url:string): void {
		this.error(this.locale.getLocale(ControllerUiLangClassId.LOG_XHR_INVALID_DATA).replace('{{url}}', url));
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass) {
		this.locale = locale;
		const el:HTMLElement = document.createElement("section");
		el.className = "ZUnoRazberryModalContentSection_table";
		const el_section_log_header:HTMLElement = document.createElement("h3");
		el_section_log_header.textContent = this.locale.getLocale(ControllerUiLangClassId.LOG_HEADER)
		el.appendChild(el_section_log_header);
		const el_text:HTMLElement = document.createElement("section");
		el_text.className = "ZUnoRazberryModalContentSectionLog_section_txt";
		el.appendChild(el_text);
		this.el_log = el_text;
		el_section.appendChild(el);
	}
}