import {html_modal} from "./modal.js";

import {sleep} from "./utilities";
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassCapabilities, ControllerSapiClassRegion, ControllerSapiClassLicense, ControllerSapiClassBoardInfo} from "./controller_sapi";

export {ControllerUiClass};

class ControllerUiClass {
	private readonly MESSAGE_NOT_SUPPORT_BROWSER:string				= "Sorry, this feature is supported only on Chrome, Edge and Opera";
	private readonly MESSAGE_PORT_NOT_SELECT:string					= "No port selected";
	private readonly MESSAGE_PORT_USE:string						= "Check yours, maybe another application is using it";
	private readonly MESSAGE_CONNECT:string							= "Connect controller";
	private readonly MESSAGE_READ_CAPABILITIES:string				= "Read capabilities the controller";
	private readonly MESSAGE_READ_REGION:string						= "Read region the controller";
	private readonly MESSAGE_LICENSE_REGION:string					= "Read license the controller";
	private readonly MESSAGE_LICENSE_BOARD_INFO:string				= "Read board info the controller";
	private readonly MESSAGE_SET_REGION:string						= "Set region the controller";
	private readonly MESSAGE_PLEASE_WAIT:string						= "Please wait until the previous operation is completed.";

	private readonly TABLE_NAME_SERIAL_API_VERSION:string			= "Serial API Version:";
	private readonly TABLE_NAME_VENDOR:string						= "Vendor:";
	private readonly TABLE_NAME_VENDOR_ID:string					= "Vendor id:";
	private readonly TABLE_NAME_REGION:string						= "Region:";
	private readonly TABLE_NAME_REGION_SELECT_TITLE:string			= "Select region";
	private readonly TABLE_NAME_REGION_BUTTON:string				= "Apple";
	private readonly TABLE_NAME_REGION_BUTTON_TITLE:string			= "Apple select region";
	private readonly TABLE_NAME_LICENSE_UUID:string					= "Uuid:";
	private readonly TABLE_NAME_LICENSE_MORE_OPTIONS:string			= "More options:";
	private readonly TABLE_NAME_LICENSE_MORE_OPTIONS_LINK:string	= "https://z-wave.me/hardware-capabilities/?uuid=";
	private readonly TABLE_NAME_LICENSE_SUBVENDOR_ID:string			= "Subvendor:";
	private readonly TABLE_NAME_LICENSE_MAX_NODE:string				= "Nodes limit:";
	private readonly TABLE_NAME_LICENSE_SUPPORT:string				= "Support:";
	private readonly TABLE_NAME_LICENSE_YES:string					= '<input disabled="disabled" checked type="checkbox">';
	private readonly TABLE_NAME_LICENSE_NO:string					= '<input disabled="disabled" type="checkbox">';

	private readonly BAUDRATE										= [115200, 230400, 460800, 921600];
	private readonly dtr_timeout:number								= 250;

	private readonly el_modal:HTMLElement;
	private readonly el_modal_section_log_txt:HTMLElement;


	private region_current:string									= "";
	private region_new:string										= "";
	private razberry:ControllerSapiClass							= new ControllerSapiClass();

	private _log(txt:string): void {
		this.el_modal_section_log_txt.innerHTML += txt;
		this.el_modal_section_log_txt.scrollTop = this.el_modal_section_log_txt.scrollHeight;
	}

	private _log_error(txt:string): void {
		this._log("<div style=\"color: red;\">" + txt + "</div>");
	}

	private _log_info(txt:string): void {
		this._log("<div style=\"color: green;\">" + txt + "</div>");
	}

	private _log_warning(txt:string): void {
		this._log("<div style=\"color: yellow;\">" + txt + "</div>");
	}

	private _log_info_start(txt:string): void {
		this._log_info(txt + "...");
	}

	private _log_info_done(txt:string): void {
		this._log_info(txt + " done");
	}

	private _log_error_faled(txt:string): void {
		this._log_error(txt + " faled");
	}

