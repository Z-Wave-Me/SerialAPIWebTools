import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassBoardInfo, ControllerSapiClassCapabilities} from "../../sapi/controller_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, UpdateUiSectionClassFirmwareStatus, PaketUiClassUpdateInfo} from "../update"

import {arrayToStringHex, versionNumberToString} from "../../other/utilities";
import {SapiClassDetectType, SapiClassUpdateProcess} from "./../../sapi/sapi";

import {ControllerUiDefineClassReBeginFunc, ControllerUiDefineClass} from "../../ui_define"

export {ControllerUiSectionUpdateClass};

class ControllerUiSectionUpdateClass extends CommonUiSectionClass {

	private readonly update:UpdateUiSectionClass;
	private readonly razberry:ControllerSapiClass;

	private _update_init(): boolean {
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
		const board_info:ControllerSapiClassBoardInfo = this.razberry.getBoardInfo();
		if (board_info.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO, board_info.status);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
		const capabilities_info:ControllerSapiClassCapabilities = this.razberry.getCapabilities();
		if (capabilities_info.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES, capabilities_info.status);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
		const version:number = (capabilities_info.ApiVersion << 0x8) | capabilities_info.ApiRevision;
		const app_update_info:PaketUiClassUpdateInfo = {version:version, version_name:versionNumberToString(version), type:SapiClassDetectType.RAZBERRY,
														update:true, update_type:true, data: []};
		const bootloader_update_info:PaketUiClassUpdateInfo = {	version:board_info.bootloader_version, version_name:versionNumberToString(board_info.bootloader_version), type:SapiClassDetectType.UNKNOWN,
																update:true, update_type:true, data: []};
		const url:string = 'vendorId=' + capabilities_info.VendorID.toString() + '&appVersionMajor=' + capabilities_info.ApiVersion.toString() + '&appVersionMinor=' + capabilities_info.ApiRevision.toString() +
							'&uuid=' + arrayToStringHex(board_info.chip_uuid) + "&bootloaderVersion=" + board_info.bootloader_version.toString() +
							'&org_family=' + board_info.keys_hash.toString() + '&fw_family=' + SapiClassDetectType.RAZBERRY.toString() + '&chip_family=' + board_info.chip_family.toString() +
							'&chip_id=' + board_info.chip_type.toString() + '&zway=' + ControllerUiDefineClass.NAME_APP_VERSION_FULL
		this.update.info_download_xhr(url, app_update_info, bootloader_update_info);
		return (true);
	}

	private async _begin(): Promise<boolean> {
		if (this.razberry.isRazberry7() == false)
			return (false);
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
		const status:ControllerSapiClassStatus = await this.razberry.updateFirmware(data, process, target_type);
		out.code = status;
		if (status == ControllerSapiClassStatus.OK)
			out.ok = true;
		return (out);
	}

	private async _update_bootloader(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<UpdateUiSectionClassFirmwareStatus> {
		const out:UpdateUiSectionClassFirmwareStatus = {
			ok:false,
			code:0x0
		};
		const status:ControllerSapiClassStatus = await this.razberry.updateBotloader(data, process);
		out.code = status;
		if (status == ControllerSapiClassStatus.OK)
			out.ok = true;
		return (out);
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, razberry, log, ControllerUiLangClassId.UPDATE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.razberry = razberry;
		this.update = new UpdateUiSectionClass(log, locale, this, re_begin_func,
			async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<UpdateUiSectionClassFirmwareStatus> => {return(await this._update_firmware(data, process, target_type));},
			async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<UpdateUiSectionClassFirmwareStatus> => {return(await this._update_bootloader(data, process, target_type));}
		);
	}
}