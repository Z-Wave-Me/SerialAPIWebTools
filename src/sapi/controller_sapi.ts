import {ModeOfOperation} from 'aes-js';
import  {v4 as uuid_v4, parse as uuid_parse} from 'uuid';

import {SapiRegionClass} from "./region";
import {SapiClass, SapiClassStatus, SapiClassRet, SapiClassFuncId, SapiClassSerialAPISetupCmd, SapiClassNodeIdBaseType, SapiClassUpdateProcess, SapiClassDetectType, SapiClassDetectWait} from "./sapi";
import {costruct_int, calcSigmaCRC16, intToBytearrayMsbLsb} from "../other/utilities";
import {controller_vendor_ids} from "./vendorIds";

import {HardwareChipClass} from "../hardware/chip"

export {ControllerSapiClassLearnMode, ControllerSapiClasstInitData, ControllerSapiClass, ControllerSapiClassStatus, ControllerSapiClassCapabilities, ControllerSapiClassRegion, ControllerSapiClassLicense, ControllerSapiClassBoardInfo, ControllerSapiClassPower, ControllerSapiClasstNetworkIDs};

interface ControllerSapiClassLearnMode
{
	status:ControllerSapiClassStatus;
	seq:number;
}


enum ControllerSapiClassStatus
{
	OK = SapiClassStatus.OK,
	WRONG_LENGTH_CMD = SapiClassStatus.LAST_STATUS,
	UNSUPPORT_CMD,
	UNSUPPORT_SUB_CMD,
	WRONG_IN_DATA,
	INVALID_ARG,
	NOT_SET,
	WRONG_OUT_STATUS,
	WRONG_OUT_SUB_CMD,
	WRONG_SEQ,
	WRONG_CRC,
	WRONG_LENGTH_SEQ,
	WRONG_LENGTH_CALLBACK_STATUS,
	WRONG_LENGTH_CALLBACK,
	NOT_INIT,
	NOT_RAZBERRY,
	INVALID_SET,
	WRONG_SEND_DATA_LENGHT,
	UNKNOWN,
	TIMEOUT,
	PROCESS,
	LEARN_MODE_FALED,
	WRONG_RESPONSE_STATUS,
	WRONG_RESPONSE_LENGTH,
	WRONG_CALLBACK_LENGTH,
	WRONG_CALLBACK_SEQ,
	WRONG_CALLBACK_STATUS,
	TRANSMIT_COMPLETE_NO_ACK,
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

interface ControllerSapiClassPower
{
	status:ControllerSapiClassStatus;
	power_raw:number;
	step:number;
	min:number;
	max:number;
}

interface ControllerSapiClassLicenseFlag
{
	name:string;
	title:string;
	active:boolean;
}

interface ControllerSapiClassLicense
{
	status:ControllerSapiClassStatus;
	vallid:boolean;
	vendor_id:number
	max_nodes:number;
	count_support:number;
	crc16:number;
	flags:{[key:number]: ControllerSapiClassLicenseFlag};
}

interface ControllerSapiClassBoardInfo
{
	status:ControllerSapiClassStatus;
	core_version:number;
	build_seq:number;
	build_ts:number;
	hw_revision:number;
	sdk_version:number;
	chip_uuid:Array<number>;
	sn_raw:Array<number>;
	bootloader_version:number;
	bootloader_crc32:number;
	lock_status:number;
	lock_status_name:string;
	se_version:number
	chip_family:number;
	chip_type:number;
	keys_hash:number;
}

interface ControllerSapiClasstNetworkIDs
{
	status:ControllerSapiClassStatus;
	home:number;
	node_id:number;
}

interface ControllerSapiClasstInitData
{
	status:ControllerSapiClassStatus;
	node_list:Array<number>
}

// ------------------------------------------------------------------------------------------------------

interface ControllerOutData
{
	data:Array<number>;
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

enum ControllerSapiClassLearMode
{
	DISABLED = 0x0,
	INCLUSION_EXCLUSION = 0x1,
}

class ControllerSapiClass {
	private readonly RAZ7_LICENSE_CMD															= 0xF5;
	private readonly RAZ7_LICENSE_CRC															= 0x1D0F;
	private readonly RAZ7_LICENSE_STATUS_OK														= 0x00;
	private readonly RAZ7_LICENSE_GET_SUBCMD													= 0x00;
	private readonly RAZ7_LICENSE_NONCE_SUBCMD													= 0x02;
	private readonly RAZ7_LICENSE_SET_SUBCMD													= 0x01;
	private readonly RAZ7_LICENSE_CMD_LEN														= 0x30;
	private readonly RAZ7_LICENSE_NONCE_LEN														= 0x08;
	private readonly RAZ7_LICENSE_IV_LEN														= 0x10;
	private readonly RAZ7_FLAG_OFFSET															= 0x03
	private readonly RAZ7_FLAGS_SIZE															= 0x08;
	private readonly RAZ7_COUNT_SUPPORT_OFFSET													= this.RAZ7_FLAG_OFFSET + this.RAZ7_FLAGS_SIZE

