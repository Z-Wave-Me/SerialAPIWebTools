import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassBoardInfo, ControllerSapiClassCapabilities} from "../../sapi/controller_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, PaketUiClassUpdateInfoPaket} from "../update"
import {arrayToStringHex, versionNumberToString} from "../../other/utilities";
import {SapiClassDetectType, SapiClassUpdateProcess, SapiClassStatus} from "./../../sapi/sapi";
import {ControllerUiDefineClass} from "../../ui_define"
import {ControllerUiDefineClassReBeginFunc} from "../../section/detection"

export {ControllerUiSectionUpdateClass};

class ControllerUiSectionUpdateClass extends CommonUiSectionClass {

	private readonly update:UpdateUiSectionClass;
	private readonly razberry:ControllerSapiClass;

	public static getInfoUrlPaket(log:ControllerUiLogClass, razberry:ControllerSapiClass):PaketUiClassUpdateInfoPaket|undefined {
		log.infoStart(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
		const board_info:ControllerSapiClassBoardInfo = razberry.getBoardInfo();
		if (board_info.status != ControllerSapiClassStatus.OK) {
			log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO, board_info.status);
			return (undefined);
		}
		log.infoDone(ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
		log.infoStart(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
		const capabilities_info:ControllerSapiClassCapabilities = razberry.getCapabilities();
		if (capabilities_info.status != ControllerSapiClassStatus.OK) {
			log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES, capabilities_info.status);
			return (undefined);
		}
		log.infoDone(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
		const version:number = (capabilities_info.ApiVersion << 0x8) | capabilities_info.ApiRevision;
		const paket:PaketUiClassUpdateInfoPaket =
		{
			app:{version:version, version_name:versionNumberToString(version), type:SapiClassDetectType.RAZBERRY,
				update:true, update_type:true, data: []},
			boot:{	version:board_info.bootloader_version, version_name:versionNumberToString(board_info.bootloader_version), type:SapiClassDetectType.UNKNOWN,
					update:true, update_type:true, data: []},
			url:'vendorId=' + capabilities_info.VendorID.toString() + '&appVersionMajor=' + capabilities_info.ApiVersion.toString() + '&appVersionMinor=' + capabilities_info.ApiRevision.toString() +
							'&uuid=' + arrayToStringHex(board_info.chip_uuid) + "&bootloaderVersion=" + board_info.bootloader_version.toString() +
							'&org_family=' + board_info.keys_hash.toString() + '&fw_family=' + SapiClassDetectType.RAZBERRY.toString() + '&chip_family=' + board_info.chip_family.toString() +
							'&chip_id=' + board_info.chip_type.toString() + '&zway=' + ControllerUiDefineClass.NAME_APP_VERSION_FULL
		};
		return (paket);
	}

	private _update_init(): boolean {
		const paket:PaketUiClassUpdateInfoPaket|undefined = ControllerUiSectionUpdateClass.getInfoUrlPaket(this.log, this.razberry);
		if (paket == undefined)
			return (false);
		this.update.info_download_xhr(paket);
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

	private async _update_firmware(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> {
		const status:ControllerSapiClassStatus = await this.razberry.updateFirmware(data, process, target_type);
		return ((status as unknown) as SapiClassStatus);
	}

	private async _update_bootloader(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> {
		const status:ControllerSapiClassStatus = await this.razberry.updateBotloader(data, process);
		return ((status as unknown) as SapiClassStatus);
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, razberry, log, ControllerUiLangClassId.UPDATE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.razberry = razberry;
		this.update = new UpdateUiSectionClass(log, locale, this, re_begin_func,
			async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> => {return(await this._update_firmware(data, process, target_type));},
			async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> => {return(await this._update_bootloader(data, process, target_type));}
		);
	}
}