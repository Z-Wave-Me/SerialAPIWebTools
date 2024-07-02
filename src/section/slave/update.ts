import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, UpdateUiSectionClassXhrInfoOnloadProcess, UpdateUiSectionClassXhrInfoOnloadEnd, UpdateUiSectionClassJsonInfo, UpdateUiSectionClassButton} from "../update"
import {arrayToStringHex, versionNumberToString, versionNumberToStringSlave} from "../../other/utilities";
import {ControllerUiDefineClassReBeginFunc, ControllerUiDefineClass} from "../../ui_define"

export {SlaveUiSectionUpdateClass};

interface SlaveUiClassUpdateInfoData
{
	version:number;
	version_name:string;
	url:string;
}

interface SlaveUiClassUpdateInfo
{
	version:number;
	version_name:string;
	data:Array<SlaveUiClassUpdateInfoData>;
}

class SlaveUiSectionUpdateClass extends CommonUiSectionClass {
	private readonly zuno:ZunoSapiClass;
	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	private readonly update:UpdateUiSectionClass;

	private _update_bootloader_click(): void {
	}

	private _update_finware_click(): void {
	}

	private _update_init_set_select(paket:UpdateUiSectionClassButton, info:SlaveUiClassUpdateInfo, title:ControllerUiLangClassId): void {
		let i:number, el_option_str:string;

		paket.el_span.innerHTML = "";
		paket.el_span.appendChild(paket.el_select);
		i = 0x0;
		el_option_str = '<option ' + this.update.SELECTOR_DEFAULT + ' value="">'+ info.version_name +'</option>';
		while (i < info.data.length) {
			el_option_str = el_option_str + '<option ' + ' value="' + info.data[i].url +'">'+ info.data[i].version_name +'</option>';
			i++;
		}
		paket.el_select.innerHTML = el_option_str;
		this.common_button_atrr(paket.el_button, '', true);
		if (info.data.length != 0x0) {
			paket.el_select.title = this.locale.getLocale(title);
			return ;
		}
		paket.el_select.innerHTML = el_option_str;
		paket.el_select.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE);
		paket.el_select.disabled = true;
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
		const app_update_info:SlaveUiClassUpdateInfo = {version:board_info.version, version_name:versionNumberToStringSlave(board_info.version), data: []};
		const bootloader_update_info:SlaveUiClassUpdateInfo = {version:board_info.boot_version, version_name:versionNumberToString(board_info.boot_version), data: []};
		const url:string = this.update.URL_UPDATE + 'vendorId=327&appVersionMajor=' + ((board_info.version >> 16) & 0xFFFF).toString() + '&appVersionMinor=' + (board_info.version & 0xFFFF).toString()
							+ "&bootloaderVersion=" + board_info.boot_version.toString() + '&org_family=' + board_info.chip.keys_hash.toString() + '&fw_family=' + this.update.fw_family_zuno.toString()
							+ '&chip_family=' + board_info.chip.chip_family.toString() + '&chip_id=' + board_info.chip.chip_type.toString() + '&zway=' + ControllerUiDefineClass.NAME_APP_VERSION_FULL + '&uuid='
							+ arrayToStringHex(board_info.chip_uuid) + '&token=internal';
		const process: UpdateUiSectionClassXhrInfoOnloadProcess = (response: UpdateUiSectionClassJsonInfo) => {
			i = 0x0;
			const razberry_data:Array<SlaveUiClassUpdateInfoData> = [];
			while (i < response.data.length) {
				if (response.data[i].type == this.update.JSON_UPDATE_TYPE_FINWARE) {
					switch (Number(response.data[i].target_fw_family)) {
						case this.update.fw_family_zuno:
							version = (Number(response.data[i].targetAppVersionMajor) << 0x10) | Number(response.data[i].targetAppVersionMinor);
							if (version > app_update_info.version) {
								version_name = versionNumberToStringSlave(version) + " - " + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE);
								app_update_info.data.push({version:version, version_name:version_name, url:response.data[i].fileURL});
							}
							break ;
						case this.update.fw_family_razberry:
							version = (Number(response.data[i].targetAppVersionMajor) << 0x8) | Number(response.data[i].targetAppVersionMinor);
							version_name = versionNumberToString(version) + " - " + this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_CONTROLER);
							razberry_data.push({version:version, version_name:version_name, url:response.data[i].fileURL});
							break ;
					}
				}
				i++;
			}
			app_update_info.data.sort(function (a:SlaveUiClassUpdateInfoData, b:SlaveUiClassUpdateInfoData):number {
				return (a.version - b.version);
			});
			razberry_data.sort(function (a:SlaveUiClassUpdateInfoData, b:SlaveUiClassUpdateInfoData):number {
				return (a.version - b.version);
			});
			i = 0x0;
			while ( i < razberry_data.length) {
				app_update_info.data.push(razberry_data[i]);
				i++;
			}
		};
		const end: UpdateUiSectionClassXhrInfoOnloadEnd = () => {
			this._update_init_set_select(this.update.finware, app_update_info, ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_SELECT_TITLE);
			this._update_init_set_select(this.update.bootloader, bootloader_update_info, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE);
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