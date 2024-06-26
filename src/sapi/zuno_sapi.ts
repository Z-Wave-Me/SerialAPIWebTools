
import {SapiClass, SapiClassStatus, SapiClassFuncId, SapiClassRet} from "./sapi";
import {costruct_int, toString, conv2Decimal, conv2DecimalPadding, checksum} from "../other/utilities";

export {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo, ZunoSapiClassParamInfo, ZunoSapiClassRegion, ZunoSapiClassPower};

interface ZunoSapiClassPower
{
	status:ZunoSapiClassStatus;
	power_raw:number;
	step:number;
	min:number;
	max:number;
}


interface ZunoSapiClassRegion
{
	status:ZunoSapiClassStatus;
	region:string;
	region_array:string[];
}

enum ZunoSapiClassStatus
{
	OK = SapiClassStatus.OK,
	NOT_INIT = SapiClassStatus.LAST_STATUS,
	WRONG_LENGTH_CMD,
	WRONG_STATUS,
	NO_FREEZE,
	INVALID_ARG,
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
	main_pow:number;
	bLR:boolean;
}

interface ZunoSapiClassBoardInfoProduction
{
	prod_raw:Uint8Array;
	prod_parent_uuid:Uint8Array;
	prod_ts:number;
	prod_sn:number;
	prod_crc8:number;
	prod_valid:boolean;
}

interface ZunoSapiClassLicenseFlag
{
	name:string;
	title:string;
	active:boolean;
}


interface ZunoSapiClassBoardInfoLicense
{
	lic_subvendor:number;
	lic_flags_raw:Uint8Array;
	lic_flags:{[key:number]: ZunoSapiClassLicenseFlag};
}

interface ZunoSapiClassBoardInfoChip
{
	chip_family:number;
	chip_type:number;
	keys_hash:number;
	se_version:number;
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
	boot_offset:number;
	chip_uuid:Uint8Array;
	s2_pub:Uint8Array;
	max_default_power:number;
	ext_nvm:number;
	zwdata?:ZunoSapiClassBoardInfoZwDataProt,
	smart_qr?:string;
	dbg_lock:number;
	home_id?:number;
	node_id?:number;
	product?:ZunoSapiClassBoardInfoProduction;
	license?:ZunoSapiClassBoardInfoLicense;
	chip?:ZunoSapiClassBoardInfoChip;
}

// ------------------------------------------------------------------------------------------------------
class ZunoSapiClass {
	private readonly license_flags: {[key:number]: ZunoSapiClassLicenseFlag}				=
	{
		0x00: {name:"Pti", title: "Provides Packet Trace Interface (PTI) capabilities. Turns ZUno to advanced sniffer.", active:false},
		0x01: {name:"Key dump", title: "Enables Z-Wave network key dump using Z-Uno.", active:false},
		0x02: {name:"Custom vendor", title: "Use custom vendor code intead of 0115 (ZME)", active:false},
		0x03: {name:"Modem", title: "ZUno works as direct transmitter.", active:false},
		0x04: {name:"Max power", title: "User is able to use the maximum power of radio amplifier.", active:false},
		0x05: {name:"Long Range", title: "Enables Z-Wave LongRange technology support.", active:false},
	};
	
	private readonly sapi:SapiClass;

	private readonly region_array:string[]														=
	[
		"EU", "US", "ANZ", "HK", "IN", "IL", "RU", "CN", "JP", "KR"
	];
	private readonly region_array_full:string[]														=
	[
		"EU", "US", "ANZ", "HK", "IN", "IL", "RU", "CN", "US_LR", "JP", "KR"
	];
	private readonly region_string_to_number: {[key:string]: number}							=
	{
		"EU": 0x00, "US": 0x01, "ANZ": 0x02, "HK": 0x03, "IN": 0x05, "IL": 0x06,
		"RU": 0x07, "CN": 0x08, "US_LR": 0x09, "JP": 0x20, "KR": 0x21
	};
	private readonly region_number_to_string: {[key:number]: string}							=
	{
		0x00:"EU", 0x01:"US", 0x02: "ANZ", 0x03:"HK", 0x05:"IN", 0x06:"IL",
		0x07:"RU", 0x08:"CN", 0x09:"US_LR",0x20: "JP", 0x21:"KR"
	};


	private board_info:ZunoSapiClassBoardInfo												= this._get_board_info_default();
	private param_info:ZunoSapiClassParamInfo												= this._get_param_info_default();

