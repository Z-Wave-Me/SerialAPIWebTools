import {ControllerUiLangClassId} from "../lang/ui_lang_define"
import {ControllerUiLangClass} from "../lang/ui_lang"
import {ControllerUiLogClass} from "../log/ui_log"
import {CommonUiSectionHtmlClass} from "./common"
import { ControllerUiDefineClassReBeginFunc} from "../ui_define"

export {UpdateUiSectionClass, UpdateUiSectionClassXhrInfoOnloadProcess, UpdateUiSectionClassXhrInfoOnloadEnd, UpdateUiSectionClassJsonInfo, UpdateUiSectionClassButton, UpdateUiSectionClassXhrFinwareProcess, UpdateUiSectionClassXhrFinwareProcessOut};

type UpdateUiSectionClassXhrInfoOnloadProcess = (response: UpdateUiSectionClassJsonInfo) => void;
type UpdateUiSectionClassXhrInfoOnloadEnd = () => void;
type UpdateUiSectionClassXhrFinwareBusy = () => boolean;
type UpdateUiSectionClassXhrFinwareProcess = (data:Uint8Array) => Promise<UpdateUiSectionClassXhrFinwareProcessOut>;
type UpdateUiSectionClassButtonClick =  () => void;

interface UpdateUiSectionClassXhrFinwareProcessOut
{
	ok:boolean;
	code:number;
}

interface UpdateUiSectionClassJson
{
	targetAppVersionMajor:string;
	targetAppVersionMinor:string;
	fileURL:string;
	enabled:string;
	type:string;
	target_fw_family:string;
}

interface UpdateUiSectionClassJsonInfo
{
	data:Array<UpdateUiSectionClassJson>
}

interface UpdateUiSectionClassButton
{
	url_current:string;
	url_new:string;
	el_select:HTMLSelectElement;
	el_span:HTMLSpanElement;
	el_button:HTMLButtonElement;
}


class UpdateUiSectionClass extends CommonUiSectionHtmlClass {
	readonly URL_UPDATE:string									= "https://service.z-wave.me/expertui/uzb/";
	readonly URL_UPDATE_LIST:string								= this.URL_UPDATE + "?";
	readonly URL_LICENSE_MORE_OPTIONS:string					= "https://z-wave.me/hardware-capabilities/?uuid=";
	readonly URL_LICENSE_SERVISE:string							= "https://service.z-wave.me/hardware/capabilities/?uuid=";

	readonly JSON_UPDATE_ENABLED:string							= "enabled";
	readonly JSON_UPDATE_TYPE_FINWARE:string					= "firmware";

	readonly SELECTOR_DEFAULT:string							= 'data-default';

	readonly fw_family_razberry:number							= 0x0;
	readonly fw_family_zuno:number								= 0x1;

	readonly info_xhr_timeout:number							= 5000;
	readonly info_xhr_timer_timeout:number						= 3000;
	readonly finware_xhr_timout:number							= 10000;
	readonly finware_xhr_timer_timout:number					= 3000;
	readonly bus_timout:number									= 3000;

	readonly info_xhr:XMLHttpRequest							= new XMLHttpRequest();
	readonly finware_xhr:XMLHttpRequest							= new XMLHttpRequest();

	info_xhr_timer_id?:number;
	finware_timer_id?:number;

	private readonly log:ControllerUiLogClass;

	readonly finware:UpdateUiSectionClassButton;
	readonly bootloader:UpdateUiSectionClassButton;

	private _update_change(event:Event, title:ControllerUiLangClassId, info:UpdateUiSectionClassButton): void {
		const el_target:HTMLSelectElement|null = this.event_get_element_select(event);
		if (el_target == null)
			return ;
		info.url_new = el_target.value;
		this.common_button_atrr(info.el_button, title, (info.url_new == info.url_current) ? true:false);
	}

	private _progress(info:UpdateUiSectionClassButton, text:ControllerUiLangClassId): void {
		info.el_span.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' +  this.locale.getLocale(text) +'</div>';
	}

	progress_finware(text:ControllerUiLangClassId): void {
		this._progress(this.finware, text);
	}

	progress_bootloader(text:ControllerUiLangClassId): void {
		this._progress(this.bootloader, text);
	}

	private _end_struct(info:UpdateUiSectionClassButton) {
		info.url_current = "";
		info.url_new = "";
		info.el_button.disabled = true;
		this._progress(info, ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO);
	}

	end(): void {
		this._end_struct(this.finware);
		this._end_struct(this.bootloader);
		this.info_xhr.abort();
		if (this.info_xhr_timer_id != undefined) {
			window.clearTimeout(this.info_xhr_timer_id);
			this.info_xhr_timer_id = undefined;
		}
		this.finware_xhr.abort();
		if (this.finware_timer_id != undefined) {
			window.clearTimeout(this.finware_timer_id);
			this.finware_timer_id = undefined;
		}
	}

