import {ControllerUiLangClassId} from "../lang/controller_ui_lang_define"
import {ControllerUiLangClass} from "../lang/controller_ui_lang"
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassPower, ControllerSapiClassRegion, ControllerSapiClassCapabilities} from "../sapi/controller_sapi";
import {ControllerUiLogClass} from "../log/controller_ui_log"
import {ControllerUiSectionClass} from "./controller_ui_section"

export {ControllerUiSectionInfoClass};

class ControllerUiSectionInfoClass extends ControllerUiSectionClass {
	private region_current:string											= '';
	private region_new:string												= '';
	private region_el_button?:HTMLButtonElement								= undefined;
	private power_current:number											= 0x0;
	private power_new:number												= 0x0;
	private power_el_button?:HTMLButtonElement								= undefined;

	private async _controller_default_click(event:Event): Promise<void> {
		if (this.is_busy() == true)
			return ;
		const el_target:HTMLButtonElement|null = this.event_get_element_button(event);
		if (el_target == null)
			return ;
		this.common_button_atrr(el_target, ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE, true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
		const status:ControllerSapiClassStatus = await this.razberry.setDefault();
		this.common_button_atrr(el_target, ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE, false);
		if (status == ControllerSapiClassStatus.OK) {
			this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
			return ;
		}
		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_SET_DEFAULT, status);
	}

	private _controller_default_init(): boolean {
		const el_button:HTMLButtonElement = document.createElement("button");
		el_button.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE);
		el_button.type = "button";
		el_button.textContent = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON);
		el_button.addEventListener("click", (event:Event) => {this._controller_default_click(event);});
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT, ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_TITLE, "", el_button);
		return (true);
	}

	private _power_change(event:Event): void {
		const el_target:HTMLInputElement|null = this.event_get_element_input(event);
		if (el_target == null)
			return ;
		if (this.power_el_button == undefined)
			return ;
		this.power_new = Number(el_target.value);
		this.common_button_atrr(this.power_el_button, ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, (this.power_new == this.power_current) ? true:false);
	}

	private async _power_click(): Promise<void> {
		if (this.is_busy() == true)
			return ;
		if (this.power_el_button == undefined)
			return ;
		this.common_button_atrr(this.power_el_button, ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_POWER);
		const status:ControllerSapiClassStatus = await this.razberry.setPower(this.power_new);
		if (status == ControllerSapiClassStatus.OK) {
			this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_POWER);
			this.power_current = this.power_new;
			return ;
		}
		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_SET_POWER, status);
		this.common_button_atrr(this.power_el_button, ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, false);
	}

	private async _power_init(): Promise<boolean> {
		if (this.razberry.isRazberry() == false)
			return (false);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_POWER);
		const power:ControllerSapiClassPower = await this.razberry.getPower();
		if (power.status != ControllerSapiClassStatus.OK) {
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
		this.power_el_button = document.createElement("button");
		this.power_el_button.textContent = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON);
		this.power_el_button.addEventListener("click", () => {this._power_click();});
		this.power_el_button.type = "button";
		this.power_el_button.setAttribute("disabled", "");
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_POWER, ControllerUiLangClassId.TABLE_NAME_POWER_TITLE, el_value, this.power_el_button);
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_POWER);
		return (true);
	}

	private _region_change(event:Event): void {
		const el_target:HTMLSelectElement|null = this.event_get_element_select(event);
		if (el_target == null)
			return ;
		if (this.region_el_button == undefined)
			return ;
		this.region_new = el_target.value;
		this.common_button_atrr(this.region_el_button, ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, (this.region_new == this.region_current) ? true:false);
	}

	private async _region_click(): Promise<void> {
		if (this.is_busy() == true)
			return ;
		if (this.region_el_button == undefined)
			return ;
		this.common_button_atrr(this.region_el_button, ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, true);
		this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_REGION);
		const status:ControllerSapiClassStatus = await this.razberry.setRegion(this.region_new);
		if (status == ControllerSapiClassStatus.OK) {
			this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_REGION);
			this.region_current = this.region_new;
			return ;
		}
		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_SET_REGION, status);
		this.common_button_atrr(this.region_el_button, ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, false);
	}

	private async _region_init(): Promise<boolean> {
		let i:number, el_option_str:string, el_select:HTMLElement;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_REGION);
		const region_info:ControllerSapiClassRegion = await this.razberry.getRegion();
		switch (region_info.status) {
			case ControllerSapiClassStatus.OK:
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
				el_select = document.createElement("select");
				el_select.title = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION_SELECT_TITLE);
				el_select.innerHTML = el_option_str;
				el_select.addEventListener("change", (event:Event) => {this._region_change(event);});
				this.region_el_button = document.createElement("button");
				this.region_el_button.textContent = this.locale.getLocale(ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON);
				this.region_el_button.addEventListener("click", () => {this._region_click();});
				this.region_el_button.type = "button";
				this.region_el_button.setAttribute("disabled", "");
				this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_REGION, ControllerUiLangClassId.TABLE_NAME_REGION_TITLE, el_select, this.region_el_button);
				return (true);
				break ;
			case ControllerSapiClassStatus.UNSUPPORT_CMD:
				this.log.errorUnsupport(ControllerUiLangClassId.MESSAGE_READ_REGION);
				break ;
			default:
				this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
				break ;
		}
		return (false);
	}

	private _capabilities_init(): boolean {
		let value:string;

		this.log.infoStart(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
		const capabilities_info:ControllerSapiClassCapabilities = this.razberry.getCapabilities();
		if (capabilities_info.status != ControllerSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES, capabilities_info.status);
			return (false);
		}
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION, ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION_TITLE, capabilities_info.ApiVersion + "." + capabilities_info.ApiRevision, "");
		value = capabilities_info.VendorIDName;
		if (capabilities_info.VendorIDWebpage != undefined)
			value = '<a target="_blank" href="'+ capabilities_info.VendorIDWebpage +'">'+ value +'</a>';
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_VENDOR, ControllerUiLangClassId.TABLE_NAME_VENDOR_TITLE, value, "");
		this.create_tr_el(ControllerUiLangClassId.TABLE_NAME_VENDOR_ID, ControllerUiLangClassId.TABLE_NAME_VENDOR_ID_TITLE, String(capabilities_info.VendorID), "");
		this.log.infoDone(ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
		return (true);
	}

	private async _begin(): Promise<boolean> {
		let display:boolean;

		display = false;
		if (this._capabilities_init() == true)
			display = true;
		if (await this._region_init() == true)
			display = true;
		if (await this._power_init() == true)
			display = true;
		if (this._controller_default_init() == true)
			display = true;
		return (display);
	}

	private async _end(): Promise<void> {
	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, razberry:ControllerSapiClass, log:ControllerUiLogClass) {
		super(el_section, locale, razberry, log, ControllerUiLangClassId.CONTROLER_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
	}
}