	private readonly LICENSE_KEY_LONG_RANGE:number												= 0x5;
	private readonly LICENSE_KEY_BACKUP:number													= 0x2;
	private readonly license_flags: {[key:number]: ControllerSapiClassLicenseFlag}				=
	{
		0x00: {name:"Controller Static API", title: "Enables static cotroller mode. User can switch Razberry to \"staic\" mode instead of default \"bridge\"", active:false},
		0x01: {name:"Allow max RF power", title: "If set user can increase power amplifier up to 24dBm. Without that flag the user is limited by 7dBm", active:false},
		0x02: {name:"Backup/Restore", title: "Enables backup/restore operations", active:false},
		0x03: {name:"Battery save on sleeping", title: "If controller doesn't respond to WakeUp Notification, razberry responds itself with WakUp No more information. This prevents device battery discharge", active:false},
		0x04: {name:"Advanced network diagnostics", title: "Enables backward RSSI dump and other extendended ZME features", active:false},
		0x05: {name:"Z-Wave Long Range", title: "Enables Z-Wave Long Range support", active:false},
		0x06: {name:"Fast communications", title: "Enables UART baudrate setting command", active:false},
		0x07: {name:"Change vendor ID", title: "Maps subvendor to vendor field in controller information", active:false},
		0x08: {name:"Promiscuous mode (Zniffer)", title: "Enables promisc functionality. Controller dumps all the packages in its network", active:false},
		0x0A: {name:"RF jamming detection", title: "Enables jamming detection notifications", active:false},
		0x0B: {name:"Zniffer in PTI mode", title: "Enables Packet Trace Interface. Device dumps all the packets it sends and receives. This uses external UART interface and doesn't consume time of the main core", active:false},
		0x0C: {name:"Zniffer and Advanced Radio Tool", title: "Razberry works as direct transmitter", active:false},
	};

	private readonly sapi:SapiClass;
	private readonly raz_key:Array<number>														= [0x86, 0x78, 0x02, 0x09, 0x8D, 0x89, 0x4D, 0x41, 0x8F, 0x3F, 0xD2, 0x04, 0x2E, 0xEC, 0xF5, 0xC4, 0x05, 0x8C, 0xB9, 0x36, 0xA9, 0xCC, 0x4B, 0x87, 0x91, 0x39, 0x36, 0xB7, 0x43, 0x18, 0x37, 0x42];

	private region:SapiRegionClass																= new SapiRegionClass();
	private node_base:SapiClassNodeIdBaseType													= SapiClassNodeIdBaseType.TYPE_8_BIT;
	private seqNo:number																		= 0x1;
	private capabilities:ControllerSapiClassCapabilities										= {status:ControllerSapiClassStatus.NOT_INIT, ApiVersion:0x0, ApiRevision:0x0, VendorID:0x0, VendorIDName:"Unknown", cmd_mask:[]};
	private license:ControllerSapiClassLicense													= {status:ControllerSapiClassStatus.NOT_INIT, vallid:false, vendor_id:0x0, max_nodes:0x0, count_support:0x0, flags:[], crc16:0x0};
	private board_info:ControllerSapiClassBoardInfo												= {	status:ControllerSapiClassStatus.NOT_INIT, core_version:0x0, build_seq:0x0, build_ts:0x0, hw_revision:0x0, sdk_version:0x0, chip_uuid:[], sn_raw:[], bootloader_version:0x0, bootloader_crc32:0x0,lock_status:0x0,
																									lock_status_name:"", se_version:0x0, chip_type:HardwareChipClass.CHIP_ZGM130S037HGN1, chip_family:HardwareChipClass.FAMILY_ZGM13, keys_hash:0x2C6FAF52};

	private _set_seq(): number {
		const seq:number = this.seqNo;
		this.seqNo += 1;
		this.seqNo &= 0XFF;// 1 byte
		if (this.seqNo == 0x0)
			this.seqNo++;
		return (seq);
	}

	private _test_cmd(cmd:number): boolean {
		if (this.capabilities.status != ControllerSapiClassStatus.OK)
			return (false);
		if (cmd <= 0x0)
			return (false);
		cmd--;
		if ((cmd / 0x8) >= this.capabilities.cmd_mask.length)
			return (false);
		if ((this.capabilities.cmd_mask[(cmd - (cmd % 0x8)) / 0x8] & (0x1 << (cmd % 0x8))) == 0x0)
			return (false);
		return (true);
	}

