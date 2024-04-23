import "./other/style.scss";

import {ControllerUiLogClass} from "./log/controller_ui_log"
import {ControllerUiLangClassId} from "./lang/controller_ui_lang_define"
import {ControllerUiLangClass} from "./lang/controller_ui_lang"
import {ControllerUiSectionInfoClass} from "./section/controller_ui_section_info"
import {ControllerUiSectionLicenseClass} from "./section/controller_ui_section_license"
import {ControllerUiSectionUpdateClass} from "./section/controller_ui_section_update"
import {ControllerUiSectionMigrationClass} from "./section/controller_ui_section_migration"

import {ControllerUiDefineClass} from "./controller_ui_define"

import {sleep} from "./other/utilities";
import {ControllerSapiClass, SapiSerialOptionFilters} from "./sapi/controller_sapi";

export {ControllerUiClass};

class ControllerUiClass {
	private readonly VERSION_LOG											= ControllerUiDefineClass.NAME_APP + " 0.0.3";

	private readonly BAUDRATE												= [115200, 230400, 460800, 921600];
	private readonly dtr_timeout:number										= 250;
	private readonly razberry:ControllerSapiClass							= new ControllerSapiClass();
	private readonly locale:ControllerUiLangClass							= new ControllerUiLangClass();
	private readonly log:ControllerUiLogClass;
	private readonly el_modal:HTMLElement									= document.createElement("div");
	private readonly el_section:HTMLElement									= document.createElement("section");
	private readonly controller_info:ControllerUiSectionInfoClass;
	private readonly license_info:ControllerUiSectionLicenseClass;
	private readonly update_info:ControllerUiSectionUpdateClass;
	private readonly migration_info:ControllerUiSectionMigrationClass;
	private readonly filters?:SapiSerialOptionFilters[];

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

	private async _begin(): Promise<void> {
		await this.controller_info.begin();
		await this.license_info.begin();
		await this.update_info.begin();
		await this.migration_info.begin();
	}

	private async _start(): Promise<void> {
		if (this.razberry.supported() == false)
			return (this.log.error(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER)));
		this.log.info(this.VERSION_LOG);
		if (await this.razberry.request(this.filters) == false)
			return (this.log.error(this.locale.getLocale(ControllerUiLangClassId.MESSAGE_PORT_NOT_SELECT)));
		if (await this._connect() == false)
			return ;
		await this._begin();
	}

	private _constructor_button_create(el_section_button:HTMLElement, func:EventListener, text:string, title:string): void {
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.type = "button";
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
			if (this.controller_info.is_close() == false)
				return ;
			if (this.license_info.is_close() == false)
				return ;
			if (this.update_info.is_close() == false)
				return ;
			if (this.migration_info.is_close() == false)
				return ;
			await this.controller_info.end();
			await this.license_info.end();
			await this.update_info.end();
			await this.migration_info.end();
			await this.razberry.close();
			this.el_modal.remove();
		};
		this._constructor_button_create(el_section_button, event_copy, this.locale.getLocale(ControllerUiLangClassId.BUTTON_COPY_TEXT), this.locale.getLocale(ControllerUiLangClassId.BUTTON_COPY_TITLE));
		this._constructor_button_create(el_section_button, event_close, this.locale.getLocale(ControllerUiLangClassId.BUTTON_CLOSE_TEXT), this.locale.getLocale(ControllerUiLangClassId.BUTTON_CLOSE_TITLE));
		this.el_section.appendChild(el_section_button);
	}

	constructor(el:HTMLElement, filters?:SapiSerialOptionFilters[]) {
		this.filters = filters;
		this.el_modal.className = "ZUnoRazberryModal";
		this.el_modal.appendChild(this.el_section);
		this._constructor_button();
		this.log = new ControllerUiLogClass(this.el_section, this.locale);
		this.controller_info = new ControllerUiSectionInfoClass(this.el_section, this.locale, this.razberry, this.log, async () => {await this._begin()});
		this.license_info = new ControllerUiSectionLicenseClass(this.el_section, this.locale, this.razberry, this.log);
		this.update_info = new ControllerUiSectionUpdateClass(this.el_section, this.locale, this.razberry, this.log, async () => {await this._begin()});
		this.migration_info = new ControllerUiSectionMigrationClass(this.el_section, this.locale, this.razberry, this.log);
		el.appendChild(this.el_modal);
		this._start();
	}
}