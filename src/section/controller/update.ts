import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassBoardInfo, ControllerSapiClassCapabilities} from "../../sapi/controller_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, UpdateUiSectionClassXhrFinwareProcess, UpdateUiSectionClassXhrFinwareProcessOut, PaketUiClassUpdateInfo} from "../update"

import {arrayToStringHex, versionNumberToString} from "../../other/utilities";
import {SapiClassDetectType} from "./../../sapi/sapi";

import {ControllerUiDefineClassReBeginFunc} from "../../ui_define"

export {ControllerUiSectionUpdateClass};

class ControllerUiSectionUpdateClass extends CommonUiSectionClass {

	private readonly update:UpdateUiSectionClass;
	private readonly razberry:ControllerSapiClass;

	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	private _update_bootloader_click(): void {
	}

	private async _update_finware_click_add(data:Uint8Array): Promise<ControllerSapiClassStatus> {
		const el_progress:HTMLElement = document.createElement('progress');
		const el_span:HTMLElement = document.createElement('span');
		el_progress.setAttribute('max', '100');
		this.update.finware.el_span.innerHTML = '';
		this.update.finware.el_span.appendChild(el_progress);
		this.update.finware.el_span.appendChild(el_span);
		el_progress.setAttribute('value', "66");
		const status:ControllerSapiClassStatus = await this.razberry.updateFinware(data, (percentage:number) => {
				el_progress.setAttribute('value', percentage.toFixed().toString());
				el_span.textContent = ' ' + percentage.toFixed(0x2).padStart(6, '0') + '%';
				if (percentage >= 100.00) {
					this.update.progress_finware(ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE);
				}
			}
		);
		return (status);
	}

	private _update_finware_click(): void {
		const process:UpdateUiSectionClassXhrFinwareProcess = async (gbl:Uint8Array): Promise<UpdateUiSectionClassXhrFinwareProcessOut> => {
			const out:UpdateUiSectionClassXhrFinwareProcessOut = {
				ok:false,
				code:0x0
			};
			const status:ControllerSapiClassStatus = await this._update_finware_click_add(gbl);
			out.code = status;
			if (status == ControllerSapiClassStatus.OK)
				out.ok = true;
			return (out);
		};
		this.update.finware_download_xhr((): boolean => {return(this.is_busy());}, process, this.re_begin_func);
	}
	
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
		const app_update_info:PaketUiClassUpdateInfo = {version:version, version_name:versionNumberToString(version), type:SapiClassDetectType.RAZBERRY, data: []};
		const bootloader_update_info:PaketUiClassUpdateInfo = {version:board_info.bootloader_version, version_name:versionNumberToString(board_info.bootloader_version), type:SapiClassDetectType.UNKNOWN, data: []};
		const url:string = 'vendorId=' + capabilities_info.VendorID.toString() + '&appVersionMajor=' + capabilities_info.ApiVersion.toString() + '&appVersionMinor=' + capabilities_info.ApiRevision.toString() +
							"&bootloaderCRC=" + board_info.bootloader_crc32.toString() + '&uuid=' + arrayToStringHex(board_info.chip_uuid);
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

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, razberry, log, ControllerUiLangClassId.UPDATE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.update = new UpdateUiSectionClass(log, locale, () => { this._update_finware_click();}, () => {this._update_bootloader_click();}, this);
		this.razberry = razberry;
		this.re_begin_func = re_begin_func;
	}
}