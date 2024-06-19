
import {SapiClass, SapiClassStatus, SapiClassFuncId, SapiClassRet} from "./sapi";
import {costruct_int, toString, conv2Decimal, conv2DecimalPadding} from "../other/utilities";

export {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo, ZunoSapiClassParamInfo};

enum ZunoSapiClassStatus
{
	OK = SapiClassStatus.OK,
	NOT_INIT = SapiClassStatus.LAST_STATUS,
	WRONG_LENGTH_CMD,
}

interface ZunoSapiClassBoardInfoZwDataProt
{
	s2_keys:number;
	device_type:number;
	device_icon:number;
	vendor:number;
	product_type:number;
	product_id:number;
	version:number;
	LR:boolean;
}

interface ZunoSapiClassParamInfo
{
	status:ZunoSapiClassStatus;
	raw:Array<number>;
	freq_i:number;
	freq_str:string;
	bLR:boolean;
}

interface ZunoSapiClassBoardInfo
{
	status:ZunoSapiClassStatus;
	version:number;
	build_number:number;
	build_ts:number;
	hw_rev:number;
	code_size:number;
	ram_size:number
	custom_code_offset:number;
	chip_uuid:Uint8Array;
	s2_pub:Uint8Array;
	zwdata?:ZunoSapiClassBoardInfoZwDataProt,
	smart_qr?:string;
	dbg_lock:number;
	home_id?:number;
	node_id?:number;
}

// ------------------------------------------------------------------------------------------------------

interface FreqTableProt {
	name: string;
	id: number;
}


class ZunoSapiClass {
	private readonly sapi:SapiClass;
	private board_info:ZunoSapiClassBoardInfo												= {	status:ZunoSapiClassStatus.NOT_INIT, version:0x0, build_number:0x0, build_ts:0x0, hw_rev:0x0, code_size:0x0, ram_size:0x0,
																								dbg_lock:0x0, custom_code_offset:0x30000, chip_uuid: new Uint8Array(), s2_pub: new Uint8Array()};
	private param_info:ZunoSapiClassParamInfo												= {	status:ZunoSapiClassStatus.NOT_INIT, freq_i:0x0, freq_str:"", bLR:false, raw:[]};

	private readonly FREQ_TABLE_U7:FreqTableProt[]									=
	[
		{ name: "EU",id: 0x00},
		{ name: "US",id: 0x01},
		{ name: "ANZ",id: 0x02},
		{ name: "HK",id: 0x03},
		// { name: "MY",id: 0x04},
		{ name: "IN",id: 0x05},
		{ name: "IL",id: 0x06},
		{ name: "RU",id: 0x07},
		{ name: "CN",id: 0x08},
		{ name: "US_LR",id: 0x09},
		// { name: "US_LR_BK",id: 0x0A},
		{ name: "JP",id: 0x20},
		{ name: "KR",id: 0x21},
		// { name: "FK",id: 0xFE},
	];

	private _freq_int_to_str(val:number): string {
		let i = 0x0;
		while (i < this.FREQ_TABLE_U7.length) {
			if (this.FREQ_TABLE_U7[i].id == val)
				return (this.FREQ_TABLE_U7[i].name);
			i++;
		}
		return ("UNK");
	}

	private async compile_zwave_qrcode(product_data:ZunoSapiClassBoardInfoZwDataProt, dsk:Uint8Array, version:number): Promise<string> {
		let protocol_map:number, text:string;

		text = conv2DecimalPadding(product_data["s2_keys"], 3);
		text = text + conv2Decimal(dsk, "");
		// #ProductType
		text = text + "0010" + conv2DecimalPadding(product_data["device_type"], 5) + conv2DecimalPadding(product_data["device_icon"], 5);
		// #ProductID
		text = text + "0220" + conv2DecimalPadding(product_data["vendor"], 5) + conv2DecimalPadding(product_data["product_type"], 5) + conv2DecimalPadding(product_data["product_id"], 5) + conv2DecimalPadding(version, 5);
		// # Supported Protocols
		protocol_map = 0x01;
		if (product_data["LR"] == true)
			protocol_map = protocol_map | 0x02;
		text += "0803" + conv2DecimalPadding(protocol_map, 3);
		// # MaxInclusionInterval
		text = text + "0403005";// # ==5*128=640
		const buf:ArrayBuffer = Uint8Array.from(unescape(encodeURIComponent(text)), c=>c.charCodeAt(0)).buffer;
		const digest:Uint8Array = new Uint8Array(await crypto.subtle.digest('SHA-1', buf));
		text = "9001" + conv2DecimalPadding((digest[0x0] << 0x8) | digest[0x1], 5) + text;
		return (text);
	}


