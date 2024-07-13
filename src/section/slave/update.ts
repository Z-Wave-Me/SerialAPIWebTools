import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, UpdateUiSectionClassXhrFinwareProcess, UpdateUiSectionClassXhrFinwareProcessOut, PaketUiClassUpdateInfo} from "../update"

import {arrayToStringHex, versionNumberToString, versionNumberToStringSlave} from "../../other/utilities";
import {ControllerUiDefineClassReBeginFunc, ControllerUiDefineClass} from "../../ui_define"
import {SapiClassDetectType} from "./../../sapi/sapi";

export {SlaveUiSectionUpdateClass};


class SlaveUiSectionUpdateClass extends CommonUiSectionClass {
	private readonly zuno:ZunoSapiClass;
	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	private readonly update:UpdateUiSectionClass;

	private _update_bootloader_click(): void {
	}

	private async _update_finware_click_add(data:Uint8Array, target_type:SapiClassDetectType): Promise<ZunoSapiClassStatus> {
		const el_progress:HTMLElement = document.createElement('progress');
		const el_span:HTMLElement = document.createElement('span');
		el_progress.setAttribute('max', '100');
		this.update.finware.el_span.innerHTML = '';
		this.update.finware.el_span.appendChild(el_progress);
		this.update.finware.el_span.appendChild(el_span);
		el_progress.setAttribute('value', "66");
		const status:ZunoSapiClassStatus = await this.zuno.updateFinware(data, (percentage:number) => {
				el_progress.setAttribute('value', percentage.toFixed().toString());
				el_span.textContent = ' ' + percentage.toFixed(0x2).padStart(6, '0') + '%';
				if (percentage >= 100.00) {
					this.update.progress_finware(ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE);
				}
			}, target_type
		);
		return (status);
	}

	private _update_finware_click(): void {
		const process:UpdateUiSectionClassXhrFinwareProcess = async (gbl:Uint8Array, target_type:SapiClassDetectType): Promise<UpdateUiSectionClassXhrFinwareProcessOut> => {
			const out:UpdateUiSectionClassXhrFinwareProcessOut = {
				ok:false,
				code:0x0
			};
			const status:ZunoSapiClassStatus = await this._update_finware_click_add(gbl, target_type);
			out.code = status;
			if (status == ZunoSapiClassStatus.OK)
				out.ok = true;
			return (out);
		};
		this.update.finware_download_xhr((): boolean => {return(this.is_busy());}, process, this.re_begin_func);
	}

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

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, zuno:ZunoSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, zuno, log, ControllerUiLangClassId.UPDATE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.zuno = zuno;
		this.update = new UpdateUiSectionClass(log, locale, () => { this._update_finware_click();}, () => {this._update_bootloader_click();}, this);
		this.re_begin_func = re_begin_func;
	}
}