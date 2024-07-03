import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {
	UpdateUiSectionClass, UpdateUiSectionClassXhrInfoOnloadProcess, UpdateUiSectionClassXhrInfoOnloadEnd, UpdateUiSectionClassJsonInfo, UpdateUiSectionClassButton, UpdateUiSectionClassXhrFinwareProcess, UpdateUiSectionClassXhrFinwareProcessOut,
	PaketUiClassUpdateInfo, PaketUiClassUpdateInfoData
} from "../update"

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
		let i:number, version:number, version_name:string;

		this.log.infoStart(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const board_info:ZunoSapiClassBoardInfo = this.zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
			return (false);
		}
		this.log.infoDone(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE, ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_TITLE, this.update.finware.el_span,  this.update.finware.el_button);
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_TITLE, this.update.bootloader.el_span, this.update.bootloader.el_button);
		const app_update_info:PaketUiClassUpdateInfo = {version:board_info.version, version_name:versionNumberToStringSlave(board_info.version), type:SapiClassDetectType.ZUNO, data: []};
		const bootloader_update_info:PaketUiClassUpdateInfo = {version:board_info.boot_version, version_name:versionNumberToString(board_info.boot_version), type:SapiClassDetectType.UNKNOWN, data: []};
		this.update.finware.info = app_update_info;
		this.update.bootloader.info = bootloader_update_info;
		const url:string = this.update.URL_UPDATE_LIST + 'vendorId=327&appVersionMajor=' + ((board_info.version >> 16) & 0xFFFF).toString() + '&appVersionMinor=' + (board_info.version & 0xFFFF).toString()
							+ "&bootloaderVersion=" + board_info.boot_version.toString() + '&org_family=' + board_info.chip.keys_hash.toString() + '&fw_family=' + SapiClassDetectType.ZUNO.toString()
							+ '&chip_family=' + board_info.chip.chip_family.toString() + '&chip_id=' + board_info.chip.chip_type.toString() + '&zway=' + ControllerUiDefineClass.NAME_APP_VERSION_FULL + '&uuid='
							+ arrayToStringHex(board_info.chip_uuid) + '&token=internal';
		const process: UpdateUiSectionClassXhrInfoOnloadProcess = (response: UpdateUiSectionClassJsonInfo) => {
			i = 0x0;
			const razberry_data:Array<PaketUiClassUpdateInfoData> = [];
			while (i < response.data.length) {
				if (response.data[i].type == this.update.JSON_UPDATE_TYPE_FINWARE) {
					switch (Number(response.data[i].target_fw_family)) {
						case SapiClassDetectType.ZUNO:
							version = (Number(response.data[i].targetAppVersionMajor) << 0x10) | Number(response.data[i].targetAppVersionMinor);
							if (version > app_update_info.version) {
								version_name = versionNumberToStringSlave(version) + " - " + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE);
								app_update_info.data.push({version:version, version_name:version_name, url:response.data[i].fileURL, type:SapiClassDetectType.ZUNO});
							}
							break ;
						case SapiClassDetectType.RAZBERRY:
							version = (Number(response.data[i].targetAppVersionMajor) << 0x8) | Number(response.data[i].targetAppVersionMinor);
							version_name = versionNumberToString(version) + " - " + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_CONTROLER);
							razberry_data.push({version:version, version_name:version_name, url:response.data[i].fileURL, type:SapiClassDetectType.RAZBERRY});
							break ;
					}
				}
				i++;
			}
			app_update_info.data.sort(function (a:PaketUiClassUpdateInfoData, b:PaketUiClassUpdateInfoData):number {
				return (a.version - b.version);
			});
			razberry_data.sort(function (a:PaketUiClassUpdateInfoData, b:PaketUiClassUpdateInfoData):number {
				return (a.version - b.version);
			});
			i = 0x0;
			while ( i < razberry_data.length) {
				app_update_info.data.push(razberry_data[i]);
				i++;
			}
		};
		const end: UpdateUiSectionClassXhrInfoOnloadEnd = () => {
			this.update.init_select_finware();
			this.update.init_select_bootloader();
		};
		this.update.info_download_xhr(url, process, end);
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
		this.update = new UpdateUiSectionClass(log, locale, () => { this._update_finware_click();}, () => {this._update_bootloader_click();});
		this.re_begin_func = re_begin_func;
	}
}