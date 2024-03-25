import {SapiClass, SapiClassStatus, SapiClassRet, SapiClassFuncId, SapiClassSerialAPISetupCmd} from "./sapi";
import {costruct_int} from "./utilities";
import {controller_vendor_ids} from "./vendorIds";

export {ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassCapabilities, ControllerSapiClassRegion};

enum ControllerSapiClassStatus
{
	OK = SapiClassStatus.OK,
	WRONG_LENGTH_CMD = SapiClassStatus.LAST_STATUS,
	UNSUPPORT_CMD,
	UNSUPPORT_SUB_CMD,
	WRONG_IN_DATA,
	INVALID_ARG,
	NOT_SET,
}

interface ControllerSapiClassCapabilities
{
	status:ControllerSapiClassStatus;
	ApiVersion:number;
	ApiRevision:number;
	VendorID:number;
	VendorIDName:string;
	VendorIDWebpage?:string;
	cmd_mask:Array<number>;
}


interface ControllerSapiClassRegion
{
	status:ControllerSapiClassStatus;
	region:string;
	region_array:string[];
}

// ------------------------------------------------------------------------------------------------------
interface ControllerSapiClassBoardInfoMain
{
	core_version:number;
	build_seq:number;
	build_ts:number;
	hw_revision:number;
	sdk_version:number;
	chip_uuid:number;
	sn_raw:Array<number>;
	bootloader_version:number;
	bootloader_crc32:number;
	lock_status:number;
	lock_status_name:string;
}

interface ControllerSapiClassBoardInfo
{
	status:ControllerSapiClassStatus;
	main?:ControllerSapiClassBoardInfoMain;
}

interface ControllerSapiClassSerialApiSetup
{
	status:ControllerSapiClassStatus;
	data:Array<number>;
}

enum ControllerSapiClassLockStatus
{
	UNLOCKED = 0x0,
	DBG_LOCKED,
	APP_LOCKED,
	FULL_LOCKED
}

class ControllerSapiClass {
	private readonly region_array:string[]				=
	[
		"EU", "US", "ANZ", "HK", "IN", "IL", "RU", "CN", "US_LR", "JP", "KR"
	];
	private readonly region_string_to_number: {[key:string]: number}				=
	{
		"EU": 0x00, "US": 0x01, "ANZ": 0x02, "HK": 0x03, "IN": 0x05, "IL": 0x06,
		"RU": 0x07, "CN": 0x08, "US_LR": 0x09, "JP": 0x20, "KR": 0x21
	};
	private readonly region_number_to_string: {[key:number]: string}				=
	{
		0x00:"EU", 0x01:"US", 0x02: "ANZ", 0x03:"HK", 0x05:"IN", 0x06:"IL",
		0x07:"RU", 0x08:"CN", 0x09:"US_LR",0x20: "JP", 0x21:"KR", 0xFF:"EU"
	};
	private readonly sapi = new SapiClass();

	private support_cmd_mask:Array<number>														= [];
	private vendor_id:number																	= 0x0;

	private _test_cmd(cmd:number): boolean {
		if (cmd <= 0x0)
			return (false);
		cmd--;
		if ((cmd / 0x8) >= this.support_cmd_mask.length)
			return (false);
		if ((this.support_cmd_mask[(cmd - (cmd % 0x8)) / 0x8] & (0x1 << (cmd % 0x8))) == 0x0)
			return (false);
		return (true);
	}

