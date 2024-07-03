import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo, ZunoSapiClassRegion, ZunoSapiClassPower} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {versionNumberToStringSlave, arrayToStringHex, numberToStringHex, conv2Decimal, sleep} from "../../other/utilities";
import { QRCode, QRCodeOption, QRErrorCorrectLevel } from "./../../qr_code/qrcode";
import {ControllerUiDefineClassReBeginFunc} from "../../ui_define"

export {SlaveUiSectionInfoClass};

class SlaveUiSectionInfoClass extends CommonUiSectionClass {
	private region_current:string											= '';
	private region_new:string												= '';
	private power_current:number											= 0x0;
	private power_new:number												= 0x0;

	private readonly region_el_button:HTMLButtonElement;
	private readonly power_el_button:HTMLButtonElement;
	private readonly zuno:ZunoSapiClass;
	private readonly re_begin_func:ControllerUiDefineClassReBeginFunc;

	private _not_freeze(status:ZunoSapiClassStatus, title:ControllerUiLangClassId) {
		this.log.errorFalledCode(title, status);
		if (status != ZunoSapiClassStatus.NO_FREEZE)
			return ;
		this.log.errorFalled(ControllerUiLangClassId.SLAVE_MESSAGE_FREZEE_ERROR);
		this.re_begin_func(true);
	}

