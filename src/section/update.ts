import {ControllerUiLangClassId} from "../lang/ui_lang_define"
import {ControllerUiLangClass} from "../lang/ui_lang"
import {ControllerUiLogClass} from "../log/ui_log"

export {UpdateUiSectionClass, UpdateUiSectionClassXhrInfoOnloadProcess, UpdateUiSectionClassXhrInfoOnloadEnd, UpdateUiSectionClassJsonInfo, UpdateUiSectionClassButton, UpdateUiSectionClassButtonClick};

type UpdateUiSectionClassXhrInfoOnloadProcess = (response: UpdateUiSectionClassJsonInfo) => void;
type UpdateUiSectionClassXhrInfoOnloadEnd = () => void;
type UpdateUiSectionClassButtonClick = () => Promise<void>;

interface UpdateUiSectionClassJson
{
	targetAppVersionMajor:string;
	targetAppVersionMinor:string;
	fileURL:string;
	enabled:string;
	type:string;
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


class UpdateUiSectionClass {
	readonly URL_UPDATE:string									= "https://service.z-wave.me/expertui/uzb/?";
	readonly URL_LICENSE_MORE_OPTIONS:string					= "https://z-wave.me/hardware-capabilities/?uuid=";
	readonly URL_LICENSE_SERVISE:string							= "https://service.z-wave.me/hardware/capabilities/?uuid=";

	readonly JSON_UPDATE_ENABLED:string							= "enabled";
	readonly JSON_UPDATE_TYPE_FINWARE:string					= "firmware";

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
	private readonly locale:ControllerUiLangClass;

	// private readonly finware:UpdateUiSectionClassButton;
	// private readonly bootloader:UpdateUiSectionClassButton;

	end(): void {
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

	info_xhr_start(fun_xhr_timer:TimerHandler, url:string, process:UpdateUiSectionClassXhrInfoOnloadProcess, end:UpdateUiSectionClassXhrInfoOnloadEnd): void {
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
	}

	info_xhr_begin(fun_xhr_timer:TimerHandler): void {
		this.info_xhr_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
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
		this.log = log;
		this.locale = locale;
	}
}
