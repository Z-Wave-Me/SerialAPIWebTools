import {ControllerUiLangClassId} from "../lang/ui_lang_define"
import {ControllerUiLangClass} from "..//lang/ui_lang"
import {SapiClass, SapiClassDetect, SapiClassStatus, SapiClassDetectTypeFunc} from "../sapi/sapi";
import {ControllerUiLogClass} from "../log/ui_log"
import {CommonUiSectionClass} from "./common"

import {ControllerUiDefineClass, ControllerUiDefineClassReBeginFunc} from "../ui_define"

export {DetectionUiSectionClass};

class DetectionUiSectionClass extends CommonUiSectionClass {
	private readonly sapi:SapiClass;
	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	private readonly el_container:HTMLElement								= document.createElement("span");
	private readonly LOCAL_STORAGE_KEY_BAUDRATE:string						= ControllerUiDefineClass.NAME_APP + '_baudrate_cache';
	private readonly LOCAL_STORAGE_DETECTION_SYNC_MANUAL:string				= ControllerUiDefineClass.NAME_APP + '_detection_sync_manual';
	private readonly LOCAL_STORAGE_VALUE_TRUE:string						= 'true';
	private readonly LOCAL_STORAGE_VALUE_FALSE:string						= 'false';

	private _get_detection_sync_manual():boolean {
		const detection_sync_manual:string|null = localStorage.getItem(this.LOCAL_STORAGE_DETECTION_SYNC_MANUAL);
		if (detection_sync_manual === this.LOCAL_STORAGE_VALUE_TRUE)
			return (true);
		return (false);
	}

	private async _detection_sync_manual(event:Event) {
		const el_target:HTMLInputElement|null = this.event_get_element_input(event);
		if (el_target == null)
			return ;
		localStorage.setItem(this.LOCAL_STORAGE_DETECTION_SYNC_MANUAL, ((el_target.checked == true) ? this.LOCAL_STORAGE_VALUE_TRUE: this.LOCAL_STORAGE_VALUE_FALSE));
	}

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

	private async _click_start_stop_question(): Promise<boolean> {
		const promise:Promise<boolean> = new Promise((resolve) => {
			this.el_container.innerHTML = '';
			const el_span:HTMLSpanElement = document.createElement("span");
			el_span.textContent = this.locale.getLocale(ControllerUiLangClassId.DETECTION_PROCESS_QUEST_SYNC);
			el_span.className = "ZUnoRazberryModal_color_question ZUnoRazberryModalContentSection_migration_action_button";
			const el_button_continue:HTMLButtonElement = document.createElement("button");
			el_button_continue.textContent = this.locale.getLocale(ControllerUiLangClassId.DETECTION_PROCESS_CONTINUE);
			el_button_continue.title = this.locale.getLocale(ControllerUiLangClassId.DETECTION_PROCESS_CONTINUE_TITLE);
			el_button_continue.type = "button";
			el_button_continue.className = "ZUnoRazberryModalContentSection_migration_action_button";
			const el_button_stop:HTMLButtonElement = document.createElement("button");
			el_button_stop.textContent = this.locale.getLocale(ControllerUiLangClassId.DETECTION_PROCESS_STOP);
			el_button_stop.title = this.locale.getLocale(ControllerUiLangClassId.DETECTION_PROCESS_STOP_TITLE);
			el_button_stop.type = "button";
			el_button_stop.className = "ZUnoRazberryModalContentSection_migration_action_button";
			el_button_stop.addEventListener("click", async () => { resolve(false)});
			el_button_continue.addEventListener("click", async () => { resolve(true)});
			this.el_container.appendChild(el_span);
			this.el_container.appendChild(el_button_continue);
			this.el_container.appendChild(el_button_stop);
		});
		return (promise);
	}

	private async _detection_process_sync(): Promise<boolean> {
		const excluding_question:boolean = await this._click_start_stop_question();
		if (excluding_question == false) {
			this._constructor_struct_end();
			return (false);
		}
		this._constructor_struct_progress(ControllerUiLangClassId.DETECTION_PROCESS);
		return (true);
	}

	private _constructor_struct_progress(text:ControllerUiLangClassId): void {
		this.el_container.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' +  this.locale.getLocale(text) +'</div>';
	}

	private async _click_re_sync(event:Event) {
		if (this.is_busy() == true)
			return ;
		this.re_begin_func(true);
	}

	private _constructor_struct_end(): void {
		this.el_container.innerHTML = '';
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.addEventListener("click", async (event:Event) => { await this._click_re_sync(event);});
		el_button.type = "button";
		el_button.textContent = this.locale.getLocale(ControllerUiLangClassId.DETECTION_PROCESS_BUTTON_RE_SYNC);
		el_button.title = this.locale.getLocale(ControllerUiLangClassId.DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE);
		this.el_container.appendChild(el_button);
	}


	public async detection(): Promise<SapiClassDetect|undefined> {
		let func:SapiClassDetectTypeFunc|null;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_CONNECT);
		const baudrate_array:Array<number> = this._get_baudrate_cache();
		if (this._get_detection_sync_manual() == false)
			func = null;
		else
			func = async ():Promise<boolean> => {return (await this._detection_process_sync());}
		this._constructor_struct_progress(ControllerUiLangClassId.DETECTION_PROCESS);
		const detect_dict:SapiClassDetect = await this.sapi.detect(baudrate_array, func);
		if (detect_dict.status != SapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_CONNECT, detect_dict.status);
			this._constructor_struct_end();
			return (undefined);
		}
		this._constructor_struct_end();
		this._set_baudrate_cache(baudrate_array, detect_dict.baudrate);
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_CONNECT);
		return (detect_dict);
	}

	private async _begin(): Promise<boolean> {
		const el_input:HTMLInputElement = document.createElement("input");
		el_input.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE);
		el_input.type = "checkbox";
		el_input.checked = this._get_detection_sync_manual();
		el_input.addEventListener("change", (event:Event) => {this._detection_sync_manual(event);});
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL, ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE, el_input, "");
		this.create_tr_el(ControllerUiLangClassId.DETECTION_PROCESS_HEADER, ControllerUiLangClassId.DETECTION_PROCESS_HEADER_TITLE, this.el_container, "");
		return (true);
	}

	private async _end(): Promise<void> {
		this.el_container.innerHTML = "";
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, sapi:SapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, sapi, log, ControllerUiLangClassId.DETECTION_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.sapi = sapi;
		this.re_begin_func = re_begin_func;
	}
}