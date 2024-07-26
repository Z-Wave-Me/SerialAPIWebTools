import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ControllerSapiClass, ControllerSapiClasstNetworkIDs, ControllerSapiClassStatus, ControllerSapiClasstInitData, ControllerSapiClassLearnMode} from "../../sapi/controller_sapi";
import {ZunoSapiClass, ZunoSapiClassRegion, ZunoSapiClassStatus, ZunoSapiClassBoardInfo, ZunoSapiClassS2Key} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {ControllerUiSectionUpdateClass} from "./update"
import {SlaveUiSectionUpdateClass} from "../slave/update"
import {PaketUiClassUpdateInfoPaket, UpdateUiSectionClass, UpdateUiSectionClassPaket, PaketUiClassUpdateInfoData, UpdateUiSectionClassFirmware} from "../update"
import {SapiClassDetectType, SapiClassUpdateProcess, SapiClassStatus, SapiClass, SapiClassDetect} from "../../sapi/sapi";
import {conv2Decimal} from "../../other/utilities";

export {ControllerUiSectionMigrationClass};

interface ControllerUiSectionMigrationClassHome
{
	home:number;
	node_id:number;
}

type ControllerUiSectionMigrationClassClear = () => Promise<void>;

class ControllerUiSectionMigrationClass extends CommonUiSectionClass {
	private readonly NVM_HOMEID:number								= 0x8;

	private readonly progress_timer_id_ms_period:number				= 1000;
	private readonly progress_timer_id_count:number					= 30;
	private readonly el_button:HTMLButtonElement					= document.createElement("button");
	private readonly el_container:HTMLElement;
	private readonly razberry:ControllerSapiClass;
	private readonly sapi:SapiClass;
	private readonly zuno:ZunoSapiClass;
	private clear:ControllerUiSectionMigrationClassClear;

	private readonly download_process:UpdateUiSectionClassPaket			= {xhr:new XMLHttpRequest()};

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

	private _progress(text:ControllerUiLangClassId): void {
		this.el_container.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' +  this.locale.getLocale(text) +'</div>';
	}

	private _progress_error(text:ControllerUiLangClassId): void {
		this.el_container.innerHTML = '<div class="ZUnoRazberryModal_color_error">' +  this.locale.getLocale(text) +'</div>';
	}

	private _update_raz_full_finware_url(data:Array<PaketUiClassUpdateInfoData>, target_type:SapiClassDetectType): PaketUiClassUpdateInfoData|undefined {
		let i:number;

		i = data.length;
		while (i-- != 0x0) {
			if (data[i].beta == false && data[i].type == target_type)
				return (data[i]);
		}
		return (undefined);
	}

	private _update_raz_full_boot_url(data:Array<PaketUiClassUpdateInfoData>): PaketUiClassUpdateInfoData|undefined {
		let i:number;

		i = data.length;
		while (i-- != 0x0) {
			if (data[i].beta == false)
				return (data[i]);
		}
		return (undefined);
	}

