import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassBoardInfo, ControllerSapiClassCapabilities} from "../../sapi/controller_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {UpdateUiSectionClass, UpdateUiSectionClassXhrInfoOnloadProcess, UpdateUiSectionClassXhrInfoOnloadEnd, UpdateUiSectionClassJsonInfo, UpdateUiSectionClassButton, UpdateUiSectionClassXhrFinwareProcess, UpdateUiSectionClassXhrFinwareProcessOut} from "../update"
import {arrayToStringHex, versionNumberToString} from "../../other/utilities";

import {ControllerUiDefineClass, ControllerUiDefineClassReBeginFunc} from "../../ui_define"

export {ControllerUiSectionUpdateClass};

interface ControllerUiClassUpdateInfoData
{
	version:number;
	url:string;
	beta:boolean;
}

interface ControllerUiClassUpdateInfo
{
	version:number;
	data:Array<ControllerUiClassUpdateInfoData>;
}

class ControllerUiSectionUpdateClass extends CommonUiSectionClass {
	private readonly LOCAL_STORAGE_KEY_UPDATE_BETA:string					= ControllerUiDefineClass.NAME_APP + '_update_beta';
	private readonly LOCAL_STORAGE_VALUE_TRUE:string						= 'true';
	private readonly LOCAL_STORAGE_VALUE_FALSE:string						= 'false';

	private readonly SELECTOR_BETA:string									= 'data-beta';

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
	
	private _update_beta_change_all_select(beta:boolean, el_select:HTMLSelectElement, title:ControllerUiLangClassId): void {
		let number:number;

		const list_option:NodeListOf<HTMLElement> = el_select.querySelectorAll('option');
		number = 0x0;
		list_option.forEach((item:HTMLElement) => {
			if (item.getAttribute('selected') != null) {
				item.removeAttribute("selected");
			}
			if (beta == false && item.getAttribute(this.SELECTOR_BETA) != null)
				return ;
			if (item.getAttribute(this.update.SELECTOR_DEFAULT) != null) {
				item.setAttribute("selected", "");
			}
			number++;
		});
		if (beta == false)
			el_select.setAttribute(this.SELECTOR_BETA, "");
		else
			el_select.removeAttribute(this.SELECTOR_BETA);
		if (number > 0x1) {
			el_select.title = this.locale.getLocale(title);
			el_select.removeAttribute("disabled");
			return ;
		}
		el_select.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE);
		el_select.setAttribute("disabled", "");
	}

	private _update_beta_change_all(): void {
		let beta:boolean;

		const update_beta:string|null = localStorage.getItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA);
		if (update_beta === this.LOCAL_STORAGE_VALUE_TRUE)
			beta = true;
		else
			beta = false;
		this._update_beta_change_all_select(beta, this.update.finware.el_select, ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_SELECT_TITLE);
		this.update.finware.url_new = "";
		this.common_button_atrr(this.update.finware.el_button, '', true);
		this._update_beta_change_all_select(beta, this.update.bootloader.el_select, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE);
		this.update.bootloader.url_new = "";
		this.common_button_atrr(this.update.bootloader.el_button, '', true);
	}

	private _update_beta_change(event:Event): void {
		const el_target:HTMLInputElement|null = this.event_get_element_input(event);
		if (el_target == null)
			return ;
		localStorage.setItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA, ((el_target.checked == true) ? this.LOCAL_STORAGE_VALUE_TRUE: this.LOCAL_STORAGE_VALUE_FALSE));
		this._update_beta_change_all();
	}

	private _update_init_set_select(paket:UpdateUiSectionClassButton, info:ControllerUiClassUpdateInfo): void {
		let i:number, el_option_str:string;

		paket.el_span.innerHTML = "";
		paket.el_span.appendChild(paket.el_select);
		info.data.sort(function (a:ControllerUiClassUpdateInfoData, b:ControllerUiClassUpdateInfoData):number {
			return (a.version - b.version);
		});
		i = 0x0;
		el_option_str = '<option ' + this.update.SELECTOR_DEFAULT + ' value="">'+ versionNumberToString(info.version) +'</option>';
		while (i < info.data.length) {
			el_option_str = el_option_str + '<option ' + ((info.data[i].beta == true)? this.SELECTOR_BETA + '=""':'')  + ' value="' + info.data[i].url +'">'+ versionNumberToString(info.data[i].version) +'</option>';
			i++;
		}
		paket.el_select.innerHTML = el_option_str;
	}

	private _update_init(): boolean {
		let i:number, version:number;

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
		const update_beta:string|null = localStorage.getItem(this.LOCAL_STORAGE_KEY_UPDATE_BETA);
		const el_input:HTMLInputElement = document.createElement("input");
		el_input.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_SELECT_TITLE);
		el_input.type = "checkbox";
		if (update_beta === this.LOCAL_STORAGE_VALUE_TRUE)
			el_input.checked = true;
		el_input.addEventListener("change", (event:Event) => {this._update_beta_change(event);});
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA, ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_TITLE, el_input, "");
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE, ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_TITLE, this.update.finware.el_span,  this.update.finware.el_button);
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_TITLE, this.update.bootloader.el_span, this.update.bootloader.el_button);
		const app_update_info:ControllerUiClassUpdateInfo = {version:(capabilities_info.ApiVersion << 0x8) | capabilities_info.ApiRevision, data: []};
		const bootloader_update_info:ControllerUiClassUpdateInfo = {version:board_info.bootloader_version, data: []};
		const bootloaderCRC:string = "&bootloaderCRC=" + board_info.bootloader_crc32.toString();
		const url:string = this.update.URL_UPDATE_LIST + 'vendorId=' + capabilities_info.VendorID.toString() + '&appVersionMajor=' + capabilities_info.ApiVersion.toString() + '&appVersionMinor=' + capabilities_info.ApiRevision.toString() + bootloaderCRC + '&token=all&uuid=' + arrayToStringHex(board_info.chip_uuid);
		const process: UpdateUiSectionClassXhrInfoOnloadProcess = (response: UpdateUiSectionClassJsonInfo) => {
			i = 0x0;
			while (i < response.data.length) {
				version = (Number(response.data[i].targetAppVersionMajor) << 0x8) | Number(response.data[i].targetAppVersionMinor);
				if (response.data[i].type == this.update.JSON_UPDATE_TYPE_FINWARE && version > app_update_info.version) {
					const update_info_data:ControllerUiClassUpdateInfoData = {version:version, url:response.data[i].fileURL, beta:((response.data[i].enabled == this.update.JSON_UPDATE_ENABLED ? false:true))};
					app_update_info.data.push(update_info_data);
				}
				i++;
			}
		};
		const end: UpdateUiSectionClassXhrInfoOnloadEnd = () => {
			this._update_init_set_select(this.update.finware, app_update_info);
			this._update_init_set_select(this.update.bootloader, bootloader_update_info);
			this._update_beta_change_all();
		};
		this.update.info_download_xhr(url, process, end);
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
		this.update = new UpdateUiSectionClass(log, locale, () => { this._update_finware_click();}, () => {this._update_bootloader_click();});
		this.razberry = razberry;
		this.re_begin_func = re_begin_func;
	}
}