	private _log_error_faled_code(txt:string, code:number): void {
		this._log_error(txt + " faled: " + code);
	}

	private _log_error_unsupport(txt:string): void {
		this._log_error(txt + " unsupported");
	}
	
	private _log_error_not_find_el(txt:string): void {
		this._log_error("Not find el: " + txt);
	}

	private async _destructors(): Promise<void> {
		await this.razberry.close();
		this.el_modal.remove();
	}

	private _is_busy(): boolean {
		if (this.razberry.busy() == true) {
			this._log_warning(this.MESSAGE_PLEASE_WAIT);
			return (true);
		}
		return (false);
	}

	private async _close(): Promise<void> {
		if (this._is_busy() == true)
			return ;
		await this._destructors();
	}

	private _copy(): void {
		let i:number, txt:string;

		const childNodes:NodeListOf<ChildNode> = this.el_modal_section_log_txt.childNodes;
		i = 0x0;
		txt = "";
		while (i < childNodes.length) {
			const child = childNodes[i];
			txt = txt + child.textContent + "\n";
			i++;
		}
		navigator.clipboard.writeText(txt);
	}

	private _region_common(): void {
		const find:string = '[data-id_apple_region]';
		const apple_region:HTMLElement|null = this.el_modal.querySelector(find);
		if (apple_region == null) {
			this._log_error_not_find_el(find);
			return ;
		}
		if (this.region_new  == this.region_current) {
			apple_region.setAttribute("disabled", "");
			apple_region.removeAttribute("title");
			return ;
		}
		apple_region.setAttribute("title", this.TABLE_NAME_REGION_BUTTON_TITLE);
		apple_region.removeAttribute("disabled");
	}

	private _region_change(event:Event): void {
		if (event.target == null)
			return ;
		const el_target:any = (event.target as any);
		this.region_new = (el_target.value as string);
		this._region_common();
	}

	private async _region_apple(): Promise<void> {
		if (this._is_busy() == true)
			return ;
		this._log_info_start(this.MESSAGE_SET_REGION);
		const status:ControllerSapiClassStatus = await this.razberry.setRegion(this.region_new);
		if (status == ControllerSapiClassStatus.OK) {
			this._log_info_done(this.MESSAGE_SET_REGION);
			this.region_current = this.region_new;
			this._region_common();
			return ;
		}
		this._log_error_faled_code(this.MESSAGE_SET_REGION, status);
	}

	private _html_event(el:HTMLElement, data:string): void {
		const list:NodeListOf<HTMLElement> = el.querySelectorAll('[data-'+ data + ']');
		list.forEach((item:HTMLElement) => {
			const value:string|null = item.getAttribute('data-'+ data);
			if (value == null)
				return ;
			item.addEventListener(data, () => {
					eval("this." + value);
				}
			);
		});
	}

	private _create_table_element(find:string, name:string, value:string, action:string, title:string): HTMLElement {
		const el_tr: HTMLElement = document.createElement("tr");
		const el_td_1: HTMLElement = document.createElement("td");
		const el_td_2: HTMLElement = document.createElement("td");
		const el_td_3: HTMLElement = document.createElement("td");
		el_td_1.title = title;
		el_td_1.innerHTML = name;
		el_td_2.innerHTML = value;
		el_td_3.innerHTML = action;
		el_tr.appendChild(el_td_1);
		el_tr.appendChild(el_td_2);
		el_tr.appendChild(el_td_3);
		const tbody:HTMLElement|null = this.el_modal.querySelector(find);
		if (tbody == null) {
			this._log_error_not_find_el(find);
			return (el_tr);
		}
		tbody.appendChild(el_tr);
		return (el_tr);
	}

	private _create_table_element_controler_info(name:string, value:string, action:string = "", title:string = ""): HTMLElement {
		return (this._create_table_element('[data-id_controller_info] tbody', name, value, action, title));
	}

	private _create_table_element_license_info(name:string, value:string, action:string = "", title:string = ""): HTMLElement {
		return (this._create_table_element('[data-id_license_info] tbody', name, value, action, title));
	}