	private async _readNVM(addr:number, size:number): Promise<SapiClassRet> {
		return (await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER, [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF]));
	}

	private async _get_param_info(out:ZunoSapiClassParamInfo): Promise<void> {
		out.status = ZunoSapiClassStatus.NOT_INIT;
		const param_info:SapiClassRet = await this._readNVM(0xFFE000, 0x09);
		if (param_info.status != SapiClassStatus.OK) {
			out.status = ((param_info.status as unknown) as ZunoSapiClassStatus);
			return ;
		}
		const param:Array<number> = param_info.data;
		if (param.length < 0x2) {
			out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
			return ;
		}
		out.raw = param;
		out.freq_i = param_info.data[1];
		out.freq_str = this._freq_int_to_str(out.freq_i);
		if ((out.freq_str == "US_LR") || (out.freq_str == "US") || (out.freq_str == "US_LR_BK"))
			out.bLR = true;
	}

	private async _get_board_info(out:ZunoSapiClassBoardInfo): Promise<void> {
		let code_sz_shift:number, shift_smrt:number, bLR:boolean;
	
		out.status = ZunoSapiClassStatus.NOT_INIT;
		out.smart_qr = undefined;
		out.zwdata = undefined;
		out.home_id = undefined;
		out.node_id = undefined;
		bLR = false;
		if (this.param_info.status == ZunoSapiClassStatus.OK)
			bLR = this.param_info.bLR;
		const board_info:SapiClassRet = await this._readNVM(0xFFFF00, 0x01);
		if (board_info.status != SapiClassStatus.OK) {
			out.status = ((board_info.status as unknown) as ZunoSapiClassStatus);
			return ;
		}
		const info:Array<number> = board_info.data;
		if (info.length < 42) {
			out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
			return ;
		}
		out.status = ZunoSapiClassStatus.OK;
		const version:number = ((info[0] << 8) | (info[1]));
		out.build_number = (info[2] << 24) | (info[3] << 16) |  (info[4] << 8) | (info[5]);
		out.version = (version << 16 | (out.build_number & 0xFFFF));
		out.build_ts = (info[6] << 24) | (info[7] << 16) | (info[8] << 8) | (info[9]);
		out.hw_rev =  (info[10] << 8) | (info[11]);
		if (out.build_number > 1116) {
			code_sz_shift = 0x1;
			out.code_size = costruct_int(info.slice(12,12+3), 3, false);
		}
		else {
			code_sz_shift = 0x0;
			out.code_size =  (info[12] << 8) | (info[13]);
		}
		out.ram_size =  (info[14+code_sz_shift] << 8) | (info[15+code_sz_shift]);
		out.chip_uuid = new Uint8Array(info.slice(16+code_sz_shift,16+code_sz_shift+8));
		out.s2_pub = new Uint8Array(info.slice(24+code_sz_shift,24+code_sz_shift+16));
		out.dbg_lock = info[40+code_sz_shift];
		const offset_base:number = 46;
		if (info.length < offset_base)
			return ;
		out.home_id = costruct_int(info.slice(41+code_sz_shift,41+code_sz_shift+4), 4, false);
		out.node_id = info[45+code_sz_shift];
		if (out.build_number < 1669) {
			shift_smrt = 90;
			if (info.length < (offset_base + code_sz_shift + shift_smrt))
				return ;
			out.smart_qr = toString(info.slice(46+code_sz_shift,46+code_sz_shift+90));
		}
		else {
			shift_smrt = 11;
			if (info.length < (offset_base + code_sz_shift + shift_smrt))
				return ;
			out.zwdata =
			{
				s2_keys: info[46+code_sz_shift],
				device_type: costruct_int(info.slice(47+code_sz_shift, 47+code_sz_shift+2), 2, false),
				device_icon: costruct_int(info.slice(49+code_sz_shift, 49+code_sz_shift+2), 2, false),
				vendor: costruct_int(info.slice(51+code_sz_shift, 51+code_sz_shift+2), 2, false),
				product_type: costruct_int(info.slice(53+code_sz_shift, 53+code_sz_shift+2), 2, false),
				product_id: costruct_int(info.slice(55+code_sz_shift, 55+code_sz_shift+2), 2, false),
				version: version,
				LR: bLR,
			};
			out.smart_qr = await this.compile_zwave_qrcode(out.zwdata, out.s2_pub, version);
		}
	}

	public getBoardInfo(): ZunoSapiClassBoardInfo {
		return (this.board_info);
	}


	public getQuantumSize(): number {
		return (this.sapi.getQuantumSize());
	}

	public lock() {
		return (this.sapi.lock());
	}

	public unlock() {
		return (this.sapi.unlock());
	}

	public is_busy(): boolean {
		return (this.sapi.is_busy());
	}

	public async connect(): Promise<void> {
		await this._get_param_info(this.param_info);
		await this._get_board_info(this.board_info);
		// await this._begin(true);
	}

	constructor(sapi:SapiClass) {
		this.sapi = sapi;
	}
}