import "./other/style.scss";

import {ControllerUiLogClass} from "./log/ui_log"
import {ControllerUiLangClassId} from "./lang/ui_lang_define"
import {ControllerUiLangClass} from "./lang/ui_lang"
import {ControllerUiSectionInfoClass} from "./section/controller/info"
import {ControllerUiSectionLicenseClass} from "./section/controller/license"
import {ControllerUiSectionUpdateClass} from "./section/controller/update"
import {ControllerUiSectionMigrationClass} from "./section/controller/migration"
import {DetectionUiSectionClass} from "./section/detection"
import {SlaveUiSectionInfoClass} from "./section/slave/info"
import {SlaveUiSectionLicenseClass} from "./section/slave/license"
import {SlaveUiSectionUpdateClass} from "./section/slave/update"

import {ControllerUiDefineClass} from "./ui_define"

import {ControllerSapiClass} from "./sapi/controller_sapi";
import {ZunoSapiClass} from "./sapi/zuno_sapi";
import {SapiClass, SapiClassStatus, SapiClassDetect, SapiClassDetectType, SapiSerialOptionFilters} from "./sapi/sapi";

export {ControllerUiClass};

type controller_array_type = Array<ControllerUiSectionInfoClass|ControllerUiSectionLicenseClass|ControllerUiSectionUpdateClass|ControllerUiSectionMigrationClass>;
type slave_array_type = Array<SlaveUiSectionInfoClass|SlaveUiSectionLicenseClass|SlaveUiSectionUpdateClass>;
type all_array_type = controller_array_type|slave_array_type;

class ControllerUiClass {
	private readonly sapi:SapiClass											= new SapiClass();
	private readonly razberry:ControllerSapiClass							= new ControllerSapiClass(this.sapi);
	private readonly zuno:ZunoSapiClass										= new ZunoSapiClass(this.sapi);
	private readonly locale:ControllerUiLangClass							= new ControllerUiLangClass();
	private readonly el_modal:HTMLElement									= document.createElement("div");
	private readonly el_section:HTMLElement									= document.createElement("section");
	private readonly log:ControllerUiLogClass								= new ControllerUiLogClass(this.el_section, this.locale);
	private readonly controller:controller_array_type						= [];
	private readonly slave:slave_array_type									= [];
	private readonly detection:DetectionUiSectionClass;
	private readonly filters?:SapiSerialOptionFilters[];

	private detect_type:SapiClassDetectType									= SapiClassDetectType.UNKNOWN;

	private _get_all_array_type():all_array_type {
		let out:all_array_type;
	
		switch (this.detect_type) {
			case SapiClassDetectType.RAZBERRY:
				out = this.controller;
				break;
			case SapiClassDetectType.ZUNO:
				out = this.slave;
				break ;
			default:
				out = [];
				break ;
		}
		return (out);
	}

	private async _begin(detection:boolean): Promise<void> {
		let i:number, array_type:all_array_type;

		array_type = this._get_all_array_type();
		i = 0x0;
		while (i < array_type.length) {
			await array_type[i].end();
			i++;
		}
		if (detection == true) {
			await this.detection.begin();
			const detect_dict:SapiClassDetect|undefined = await this.detection.detection();
			if (detect_dict == undefined)
				return ;
		}
		this.detect_type = this.sapi.type();
		switch (this.detect_type) {
			case SapiClassDetectType.ZUNO:
				await this.zuno.connect();
				break;
			case SapiClassDetectType.RAZBERRY:
				await this.razberry.connect();
				break;
		}
		array_type = this._get_all_array_type();
		i = 0x0;
		while (i < array_type.length) {
			await array_type[i].begin();
			i++;
		}
	}

	private async _start(): Promise<void> {
		this.log.info(ControllerUiDefineClass.NAME_APP_VERSION_FULL);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_PORT_SELECT);
		const status:SapiClassStatus = await this.sapi.request(this.filters);
		if (status == SapiClassStatus.SERIAL_UN_SUPPORT)
			return (this.log.error(ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER));
		if (status == SapiClassStatus.REQUEST_NO_SELECT)
			return (this.log.errorFalled(ControllerUiLangClassId.MESSAGE_PORT_SELECT));
		if (status != SapiClassStatus.OK)
			return (this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_PORT_SELECT, status));
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_PORT_SELECT);
		await this._begin(true);
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

			const array_type:all_array_type = this._get_all_array_type();
			i = 0x0;
			while (i < array_type.length) {
				if (array_type[i].is_close() == false)
					return ;
				i++;
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
		this.detection = new DetectionUiSectionClass(this.el_section, this.locale, this.sapi, this.log, async (detection:boolean) => {await this._begin(detection)});
		this.controller.push(new ControllerUiSectionInfoClass(this.el_section, this.locale, this.razberry, this.log, async (detection:boolean) => {await this._begin(detection)}));
		this.controller.push(new ControllerUiSectionLicenseClass(this.el_section, this.locale, this.razberry, this.log));
		this.controller.push(new ControllerUiSectionUpdateClass(this.el_section, this.locale, this.razberry, this.log, async (detection:boolean) => {await this._begin(detection)}));
		this.controller.push(new ControllerUiSectionMigrationClass(this.el_section, this.locale, this.razberry, this.log));
		this.slave.push(new SlaveUiSectionInfoClass(this.el_section, this.locale, this.zuno, this.log, async (detection:boolean) => {await this._begin(detection)}));
		this.slave.push(new SlaveUiSectionLicenseClass(this.el_section, this.locale, this.zuno, this.log, async (detection:boolean) => {await this._begin(detection)}));
		this.slave.push(new SlaveUiSectionUpdateClass(this.el_section, this.locale, this.zuno, this.log, async (detection:boolean) => {await this._begin(detection)}));
		el.appendChild(this.el_modal);
		this._start();
	}
}