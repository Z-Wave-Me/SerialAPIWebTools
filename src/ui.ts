import "./other/style.scss";

import {ControllerUiLogClass} from "./log/ui_log"
import {ControllerUiLangClassId} from "./lang/ui_lang_define"
import {ControllerUiLangClass} from "./lang/ui_lang"
import {ControllerUiSectionInfoClass} from "./section/controller/info"
import {ControllerUiSectionLicenseClass} from "./section/controller/license"
import {ControllerUiSectionUpdateClass} from "./section/controller/update"
import {ControllerUiSectionMigrationClass} from "./section/controller/migration"

import {ControllerUiDefineClass} from "./ui_define"

import {ControllerSapiClass, SapiSerialOptionFilters} from "./sapi/controller_sapi";
import {SapiClass, SapiClassStatus, SapiClassDetect, SapiClassDetectType} from "./sapi/sapi";

export {ControllerUiClass};

class ControllerUiClass {
	private readonly VERSION_LOG											= ControllerUiDefineClass.NAME_APP + " 0.0.4";

	private readonly LOCAL_STORAGE_KEY_BAUDRATE:string						= ControllerUiDefineClass.NAME_APP + '_baudrate_cache';
	private readonly sapi:SapiClass											= new SapiClass();
	private readonly razberry:ControllerSapiClass							= new ControllerSapiClass(this.sapi);
	private readonly locale:ControllerUiLangClass							= new ControllerUiLangClass();
	private readonly el_modal:HTMLElement									= document.createElement("div");
	private readonly el_section:HTMLElement									= document.createElement("section");
	private readonly log:ControllerUiLogClass								= new ControllerUiLogClass(this.el_section, this.locale);
	private readonly controller:Array<ControllerUiSectionInfoClass|ControllerUiSectionLicenseClass|ControllerUiSectionUpdateClass|ControllerUiSectionMigrationClass>			= [];
	private readonly filters?:SapiSerialOptionFilters[];

	private device_type:SapiClassDetectType									= SapiClassDetectType.UNKNOWN;

	private _get_baudrate_cache():Array<number> {
		let baudrate:Array<number>, i:number;

		const baudrate_str:string|null = localStorage.getItem(this.LOCAL_STORAGE_KEY_BAUDRATE);
		if (baudrate_str == null)
			return ([]);
		try {
			baudrate = JSON.parse(baudrate_str);
		} catch (error) {
			return ([]);
		}
		if (Array.isArray(baudrate) == false)
			return ([]);
		i = 0x0;
		while (i < baudrate.length) {
			if (this.sapi.BAUDRATE.indexOf(baudrate[i]) == -1)
				baudrate.splice(i, 0x1);
			i++;
		}
		return (baudrate);
	}

	private _set_baudrate_cache(baudrate_array:Array<number>, baudrate:number):void {
		const i:number = baudrate_array.indexOf(baudrate);
		if (i != -1)
			baudrate_array.splice(i, 0x1);
		baudrate_array.unshift(baudrate);
		localStorage.setItem(this.LOCAL_STORAGE_KEY_BAUDRATE, JSON.stringify(baudrate_array));
	}

	private async _begin(): Promise<void> {
		let i:number;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_CONNECT);
		const baudrate_array:Array<number> = this._get_baudrate_cache();
		const detect_dict:SapiClassDetect = await this.sapi.detect(baudrate_array);
		if (detect_dict.status != SapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_CONNECT, detect_dict.status);
			return ;
		}
		this._set_baudrate_cache(baudrate_array, detect_dict.baudrate);
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_CONNECT);
		this.device_type = detect_dict.type;
		switch (this.device_type) {
			case SapiClassDetectType.RAZBERRY:
				if (await this.razberry.connect() == false)
					return ;
				i = 0x0;
				while (i < this.controller.length) {
					await this.controller[i].begin();
					i++;
				}
				break;
		}
	}

	private async _start(): Promise<void> {
		this.log.info(this.VERSION_LOG);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_PORT_SELECT);
		const status:SapiClassStatus = await this.sapi.request(this.filters);
		if (status == SapiClassStatus.SERIAL_UN_SUPPORT)
			return (this.log.error(ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER));
		if (status == SapiClassStatus.REQUEST_NO_SELECT)
			return (this.log.error(ControllerUiLangClassId.MESSAGE_PORT_SELECT));
		if (status != SapiClassStatus.OK)
			return (this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_PORT_SELECT, status));
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_PORT_SELECT);
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
			let i:number;

			switch (this.device_type) {
				case SapiClassDetectType.RAZBERRY:
					i = 0x0;
					while (i < this.controller.length) {
						if (this.controller[i].is_close() == false)
							return ;
						i++;
					}
					i = 0x0;
					while (i < this.controller.length) {
						await this.controller[i].end();
						i++;
					}
					break;
			}
			await this.sapi.close();
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
		this.controller.push(new ControllerUiSectionInfoClass(this.el_section, this.locale, this.razberry, this.log, async () => {await this._begin()}));
		this.controller.push(new ControllerUiSectionLicenseClass(this.el_section, this.locale, this.razberry, this.log));
		this.controller.push(new ControllerUiSectionUpdateClass(this.el_section, this.locale, this.razberry, this.log, async () => {await this._begin()}));
		this.controller.push(new ControllerUiSectionMigrationClass(this.el_section, this.locale, this.razberry, this.log));
		el.appendChild(this.el_modal);
		this._start();
	}
}