	private async _connect(): Promise<boolean> {
		let i:number;

		this._log_info_start(this.MESSAGE_CONNECT);
		i = 0x0;
		while (i < this.BAUDRATE.length) {
			if (await this.razberry.open(this.BAUDRATE[i]) == false) {
				this._log_error(this.MESSAGE_PORT_USE);
				return (false);
			}
			if (await this.razberry.connect() == true) {
				this._log_info_done(this.MESSAGE_CONNECT);
				return (true);
			}
			await this.razberry.close();
			await sleep(this.dtr_timeout);// The time for the capacitor on the DTR line to recharge
			i++;
		}
		this._log_error_faled(this.MESSAGE_CONNECT);
		return (false);
	}

	private _start_display(find:string) {
		const id_controller_info:HTMLElement|null = this.el_modal.querySelector(find);
		if (id_controller_info == null) {
			this._log_error_not_find_el(find);
			return ;
		}
		id_controller_info.style.display = "";
	}

	private _get_capabilities(): boolean {
		this._log_info_start(this.MESSAGE_READ_CAPABILITIES);
		const capabilities_info:ControllerSapiClassCapabilities = this.razberry.getCapabilities();
		if (capabilities_info.status != ControllerSapiClassStatus.OK) {
			this._log_error_faled_code(this.MESSAGE_READ_CAPABILITIES, capabilities_info.status);
			return (false);
		}
		this._create_table_element_controler_info(this.TABLE_NAME_SERIAL_API_VERSION, capabilities_info.ApiVersion + "." + capabilities_info.ApiRevision);
		if (capabilities_info.VendorIDWebpage == undefined)
			this._create_table_element_controler_info(this.TABLE_NAME_VENDOR, capabilities_info.VendorIDName);
		else
			this._create_table_element_controler_info(this.TABLE_NAME_VENDOR, '<a target="_blank" href="'+ capabilities_info.VendorIDWebpage +'">'+ capabilities_info.VendorIDName +'</a>');
		this._create_table_element_controler_info(this.TABLE_NAME_VENDOR_ID, String(capabilities_info.VendorID));
		this._log_info_done(this.MESSAGE_READ_CAPABILITIES);
		return (true);
	}

	private async _get_region(): Promise<boolean> {
		let i:number, el_str:string, el_region:HTMLElement;

		this._log_info_start(this.MESSAGE_READ_REGION);
		const region_info:ControllerSapiClassRegion = await this.razberry.getRegion();
		switch (region_info.status) {
			case ControllerSapiClassStatus.OK:
				this.region_current = region_info.region;
				this.region_new = region_info.region;
				this._log_info_done(this.MESSAGE_READ_REGION);
				i = 0x0;
				el_str = "";
				while (i < region_info.region_array.length) {
					if (region_info.region_array[i] == region_info.region) {
						el_str = el_str + '<option selected="true">'+ region_info.region_array[i] +'</option>';
					}
					else {
						el_str = el_str + '<option>'+ region_info.region_array[i] +'</option>';
					}
					i++;
				}
				el_str = '<select title="' + this.TABLE_NAME_REGION_SELECT_TITLE + '" data-change="_region_change(event)">' + el_str +'</select>';
				el_region = this._create_table_element_controler_info(this.TABLE_NAME_REGION, el_str, '<button data-id_apple_region data-click="_region_apple()" disabled type="button">' + this.TABLE_NAME_REGION_BUTTON + '</button>');
				this._html_event(el_region, "change");
				this._html_event(el_region, "click");
				return (true);
				break ;
			case ControllerSapiClassStatus.UNSUPPORT_CMD:
				this._log_error_unsupport(this.MESSAGE_READ_REGION);
				break ;
			default:
				this._log_error_faled_code(this.MESSAGE_READ_REGION, region_info.status);
				break ;
		}
		return (false);
	}

