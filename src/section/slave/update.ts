import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, UpdateUiSectionClassFirmwareStatus, PaketUiClassUpdateInfo} from "../update"

import {arrayToStringHex, versionNumberToString, versionNumberToStringSlave} from "../../other/utilities";
import {ControllerUiDefineClassReBeginFunc, ControllerUiDefineClass} from "../../ui_define"
import {SapiClassDetectType, SapiClassUpdateProcess} from "./../../sapi/sapi";

export {SlaveUiSectionUpdateClass};

class SlaveUiSectionUpdateClass extends CommonUiSectionClass {
	private readonly zuno:ZunoSapiClass;
	private readonly update:UpdateUiSectionClass;

	private _update_init(): boolean {
		this.log.infoStart(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const board_info:ZunoSapiClassBoardInfo = this.zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const app_update_info:PaketUiClassUpdateInfo = {version:board_info.version, version_name:versionNumberToStringSlave(board_info.version), type:SapiClassDetectType.ZUNO, data: []};
		const bootloader_update_info:PaketUiClassUpdateInfo = {version:board_info.boot_version, version_name:versionNumberToString(board_info.boot_version), type:SapiClassDetectType.UNKNOWN, data: []};
		const url:string = 'vendorId=327&appVersionMajor=' + ((board_info.version >> 16) & 0xFFFF).toString() + '&appVersionMinor=' + (board_info.version & 0xFFFF).toString()
							+ "&bootloaderVersion=" + board_info.boot_version.toString() + '&org_family=' + board_info.chip.keys_hash.toString() + '&fw_family=' + SapiClassDetectType.ZUNO.toString()
							+ '&chip_family=' + board_info.chip.chip_family.toString() + '&chip_id=' + board_info.chip.chip_type.toString() + '&zway=' + ControllerUiDefineClass.NAME_APP_VERSION_FULL + '&uuid='
							+ arrayToStringHex(board_info.chip_uuid);
		this.update.info_download_xhr(url, app_update_info, bootloader_update_info);
		return (true);
	}

	private async _begin(): Promise<boolean> {
		return (this._update_init());
	}

	private async _end(): Promise<void> {
		this.update.end();
	}

	private async _update_firmware(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<UpdateUiSectionClassFirmwareStatus> {
		const out:UpdateUiSectionClassFirmwareStatus = {
			ok:false,
			code:0x0
		};
		const status:ZunoSapiClassStatus = await this.zuno.updateFirmware(data, process, target_type);
		out.code = status;
		if (status == ZunoSapiClassStatus.OK)
			out.ok = true;
		return (out);
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, zuno:ZunoSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, zuno, log, ControllerUiLangClassId.UPDATE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.zuno = zuno;
		this.update = new UpdateUiSectionClass(log, locale, this, re_begin_func,
			async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<UpdateUiSectionClassFirmwareStatus> => {return(await this._update_firmware(data, process, target_type));});
	}
}