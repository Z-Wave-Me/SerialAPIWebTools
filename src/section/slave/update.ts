import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, PaketUiClassUpdateInfoPaket} from "../update"
import {ControllerUiDefineClassReBeginFunc} from "../../section/detection"
import {arrayToStringHex, versionNumberToString, versionNumberToStringSlave, sleep} from "../../other/utilities";
import {ControllerUiDefineClass, NAME_APP_VERSION_FULL} from "../../ui_define"
import {SapiClassDetectType, SapiClassUpdateProcess, SapiClassStatus, SapiClassDetect} from "./../../sapi/sapi";

export {SlaveUiSectionUpdateClass};

class SlaveUiSectionUpdateClass extends CommonUiSectionClass {
	private readonly zuno:ZunoSapiClass;
	private readonly update:UpdateUiSectionClass;

	public static getInfoUrlPaket(log:ControllerUiLogClass, zuno:ZunoSapiClass):PaketUiClassUpdateInfoPaket|undefined {
		log.infoStart(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const board_info:ZunoSapiClassBoardInfo = zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			log.errorFalledCode(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
			return (undefined);
		}
		log.infoDone(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const paket:PaketUiClassUpdateInfoPaket =
		{
			app:{	version:board_info.version, version_name:versionNumberToStringSlave(board_info.version), type:SapiClassDetectType.ZUNO,
					update:true, update_type:(zuno.isSupportUpdateBootloader() == ZunoSapiClassStatus.OK) ? true:false, data: []},
			boot:{	version:board_info.boot_version, version_name:versionNumberToString(board_info.boot_version), type:SapiClassDetectType.UNKNOWN,
					update:false, update_type:false, data: []},
			url:'vendorId=327&appVersionMajor=' + ((board_info.version >> 16) & 0xFFFF).toString() + '&appVersionMinor=' + (board_info.version & 0xFFFF).toString()
				+ "&bootloaderVersion=" + board_info.boot_version.toString() + '&org_family=' + board_info.chip.keys_hash.toString() + '&fw_family=' + SapiClassDetectType.ZUNO.toString()
				+ '&chip_family=' + board_info.chip.chip_family.toString() + '&chip_id=' + board_info.chip.chip_type.toString() + '&zway=' + NAME_APP_VERSION_FULL + '&uuid='
				+ arrayToStringHex(board_info.chip_uuid)
		};
		return (paket);
	}

	private _update_init(): boolean {
		const paket:PaketUiClassUpdateInfoPaket|undefined = SlaveUiSectionUpdateClass.getInfoUrlPaket(this.log, this.zuno);
		if (paket == undefined)
			return (false);
		this.update.info_download_xhr(paket);
		return (true);
	}

	private async _begin(): Promise<boolean> {
		return (this._update_init());
	}

	private async _end(): Promise<void> {
		this.update.end();
	}

	private async _update_firmware(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> {
		// if (this.zuno.isMustResetDefault() == ZunoSapiClassStatus.OK && this.zuno.isSupportResetDefault() == ZunoSapiClassStatus.OK) {
		// 	this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
		// 	const status:ZunoSapiClassStatus = await this.zuno.setDefault();
		// 	if (status != ZunoSapiClassStatus.OK) {
		// 		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_SET_DEFAULT, status);
		// 		return ((status as unknown) as SapiClassStatus);
		// 	}
		// 	this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
		// 	await sleep(1000);
		// 	this.log.infoStart(ControllerUiLangClassId.MESSAGE_DETECTION);
		// 	const detect_dict:SapiClassDetect = await this.zuno.detect([115200], null);
		// 	if (detect_dict.status != SapiClassStatus.OK) {
		// 		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_DETECTION, detect_dict.status);
		// 		return ((detect_dict.status as unknown) as SapiClassStatus);
		// 	}
		// 	this.log.infoDone(ControllerUiLangClassId.MESSAGE_DETECTION);
		// 	await this.zuno.connect();
		// }
		const status:ZunoSapiClassStatus = await this.zuno.updateFirmware(data, process, target_type);
		return ((status as unknown) as SapiClassStatus);
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, zuno:ZunoSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, zuno, log, ControllerUiLangClassId.UPDATE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.zuno = zuno;
		this.update = new UpdateUiSectionClass(log, locale, this, re_begin_func,
			async (data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<SapiClassStatus> => {return(await this._update_firmware(data, process, target_type));},
			null
		);
	}
}