	private async _start_controller_info(): Promise<void> {
		let display:boolean;

		display = false;
		if (this._get_capabilities() == true)
			display = true;
		if (await this._get_region() == true)
			display = true;
		if (display == false)
			return ;
		this._start_display('[data-id_controller_info]');
	}

	private _get_license(): boolean {
		let key:string, flag_status:string;

		this._log_info_start(this.MESSAGE_LICENSE_REGION);
		const license:ControllerSapiClassLicense = this.razberry.getLicense();
		if (license.status != ControllerSapiClassStatus.OK) {
			this._log_error_faled_code(this.MESSAGE_LICENSE_REGION, license.status);
			return (false);
		}
		if (license.vallid == true) {
			this._create_table_element_license_info(this.TABLE_NAME_LICENSE_SUBVENDOR_ID, String(license.vendor_id));
			this._create_table_element_license_info(this.TABLE_NAME_LICENSE_MAX_NODE, String(license.max_nodes));
			this._create_table_element_license_info(this.TABLE_NAME_LICENSE_SUPPORT, String(license.count_support));
			for (key in license.flags) {
				if (license.flags[key].active == true)
					flag_status = this.TABLE_NAME_LICENSE_YES;
				else
					flag_status = this.TABLE_NAME_LICENSE_NO;
				this._create_table_element_license_info(license.flags[key].name + ":", flag_status, "", license.flags[key].title);
			}
		}
		this._log_info_done(this.MESSAGE_LICENSE_REGION);
		return (true);
	}

	private _array_to_string_hex(data:Array<number>):string {
		let str_hex:string, i:number;

		str_hex = "";
		i = 0x0;
		while (i < data.length) {
			str_hex = str_hex + data[i].toString(0x10);
			i++;
		}
		return (str_hex);
	}

	private _get_board_info(): boolean {
		this._log_info_start(this.MESSAGE_LICENSE_BOARD_INFO);
		const board_info:ControllerSapiClassBoardInfo = this.razberry.getBoardInfo();
		if (board_info.status != ControllerSapiClassStatus.OK) {
			this._log_error_faled_code(this.MESSAGE_LICENSE_BOARD_INFO, board_info.status);
			return (false);
		}
		const uuid_str_hex:string = this._array_to_string_hex(board_info.chip_uuid);
		this._create_table_element_license_info(this.TABLE_NAME_LICENSE_UUID, uuid_str_hex);
		const more_options_link:string = '<a target="_blank" href="'+ this.TABLE_NAME_LICENSE_MORE_OPTIONS_LINK + uuid_str_hex +'">'+ 'link' +'</a>';
		this._create_table_element_license_info(this.TABLE_NAME_LICENSE_MORE_OPTIONS, more_options_link);
		this._log_info_done(this.MESSAGE_LICENSE_BOARD_INFO);
		return (true);
	}

	private _start_license_info(): void {
		let display:boolean;

		display = false;
		if (this._get_board_info() == true)
			display = true;
		if (this._get_license() == true)
			display = true;
		if (display == false)
			return ;
		this._start_display('[data-id_license_info]');
	}

	private async _start(): Promise<void> {
		if (this.razberry.supported() == false)
			return (this._log_error(this.MESSAGE_NOT_SUPPORT_BROWSER));
		if (await this.razberry.request() == false)
			return (this._log_error(this.MESSAGE_PORT_NOT_SELECT));
		if (await this._connect() == false)
			return ;
		await this._start_controller_info();
		if (this.razberry.isRazberry7() == true)
			this._start_license_info();
	}

	constructor(el:HTMLElement) {
		this.el_modal = document.createElement("div");
		this.el_modal.className = "ZUnoRazberryModal";
		this.el_modal.innerHTML = html_modal;
		this._html_event(this.el_modal, "click");
		const list_el_log:HTMLCollectionOf<Element> = this.el_modal.getElementsByClassName("ZUnoRazberryModalContentSectionLog_section_txt");
		this.el_modal_section_log_txt = list_el_log[0x0] as HTMLElement;
		el.appendChild(this.el_modal);
		this._start();
	}
}