	private _get_param_info_default(): ZunoSapiClassParamInfo {
		const param_info:ZunoSapiClassParamInfo												=
		{	
			status:ZunoSapiClassStatus.NOT_INIT, freq_i:0x0, freq_str:"", bLR:false, raw:[], main_pow:0x0
		};
		return (param_info);
	}

	private _get_board_info_default(): ZunoSapiClassBoardInfo {
		const board_info:ZunoSapiClassBoardInfo												=
		{	
			status:ZunoSapiClassStatus.NOT_INIT, version:0x0, build_number:0x0, build_ts:0x0, hw_rev:0x0, code_size:0x0, ram_size:0x0, dbg_lock:0x0, custom_code_offset:0x30000, chip_uuid: new Uint8Array(), s2_pub: new Uint8Array(),
			boot_offset:0x3a000, max_default_power:50, ext_nvm:0x0
		};
		return (board_info);
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

	private async _writeNVM(addr:number, buff:Array<number>): Promise<SapiClassRet> {
		const size = buff.length;
		const data_addr = [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF];
		return (await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER, data_addr.concat(buff)));
	}

	private async _get_param_info(): Promise<void> {
		let freq_str:string|undefined;

		this.param_info = this._get_param_info_default();
		const out:ZunoSapiClassParamInfo = this.param_info;
		const param_info:SapiClassRet = await this._readNVM(0xFFE000, 0x09);
		if (param_info.status != SapiClassStatus.OK) {
			out.status = ((param_info.status as unknown) as ZunoSapiClassStatus);
			return ;
		}
		const param:Array<number> = param_info.data;
		if (param.length < 0x3) {
			out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
			return ;
		}
		out.status = ZunoSapiClassStatus.OK;
		out.raw = param;
		out.freq_i = param_info.data[1];
		freq_str = this.region_number_to_string[out.freq_i];
		if (freq_str == undefined)
			freq_str = "UNKNOWN";
		out.freq_str = freq_str;
		if ((freq_str == "US_LR") || (freq_str == "US") || (freq_str == "US_LR_BK"))
			out.bLR = true;
		out.main_pow = param_info.data[2];
	}

	private async _get_board_info(): Promise<void> {
		let code_sz_shift:number, shift_smrt:number, bLR:boolean, byte_i:number, bit_i:number;
	
		this.board_info = this._get_board_info_default();
		const out:ZunoSapiClassBoardInfo = this.board_info;
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
		const offset_code:number = offset_base + code_sz_shift + shift_smrt;
		if (info.length < (offset_code + 0x4))
			return ;
		out.custom_code_offset = costruct_int(info.slice(offset_code, offset_code + 0x4), 0x4, false);
		if(out.custom_code_offset > 0x36000)
			out.boot_offset = 0x40000;
		const offset_prod:number = offset_code + 0x4;
		if (info.length < (offset_prod + 0x10))
			return ;
		out.product =
		{
			prod_raw: new Uint8Array(info.slice(offset_prod, offset_prod + 0x10)),
			prod_parent_uuid: new Uint8Array(info.slice(offset_prod, offset_prod + 0x8)),
			prod_ts: costruct_int(info.slice(offset_prod + 0x8, offset_prod +0x8 + 0x4), 0x4, true),
			prod_sn: costruct_int(info.slice(offset_prod + 0x8 + 0x4, offset_prod +0x8 + 0x4 + 0x3), 0x3, true),
			prod_crc8: info[offset_prod + 0x8 + 0x4 + 0x3],
			prod_valid: (info[offset_prod + 0x8 + 0x4 + 0x3] == checksum(info.slice(offset_prod, offset_prod + 0x10 - 0x1))) ? true:false
		};
		const offset_license:number = offset_prod + 0x10;
		if (info.length < (offset_license + 0xA))
			return ;
		out.license =
		{
			lic_subvendor: costruct_int(info.slice(offset_license, offset_license + 0x2), 0x2, false),
			lic_flags_raw: new Uint8Array(info.slice(offset_license + 0x2, offset_license + 0x2 + 0x8)),
			lic_flags: this.license_flags,
		};
		byte_i = 0x0;
		while (byte_i < out.license.lic_flags_raw.length) {
			bit_i = 0x0;
			while (bit_i < 0x8) {
				if ((out.license.lic_flags_raw[byte_i] & (0x1 << bit_i)) != 0x0) {
					if (out.license.lic_flags[byte_i * 0x8 + bit_i] != undefined)
						out.license.lic_flags[byte_i * 0x8 + bit_i].active = true;
				}
				bit_i++;
			}
			byte_i++;
		}
		const offset_power:number = offset_license + 0xA;
		if (info.length < (offset_power + 0x1))
			return ;
		out.max_default_power = info[offset_power];
		const offset_ext_nvm:number = offset_power + 0x1;
		if (info.length < (offset_ext_nvm + 0x2))
			return ;
		out.ext_nvm =  costruct_int(info.slice(offset_ext_nvm, offset_ext_nvm + 0x2), 0x2, false);
		const offset_chip:number = offset_ext_nvm + 0x2;
		if (info.length < (offset_chip + 0xA))
			return ;
		out.chip = 
		{
			chip_family:info[offset_chip],
			chip_type:info[offset_chip + 0x1],
			keys_hash:costruct_int(info.slice(offset_chip + 0x2, offset_chip + 0x2 + 0x4), 0x4, false),
			se_version:costruct_int(info.slice(offset_chip + 0x2 + 0x4, offset_chip + 0x2 + 0x4 + 0x4), 0x4, false)
		};
	}

