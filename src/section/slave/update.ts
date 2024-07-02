import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, UpdateUiSectionClassXhrInfoOnloadProcess, UpdateUiSectionClassXhrInfoOnloadEnd, UpdateUiSectionClassJsonInfo} from "../update"
import {arrayToStringHex} from "../../other/utilities";
import {ControllerUiDefineClassReBeginFunc, ControllerUiDefineClass} from "../../ui_define"

export {SlaveUiSectionUpdateClass};

interface SlaveUiClassUpdateInfoData
{
	version:number;
	url:string;
	beta:boolean;
}

interface SlaveUiClassUpdateInfo
{
	version:number;
	data:Array<SlaveUiClassUpdateInfoData>;
}

class SlaveUiSectionUpdateClass extends CommonUiSectionClass {
	private readonly zuno:ZunoSapiClass;
	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	private readonly update:UpdateUiSectionClass;

	private async _update_bootloader_click(): Promise<void> {
	}

	private async _update_finware_click(): Promise<void> {
	}

	private _update_init(): boolean {
		this.log.infoStart(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const board_info:ZunoSapiClassBoardInfo = this.zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const app_update_info:SlaveUiClassUpdateInfo = {version:board_info.version, data: []};
		const bootloader_update_info:SlaveUiClassUpdateInfo = {version:board_info.boot_version, data: []};
		const fun_xhr_timer:TimerHandler = () => {
			const url:string = this.update.URL_UPDATE + 'vendorId=327&appVersionMajor=' + ((board_info.version >> 16) & 0xFFFF).toString() + '&appVersionMinor=' + (board_info.version & 0xFFFF).toString() + "&bootloaderVersion=" + board_info.boot_version.toString()
								+ '&org_family=' + board_info.chip.keys_hash.toString() + '&fw_family=' + this.update.fw_family_zuno + '&chip_family=' + board_info.chip.chip_family + '&chip_id=' + board_info.chip.chip_type
								+ '&zway=' + ControllerUiDefineClass.NAME_APP_VERSION_FULL + '&uuid=' + arrayToStringHex(board_info.chip_uuid) + '&token=internal';
			const process: UpdateUiSectionClassXhrInfoOnloadProcess = (response: UpdateUiSectionClassJsonInfo) => {
				
			};
			const end: UpdateUiSectionClassXhrInfoOnloadEnd = () => {
			};
			this.update.info_xhr_start(fun_xhr_timer, url, process, end);
		};
		this.update.info_xhr_begin(fun_xhr_timer);
		return (true);
	}

	private async _begin(): Promise<boolean> {
		return (this._update_init());
	}

	private async _end(): Promise<void> {
		this.update.end();
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, zuno:ZunoSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, zuno, log, ControllerUiLangClassId.UPDATE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.zuno = zuno;
		this.update = new UpdateUiSectionClass(log, locale, async () => { await this._update_finware_click();}, async () => {await this._update_bootloader_click();});
		this.re_begin_func = re_begin_func;
	}
}