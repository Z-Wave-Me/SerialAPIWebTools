import {html_modal} from "./modal.js";

import {sleep} from "./utilities";
import {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassCapabilities, ControllerSapiClassRegion} from "./controller_sapi";

export {ZUnoRazberryClass};

class ZUnoRazberryClass {
	private readonly MESSAGE_NOT_SUPPORT_BROWSER:string			= "Sorry, this feature is supported only on Chrome, Edge and Opera";
	private readonly MESSAGE_PORT_NOT_SELECT:string				= "No port selected";
	private readonly MESSAGE_PORT_USE:string					= "Check yours, maybe another application is using it";
	private readonly MESSAGE_READ_CAPABILITIES:string			= "Read capabilities the controller";
	private readonly MESSAGE_READ_REGION:string					= "Read region the controller";
	private readonly MESSAGE_SET_REGION:string					= "Set region the controller";
	private readonly MESSAGE_PLEASE_WAIT:string					= "Please wait until the previous operation is completed.";

	private readonly TABLE_NAME_SERIAL_API_VERSION:string		= "Serial API Version:";
	private readonly TABLE_NAME_VENDOR:string					= "Vendor:";
	private readonly TABLE_NAME_VENDOR_ID:string				= "Vendor id:";
	private readonly TABLE_NAME_REGION:string					= "Region:";
	private readonly TABLE_NAME_REGION_SELECT_TITLE:string		= "Select region";
	private readonly TABLE_NAME_REGION_BUTTON:string			= "Apple";
	private readonly TABLE_NAME_REGION_BUTTON_TITLE:string		= "Apple select region";

	private readonly BAUDRATE									= [115200, 230400, 460800, 921600];

	private readonly dtr_timeout:number							= 250;

	private readonly el_modal:HTMLElement						= document.createElement("div");

	private readonly el_modal_section_log_txt:HTMLElement;
	private readonly el_modal_controler_info:HTMLElement;
	private readonly el_modal_controler_info_body:HTMLElement;

	private el_region_button:HTMLElement|undefined;

	private region_current:string								= "";
	private region_new:string									= "";
	private baudRate:number										= 230400;
	private razberry:ControllerSapiClass						= new ControllerSapiClass();

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
		if (this.el_region_button == undefined)
			return ;
		if (this.region_new  == this.region_current) {
			this.el_region_button.setAttribute("disabled", "");
			this.el_region_button.removeAttribute("title");
			return ;
		}
		this.el_region_button.setAttribute("title", this.TABLE_NAME_REGION_BUTTON_TITLE);
		this.el_region_button.removeAttribute("disabled");
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

	private _create_table_element(name:string, value:string, action:string = ""): HTMLElement {
		const el_tr: HTMLElement = document.createElement("tr");
		const el_td_1: HTMLElement = document.createElement("td");
		const el_td_2: HTMLElement = document.createElement("td");
		const el_td_3: HTMLElement = document.createElement("td");
		el_td_1.innerHTML = name;
		el_td_2.innerHTML = value;
		el_td_3.innerHTML = action;
		el_tr.appendChild(el_td_1);
		el_tr.appendChild(el_td_2);
		el_tr.appendChild(el_td_3);
		this.el_modal_controler_info_body.appendChild(el_tr);
		return (el_tr);
	}

	private async _open_port(): Promise<ControllerSapiClassCapabilities|undefined> {
		let i:number;

		this._log_info_start(this.MESSAGE_READ_CAPABILITIES);
		i = 0x0;
		while (i < this.BAUDRATE.length) {
			if (await this.razberry.open(this.BAUDRATE[i]) == false) {
				this._log_error(this.MESSAGE_PORT_USE);
				return (undefined);
			}
			const capabilities_info:ControllerSapiClassCapabilities = await this.razberry.getCapabilities();
			if (capabilities_info.status == ControllerSapiClassStatus.OK) {
				this.baudRate = this.BAUDRATE[i];
				this._log_info_done(this.MESSAGE_READ_CAPABILITIES);
				return (capabilities_info);
			}
			await this.razberry.close();
			await sleep(this.dtr_timeout);// The time for the capacitor on the DTR line to recharge
			i++;
		}
		this._log_error_faled(this.MESSAGE_READ_CAPABILITIES);
		return (undefined);
	}

	private async _get_capabilities(capabilities_info:ControllerSapiClassCapabilities): Promise<void> {
		this._create_table_element(this.TABLE_NAME_SERIAL_API_VERSION, capabilities_info.ApiVersion + "." + capabilities_info.ApiRevision);
		if (capabilities_info.VendorIDWebpage == undefined)
			this._create_table_element(this.TABLE_NAME_VENDOR, capabilities_info.VendorIDName);
		else
			this._create_table_element(this.TABLE_NAME_VENDOR, '<a target="_blank" href="'+ capabilities_info.VendorIDWebpage +'">'+ capabilities_info.VendorIDName +'</a>');
		this._create_table_element(this.TABLE_NAME_VENDOR_ID, String(capabilities_info.VendorID));
		this.el_modal_controler_info.style.display = "";
	}

	private async _get_region(): Promise<void> {
		let i:number, el_str:string, el_region:HTMLElement, list_region_button:HTMLCollectionOf<Element>;

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
				el_region = this._create_table_element(this.TABLE_NAME_REGION, el_str, '<button data-click="_region_apple()" disabled type="button">' + this.TABLE_NAME_REGION_BUTTON + '</button>');
				this._html_event(el_region, "change");
				this._html_event(el_region, "click");
				list_region_button = el_region.getElementsByTagName("button");
				this.el_region_button = list_region_button[0x0] as HTMLElement;
				break ;
			case ControllerSapiClassStatus.UNSUPPORT_CMD:
				this._log_error_unsupport(this.MESSAGE_READ_REGION);
				break ;
			default:
				this._log_error_faled_code(this.MESSAGE_READ_REGION, region_info.status);
				break ;
		}
	}

	private async _start(): Promise<void> {
		if (this.razberry.supported() == false)
			return (this._log_error(this.MESSAGE_NOT_SUPPORT_BROWSER));
		if (await this.razberry.request() == false)
			return (this._log_error(this.MESSAGE_PORT_NOT_SELECT));
		const capabilities_info:ControllerSapiClassCapabilities|undefined = await this._open_port();
		if (capabilities_info == undefined)
			return ;
		await this._get_capabilities(capabilities_info);
		await this._get_region();
	}

	constructor(el:HTMLElement) {
		this.el_modal.className = "ZUnoRazberryModal";
		this.el_modal.innerHTML = html_modal;
		this._html_event(this.el_modal, "click");
		const list_el_log:HTMLCollectionOf<Element> = this.el_modal.getElementsByClassName("ZUnoRazberryModalContentSectionLog_section_txt");
		this.el_modal_section_log_txt = list_el_log[0x0] as HTMLElement;
		const list_el_controler_info:HTMLCollectionOf<Element> = this.el_modal.getElementsByClassName("ZUnoRazberryModalContentSectionControlerInfo");
		this.el_modal_controler_info = list_el_controler_info[0x0] as HTMLElement;
		const list_el_controler_info_body:HTMLCollectionOf<Element> = this.el_modal.getElementsByClassName("ZUnoRazberryModalContentSectionControlerInfo_body");
		this.el_modal_controler_info_body = list_el_controler_info_body[0x0] as HTMLElement;
		el.appendChild(this.el_modal);
		this._start();
	}
}