	private async _serial_api_setup(sub:SapiClassSerialAPISetupCmd, args:Array<number>): Promise<ControllerSapiClassSerialApiSetup> {
		const out:ControllerSapiClassSerialApiSetup = {status:ControllerSapiClassStatus.OK, data:[]};
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_SERIAL_API_SETUP) == false) {
			out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
			return (out);
		}
		const serial_api_setup:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SETUP, [sub].concat(args));
		if (serial_api_setup.status != SapiClassStatus.OK) {
			out.status = ((serial_api_setup.status as unknown) as ControllerSapiClassStatus);
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

	private async _get_capabilities(out:ControllerSapiClassCapabilities): Promise<void> {
		const capabilities_info:SapiClassRet =  await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_GET_CAPABILITIES, []);
		if (capabilities_info.status != SapiClassStatus.OK) {
			out.status = ((capabilities_info.status as unknown) as ControllerSapiClassStatus);
			return ;
		}
		if (capabilities_info.data.length <= 0x8) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return ;
		}
		out.status = ControllerSapiClassStatus.OK;
		out.ApiVersion = capabilities_info.data[0x0];
		out.ApiRevision = capabilities_info.data[0x1];
		out.VendorID = capabilities_info.data[0x2] << 0x8 | capabilities_info.data[0x3];
		out.cmd_mask = capabilities_info.data.slice(0x8, capabilities_info.data.length);
		if (Object.hasOwn(controller_vendor_ids, out.VendorID) == true) {
			out.VendorIDName = controller_vendor_ids[out.VendorID].Name;
			out.VendorIDWebpage = controller_vendor_ids[out.VendorID].Webpage;
		}
	}

	private async _readNVM(addr:number, size:number): Promise<SapiClassRet> {
		return (await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER, [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF]));
	}

	private async _license_send(out:ControllerOutData, data:Array<number>): Promise<ControllerSapiClassStatus> {
		let nonse_info:SapiClassRet;
	
		const seq:number = this._set_seq();
		nonse_info = await this.sapi.sendCommandUnSz(this.RAZ7_LICENSE_CMD, data.concat([seq]));
		if (nonse_info.status != SapiClassStatus.OK)
			return ((nonse_info.status as unknown) as ControllerSapiClassStatus);
		if (nonse_info.data.length < 0x1)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
		if (nonse_info.data[0x0] != this.RAZ7_LICENSE_STATUS_OK)
			return (ControllerSapiClassStatus.WRONG_OUT_STATUS);
		nonse_info = await this.sapi.recvIncomingRequest(1000, this.RAZ7_LICENSE_CMD);
		if (nonse_info.status != SapiClassStatus.OK)
			return ((nonse_info.status as unknown) as ControllerSapiClassStatus);
		if (nonse_info.data.length < 0x1)//0x1 seq
			return (ControllerSapiClassStatus.WRONG_LENGTH_SEQ);
		if (nonse_info.data[0x0] != seq)
			return (ControllerSapiClassStatus.WRONG_SEQ);
		out.data = nonse_info.data.slice(0x1, nonse_info.data.length);
		return (ControllerSapiClassStatus.OK);
	}

	private _license_decrypt(data:Array<number>, iv:Array<number>): Array<number>|undefined {
		const aesCtr = new ModeOfOperation.ofb(this.raz_key, iv);
		const decryptedBytes:Uint8Array = aesCtr.decrypt(data);
		const crc16:number = decryptedBytes[decryptedBytes.length - 0x2] |(decryptedBytes[decryptedBytes.length - 0x1] << 0x8);
		if (calcSigmaCRC16(this.RAZ7_LICENSE_CRC, decryptedBytes, 0x0, decryptedBytes.length - 0x2) != crc16)
			return (undefined);
		return (Array.from(decryptedBytes));
	}

	private _license_encrypt(sub_cmd:number, data:Array<number>, iv:Array<number>): Array<number> {
		const pack:Array<number> = [sub_cmd].concat(data);
		while(pack.length < (this.RAZ7_LICENSE_CMD_LEN - 0x2))
			pack.push(0xFF);
		const crc:number = calcSigmaCRC16(this.RAZ7_LICENSE_CRC, pack, 0, pack.length);
		pack.push(crc & 0xFF);
		pack.push((crc >> 0x8) & 0xFF);
		const aesCtr = new ModeOfOperation.ofb(this.raz_key, iv);
		const crypted:Array<number> = Array.from(aesCtr.encrypt(pack));
		return (crypted);
	}

	private async _license_get_nonce(out:ControllerOutData): Promise<ControllerSapiClassStatus> {
		const status:ControllerSapiClassStatus = await this._license_send(out, [])
		if (status != ControllerSapiClassStatus.OK)
			return (status);
		if (out.data.length != this.RAZ7_LICENSE_CMD_LEN + this.RAZ7_LICENSE_IV_LEN)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK);
		const decrypt:Array<number>|undefined = this._license_decrypt(out.data.slice(0x0, 0x0 + this.RAZ7_LICENSE_CMD_LEN), out.data.slice(this.RAZ7_LICENSE_CMD_LEN, this.RAZ7_LICENSE_CMD_LEN + this.RAZ7_LICENSE_IV_LEN));
		if (decrypt == undefined)
			return (ControllerSapiClassStatus.WRONG_CRC);
		if (decrypt.length < 0x2 + this.RAZ7_LICENSE_NONCE_LEN)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK);
		if (decrypt[0x0] != this.RAZ7_LICENSE_NONCE_SUBCMD)
			return (ControllerSapiClassStatus.WRONG_OUT_STATUS);
		if (decrypt[0x1] != this.RAZ7_LICENSE_STATUS_OK)
			return (ControllerSapiClassStatus.WRONG_OUT_STATUS);
		out.data = decrypt.slice(0x2, 0x2 + this.RAZ7_LICENSE_NONCE_LEN);
		return (ControllerSapiClassStatus.OK);
	}

	private async _license(sub_cmd:number, data:Array<number>, out:ControllerOutData): Promise<ControllerSapiClassStatus> {
		let status:ControllerSapiClassStatus;

		if (this._test_cmd(this.RAZ7_LICENSE_CMD) == false)
			return (ControllerSapiClassStatus.UNSUPPORT_CMD);
		if (this.isRazberry7() == false)
			return (ControllerSapiClassStatus.NOT_RAZBERRY);
		status = await this._license_get_nonce(out);
		if (status != ControllerSapiClassStatus.OK)
			return (status);
		const iv_y:Array<number> = Array.from(uuid_parse(uuid_v4())).slice(0x0, 0x8);
		const iv:Array<number> = out.data.concat(iv_y);
		const crypted:Array<number> = this._license_encrypt(sub_cmd, data, iv);
		status = await this._license_send(out, crypted.concat(iv_y));
		if (status != ControllerSapiClassStatus.OK)
			return (status);
		const decrypt:Array<number>|undefined = this._license_decrypt(out.data, iv);
		if (decrypt == undefined)
			return (ControllerSapiClassStatus.WRONG_CRC);
		if (decrypt.length < 0x2)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK);
		if (decrypt[0x0] != sub_cmd)
			return (ControllerSapiClassStatus.WRONG_OUT_SUB_CMD);
		if (decrypt[0x1] != this.RAZ7_LICENSE_STATUS_OK)
			return (ControllerSapiClassStatus.WRONG_OUT_STATUS);
		out.data = decrypt.slice(0x2, decrypt.length);
		return (ControllerSapiClassStatus.OK);
	}

	private _license_decode(license_info:ControllerSapiClassLicense, raw_license:Array<number>): void {
		let byte_i:number, bit_i:number;

		if (raw_license.length < 32)
			return ;
		raw_license = raw_license.slice(0, 32);
		const crc16:number = raw_license[raw_license.length - 0x2] |(raw_license[raw_license.length - 0x1] << 0x8);
		if (calcSigmaCRC16(this.RAZ7_LICENSE_CRC, raw_license, 0x0, raw_license.length - 0x2) != crc16)
			return ;
		license_info.crc16 = crc16;
		license_info.vallid = true;
		license_info.vendor_id = (raw_license[0x0] << 0x8) | raw_license[0x1];
		license_info.max_nodes = raw_license[0x2];
		license_info.count_support = (raw_license[this.RAZ7_COUNT_SUPPORT_OFFSET+1] << 8) + raw_license[this.RAZ7_COUNT_SUPPORT_OFFSET];
		byte_i = 0x0;
		while (byte_i < this.RAZ7_FLAGS_SIZE) {
			bit_i = 0x0;
			while (bit_i < 0x8) {
				if ((raw_license[this.RAZ7_FLAG_OFFSET + byte_i] & (0x1 << bit_i)) != 0x0) {
					if (Object.hasOwn(license_info.flags, byte_i * 0x8 + bit_i) == true)
						license_info.flags[byte_i * 0x8 + bit_i].active = true;
				}
				bit_i++;
			}
			byte_i++;
		}
		return ;
	}

	private async _license_get(license_info:ControllerSapiClassLicense): Promise<void> {
		const out:ControllerOutData = {data:[]};
		license_info.flags = this.license_flags;
		license_info.status = await this._license(this.RAZ7_LICENSE_GET_SUBCMD, [], out);
		if (license_info.status != ControllerSapiClassStatus.OK)
			return ;
		this._license_decode(license_info, out.data);
		return ;
	}

	private async _get_board_info(out:ControllerSapiClassBoardInfo): Promise<void> {
		let lock_status_name:string;

		if (this._test_cmd(SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER) == false) {
			out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
			return ;
		}
		const board_info:SapiClassRet = await this._readNVM(0xFFFF00, 0x31);
		if (board_info.status != SapiClassStatus.OK) {
			out.status = ((board_info.status as unknown) as ControllerSapiClassStatus);
			return ;
		}
		const data:Array<number> = board_info.data;
		if (data.length < 49) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return ;
		}
		out.status = ControllerSapiClassStatus.OK;
		out.core_version = costruct_int(data.slice(0, 0 + 2),2, false);
		out.build_seq = costruct_int(data.slice(2, 2 +4), 4, false);
		out.build_ts = costruct_int(data.slice(6, 6 + 4), 4, false);
		out.hw_revision = costruct_int(data.slice(10, 10 + 2), 2, false);
		out.sdk_version = costruct_int(data.slice(12, 12 + 4), 4, false);
		out.chip_uuid = data.slice(16, 16 + 8);
		out.sn_raw = data.slice(24,40);
		out.bootloader_version = costruct_int(data.slice(40, 44), 4, false);
		out.bootloader_crc32 = costruct_int(data.slice(44, 48), 4, false);
		out.lock_status = data[48];
		switch (data[48]) {
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
		out.lock_status_name = lock_status_name;
		const se_version_offset:number = 49;
		const se_version_size:number = 0x4;
		if (data.length < se_version_offset + se_version_size)
			return ;
		out.se_version = costruct_int(data.slice(se_version_offset, se_version_offset + se_version_size), se_version_size, false);
		const chip_offset:number = se_version_offset + se_version_size;
		const chip_size:number = 0x2;
		if (data.length < chip_offset + chip_size)
			return ;
		out.chip_family = data[chip_offset];
		out.chip_type = data[chip_offset + 0x1];
		const key_hash_offset:number = chip_offset + chip_size;
		const key_hash_size:number = 0x4;
		if (data.length < key_hash_offset + key_hash_size)
			return ;
		out.keys_hash = costruct_int(data.slice(key_hash_offset, key_hash_offset + key_hash_size), key_hash_size, false);
	}

	private async _begin(test:boolean):Promise<void> {
		let us_lr:boolean, eu_lr:boolean;

		await this._get_capabilities(this.capabilities);
		if (test == true && this.capabilities.status != ControllerSapiClassStatus.OK)
			return ;
		const node_base_type:ControllerSapiClassSerialApiSetup = await this._serial_api_setup(SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_NODEID_BASETYPE_SET, [SapiClassNodeIdBaseType.TYPE_16_BIT]);
		if (node_base_type.data.length < 0x1 || node_base_type.data[0x0] == 0x0)
			this.node_base = SapiClassNodeIdBaseType.TYPE_8_BIT;
		else
			this.node_base = SapiClassNodeIdBaseType.TYPE_16_BIT;
		if (this.isRazberry7() == true) {
			await this._license_get(this.license);
			await this._get_board_info(this.board_info);
			us_lr = false;
			eu_lr = false;
			if (this.license.status == ControllerSapiClassStatus.OK) {
				if (this.license.flags[this.LICENSE_KEY_LONG_RANGE] != undefined && this.license.flags[this.LICENSE_KEY_LONG_RANGE].active == true) {
					us_lr = true;
					const version:number = (this.capabilities.ApiVersion << 0x8) | this.capabilities.ApiRevision;
					if (this.capabilities.status == ControllerSapiClassStatus.OK && version >= 0x72D)
						eu_lr = true;
				}
			}
			this.region = new SapiRegionClass(us_lr, eu_lr);
		}
		else
			this.region = new SapiRegionClass();
		return ;
	}

	private _node_to_bytes(node:number): Uint8Array {
		if (this.node_base == SapiClassNodeIdBaseType.TYPE_16_BIT)
			return (intToBytearrayMsbLsb(node, 0x2));
		return (intToBytearrayMsbLsb(node, 0x1));
	}

	private async _load_file(addr:number, data:Uint8Array, process:SapiClassUpdateProcess|null): Promise<ControllerSapiClassStatus> {
		let step:number, i:number, percentage:number;
		step = this.getQuantumSize();
		percentage = 0x0;
		i = 0x0
		while (i < data.length) {
			if (i + step > data.length)
				step = data.length - i;
			percentage = (i * 100.0) / data.length;
			if (process != null)
				process(percentage);
			const status:ControllerSapiClassStatus = await this.nvmWrite(addr, data.subarray(i, i + step));
			if (status != ControllerSapiClassStatus.OK)
				return (status);
			i = i + step
			addr = addr + step
		}
		if (process != null && percentage < 100.00)
			process(100.00);
		return (ControllerSapiClassStatus.OK);
	}

	private _isRazberry(): boolean {
		if (this.capabilities.status != ControllerSapiClassStatus.OK)
			return (false);
		if (this.capabilities.VendorID == 0x0115 || this.capabilities.VendorID == 0x0147)
			return (true);
		return (false);
	}

	private async _learn_mode(mode:ControllerSapiClassLearMode): Promise<ControllerSapiClassLearnMode> {
		const out:ControllerSapiClassLearnMode = {status:ControllerSapiClassStatus.OK, seq:0x0};
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_ZW_SET_LEARN_MODE) == false) {
			out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
			return (out);
		}
		const seq:number = this._set_seq();
		const send_mode:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_ZW_SET_LEARN_MODE, [mode, seq]);
		if (send_mode.status != SapiClassStatus.OK) {
			out.status = ((send_mode.status as unknown) as ControllerSapiClassStatus);
			return (out);
		}
		if (send_mode.data.length != 0x1) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK_STATUS;
			return (out);
		}
		if (send_mode.data[0x0] != 0x1) {
			out.status = ControllerSapiClassStatus.WRONG_CALLBACK_STATUS;
			return (out);
		}
		out.seq = seq;
		return (out);
	}

	public async getPower(): Promise<ControllerSapiClassPower> {
		const power_get_out:ControllerSapiClassPower = {status: ControllerSapiClassStatus.OK, power_raw:0x0, step:0x1, min:1, max:247};
		if (this.isRazberry7() == false) {
			power_get_out.status = ControllerSapiClassStatus.NOT_RAZBERRY;
			return (power_get_out);
		}
		const power_get:ControllerSapiClassSerialApiSetup = await this._serial_api_setup(SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET, []);
		if (power_get.status != ControllerSapiClassStatus.OK) {
			power_get_out.status = power_get.status
			return (power_get_out);
		}
		if (power_get.data.length < 0x2) {
			power_get_out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return (power_get_out);
		}
		if (power_get.data[0x1] != 0x0) {
			power_get_out.status = ControllerSapiClassStatus.NOT_RAZBERRY;
			return (power_get_out);
		}
		power_get_out.power_raw = power_get.data[0x0];
		return (power_get_out);
	}

	public async setPower(power_raw:number): Promise<ControllerSapiClassStatus> {
		if (this.isRazberry7() == false)
			return (ControllerSapiClassStatus.NOT_RAZBERRY);
		const power_set:ControllerSapiClassSerialApiSetup = await this._serial_api_setup(SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET, [power_raw, 0x0]);
		if (power_set.status != ControllerSapiClassStatus.OK)
			return (power_set.status);
		if (power_set.data.length < 0x1)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
		if (power_set.data[0x1] == 0x0)
			return (ControllerSapiClassStatus.INVALID_SET);
		return (ControllerSapiClassStatus.OK);
	}

	public isLr(region:string): boolean {
		return (this.region.isLr(region));
	}

	public isLicenseSupportBackup(): boolean {
		if (this.license.status != ControllerSapiClassStatus.OK)
			return (false);
		if (this.license.flags[this.LICENSE_KEY_BACKUP] != undefined && this.license.flags[this.LICENSE_KEY_BACKUP].active == true)
			return (true);
		return (false);
	}

	public async getRegion(): Promise<ControllerSapiClassRegion> {
		let region:string|undefined;

		const out:ControllerSapiClassRegion = {status:ControllerSapiClassStatus.OK, region:"", region_array:this.region.getListRegion()};
		if (this.isRazberry7() == true) {
			const custom_region_info:SapiClassRet =  await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_PROPRIETARY_2, [0xFF]);
			if (custom_region_info.status != SapiClassStatus.OK) {
				out.status = ((custom_region_info.status as unknown) as ControllerSapiClassStatus);
				return (out);
			}
			if (custom_region_info.data.length < 0x1) {
				out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
				return (out);
			}
			region = this.region.getNameRegionCustom(custom_region_info.data[0x0]);
			if (region == undefined) {
				out.status = ControllerSapiClassStatus.WRONG_IN_DATA;
				return (out);
			}
			out.region = region;
		}
		else {
			const rerion_get:ControllerSapiClassSerialApiSetup = await this._serial_api_setup(SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_RF_REGION_GET, []);
			if (rerion_get.status != ControllerSapiClassStatus.OK) {
				out.status = rerion_get.status;
				return (out);
			}
			if (rerion_get.data.length < 0x1) {
				out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
				return (out);
			}
			region = this.region.getNameRegion(rerion_get.data[0x0]);
			if (region == undefined) {
				out.status = ControllerSapiClassStatus.WRONG_IN_DATA;
				return (out);
			}
			out.region = region;
		}
		return (out);
	}

	public async setRegion(region:string): Promise<ControllerSapiClassStatus> {
		if (this.isRazberry7() == true) {
			const custom_region_id:number|undefined = this.region.getIdRegionCustom(region);
			if (custom_region_id == undefined)
				return (ControllerSapiClassStatus.INVALID_ARG);
			const custom_region_set:SapiClassRet =  await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_PROPRIETARY_2, [custom_region_id]);
			if (custom_region_set.status != SapiClassStatus.OK)
				return (((custom_region_set.status as unknown) as ControllerSapiClassStatus));
			const res:SapiClassRet = await this.sapi.recvIncomingRequest(1000, SapiClassFuncId.FUNC_ID_SERIAL_API_STARTED);
			if (res.status != SapiClassStatus.OK)
				return (((res.status as unknown) as ControllerSapiClassStatus));
			await this._begin(false);
			return (ControllerSapiClassStatus.OK);
		}
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET) == false)
			return (ControllerSapiClassStatus.UNSUPPORT_CMD);
		const region_id:number|undefined = this.region.getIdRegion(region);
		if (region_id == undefined)
			return (ControllerSapiClassStatus.INVALID_ARG);
		const rerion_get:ControllerSapiClassSerialApiSetup = await this._serial_api_setup(SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_RF_REGION_SET, [region_id]);
		if (rerion_get.status != ControllerSapiClassStatus.OK)
			return (rerion_get.status);
		if (rerion_get.data.length < 0x1)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
		if (rerion_get.data[0x0] == 0x0)
			return (ControllerSapiClassStatus.NOT_SET);
		return (this.softReset());
	}

	public async softReset(timeout:number = 3000): Promise<ControllerSapiClassStatus> {
		const res:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [], timeout, SapiClassFuncId.FUNC_ID_SERIAL_API_STARTED);
		if (res.status != SapiClassStatus.OK)
			return ((res.status as unknown) as ControllerSapiClassStatus);
		await this._begin(false);
		return (ControllerSapiClassStatus.OK);
	}

	public async setDefault(): Promise<ControllerSapiClassStatus> {
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_ZW_SET_DEFAULT) == false)
			return (ControllerSapiClassStatus.UNSUPPORT_CMD);
		const seq:number = this._set_seq();
		const res:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_ZW_SET_DEFAULT, [seq]);
		if (res.status != SapiClassStatus.OK)
			return ((res.status as unknown) as ControllerSapiClassStatus);
		if (res.data.length < 0x1)//0x1 seq
			return (ControllerSapiClassStatus.WRONG_LENGTH_SEQ);
		if (res.data[0x0] != seq)
			return (ControllerSapiClassStatus.WRONG_SEQ);
		await this._begin(false);
		return (ControllerSapiClassStatus.OK);
	}

	public async nvmWrite(addr:number, data:Uint8Array): Promise<ControllerSapiClassStatus> {
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER) == false)
			return (ControllerSapiClassStatus.UNSUPPORT_CMD);
		const data_addr:Array<number> = [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (data.length >> 8) & 0xFF, data.length & 0xFF];
		if (data.length > this.getQuantumSize())
			return (ControllerSapiClassStatus.WRONG_SEND_DATA_LENGHT);
		const res:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER, data_addr.concat(Array.from(data)));
		if (res.status != SapiClassStatus.OK)
			return ((res.status as unknown) as ControllerSapiClassStatus);
		if (res.data.length < 0x1)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
		if (res.data[0x0] != 0x1)
			return (ControllerSapiClassStatus.NOT_SET);
		return (ControllerSapiClassStatus.OK);
	}

	public async updateFirmware(data:Uint8Array, process:SapiClassUpdateProcess|null, target_type:SapiClassDetectType): Promise<ControllerSapiClassStatus> {
		if (this.isRazberry7() == false)
			return (ControllerSapiClassStatus.NOT_RAZBERRY);
		const status:ControllerSapiClassStatus = await this._load_file(0x3A000, data, process);
		if (status != ControllerSapiClassStatus.OK)
			return (status);
		const res:SapiClassDetectWait = await this.sapi.update(0x3A000, target_type);
		if (res.status != SapiClassStatus.OK)
			return ((res.status as unknown) as ControllerSapiClassStatus);
		return (ControllerSapiClassStatus.OK);
	}

	public async updateBotloader(data:Uint8Array, process:SapiClassUpdateProcess|null): Promise<ControllerSapiClassStatus> {
		if (this.isRazberry7() == false)
			return (ControllerSapiClassStatus.NOT_RAZBERRY);
		const status:ControllerSapiClassStatus = await this._load_file(0x3A000, data, process);
		if (status != ControllerSapiClassStatus.OK)
			return (status);
		const seq:number = this._set_seq();
		const response:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_PROPRIETARY_4, [seq]);
		if (response.status != SapiClassStatus.OK)
			return (((response.status as unknown) as ControllerSapiClassStatus));
		if (response.data.length < 0x1)
			return (ControllerSapiClassStatus.WRONG_RESPONSE_LENGTH);
		if (response.data[0x0] != 0x00)
			return (ControllerSapiClassStatus.WRONG_RESPONSE_STATUS);
		const callback = await this.sapi.recvIncomingRequest(1000, SapiClassFuncId.FUNC_ID_PROPRIETARY_4,);
		if (callback.status != SapiClassStatus.OK)
			return (((callback.status as unknown) as ControllerSapiClassStatus));
		if (callback.data.length < 0x2)//0x1 seq
			return (ControllerSapiClassStatus.WRONG_CALLBACK_LENGTH);
		if (callback.data[0x0] != seq)
			return (ControllerSapiClassStatus.WRONG_CALLBACK_SEQ);
		if (callback.data[0x1] != 0x0)
			return (ControllerSapiClassStatus.WRONG_CALLBACK_STATUS);
		return (ControllerSapiClassStatus.OK);
	}

	public async clear_node(): Promise<ControllerSapiClassStatus> {
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION) == false)
			return (ControllerSapiClassStatus.UNSUPPORT_CMD);
		const send_mode:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION, [0x80, 2, 7, 0], 200);
		if (send_mode.status == SapiClassStatus.OK || send_mode.status == SapiClassStatus.TIMEOUT_RCV)
			return (ControllerSapiClassStatus.OK);
		return (((send_mode.status as unknown) as ControllerSapiClassStatus));
	}

	public async include_excluding(): Promise<ControllerSapiClassLearnMode> {
		return (await this._learn_mode(ControllerSapiClassLearMode.INCLUSION_EXCLUSION));
	}

	public async disabled(): Promise<ControllerSapiClassStatus> {
		const res:ControllerSapiClassLearnMode = await this._learn_mode(ControllerSapiClassLearMode.DISABLED);
		if (res.status != ControllerSapiClassStatus.OK)
			return (res.status);
		return (ControllerSapiClassStatus.OK);
	}

	private async _waitLearn(timeout:number, seq:number): Promise<ControllerSapiClassStatus> {
		const res:SapiClassRet = await this.sapi.recvIncomingRequest(timeout);
		if (res.status == SapiClassStatus.NO_SOF)
			return (ControllerSapiClassStatus.PROCESS);
		if (res.cmd != SapiClassFuncId.FUNC_ID_ZW_SET_LEARN_MODE)
			return (ControllerSapiClassStatus.PROCESS);
		if (res.status != SapiClassStatus.OK)
			return ((res.status as unknown) as ControllerSapiClassStatus);
		if (res.data.length < 0x3)
			return (ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK);
		if (res.data[0x0] != seq)
			return (ControllerSapiClassStatus.WRONG_SEQ);
		if (res.data[0x1] == 0x6)
			return (ControllerSapiClassStatus.OK);
		if (res.data[0x1] == 0x1)
			return (ControllerSapiClassStatus.PROCESS);
		return (ControllerSapiClassStatus.LEARN_MODE_FALED);
	}

	public async waitLearn(timeout:number, seq:number): Promise<ControllerSapiClassStatus> {
		const status:ControllerSapiClassStatus = await this._waitLearn(timeout, seq);
		if (status == ControllerSapiClassStatus.OK)
			await this._begin(false);
		return (status);
	}

	public async GetInitData(): Promise<ControllerSapiClasstInitData> {
		let byte_i:number, bit_i:number;

		const out:ControllerSapiClasstInitData = {status:ControllerSapiClassStatus.OK, node_list:[]};
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_SERIAL_API_GET_INIT_DATA) == false) {
			out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
			return (out);
		}
		const res:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_GET_INIT_DATA, []);
		if (res.status != SapiClassStatus.OK) {
			out.status = ((res.status as unknown) as ControllerSapiClassStatus)
			return (out);
		}
		if (res.data.length < 0x5 + 29) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return (out);
		}
		byte_i = 0x0;
		while (byte_i < 29) {
			bit_i = 0x0;
			while (bit_i < 0x8) {
				if ((res.data[0x3 + byte_i] & (0x1 << bit_i)) != 0x0)
					out.node_list.push(byte_i * 0x8 + bit_i + 0x1);
				bit_i++;
			}
			byte_i++;
		}
		return (out);
	}

	public async GetNetworkIDs(): Promise<ControllerSapiClasstNetworkIDs> {
		const out:ControllerSapiClasstNetworkIDs = {status:ControllerSapiClassStatus.OK, home:0x0, node_id:0x0};
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_MEMORY_GET_ID) == false) {
			out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
			return (out);
		}
		const res:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_MEMORY_GET_ID, []);
		if (res.status != SapiClassStatus.OK) {
			out.status = ((res.status as unknown) as ControllerSapiClassStatus)
			return (out);
		}
		if (res.data.length < 0x4 + this.node_base) {
			out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
			return (out);
		}
		out.home = costruct_int(res.data.slice(0x0, 0x4), 0x4, false);
		out.node_id = costruct_int(res.data.slice(0x4, 0x4 + this.node_base), this.node_base, false);
		return (out);
	}

	public async removeFaledNode(node:number): Promise<ControllerSapiClassStatus> {
			if (this._test_cmd(SapiClassFuncId.FUNC_ID_ZW_REMOVE_FAILED_NODE_ID) == false)
			return (ControllerSapiClassStatus.UNSUPPORT_CMD);
		const seq:number = this._set_seq();
		const response:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_ZW_REMOVE_FAILED_NODE_ID, Array.from(this._node_to_bytes(node)).concat([seq]));
		if (response.status != SapiClassStatus.OK)
			return (((response.status as unknown) as ControllerSapiClassStatus));
		if (response.data.length < 0x1)
			return (ControllerSapiClassStatus.WRONG_RESPONSE_LENGTH);
		if (response.data[0x0] != 0x00)
			return (ControllerSapiClassStatus.WRONG_RESPONSE_STATUS);
		const callback = await this.sapi.recvIncomingRequest(1000, SapiClassFuncId.FUNC_ID_ZW_REMOVE_FAILED_NODE_ID);
		if (callback.status != SapiClassStatus.OK)
			return (((callback.status as unknown) as ControllerSapiClassStatus));
		if (callback.data.length < 0x2)//0x1 seq
			return (ControllerSapiClassStatus.WRONG_CALLBACK_LENGTH);
		if (callback.data[0x0] != seq)
			return (ControllerSapiClassStatus.WRONG_CALLBACK_SEQ);
		if (callback.data[0x1] != 0x1)
			return (ControllerSapiClassStatus.WRONG_CALLBACK_STATUS);
		return (ControllerSapiClassStatus.OK);
	}

	public async nop(node:number): Promise<ControllerSapiClassStatus> {
		if (this._test_cmd(SapiClassFuncId.FUNC_ID_ZW_SEND_DATA) == false)
			return (ControllerSapiClassStatus.UNSUPPORT_CMD);
		const seq:number = this._set_seq();
		const response:SapiClassRet = await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_ZW_SEND_DATA, Array.from(this._node_to_bytes(node)).concat([0x1, 0x0, 0x1, seq]));
		if (response.status != SapiClassStatus.OK)
			return (((response.status as unknown) as ControllerSapiClassStatus));
		if (response.data.length < 0x1)
			return (ControllerSapiClassStatus.WRONG_RESPONSE_LENGTH);
		if (response.data[0x0] != 0x01)
			return (ControllerSapiClassStatus.WRONG_RESPONSE_STATUS);
		const callback = await this.sapi.recvIncomingRequest(1000, SapiClassFuncId.FUNC_ID_ZW_SEND_DATA);
		if (callback.status != SapiClassStatus.OK)
			return (((callback.status as unknown) as ControllerSapiClassStatus));
		if (callback.data.length < 0x2)//0x1 seq
			return (ControllerSapiClassStatus.WRONG_CALLBACK_LENGTH);
		if (callback.data[0x0] != seq)
			return (ControllerSapiClassStatus.WRONG_CALLBACK_SEQ);
		if (callback.data[0x1] == 0x1)
			return (ControllerSapiClassStatus.TRANSMIT_COMPLETE_NO_ACK);
		if (callback.data[0x1] != 0x0)
			return (ControllerSapiClassStatus.WRONG_CALLBACK_STATUS);
		return (ControllerSapiClassStatus.OK);
	}
	
	public getBoardInfo(): ControllerSapiClassBoardInfo {
		return (this.board_info);
	}

	public async setLicense(license:Array<number>): Promise<ControllerSapiClassStatus> {
		const out:ControllerOutData = {data:[]};
		const status:ControllerSapiClassStatus = await this._license(this.RAZ7_LICENSE_SET_SUBCMD, license, out);
		if (status != ControllerSapiClassStatus.OK)
			return (status);
		await this._license_get(this.license);
		return (this.license.status);
	}

	public getLicense(): ControllerSapiClassLicense {
		return (this.license);
	}

	public getCapabilities(): ControllerSapiClassCapabilities {
		return (this.capabilities);
	}

	public isRazberry5(): boolean {
		if (this._isRazberry() == false)
			return (false);
		if (this.capabilities.ApiVersion == 0x5)
			return (true);
		return (false);
	}

	public isRazberry7(): boolean {
		if (this._isRazberry() == false)
			return (false);
		if (this.capabilities.ApiVersion == 0x7)
			return (true);
		return (false);
	}

	public async connect(): Promise<void> {
		this.node_base = SapiClassNodeIdBaseType.TYPE_8_BIT;
		this.capabilities.status = ControllerSapiClassStatus.NOT_INIT;
		this.license.status = ControllerSapiClassStatus.NOT_INIT;
		this.board_info.status = ControllerSapiClassStatus.NOT_INIT;
		await this._begin(true);
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

	constructor(sapi:SapiClass) {
		this.sapi = sapi;
	}
}