	info_download_xhr(url:string, process:UpdateUiSectionClassXhrInfoOnloadProcess, end:UpdateUiSectionClassXhrInfoOnloadEnd): void {
		const fun_xhr_timer:TimerHandler = () => {
			this.info_xhr_timer_id = undefined;
			this.log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
			this.info_xhr.open("POST", url, true);
			this.info_xhr.responseType = 'json';
			this.info_xhr.timeout = this.info_xhr_timeout;
			this.info_xhr.ontimeout = () => {
				this.log.errorXhrTimeout(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
				this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.info_xhr_timer_timeout);
			};
			this.info_xhr.onerror = () => {
				this.log.errorXhrError(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
				this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.info_xhr_timer_timeout);
			};
			this.info_xhr.onload = () => {
				try {
					process(this.info_xhr.response);
				} catch (error) {
					this.log.errorXhrInvalidData(url);
					this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
					this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, this.info_xhr_timer_timeout);
					return ;
				}
				end();
				this.log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_INFO);
			};
			this.info_xhr.send();
		};
		this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
	}

	private _download_xhr_start(paket:UpdateUiSectionClassButton, busy:UpdateUiSectionClassXhrFinwareBusy, process:UpdateUiSectionClassXhrFinwareProcess, re_begin_func:ControllerUiDefineClassReBeginFunc): void {
		this.progress_finware(ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE);
		this.common_button_atrr(paket.el_button, '', true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
		const url:string = this.URL_UPDATE + paket.url_new;
		const fun_xhr_timer:TimerHandler = () => {
			this.finware_timer_id = undefined;
			this.finware_xhr.open("POST", url, true);
			this.finware_xhr.responseType = "arraybuffer";
			this.finware_xhr.timeout = this.finware_xhr_timout;
			this.finware_xhr.ontimeout = () => {
				this.log.errorXhrTimeout(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				this.finware_timer_id = window.setTimeout(fun_xhr_timer, this.finware_xhr_timer_timout);
			};
			this.finware_xhr.onerror = () => {
				this.log.errorXhrError(url);
				this.log.errorFalled(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				this.finware_timer_id = window.setTimeout(fun_xhr_timer, this.finware_xhr_timer_timout);
			};
			this.finware_xhr.onload = () => {
				this.log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_DWNLOAD_FILE);
				const gbl:Uint8Array = new Uint8Array(this.finware_xhr.response);
				const fun_bus_timer:TimerHandler = async () => {
					this.finware_timer_id = undefined;
					if (busy() == true) {
						this.finware_timer_id = window.setTimeout(fun_bus_timer, this.bus_timout);
						return ;
					}
					this.log.infoStart(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE);
					const status:UpdateUiSectionClassXhrFinwareProcessOut = await process(gbl);
					if (status.ok == false) {
						this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE, status.code);
						paket.el_span.innerHTML = "";
						paket.el_span.appendChild(paket.el_select);
						this.common_button_atrr(paket.el_button, '', false);
						return ;
					}
					this.log.infoDone(ControllerUiLangClassId.MESSAGE_UPDATE_START_FINWARE);
					re_begin_func(false);
					return ;

				};
				this.progress_finware(ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_BUS_SERIAL);
				this.finware_timer_id = window.setTimeout(fun_bus_timer, 0x0);
			};
			this.finware_xhr.send();
		};
		this.finware_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
	}

	finware_download_xhr(busy:UpdateUiSectionClassXhrFinwareBusy, process:UpdateUiSectionClassXhrFinwareProcess, re_begin_func:ControllerUiDefineClassReBeginFunc): void {
		this._download_xhr_start(this.finware, busy, process, re_begin_func);
	}

	private _constructor_struct(button_text:ControllerUiLangClassId, click:UpdateUiSectionClassButtonClick, change:EventListener):UpdateUiSectionClassButton {
		const el_span:HTMLSpanElement = document.createElement("span");
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.textContent = this.locale.getLocale(button_text);
		el_button.addEventListener("click", click);
		el_button.type = "button";
		const el_select:HTMLSelectElement = document.createElement("select");
		el_select.addEventListener("change", change);
		const info:UpdateUiSectionClassButton = {url_current:'', url_new:'', el_span:el_span, el_button:el_button, el_select:el_select};
		return (info);
	}

	constructor(log:ControllerUiLogClass, locale:ControllerUiLangClass, finware_click:UpdateUiSectionClassButtonClick, bootloader_click:UpdateUiSectionClassButtonClick) {
		super(locale);
		this.log = log;
		this.finware = this._constructor_struct(ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON, finware_click,
			(event:Event) => {this._update_change(event, ControllerUiLangClassId.TABLE_NAME_UPDATE_FINWARE_BUTTON_TITLE, this.finware);});
		this.bootloader = this._constructor_struct(ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON, bootloader_click,
			(event:Event) =>{ this._update_change(event, ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE, this.bootloader);});
	}
}
