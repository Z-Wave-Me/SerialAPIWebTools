import {ControllerUiLangClassId} from "../lang/controller_ui_lang_define"
import {ControllerUiLangClass} from "../lang/controller_ui_lang"
import {ControllerSapiClass} from "../sapi/controller_sapi";
import {ControllerUiLogClass} from "../log/controller_ui_log"

export {CommonUiSectionClass};

interface CommonUiSectionClassBegin {
	(): Promise<boolean>
}

interface CommonUiSectionClassEnd {
	(): Promise<void>
}

class CommonUiSectionClass {

	protected readonly locale:ControllerUiLangClass;
	protected readonly razberry:ControllerSapiClass;
	protected readonly log:ControllerUiLogClass;

	private readonly el_section:HTMLElement;
	private readonly el_tbody:HTMLElement;
	private readonly begin_func:CommonUiSectionClassBegin;
	private readonly end_func:CommonUiSectionClassEnd;

	protected is_busy(): boolean {
		if (this.razberry.busy() == true) {
			this.log.warning(ControllerUiLangClassId.MESSAGE_PLEASE_WAIT);
			return (true);
		}
		return (false);
	}

	protected common_button_atrr(el_button:HTMLButtonElement, title:string|ControllerUiLangClassId, hide:boolean): void {
		if (hide == true) {
			el_button.setAttribute("disabled", "");
			el_button.removeAttribute("title");
			return ;
		}
		if (typeof title !== "string")
			title = this.locale.getLocale(title);
		el_button.setAttribute("title", title);
		el_button.removeAttribute("disabled");
	}

	private _event_get_element(event:Event, tag:string): EventTarget|null {
		if (event.target == null)
			return (null);
		const el_target:HTMLElement = (event.target as HTMLElement);
		try {
			if (el_target.tagName.toLowerCase() !== tag.toLowerCase())
				return (null);
		} catch (error) {
			return (null);
		}
		return (event.target);
	}

	protected event_get_element_select(event:Event): HTMLSelectElement|null {
		const el_target:EventTarget|null = this._event_get_element(event, "select") ;
		if (el_target == null)
			return (null);
		return ((event.target as HTMLSelectElement));
	}

	protected event_get_element_input(event:Event): HTMLInputElement|null {
		const el_target:EventTarget|null = this._event_get_element(event, "input") ;
		if (el_target == null)
			return (null);
		return ((event.target as HTMLInputElement));
	}

	protected event_get_element_button(event:Event): HTMLButtonElement|null {
		const el_target:EventTarget|null = this._event_get_element(event, "button") ;
		if (el_target == null)
			return (null);
		return ((event.target as HTMLButtonElement));
	}

	protected create_tr_el(name:string|ControllerUiLangClassId, title:string|ControllerUiLangClassId, value:string|HTMLElement, action:string|HTMLElement): HTMLElement {
		const el_tr: HTMLElement = document.createElement("tr");
		const el_td_1: HTMLElement = document.createElement("td");
		const el_td_2: HTMLElement = document.createElement("td");
		const el_td_3: HTMLElement = document.createElement("td");
		if (typeof name === "string")
			el_td_1.innerHTML = name;
		else
			el_td_1.innerHTML = this.locale.getLocale(name);
		if (typeof title === "string")
			el_td_1.title = title;
		else
			el_td_1.title = this.locale.getLocale(title);
		if (typeof value === "string")
			el_td_2.innerHTML = value;
		else
			el_td_2.appendChild(value);
		if (typeof action === "string")
			el_td_3.innerHTML = action;
		else
			el_td_3.appendChild(action);
		el_tr.appendChild(el_td_1);
		el_tr.appendChild(el_td_2);
		el_tr.appendChild(el_td_3);
		this.el_tbody.appendChild(el_tr);
		return (el_tr);
	}

	public is_close(): boolean {
		if (this.is_busy() == true)
			return (false);
		return (true);
	}

	public async begin(): Promise<void> {
		await this.end();
		if (await this.begin_func() == false)
			return ;
		this.el_section.style.display = '';
	}

	public async end(): Promise<void> {
		this.el_section.style.display = 'none';
		await this.end_func();
		this.el_tbody.innerHTML = '';
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass, id:ControllerUiLangClassId, begin_func:CommonUiSectionClassBegin, end_func:CommonUiSectionClassEnd) {
		this.locale = locale;
		this.razberry = razberry;
		this.log = log;
		const el:HTMLElement = document.createElement("section");
		el.className = "ZUnoRazberryModalContentSection_table";
		el.style.display = 'none';
		const el_header:HTMLElement = document.createElement("h3");
		el_header.textContent = this.locale.getLocale(id);
		el.appendChild(el_header);
		const el_table:HTMLElement = document.createElement("table");
		el.appendChild(el_table);
		const el_tbody:HTMLElement = document.createElement("tbody");
		el_table.appendChild(el_tbody);
		el_section.appendChild(el);
		this.el_section = el;
		this.el_tbody = el_tbody;
		this.begin_func = begin_func;
		this.end_func = end_func;
	}
}