	private async _serial_api_setup(sub:number, args:Array<number>): Promise<ControllerSapiClassSerialApiSetup> {
		const out:ControllerSapiClassSerialApiSetup = {status:ControllerSapiClassStatus.OK, data:[]};
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_SERIAL_API_SETUP) == false) {
			out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
			return (out);
		}
		const serial_api_setup:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SETUP, [sub].concat(args), false);
		if (serial_api_setup.status != SapiClassStatus.OK) {
			out.status = (serial_api_setup.status as any);
			return (out);
		}
		if (serial_api_setup.data.length < 0x1) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return (out);
		}
		if (serial_api_setup.data[0x0] == SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_UNSUPPORTED) {
			out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
			return (out);
		}
		if (serial_api_setup.data[0x0] != sub) {
			out.status = ControllerSapiClassStatus.UNSUPPORT_SUB_CMD;
			return (out);
		}
		out.data = serial_api_setup.data.slice(0x1, serial_api_setup.data.length);
		return (out);
	}

	private async _readNVM(addr:number, size:number): Promise<SapiClassRet> {
		return (await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER, [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF], false));
	}

	public async getRegion(): Promise<ControllerSapiClassRegion> {
		const out:ControllerSapiClassRegion = {status:ControllerSapiClassStatus.OK, region:"", region_array:this.region_array};
		const rerion_get:ControllerSapiClassSerialApiSetup = await this._serial_api_setup(SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_RF_REGION_GET, []);
		if (rerion_get.status != ControllerSapiClassStatus.OK) {
			out.status = rerion_get.status;
			return (out);
		}
		if (rerion_get.data.length < 0x1) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return (out);
		}
		if (Object.hasOwn(this.region_number_to_string, rerion_get.data[0x0]) == false) {
			out.status = ControllerSapiClassStatus.WRONG_IN_DATA;
			return (out);
		}
		out.region = this.region_number_to_string[rerion_get.data[0x0]];
		return (out);
	}

	public async setRegion(region:string): Promise<ControllerSapiClassStatus> {
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET) == false)
			return (ControllerSapiClassStatus.UNSUPPORT_CMD);
		if (Object.hasOwn(this.region_string_to_number, region) == false)
			return (ControllerSapiClassStatus.INVALID_ARG);
		const rerion_get:ControllerSapiClassSerialApiSetup = await this._serial_api_setup(SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_RF_REGION_SET, [this.region_string_to_number[region]]);
		if (rerion_get.status != ControllerSapiClassStatus.OK)
			return (rerion_get.status);
		if (rerion_get.data.length < 0x1)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
		if (rerion_get.data[0x0] == 0x0)
			return (ControllerSapiClassStatus.NOT_SET);
		const res:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [], false);
		if (res.status != SapiClassStatus.OK)
			return ((res.status as any));
		return (ControllerSapiClassStatus.OK);
	}

	public async getCapabilities(): Promise<ControllerSapiClassCapabilities> {
		const out:ControllerSapiClassCapabilities = {status:ControllerSapiClassStatus.OK, ApiVersion:0x0, ApiRevision:0x0, VendorID:0x0, VendorIDName:"Unknown", cmd_mask:[]};
		const capabilities_info:SapiClassRet =  await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_GET_CAPABILITIES, [], false);
		if (capabilities_info.status != SapiClassStatus.OK) {
			out.status = (capabilities_info.status as any);
			return (out);
		}
		if (capabilities_info.data.length <= 0x8) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return (out);
		}
		out.ApiVersion = capabilities_info.data[0x0];
		out.ApiRevision = capabilities_info.data[0x1];
		out.VendorID = capabilities_info.data[0x2] << 0x8 | capabilities_info.data[0x3];
		out.cmd_mask = capabilities_info.data.slice(0x8, capabilities_info.data.length);
		this.support_cmd_mask = out.cmd_mask;
		this.vendor_id = out.VendorID;
		if (Object.hasOwn(controller_vendor_ids, out.VendorID) == true) {
			out.VendorIDName = controller_vendor_ids[out.VendorID].Name;
			out.VendorIDWebpage = controller_vendor_ids[out.VendorID].Webpage;
		}
		return (out);
	}

	public async getBoardInfo(): Promise<ControllerSapiClassBoardInfo> {
		let lock_status_name:string;

		const out:ControllerSapiClassBoardInfo = {status:ControllerSapiClassStatus.OK};
		const board_info:SapiClassRet =  await this._readNVM(0xFFFF00, 0x31);
		if (board_info.status != SapiClassStatus.OK) {
			out.status = (board_info.status as any);
			return (out);
		}
		const data:Array<number> = board_info.data;
		if (data.length < 27) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return (out);
		}
		switch (data[51]) {
			case ControllerSapiClassLockStatus.UNLOCKED:
				lock_status_name = "UNLOCKED";
				break ;
			case ControllerSapiClassLockStatus.DBG_LOCKED:
				lock_status_name = "DBG_LOCKED";
				break ;
			case ControllerSapiClassLockStatus.APP_LOCKED:
				lock_status_name = "APP_LOCKED";
				break ;
			case ControllerSapiClassLockStatus.FULL_LOCKED:
				lock_status_name = "FULL_LOCKED";
				break ;
			default:
				lock_status_name = "UNKNOWN";
				break ;
		}
		out.main = {
			core_version:costruct_int(data.slice(3, 3 + 2),2, false),
			build_seq: costruct_int(data.slice(5, 5 +4), 4, false),
			build_ts: costruct_int(data.slice(9, 9 + 4), 4, false),
			hw_revision: costruct_int(data.slice(13, 13 + 2), 2, false),
			sdk_version:  costruct_int(data.slice(15, 15 + 4), 4, false),
			chip_uuid: costruct_int(data.slice(19, 19 + 8), 8, false),
			sn_raw:data.slice(27,43),
			bootloader_version: costruct_int(data.slice(43, 47), 4, false),
			bootloader_crc32: costruct_int(data.slice(47, 51), 4, false),
			lock_status: data[51],
			lock_status_name: lock_status_name,
		};
		return (out);
	}

	public busy(): boolean {
		return (this.sapi.busy());
	}

	public supported(): boolean {
		return (this.sapi.supported());
	}

	public async request(): Promise<boolean> {
		return (this.sapi.request());
	}

	public async open(baudRate:number): Promise<boolean> {
		return (this.sapi.open(baudRate));
	}

	public async close(): Promise<boolean> {
		this.support_cmd_mask = [];
		this.vendor_id = 0x0;
		return (this.sapi.close());
	}
}