	private _board_info(): boolean {
		let dsk:string;

		this.log.infoStart(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const board_info:ZunoSapiClassBoardInfo = this.zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
			return (false);
		}
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_TYPE, ControllerUiLangClassId.TABLE_NAME_TYPE_TITLE, this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE), "");
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_VERSION, ControllerUiLangClassId.TABLE_NAME_VERSION_TITLE, versionNumberToStringSlave(board_info.version), "");
		const build_data_time:Date = new Date(board_info.build_ts * 1000);
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_BUILD_TIME_STAMP, ControllerUiLangClassId.TABLE_NAME_BUILD_TIME_STAMP_TITLE, build_data_time.toLocaleString(), "");
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_UUID, ControllerUiLangClassId.TABLE_NAME_UUID_TITLE, arrayToStringHex(board_info.chip_uuid), "");
		if (board_info.home_id != undefined)
			this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_HOME, ControllerUiLangClassId.TABLE_NAME_HOME_TITLE, numberToStringHex(board_info.home_id), "");
		if (board_info.node_id != undefined)
			this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_NODE, ControllerUiLangClassId.TABLE_NAME_NODE_TITLE, board_info.node_id.toString(0xA), "");
		dsk = conv2Decimal(board_info.s2_pub, " - ");
		dsk = "<b>" + dsk.substring(0x0, 0x5) + "</b>" + dsk.substring(0x5);
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_DSK, ControllerUiLangClassId.TABLE_NAME_DSK_TITLE, dsk, "");
		if (board_info.smart_qr != undefined) {
			const el_span:HTMLSpanElement = document.createElement("span");
			const option:QRCodeOption = {
				text: board_info.smart_qr,
				width: 128,
				height: 128,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRErrorCorrectLevel.L,
			};
			try {
				new QRCode(el_span, option);
			} catch(e) {
				el_span.textContent = board_info.smart_qr;
			}
			this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_QR_CODE, ControllerUiLangClassId.TABLE_NAME_QR_CODE_TITLE, el_span, "");
		}
		this.log.infoDone(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		return (true);
	}

	private _region_change(event:Event): void {
		const el_target:HTMLSelectElement|null = this.event_get_element_select(event);
		if (el_target == null)
			return ;
		this.region_new = el_target.value;
		this.common_button_atrr(this.region_el_button, ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, (this.region_new == this.region_current) ? true:false);
	}

	private async _region_click(): Promise<void> {
		if (this.is_busy() == true)
			return ;
		this.common_button_atrr(this.region_el_button, ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_REGION);
		const status:ZunoSapiClassStatus = await this.zuno.setRegion(this.region_new);
		if (status == ZunoSapiClassStatus.OK) {
			this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_REGION);
			this.region_current = this.region_new;
			return ;
		}
		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_SET_REGION, status);
		this.common_button_atrr(this.region_el_button, ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, false);
		this._not_freeze(status, ControllerUiLangClassId.MESSAGE_SET_REGION);
	}

	private _region_init(): boolean {
		let i:number, el_option_str:string;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_REGION);
		const region_info:ZunoSapiClassRegion = this.zuno.getRegion();
		if (region_info.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
			return (false);
		}
		this.region_current = region_info.region;
		this.region_new = region_info.region;
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_REGION);
		i = 0x0;
		el_option_str = "";
		while (i < region_info.region_array.length) {
			if (region_info.region_array[i] == region_info.region) {
				el_option_str = el_option_str + '<option selected="true">'+ region_info.region_array[i] +'</option>';
			}
			else {
				el_option_str = el_option_str + '<option>'+ region_info.region_array[i] +'</option>';
			}
			i++;
		}
		const el_select:HTMLSelectElement = document.createElement("select");
		el_select.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION_SELECT_TITLE);
		el_select.innerHTML = el_option_str;
		el_select.addEventListener("change", (event:Event) => {this._region_change(event);});
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_REGION, ControllerUiLangClassId.TABLE_NAME_REGION_TITLE, el_select, this.region_el_button);
		return (true);
	}

	private _power_change(event:Event): void {
		const el_target:HTMLInputElement|null = this.event_get_element_input(event);
		if (el_target == null)
			return ;
		this.power_new = Number(el_target.value);
		this.common_button_atrr(this.power_el_button, ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, (this.power_new == this.power_current) ? true:false);
	}

	private async _power_click(): Promise<void> {
		if (this.is_busy() == true)
			return ;
		this.common_button_atrr(this.power_el_button, ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_POWER);
		const status:ZunoSapiClassStatus = await this.zuno.setPower(this.power_new);
		if (status == ZunoSapiClassStatus.OK) {
			this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_POWER);
			this.power_current = this.power_new;
			return ;
		}
		this.common_button_atrr(this.power_el_button, ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, false);
		this._not_freeze(status, ControllerUiLangClassId.MESSAGE_SET_POWER);
	}

	private async _power_init(): Promise<boolean> {
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_POWER);
		const power:ZunoSapiClassPower = this.zuno.getPower();
		if (power.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_POWER, power.status);
			return (false);
		}
		this.power_new = power.power_raw;
		this.power_current = power.power_raw;
		const el_value:HTMLElement = document.createElement("span");
		const el_input:HTMLInputElement = document.createElement("input");
		el_input.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_POWER_SELECT_TITLE);
		el_input.type = "number";
		el_input.min = power.min.toString();
		el_input.max = power.max.toString();
		el_input.step = power.step.toString();
		el_input.value = power.power_raw.toString();
		el_input.addEventListener("change", (event:Event) => {this._power_change(event);});
		el_value.appendChild(el_input);
		el_value.appendChild(document.createElement("span"));
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_POWER, ControllerUiLangClassId.TABLE_NAME_POWER_TITLE, el_value, this.power_el_button);
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_POWER);
		return (true);
	}

	private async _controller_default_click(event:Event): Promise<void> {
		if (this.is_busy() == true)
			return ;
		const el_target:HTMLButtonElement|null = this.event_get_element_button(event);
		if (el_target == null)
			return ;
		const out:boolean = window.confirm(this.locale.getLocale(ControllerUiLangClassId.SLAVE_DEFAULT_RESET_WARNING));
		if (out != true)
			return ;
		this.common_button_atrr(el_target, ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE, true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
		const status:ZunoSapiClassStatus = await this.zuno.setDefault();
		this.common_button_atrr(el_target, ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE, false);
		if (status == ZunoSapiClassStatus.OK) {
			this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
			await sleep(1000);
			this.re_begin_func(false);
			return ;
		}
		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_SET_DEFAULT, status);
	}

	private _controller_default_init(): boolean {
		const status:ZunoSapiClassStatus = this.zuno.isSupportResetDefaul();
		if (status != ZunoSapiClassStatus.OK)
			return (false);
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE);
		el_button.type = "button";
		el_button.textContent = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON);
		el_button.addEventListener("click", (event:Event) => {this._controller_default_click(event);});
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT, ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_TITLE, "", el_button);
		return (true);
	}

	private async _begin(): Promise<boolean> {
		let display:boolean;

		display = false;
		if (this._board_info() == true)
			display = true;
		if (this._region_init() == true)
			display = true;
		if (await this._power_init() == true)
			display = true;
		if (this._controller_default_init() == true)
			display = true;
		return (display);
	}

	private async _end(): Promise<void> {

	}

	private _constructor_button(text:ControllerUiLangClassId, click:EventListener):HTMLButtonElement {
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.textContent = this.locale.getLocale(text);
		el_button.addEventListener("click", click);
		el_button.type = "button";
		return (el_button);
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, zuno:ZunoSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiDefineClassReBeginFunc) {
		super(el_section, locale, zuno, log, ControllerUiLangClassId.BOARD_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.zuno = zuno;
		this.re_begin_func = re_begin_func;
		this.power_el_button = this._constructor_button(ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON, () => {this._power_click();});
		this.region_el_button = this._constructor_button(ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON, () => {this._region_click();});
	}
}