	private async _update_firmware_zuno(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> {
		const status:ZunoSapiClassStatus = await this.zuno.updateFirmware(data, process, target_type);
		return ((status as unknown) as SapiClassStatus);
	}

	private async _update_firmware_raz(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> {
		const status:ControllerSapiClassStatus = await this.razberry.updateFirmware(data, process, target_type);
		return ((status as unknown) as SapiClassStatus);
	}

	private async _update_bootloader_raz(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> {
		const status:ControllerSapiClassStatus = await this.razberry.updateBotloader(data, process);
		return ((status as unknown) as SapiClassStatus);
	}

	private _update_raz_zuno_full_get_info_paket_add(paket:PaketUiClassUpdateInfoPaket|undefined): PaketUiClassUpdateInfoPaket|undefined {
		if (paket == undefined) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_NOT_GET_URL_INFO);
			return (undefined);
		}
		return (paket);
	}

	private _update_raz_full_get_info_paket(): PaketUiClassUpdateInfoPaket|undefined {
		const paket:PaketUiClassUpdateInfoPaket|undefined = ControllerUiSectionUpdateClass.getInfoUrlPaket(this.log, this.razberry);
		return (this._update_raz_zuno_full_get_info_paket_add(paket));
	}

	private _update_zuno_full_get_info_paket(): PaketUiClassUpdateInfoPaket|undefined {
		const paket:PaketUiClassUpdateInfoPaket|undefined = SlaveUiSectionUpdateClass.getInfoUrlPaket(this.log, this.zuno);
		return (this._update_raz_zuno_full_get_info_paket_add(paket));
	}

	private async _update_raz_full_dowload_and_update(update_firmware:UpdateUiSectionClassFirmware, data:PaketUiClassUpdateInfoData, version_name:string): Promise<boolean> {
		this._progress(ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE);
		const finware:Uint8Array = await UpdateUiSectionClass.downloadFile(this.download_process, data.url, this.log);
		this.el_container.innerHTML = '';
		const el_div_progress:HTMLDivElement = document.createElement("div");
		const el_div_text:HTMLDivElement = document.createElement("div");
		el_div_text.textContent = version_name + " -> " + data.version_name;
		this.el_container.appendChild(el_div_text);
		this.el_container.appendChild(el_div_progress);
		const finware_status:boolean = await UpdateUiSectionClass.updateProcess(ControllerUiLangClassId.MESSAGE_UPDATE_START_FIRMWARE, el_div_progress, finware, data.type,
			update_firmware, this.locale, this.log);
		if (finware_status == false) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_NOT_UPDATE);
			return (false);
		}
		return (true);
	}

	private async _update_raz_full(): Promise<PaketUiClassUpdateInfoPaket|undefined> {
		let paket:PaketUiClassUpdateInfoPaket|undefined;
	
		paket = this._update_raz_full_get_info_paket();
		if (paket == undefined)
			return (undefined);
		for (;;) {
			this._progress(ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO);
			await UpdateUiSectionClass.downloadInfo(this.download_process, paket, this.log, this.locale);
			const data_raz:PaketUiClassUpdateInfoData|undefined = this._update_raz_full_finware_url(paket.app.data, SapiClassDetectType.RAZBERRY);
			if (data_raz == undefined) {
				const data_boot:PaketUiClassUpdateInfoData|undefined = this._update_raz_full_boot_url(paket.boot.data);
				if (data_boot == undefined)
					return (paket);
				if (await this._update_raz_full_dowload_and_update( async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> => {return(await this._update_bootloader_raz(data, process, target_type));},
																	data_boot, paket.boot.version_name) == false) {
					return (undefined);
				}
				await this.razberry.connect();
				paket = this._update_raz_full_get_info_paket();
				if (paket == undefined)
					return (undefined);
				if (paket.boot.version != data_boot.version) {
					this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_UPDATE_VERSION);
					return (undefined);
				}
				continue ;
			}
			if (await this._update_raz_full_dowload_and_update( async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> => {return(await this._update_firmware_raz(data, process, target_type));},
																data_raz, paket.app.version_name) == false) {
				return (undefined);
			}
			if (this.sapi.type() != SapiClassDetectType.RAZBERRY) {
				this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_UPDATE_TYPE);
				return (undefined);
			}
			await this.razberry.connect();
			paket = this._update_raz_full_get_info_paket();
			if (paket == undefined)
				return (undefined);
			if (paket.app.version != data_raz.version) {
				this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_UPDATE_VERSION);
				return (undefined);
			}
		}
		return (paket);
	}

	private async _update_raz_to_zuno(paket:PaketUiClassUpdateInfoPaket): Promise<PaketUiClassUpdateInfoPaket|undefined> {
		const data_zuno:PaketUiClassUpdateInfoData|undefined = this._update_raz_full_finware_url(paket.app.data, SapiClassDetectType.ZUNO);
		if (data_zuno == undefined) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_NOT_AVIABLE_FINWARE);
			return (undefined);
		}
		if (await this._update_raz_full_dowload_and_update( async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> => {return(await this._update_firmware_raz(data, process, target_type));},
															data_zuno, paket.app.version_name) == false) {
			return (undefined);
		}
		if (this.sapi.type() != SapiClassDetectType.ZUNO) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_UPDATE_TYPE);
			return (undefined);
		}
		await this.zuno.connect();
		const paket_new:PaketUiClassUpdateInfoPaket|undefined = this._update_zuno_full_get_info_paket();
		if (paket_new == undefined)
			return (undefined);
		if (paket_new.app.version != data_zuno.version) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_UPDATE_VERSION);
			return (undefined);
		}
		return (paket_new);
	}

	private async _click_start_stop_zuno_get_info_include_exlude(): Promise<boolean> {
		let status:ZunoSapiClassStatus;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT);
		status = await this.zuno.enableNif();
		if (status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode( ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT, status);
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_EXLUDE);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN);
		status = await this.zuno.enableEvent();
		if (status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode( ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN, status);
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_EXLUDE);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_START_LEARN);
		status = await this.zuno.enableLearn(30);
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_START_LEARN);
		switch (status) {
			case ZunoSapiClassStatus.TIMOUT:
				this.log.info(ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMOUT);
				this._progress_error(ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMOUT);
				break ;
			case ZunoSapiClassStatus.TIMOUT_FORCE_RESTART:
				this.log.warning(ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMOUT_FORSE_RESTART);
				this._progress_error(ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMOUT_FORSE_RESTART);
				break ;
			default:
				this.log.warning(ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMOUT_FORSE_RESTART);
				this._progress_error(ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMOUT_FORSE_RESTART);
				break ;
			case ZunoSapiClassStatus.LEARN_EXLUDE:
				this.log.info(ControllerUiLangClassId.MIGRATION_LEARN_INFO_EXLUDE);
				break ;
			case ZunoSapiClassStatus.LEARN_INCLUDE:
				this.log.info(ControllerUiLangClassId.MIGRATION_LEARN_INFO_INCLUDE);
				break ;
		}
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_CONNECT);
		const detect_dict:SapiClassDetect = await this.sapi.detect([115200], null);
		if (detect_dict.status != SapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_CONNECT, detect_dict.status);
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_DETECT);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_CONNECT);
		await this.zuno.connect();
		return (true);
	}

	private async _click_start_stop_zuno_get_info(region:string): Promise<number|undefined> {
		let status:ZunoSapiClassStatus, final:boolean;

		status = this.zuno.isSupportDumpKey();
		if (status != ZunoSapiClassStatus.OK) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_DUMP_KEY);
			return (undefined);
		}
		status = this.zuno.isSupportIncludeExclude();
		if (status != ZunoSapiClassStatus.OK) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_INCLUDE_EXLUDE);
			return (undefined);
		}
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_REGION);
		const region_info:ZunoSapiClassRegion = this.zuno.getRegion();
		if (region_info.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_CHANGE_REGION);
			return (undefined);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_REGION);
		if (region != region_info.region) {
			this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_REGION);
			status = await this.zuno.setRegion(region);
			if (status != ZunoSapiClassStatus.OK) {
				this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_SET_REGION, status);
				this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_CHANGE_REGION);
				return (undefined);
			}
			this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_REGION);
		}
		final = false;
		for (;;) {
			this.log.infoStart(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
			const board_info:ZunoSapiClassBoardInfo = this.zuno.getBoardInfo();
			if (board_info.status != ZunoSapiClassStatus.OK || board_info.node_id == undefined) {
				this.log.errorFalledCode(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
				this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_CHANGE_REGION);
				return (undefined);
			}
			this.log.infoDone(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
			if (board_info.node_id != 0x0) {
				if (final == true)
					return (board_info.node_id);
				await this.quest_continue_stop(this.el_container,
												ControllerUiLangClassId.LERAN_PROCESS_QUEST_EXLUDE, ControllerUiLangClassId.LERAN_PROCESS_QUEST_EXLUDE_TITLE,
												ControllerUiLangClassId.LERAN_PROCESS_CONTINUE, ControllerUiLangClassId.LERAN_PROCESS_CONTINUE_TITLE,
												undefined, undefined);
				this._progress(ControllerUiLangClassId.INCLUDE_EXLUDE_WAIT);
				if (await this._click_start_stop_zuno_get_info_include_exlude() == false)
					return (undefined);
				continue ;
			}
			const quest_include:string = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_PROCESS_QUEST_INCLUDE).replace("${dsk}", conv2Decimal(board_info.s2_pub, " - ").substring(0x0, 0x5));
			await this.quest_continue_stop(this.el_container,
											quest_include, ControllerUiLangClassId.MIGRATION_PROCESS_QUEST_INCLUDE_TITLE,
											ControllerUiLangClassId.LERAN_PROCESS_CONTINUE, ControllerUiLangClassId.LERAN_PROCESS_CONTINUE_TITLE,
											undefined, undefined);
			this._progress(ControllerUiLangClassId.INCLUDE_EXLUDE_WAIT);
			if (await this._click_start_stop_zuno_get_info_include_exlude() == false)
				return (undefined);
			final = true;
		}
		return (undefined);
	}

	private async _update_zuno_to_raz(paket:PaketUiClassUpdateInfoPaket): Promise<boolean> {
		this._progress(ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO);
		await UpdateUiSectionClass.downloadInfo(this.download_process, paket, this.log, this.locale);
		const data_raz:PaketUiClassUpdateInfoData|undefined = this._update_raz_full_finware_url(paket.app.data, SapiClassDetectType.RAZBERRY);
		if (data_raz == undefined) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_NOT_AVIABLE_FINWARE);
			return (false);
		}
		if (await this._update_raz_full_dowload_and_update( async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> => {return(await this._update_firmware_zuno(data, process, target_type));},
															data_raz, paket.app.version_name) == false) {
			return (false);
		}
		if (this.sapi.type() != SapiClassDetectType.RAZBERRY) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_UPDATE_TYPE);
			return (false);
		}
		await this.razberry.connect();
		const paket_new:PaketUiClassUpdateInfoPaket|undefined = this._update_raz_full_get_info_paket();
		if (paket_new == undefined)
			return (false);
		if (paket_new.app.version != data_raz.version) {
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_UPDATE_VERSION);
			return (false);
		}
		return (true);
	}

	private async _click_start_stop(event:Event) {
		let paket:PaketUiClassUpdateInfoPaket|undefined;
		// let result_test_include:boolean|undefined, status:ControllerSapiClassStatus;

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
		await this.clear();
		await this.begin();
		this.el_button.disabled = true;
		this.el_button.title = '';
		this.el_button.style.display = 'none';
		this.process = true;
		paket = await this._update_raz_full();
		if (paket == undefined)
			return ;
		paket = await this._update_raz_to_zuno(paket);
		if (paket == undefined)
			return ;
		const zuno_node_id:number|undefined = await this._click_start_stop_zuno_get_info("EU");
		if (zuno_node_id == undefined)
			return ;
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_S2_KEY);
		const dump_key:ZunoSapiClassS2Key = await this.zuno.readS2Key();
		if (dump_key.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_S2_KEY, dump_key.status);
			this._progress_error(ControllerUiLangClassId.MIGRATION_FILED_READ_S2_KEY);
			return ;
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_S2_KEY);
		if (await this._update_zuno_to_raz(paket) == false)
			return ;
		return ;
		// const home:ControllerUiSectionMigrationClassHome = {home:0x0, node_id:0x0};
		// const status_clear_node:ControllerSapiClassStatus = await this.razberry.clear_node();
		// this.log.infoStart(ControllerUiLangClassId.MESSAGE_CLEAR_NODE);
		// if (status_clear_node != ControllerSapiClassStatus.OK) {
		// 	this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_CLEAR_NODE, status_clear_node);
		// 	return ;
		// }
		// this.log.infoDone(ControllerUiLangClassId.MESSAGE_CLEAR_NODE);
		// for (;;) {
		// 	result_test_include = await this._click_start_stop_test_include(el_target, home);
		// 	if (result_test_include == undefined)
		// 		return ;
		// 	if (result_test_include == false)
		// 		break ;
		// 	if (await this._click_start_stop_include_excluding(el_target, true) == false)
		// 		return ;
		// }
		// for (;;) {
		// 	if (await this._click_start_stop_include_excluding(el_target, false) == false)
		// 		return ;
		// 	result_test_include = await this._click_start_stop_test_include(el_target, home);
		// 	if (result_test_include == undefined)
		// 		return ;
		// 	if (result_test_include == true)
		// 		break ;
		// }
		// this._constructor_struct_progress(ControllerUiLangClassId.MIGRATION_FINALIZE);
		// this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_HOME_ID);
		// const set_home_id:ControllerSapiClassStatus = await this.razberry.nvmWrite(this.NVM_HOMEID, intToBytearrayLsbMsb(home.home));
		// if (set_home_id != ControllerSapiClassStatus.OK) {
		// 	this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_SET_HOME_ID, set_home_id);
		// 	return ;
		// }
		// this.log.infoStart(ControllerUiLangClassId.MESSAGE_SOFT_RESET);
		// const soft_reset:ControllerSapiClassStatus = await this.razberry.softReset();
		// if (soft_reset != ControllerSapiClassStatus.OK) {
		// 	this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_SOFT_RESET, soft_reset);
		// 	return (undefined);
		// }
		// this.log.infoDone(ControllerUiLangClassId.MESSAGE_SOFT_RESET);
		// this.log.infoStart(ControllerUiLangClassId.MESSAGE_NOP);
		// status = await this.razberry.nop(home.node_id);
		// if (status != ControllerSapiClassStatus.TRANSMIT_COMPLETE_NO_ACK) {
		// 	this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_NOP, status);
		// 	return ;
		// }
		// this.log.infoDone(ControllerUiLangClassId.MESSAGE_NOP);
		// this.log.infoStart(ControllerUiLangClassId.MESSAGE_REMOVE_NODE);
		// status = await this.razberry.removeFaledNode(home.node_id);
		// if (status != ControllerSapiClassStatus.OK) {
		// 	this._constructor_struct_end_unknown(el_target, ControllerUiLangClassId.MESSAGE_REMOVE_NODE, status);
		// 	return ;
		// }
		// this.log.infoDone(ControllerUiLangClassId.MESSAGE_REMOVE_NODE);
		// this._constructor_struct_end_good(el_target);
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
		this.el_button.disabled = false;
		this.el_button.style.display = '';
		this.el_button.addEventListener("click", async (event:Event) => { await this._click_start_stop(event);});
		this.el_button.type = "button";
		this.el_button.textContent = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START);
		this.el_button.title = this.locale.getLocale(ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_TITLE);
		this.create_tr_el(ControllerUiLangClassId.MIGRATION_PROCESS_HEADER, ControllerUiLangClassId.MIGRATION_PROCESS_HEADER_TITLE, this.el_container, this.el_button);
		return (true);
	}

	private async _end(): Promise<void> {
		this.process = false;
		this.download_process.xhr.abort();
		if (this.download_process.timer_id != undefined) {
			window.clearTimeout(this.download_process.timer_id);
			this.download_process.timer_id = undefined;
		}
		this.el_container.innerHTML = "";
		if (this.progress_timer_id != undefined) {
			window.clearTimeout(this.progress_timer_id);
			this.progress_timer_id = undefined;
		}
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass, clear:ControllerUiSectionMigrationClassClear, sapi:SapiClass, zuno:ZunoSapiClass) {
		super(el_section, locale, razberry, log, ControllerUiLangClassId.MIGRATION_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.razberry = razberry;
		this.sapi = sapi;
		this.zuno = zuno;
		this.clear = clear;
		this.el_container = document.createElement("span");
	}
}