	private async _apply_param(raw:Array<number>): Promise<ZunoSapiClassStatus> {
		const res:SapiClassRet = await this._writeNVM(0xFFE000, raw);
		if (res.status != SapiClassStatus.OK)
			return ((res.status as unknown) as ZunoSapiClassStatus);
		if (res.data.length < 0x1)
			return (ZunoSapiClassStatus.WRONG_LENGTH_CMD);
		if (res.data[0x0] != 0x1)
			return (ZunoSapiClassStatus.WRONG_STATUS);
		const soft_reset:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [])
		if (soft_reset.status != SapiClassStatus.OK)
			return ((soft_reset.status as unknown) as ZunoSapiClassStatus);
		const freeze_zuno_info:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x2], 0x2, 3000);
		if (freeze_zuno_info.status != SapiClassStatus.OK || freeze_zuno_info.data[0x0] != 0x0)
			return (ZunoSapiClassStatus.NO_FREEZE);
		return (ZunoSapiClassStatus.OK);
	}

	public getBoardInfo(): ZunoSapiClassBoardInfo {
		return (this.board_info);
	}

	public getRegion(): ZunoSapiClassRegion {
		let region_array:string[];

		region_array = this.region_array;
		if (this.board_info.status == ZunoSapiClassStatus.OK && this.board_info.license != undefined) {
			if (this.board_info.license.lic_flags[0x05] != undefined && this.board_info.license.lic_flags[0x05].active == true)
				region_array = this.region_array_full;
		}
		const out:ZunoSapiClassRegion = {
			status:this.param_info.status, 
			region:this.param_info.freq_str, 
			region_array:region_array};
		return (out);
	}

	public async setRegion(region:string): Promise<ZunoSapiClassStatus> {
		const freq_i:number|undefined = this.region_string_to_number[region];
		if (freq_i == undefined)
			return (ZunoSapiClassStatus.INVALID_ARG);
		if (this.param_info.status != ZunoSapiClassStatus.OK)
			return (this.param_info.status);
		const raw:Array<number> =  this.param_info.raw;
		raw[0x1] = freq_i;
		if (raw.length > 0x8)
			raw[0x8] = freq_i;
		return (await this._apply_param(raw));
	}

	public getPower(): ZunoSapiClassPower {
		const out:ZunoSapiClassPower = {
			status:this.param_info.status,
			power_raw:this.param_info.main_pow,
			step:0x1,
			min:1,
			max:this.board_info.max_default_power,
		};
		return (out);
	}

	public async setPower(power:number): Promise<ZunoSapiClassStatus> {
		if (this.param_info.status != ZunoSapiClassStatus.OK)
			return (this.param_info.status);
		const raw:Array<number> =  this.param_info.raw;
		raw[0x2] = power;
		return (await this._apply_param(raw));
	}

	public async setDefault(): Promise<ZunoSapiClassStatus> {
		const res:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x5])
		if (res.status != SapiClassStatus.OK)
			return ((res.status as unknown) as ZunoSapiClassStatus);
		return (ZunoSapiClassStatus.OK);
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
		await this._get_param_info();
		await this._get_board_info();
		// await this._begin(true);
	}

	constructor(sapi:SapiClass) {
		this.sapi = sapi;
	}
}