import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ControllerSapiClass, ControllerSapiClasstNetworkIDs, ControllerSapiClassStatus, ControllerSapiClasstInitData, ControllerSapiClassLearnMode} from "../../sapi/controller_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {intToBytearrayLsbMsb} from "../../other/utilities";

export {ControllerUiSectionMigrationClass};

interface ControllerUiSectionMigrationClassHome
{
	home:number;
	node_id:number;
}

class ControllerUiSectionMigrationClass extends CommonUiSectionClass {
	private readonly NVM_HOMEID:number								= 0x8;

	private readonly progress_timer_id_ms_period:number				= 1000;
	private readonly progress_timer_id_count:number					= 30;
	private readonly el_container:HTMLElement;
	private readonly razberry:ControllerSapiClass;

	private process:boolean											= false;
	private progress_timer_id?:number;



	private _constructor_struct_progress(text:ControllerUiLangClassId): void {
		this.el_container.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' +  this.locale.getLocale(text) +'</div>';
	}

	private _constructor_struct_end(el:HTMLButtonElement, class_namme:string, txt:ControllerUiLangClassId): void {
		this.el_container.innerHTML = '<span class="'+ class_namme +'">' +  this.locale.getLocale(txt) +'</span>';
		this.process = false;
		this.razberry.unlock();
		el.title = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_TITLE);
		el.disabled = false;
	}

	private _constructor_struct_end_unknown(el:HTMLButtonElement, txt:string|ControllerUiLangClassId, code:number): void {
		this.log.errorFalledCode(txt, code);
		this._constructor_struct_end(el, "ZUnoRazberryModal_color_error", ControllerUiLangClassId.MIGRATION_UNKNOWN_ERROR);
	}

	private _constructor_struct_end_good(el:HTMLButtonElement): void {
		this._constructor_struct_end(el, "ZUnoRazberryModal_color_info", ControllerUiLangClassId.MIGRATION_GOOD_RESULT);
	}
	
	private _constructor_struct_end_stop(el:HTMLButtonElement): void {
		this._constructor_struct_end(el, "ZUnoRazberryModal_color_info", ControllerUiLangClassId.MIGRATION_STOP_RESULT);
	}

	private async _click_start_stop_question(text:ControllerUiLangClassId): Promise<boolean> {
		const promise:Promise<boolean> = new Promise((resolve) => {
			this.el_container.innerHTML = '';
			const el_span:HTMLSpanElement = document.createElement("span");
			el_span.textContent = this.locale.getLocale(text);
			el_span.className = "ZUnoRazberryModal_color_question ZUnoRazberryModalContentSection_migration_action_button";
			const el_button_continue:HTMLButtonElement = document.createElement("button");
			el_button_continue.textContent = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_ACTION_CONTINUE);
			el_button_continue.title = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_ACTION_CONTINUE_TITLE);
			el_button_continue.type = "button";
			el_button_continue.className = "ZUnoRazberryModalContentSection_migration_action_button";
			const el_button_stop:HTMLButtonElement = document.createElement("button");
			el_button_stop.textContent = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_ACTION_STOP);
			el_button_stop.title = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_ACTION_STOP_TITLE);
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

	private async _click_start_stop_include_excluding(el:HTMLButtonElement, excluding:boolean): Promise<boolean> {
		let index_timout:number, start_id:ControllerUiLangClassId, question_id:ControllerUiLangClassId, wait_id:ControllerUiLangClassId;

		if (excluding == true) {
			start_id = ControllerUiLangClassId.MESSAGE_START_EXLUDING;
			question_id = ControllerUiLangClassId.MIGRATION_QUESTION_EXCLUDE;
			wait_id = ControllerUiLangClassId.MIGRATION_WAIT_EXCLUDE_START_MASTER;
		}
		else {
			start_id = ControllerUiLangClassId.MESSAGE_START_INCLUDE;
			question_id = ControllerUiLangClassId.MIGRATION_QUESTION_INCLUDE;
			wait_id = ControllerUiLangClassId.MIGRATION_WAIT_INCLUDE_START_MASTER;
		}
		const excluding_question:boolean = await this._click_start_stop_question(question_id);
		if (excluding_question == false) {
			this._constructor_struct_end_stop(el);
			return (false);
		}
		this.el_container.innerHTML = '';
		this.log.infoStart(start_id);
		const include_excluding:ControllerSapiClassLearnMode = await this.razberry.include_excluding();
		if (include_excluding.status != ControllerSapiClassStatus.OK) {
			this._constructor_struct_end_unknown(el, start_id, include_excluding.status);
			return (false);
		}
		const el_progress:HTMLProgressElement = document.createElement('progress');
		const el_span:HTMLSpanElement = document.createElement('span');
		const el_container:HTMLSpanElement = document.createElement('span');
		el_container.title = this.locale.getLocale(wait_id);
		el_container.appendChild(el_progress);
		el_container.appendChild(el_span);
		el_progress.max = this.progress_timer_id_count;
		this.el_container.appendChild(el_container);
		index_timout = this.progress_timer_id_count;
		const seconds:string = this.locale.getLocale(ControllerUiLangClassId.SECONDS);
		const max_lenght:number = this.progress_timer_id_count.toString().length;
		const fun_timer:TimerHandler = () => {
			el_progress.value = index_timout;
			el_span.textContent = ' ' + index_timout.toString().padStart(max_lenght, '0') + seconds;
			if (index_timout > 0x0) {
				index_timout--;
				this.progress_timer_id = window.setTimeout(fun_timer, this.progress_timer_id_ms_period);
			}
			else
				this.progress_timer_id = undefined;
		};
		this.progress_timer_id = window.setTimeout(fun_timer, 0x0);
		for (;;) {
			const wait:ControllerSapiClassStatus = await this.razberry.waitLearn(this.progress_timer_id_ms_period, include_excluding.seq);
			if (wait == ControllerSapiClassStatus.OK) {
				if (this.progress_timer_id != undefined) {
					window.clearTimeout(this.progress_timer_id);
					this.progress_timer_id = undefined;
				}
				this.log.infoDone(start_id);
				return (true);
			}
			if (wait != ControllerSapiClassStatus.PROCESS) {
				this._constructor_struct_end_unknown(el, start_id, wait);
				return (false);
			}
			if (this.progress_timer_id == undefined) {
				await this.razberry.disabled();
				this._constructor_struct_end_unknown(el, start_id, ControllerSapiClassStatus.TIMOUT);
				return (false);
			}
		}
		return (true);
	}

	private async _click_start_stop_test_include(el:HTMLButtonElement, home:ControllerUiSectionMigrationClassHome): Promise<boolean|undefined> {
		this._constructor_struct_progress(ControllerUiLangClassId.MIGRATION_TEST_INCLUDE);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_HOME_ID);
		const home_id:ControllerSapiClasstNetworkIDs = await this.razberry.GetNetworkIDs();
		if (home_id.status != ControllerSapiClassStatus.OK) {
			this._constructor_struct_end_unknown(el, ControllerUiLangClassId.MESSAGE_READ_HOME_ID, home_id.status);
			return (undefined);
		}
		home.home = home_id.home;
		home.node_id = home_id.node_id;
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_HOME_ID);
		if (home_id.node_id != 0x1)
			return (true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_INIT_DATA);
		const get_init_data:ControllerSapiClasstInitData = await this.razberry.GetInitData();
		if (get_init_data.status != ControllerSapiClassStatus.OK) {
			this._constructor_struct_end_unknown(el, ControllerUiLangClassId.MESSAGE_READ_INIT_DATA, get_init_data.status);
			return (undefined);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_INIT_DATA);
		if (get_init_data.node_list.length > 0x1 || get_init_data.node_list[0x0] != 0x1)
			return (true);
		return (false);
	}

	private async _click_start_stop(event:Event) {
		let result_test_include:boolean|undefined, status:ControllerSapiClassStatus;

		if (this.process == true)
			return ;
		const el_target:HTMLButtonElement|null = this.event_get_element_button(event);
		if (el_target == null)
			return ;
		if (this.is_busy() == true)
			return ;
		const out_confirm:boolean = window.confirm(this.locale.getLocale(ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_WARNING));
		if (out_confirm != true)
			return ;
		this.razberry.lock();
		this.process = true;
		el_target.disabled = true;
		el_target.title = '';
		const home:ControllerUiSectionMigrationClassHome = {home:0x0, node_id:0x0};
		const status_clear_node:ControllerSapiClassStatus = await this.razberry.clear_node();
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_CLEAR_NODE);
		if (status_clear_node != ControllerSapiClassStatus.OK) {
			this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_CLEAR_NODE, status_clear_node);
			return ;
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_CLEAR_NODE);
		for (;;) {
			result_test_include = await this._click_start_stop_test_include(el_target, home);
			if (result_test_include == undefined)
				return ;
			if (result_test_include == false)
				break ;
			if (await this._click_start_stop_include_excluding(el_target, true) == false)
				return ;
		}
		for (;;) {
			if (await this._click_start_stop_include_excluding(el_target, false) == false)
				return ;
			result_test_include = await this._click_start_stop_test_include(el_target, home);
			if (result_test_include == undefined)
				return ;
			if (result_test_include == true)
				break ;
		}
		this._constructor_struct_progress(ControllerUiLangClassId.MIGRATION_FINALIZE);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_HOME_ID);
		const set_home_id:ControllerSapiClassStatus = await this.razberry.nvmWrite(this.NVM_HOMEID, intToBytearrayLsbMsb(home.home));
		if (set_home_id != ControllerSapiClassStatus.OK) {
			this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_SET_HOME_ID, set_home_id);
			return ;
		}
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_SOFT_RESET);
		const soft_reset:ControllerSapiClassStatus = await this.razberry.softReset();
		if (soft_reset != ControllerSapiClassStatus.OK) {
			this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_SOFT_RESET, soft_reset);
			return (undefined);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_SOFT_RESET);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_NOP);
		status = await this.razberry.nop(home.node_id);
		if (status != ControllerSapiClassStatus.TRANSMIT_COMPLETE_NO_ACK) {
			this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_NOP, status);
			return ;
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_NOP);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_REMOVE_NODE);
		status = await this.razberry.removeFaledNode(home.node_id);
		if (status != ControllerSapiClassStatus.OK) {
			this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_REMOVE_NODE, status);
			return ;
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_REMOVE_NODE);
		this._constructor_struct_end_good(el_target);
	}

	private async _begin(): Promise<boolean> {
		let about_str:string;

		if (this.razberry.isRazberry5() == true)
			about_str = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5);
		else if (this.razberry.isRazberry7() == true)
			about_str = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML);
		else
			about_str = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT);
		this.create_tr_el(ControllerUiLangClassId.MIGRATION_ABOUT_HEADER, ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TITLE, about_str, "");
		if (this.razberry.isRazberry7() != true)
			return (true);
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.addEventListener("click", async (event:Event) => { await this._click_start_stop(event);});
		el_button.type = "button";
		el_button.textContent = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START);
		el_button.title = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_TITLE);
		this.create_tr_el(ControllerUiLangClassId.MIGRATION_PROCESS_HEADER, ControllerUiLangClassId.MIGRATION_PROCESS_HEADER_TITLE, this.el_container, el_button);
		return (true);
	}

	private async _end(): Promise<void> {
		this.el_container.innerHTML = "";
		if (this.progress_timer_id != undefined) {
			window.clearTimeout(this.progress_timer_id);
			this.progress_timer_id = undefined;
		}
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass) {
		super(el_section, locale, razberry, log, ControllerUiLangClassId.MIGRATION_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.razberry = razberry;
		this.el_container = document.createElement("span");
	}
}