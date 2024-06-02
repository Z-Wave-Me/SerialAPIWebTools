import {sleep, checksum, calcSigmaCRC16} from "../other/utilities";

export {SapiClass, SapiClassStatus, SapiClassFuncId, SapiClassRet, SapiClassSerialAPISetupCmd, SapiSerialOptionFilters, SapiClassNodeIdBaseType, SapiClassDetect, SapiClassDetectType};

enum SapiClassDetectType
{
	ZUNO,
	RAZBERRY,
}

interface SapiClassDetect
{
	status:SapiClassStatus;
	type:SapiClassDetectType;
	baudrate:number;
}

interface SapiSerialOptionFilters
{
	usbVendorId:number;
	usbProductId:number;
}

interface SapiClassRet
{
	status:SapiClassStatus;
	crc:number;
	cmd:number;
	raw:Array<number>;
	data:Array<number>;
}

enum SapiClassStatus
{
	OK = 0x00,
	NO_ACK,
	INVALID_DATA_LEN,
	INVALID_CRC,
	NO_SOF,
	NO_LENGHT,
	WRITE,
	WRONG_LENGHT,
	WRONG_CMD,
	PORT_NOT_OPEN,
	PORT_NOT_CLOSE,
	PORT_NOT_REQUEST,
	PORT_USED,
	PORT_BUSY,
	TIMOUT_RCV,
	SERIAL_UN_SUPPORT,
	SERIAL_BUSY,
	REQUEST_ONE_SHOT,
	REQUEST_NO_SELECT,
	ZUNO_NO_FREEZE,
	DETECTED_UNC_COMMAND,
	LAST_STATUS,
}

enum SapiClassNodeIdBaseType
{
	TYPE_8_BIT = 0x1,
	TYPE_16_BIT = 0x2,
}

enum SapiClassSerialAPISetupCmd
{
	//   /**
	//    * The first 8 commands are given as bit-flags, and when all bits were consumed, a byte-array was created to give
	//    * more room.
	//    * The first 8 flags are the only ones that shall be used to fill the first byte when generating the response in
	//    * pOutputBuffer for the command, SERIAL_API_SETUP_CMD_SUPPORTED.
	//    * This is kept for backwards compatibility.
	//    */
	SERIAL_API_SETUP_CMD_UNSUPPORTED,
	SERIAL_API_SETUP_CMD_SUPPORTED                  = 1,   //1<<0
	SERIAL_API_SETUP_CMD_TX_STATUS_REPORT           = 2,   //1<<1
	SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET          = 4,   //1<<2 @Deprecated
	SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET          = 8,   //1<<3 @Deprecated
	SERIAL_API_SETUP_CMD_TX_GET_MAX_PAYLOAD_SIZE    = 16,  //1<<4
	SERIAL_API_SETUP_CMD_RF_REGION_GET              = 32,  //1<<5
	SERIAL_API_SETUP_CMD_RF_REGION_SET              = 64,  //1<<6
	SERIAL_API_SETUP_CMD_NODEID_BASETYPE_SET        = 128, //1<<7
	//   /**
	//    * The below values are not flags and shall only be used with BITMASK_ADD_CMD() when generating
	//    * the response for the command, SERIAL_API_SETUP_CMD_SUPPORTED.
	//    */
	SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_SET          = 3,
	SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_GET          = 5,
						// The values 6 and 7 are unused, but not reserved.
	SERIAL_API_SETUP_CMD_TX_GET_MAX_LR_PAYLOAD_SIZE = 17,
	SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET_16_BIT   = 18,
	SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET_16_BIT   = 19,
}

enum SapiClassFuncId
{
	FUNC_ID_SERIAL_API_GET_INIT_DATA = 0x02,
	FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION = 0x03,
	FUNC_ID_APPLICATION_COMMAND_HANDLER = 0x04,
	FUNC_ID_ZW_GET_CONTROLLER_CAPABILITIES = 0x05,
	FUNC_ID_SERIAL_API_SET_TIMEOUTS = 0x06,
	FUNC_ID_SERIAL_API_GET_CAPABILITIES = 0x07,
	FUNC_ID_SERIAL_API_SOFT_RESET = 0x08,
	FUNC_ID_ZW_GET_PROTOCOL_VERSION = 0x09,
	FUNC_ID_SERIAL_API_STARTED = 0x0A,
	FUNC_ID_SERIAL_API_SETUP = 0x0B,
	FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION_CMD_CLASSES = 0x0C,
	FUNC_ID_ZW_SEND_DATA_EX = 0x0E,
	FUNC_ID_ZW_SEND_DATA_MULTI_EX = 0x0F,
	FUNC_ID_ZW_SET_RF_RECEIVE_MODE = 0x10,
	FUNC_ID_ZW_SET_SLEEP_MODE = 0x11,
	FUNC_ID_ZW_SEND_NODE_INFORMATION = 0x12,
	FUNC_ID_ZW_SEND_DATA = 0x13,
	FUNC_ID_ZW_SEND_DATA_MULTI = 0x14,
	FUNC_ID_ZW_GET_VERSION = 0x15,
	FUNC_ID_ZW_SEND_DATA_ABORT = 0x16,
	FUNC_ID_ZW_RF_POWER_LEVEL_SET = 0x17,
	FUNC_ID_ZW_SEND_DATA_META = 0x18,
	FUNC_ID_ZW_RESERVED_SD = 0x19,
	FUNC_ID_ZW_RESERVED_SDM = 0x1A,
	FUNC_ID_ZW_RESERVED_SRI = 0x1B,
	FUNC_ID_ZW_GET_RANDOM = 0x1C,
	FUNC_ID_ZW_RANDOM = 0x1D,
	FUNC_ID_ZW_RF_POWER_LEVEL_REDISCOVERY_SET = 0x1E,
	FUNC_ID_MEMORY_GET_ID = 0x20,
	FUNC_ID_MEMORY_GET_BYTE = 0x21,
	FUNC_ID_MEMORY_PUT_BYTE = 0x22,
	FUNC_ID_MEMORY_GET_BUFFER = 0x23,
	FUNC_ID_MEMORY_PUT_BUFFER = 0x24,
	FUNC_ID_SERIAL_API_GET_APPL_HOST_MEMORY_OFFSET = 0x25,
	FUNC_ID_DEBUG_OUTPUT = 0x26,
	FUNC_ID_AUTO_PROGRAMMING = 0x27,
	FUNC_ID_NVR_GET_VALUE = 0x28,
	FUNC_ID_NVM_GET_ID = 0x29,
	FUNC_ID_NVM_EXT_READ_LONG_BUFFER = 0x2A,
	FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER = 0x2B,
	FUNC_ID_NVM_EXT_READ_LONG_BYTE = 0x2C,
	FUNC_ID_NVM_EXT_WRITE_LONG_BYTE = 0x2D,
	FUNC_ID_NVM_BACKUP_RESTORE = 0x2E,
	FUNC_ID_ZW_NVR_GET_APP_VALUE = 0x2F,
	FUNC_ID_CLOCK_SET = 0x30,
	FUNC_ID_CLOCK_GET = 0x31,
	FUNC_ID_CLOCK_CMP = 0x32,
	FUNC_ID_RTC_TIMER_CREATE = 0x33,
	FUNC_ID_RTC_TIMER_READ = 0x34,
	FUNC_ID_RTC_TIMER_DELETE = 0x35,
	FUNC_ID_RTC_TIMER_CALL = 0x36,
	FUNC_ID_CLEAR_TX_TIMERS = 0x37,
	FUNC_ID_GET_TX_TIMERS = 0x38,
	FUNC_ID_ZW_CLEAR_NETWORK_STATS = 0x39,
	FUNC_ID_ZW_GET_NETWORK_STATS = 0x3A,
	FUNC_ID_ZW_GET_BACKGROUND_RSSI = 0x3B,
	FUNC_ID_ZW_SET_LISTEN_BEFORE_TALK_THRESHOLD = 0x3C,
	FUNC_ID_ZW_REMOVE_NODE_ID_FROM_NETWORK = 0x3F,
	FUNC_ID_ZW_SET_LEARN_NODE_STATE = 0x40,
	FUNC_ID_ZW_GET_NODE_PROTOCOL_INFO = 0x41,
	FUNC_ID_ZW_SET_DEFAULT = 0x42,
	FUNC_ID_ZW_NEW_CONTROLLER = 0x43,
	FUNC_ID_ZW_REPLICATION_COMMAND_COMPLETE = 0x44,
	FUNC_ID_ZW_REPLICATION_SEND_DATA = 0x45,
	FUNC_ID_ZW_ASSIGN_RETURN_ROUTE = 0x46,
	FUNC_ID_ZW_DELETE_RETURN_ROUTE = 0x47,
	FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE = 0x48,
	FUNC_ID_ZW_REQUEST_NODETYPE_NEIGHBOR_UPDATE = 0x68,
	FUNC_ID_ZW_APPLICATION_UPDATE = 0x49,
	FUNC_ID_ZW_ADD_NODE_TO_NETWORK = 0x4A,
	FUNC_ID_ZW_REMOVE_NODE_FROM_NETWORK = 0x4B,
	FUNC_ID_ZW_CREATE_NEW_PRIMARY = 0x4C,
	FUNC_ID_ZW_CONTROLLER_CHANGE = 0x4D,
	FUNC_ID_ZW_RESERVED_FN = 0x4E,
	FUNC_ID_ZW_ASSIGN_PRIORITY_RETURN_ROUTE = 0x4F,
	FUNC_ID_ZW_SET_LEARN_MODE = 0x50,
	FUNC_ID_ZW_ASSIGN_SUC_RETURN_ROUTE = 0x51,
	FUNC_ID_ZW_ENABLE_SUC = 0x52,
	FUNC_ID_ZW_REQUEST_NETWORK_UPDATE = 0x53,
	FUNC_ID_ZW_SET_SUC_NODE_ID = 0x54,
	FUNC_ID_ZW_DELETE_SUC_RETURN_ROUTE = 0x55,
	FUNC_ID_ZW_GET_SUC_NODE_ID = 0x56,
	FUNC_ID_ZW_SEND_SUC_ID = 0x57,
	FUNC_ID_ZW_ASSIGN_PRIORITY_SUC_RETURN_ROUTE = 0x58,
	FUNC_ID_ZW_REDISCOVERY_NEEDED = 0x59,
	FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE_OPTION = 0x5A,
	FUNC_ID_ZW_SUPPORT9600_ONLY = 0x5B,
	FUNC_ID_ZW_REQUEST_NEW_ROUTE_DESTINATIONS = 0x5C,
	FUNC_ID_ZW_IS_NODE_WITHIN_DIRECT_RANGE = 0x5D,
	FUNC_ID_ZW_EXPLORE_REQUEST_INCLUSION = 0x5E,
	FUNC_ID_ZW_EXPLORE_REQUEST_EXCLUSION = 0x5F,
	FUNC_ID_ZW_REQUEST_NODE_INFO = 0x60,
	FUNC_ID_ZW_REMOVE_FAILED_NODE_ID = 0x61,
	FUNC_ID_ZW_IS_FAILED_NODE_ID = 0x62,
	FUNC_ID_ZW_REPLACE_FAILED_NODE = 0x63,
	FUNC_ID_ZW_SET_ROUTING_MAX_6_00 = 0x65,
	FUNC_ID_ZW_IS_PRIMARY_CTRL = 0x66,
	FUNC_ID_ZW_AES_ECB = 0x67,
	FUNC_ID_TIMER_START = 0x70,
	FUNC_ID_TIMER_RESTART = 0x71,
	FUNC_ID_TIMER_CANCEL = 0x72,
	FUNC_ID_TIMER_CALL = 0x73,
	FUNC_ID_ZW_FIRMWARE_UPDATE_NVM = 0x78,
	FUNC_ID_GET_ROUTING_TABLE_LINE = 0x80,
	FUNC_ID_GET_TX_COUNTER = 0x81,
	FUNC_ID_RESET_TX_COUNTER = 0x82,
	FUNC_ID_STORE_NODEINFO = 0x83,
	FUNC_ID_STORE_HOMEID = 0x84,
	FUNC_ID_LOCK_ROUTE_RESPONSE = 0x90,
	FUNC_ID_ZW_SEND_DATA_ROUTE_DEMO = 0x91,
	FUNC_ID_ZW_GET_PRIORITY_ROUTE = 0x92,
	FUNC_ID_ZW_SET_PRIORITY_ROUTE = 0x93,
	FUNC_ID_SERIAL_API_TEST = 0x95,
	FUNC_ID_SERIAL_API_EXT = 0x98,
	FUNC_ID_ZW_SECURITY_SETUP = 0x9C,
	FUNC_ID_APPLICATION_SECURITY_EVENT = 0x9D,
	FUNC_ID_SERIAL_API_APPL_SLAVE_NODE_INFORMATION = 0xA0,
	FUNC_ID_APPLICATION_SLAVE_COMMAND_HANDLER = 0xA1,
	FUNC_ID_ZW_SEND_SLAVE_NODE_INFORMATION = 0xA2,
	FUNC_ID_ZW_SEND_SLAVE_DATA = 0xA3,
	FUNC_ID_ZW_SET_SLAVE_LEARN_MODE = 0xA4,
	FUNC_ID_ZW_GET_VIRTUAL_NODES = 0xA5,
	FUNC_ID_ZW_IS_VIRTUAL_NODE = 0xA6,
	FUNC_ID_ZW_RESERVED_SSD = 0xA7,
	FUNC_ID_APPLICATION_COMMAND_HANDLER_BRIDGE = 0xA8,
	FUNC_ID_ZW_SEND_DATA_BRIDGE = 0xA9,
	FUNC_ID_ZW_SEND_DATA_META_BRIDGE = 0xAA,
	FUNC_ID_ZW_SEND_DATA_MULTI_BRIDGE = 0xAB,
	FUNC_ID_PWR_SETSTOPMODE = 0xB0,
	FUNC_ID_PWR_CLK_PD = 0xB1,
	FUNC_ID_PWR_CLK_PUP = 0xB2,
	FUNC_ID_PWR_SELECT_CLK = 0xB3,
	FUNC_ID_ZW_SET_WUT_TIMEOUT = 0xB4,
	FUNC_ID_ZW_IS_WUT_KICKED = 0xB5,
	FUNC_ID_ZW_WATCHDOG_ENABLE = 0xB6,
	FUNC_ID_ZW_WATCHDOG_DISABLE = 0xB7,
	FUNC_ID_ZW_WATCHDOG_KICK = 0xB8,
	FUNC_ID_ZW_SET_EXT_INT_LEVEL = 0xB9,
	FUNC_ID_ZW_RF_POWER_LEVEL_GET = 0xBA,
	FUNC_ID_ZW_GET_NEIGHBOR_COUNT = 0xBB,
	FUNC_ID_ZW_ARE_NODES_NEIGHBOURS = 0xBC,
	FUNC_ID_ZW_TYPE_LIBRARY = 0xBD,
	FUNC_ID_ZW_SEND_TEST_FRAME = 0xBE,
	FUNC_ID_ZW_GET_PROTOCOL_STATUS = 0xBF,
	FUNC_ID_ZW_SET_PROMISCUOUS_MODE = 0xD0,
	FUNC_ID_PROMISCUOUS_APPLICATION_COMMAND_HANDLER = 0xD1,
	FUNC_ID_ZW_WATCHDOG_START = 0xD2,
	FUNC_ID_ZW_WATCHDOG_STOP = 0xD3,
	FUNC_ID_ZW_SET_ROUTING_MAX = 0xD4,
	FUNC_ID_ZW_GET_ROUTING_MAX = 0xD5,
	FUNC_ID_PM_STAY_AWAKE = 0xD7,
	FUNC_ID_PM_CANCEL = 0xD8,
	FUNC_ID_ZW_NETWORK_MANAGEMENT_SET_MAX_INCLUSION_REQUEST_INTERVALS = 0xD6,
	FUNC_ID_ZW_INITIATE_SHUTDOWN = 0xD9,
	FUNC_ID_SERIAL_API_GET_LR_NODES = 0xDA,
	FUNC_ID_GET_LR_CHANNEL = 0xDB,
	FUNC_ID_SET_LR_CHANNEL = 0xDC,
	FUNC_ID_ZW_SET_LR_VIRTUAL_IDS = 0xDD,
	FUNC_ID_GET_DCDC_CONFIG = 0xDE,
	FUNC_ID_SET_DCDC_CONFIG = 0xDF,
	FUNC_ID_ZW_NUNIT_CMD = 0xE0,
	FUNC_ID_ZW_NUNIT_INIT = 0xE1,
	FUNC_ID_ZW_NUNIT_LIST = 0xE2,
	FUNC_ID_ZW_NUNIT_RUN = 0xE3,
	FUNC_ID_ZW_NUNIT_END = 0xE4,
	FUNC_ID_ENABLE_RADIO_PTI = 0xE7,
	FUNC_ID_GET_RADIO_PTI = 0xE8,
	FUNC_ID_SEND_NOP = 0xE9,
	FUNC_ID_SERIAL_API_POWER_MANAGEMENT = 0xEE,
	FUNC_ID_SERIAL_API_READY = 0xEF,
	FUNC_ID_PROPRIETARY_0 = 0xF0,
	FUNC_ID_PROPRIETARY_1 = 0xF1,
	FUNC_ID_PROPRIETARY_2 = 0xF2,
	FUNC_ID_PROPRIETARY_3 = 0xF3,
	FUNC_ID_PROPRIETARY_4 = 0xF4,
	FUNC_ID_PROPRIETARY_5 = 0xF5,
	FUNC_ID_PROPRIETARY_6 = 0xF6,
	FUNC_ID_PROPRIETARY_7 = 0xF7,
	FUNC_ID_PROPRIETARY_8 = 0xF8,
	FUNC_ID_PROPRIETARY_9 = 0xF9,
	FUNC_ID_PROPRIETARY_A = 0xFA,
	FUNC_ID_PROPRIETARY_B = 0xFB,
	FUNC_ID_PROPRIETARY_C = 0xFC,
	FUNC_ID_PROPRIETARY_D = 0xFD,
	FUNC_ID_PROPRIETARY_E = 0xFE,
}

// ------------------------------------------------------------------------------------------------------
interface SapiPortOpenOption
{
	baudRate:number;
	bufferSize:number;
}

interface SapiPort
{
	readonly readable:ReadableStream;
	readonly writable:WritableStream;
	close(): Promise<void>;
	open(options?: SapiPortOpenOption): Promise<void>;
}

interface SapiSerialOption
{
	filters?:SapiSerialOptionFilters[];
}


interface SapiSerial
{
	requestPort(options?: SapiSerialOption): Promise<SapiPort>;
}

interface NavigatorExtSerial extends Navigator
{
	serial:SapiSerial;
}


class SapiClass {
	private readonly SOF:number																			= 0x01;
	private readonly ACK:number																			= 0x06;
	private readonly NAK:number																			= 0x15;
	private readonly CAN:number																			= 0x18;

	private readonly REQUEST:number																		= 0x00;
	private readonly RESPONSE:number																	= 0x01;

	private readonly ADDITIONAL_SIZE:number																= 0x03;

	public readonly BAUDRATE																			= [115200, 230400, 460800, 921600];
	private readonly dtr_timeout:number																	= 250;// The time for the capacitor on the DTR line to recharge

	private b_busy:boolean																				= false;
	private state_lock:boolean																			= false;
	private b_open:boolean																				= false;
	private port:SapiPort|undefined																		= undefined;
	private queue:Array<number>																			= [];

	private async _readWithTimeout(timeout:number): Promise<Uint8Array> {
		let out:Uint8Array;

		if (this.port == undefined)
			return (new Uint8Array([]));
		const reader = this.port.readable.getReader();
		const timer = setTimeout(() => {
			reader.releaseLock();
		}, timeout);
		try {
			out = (await reader.read()).value;
		} catch (err) {
			out = new Uint8Array([]);
		}
		clearTimeout(timer);
		reader.releaseLock();
		return (out);
	}

	private async _read(num:number): Promise<Array<number>> {
		let out:Array<number>, i:number, rep:number, tempos:number|undefined;

		rep = 0x0;
		while (rep < 1) {
			if (this.queue.length >= num) {
				out = [];
				i = 0x0;
				while (i < num) {
					tempos = this.queue.shift();
					if (tempos == undefined)
						break ;
					out.push(tempos);
					i++;
				}
				return (out);
			}
			const value:Uint8Array = await this._readWithTimeout(50);
			i = 0x0;
			while (i < value.byteLength) {
				this.queue.push(value[i])
				i++;
			}
			rep++;
		}
		if (num >= this.queue.length)
			num = this.queue.length;
		out = [];
		i = 0x0;
		while (i < num) {
			tempos = this.queue.shift();
			if (tempos == undefined)
				break ;
			out.push(tempos);
			i++;
		}
		return (out);
	}

	private async _write(data:Array<number>): Promise<boolean> {
		if (this.port == undefined)
			return (false);
		const data_uint8:Uint8Array = new Uint8Array(data);
		const writer = this.port.writable.getWriter();
		await writer.write(data_uint8);
		writer.releaseLock();
		return (true);
	}

	private async _clear():  Promise<void> {
		this.queue = [];
		for (;;) {
			const value = await this._read(50);
			if (value.length == 0x0)
				return ;
		}
	}

	private async _sendData(cmd:number, databuff:Array<number>): Promise<boolean> {
		let final_data:Array<number>;

		const data_len = databuff.length + this.ADDITIONAL_SIZE;
		if (data_len > 255) {
			const crc_data:Array<number> = [0x00, this.REQUEST, cmd].concat(databuff);
			final_data = [0x00, (data_len >> 8)& 0x0FF, data_len & 0x0FF, this.REQUEST, cmd].concat(databuff);
			const crc16:number = calcSigmaCRC16(0x1D0F, crc_data, 0, crc_data.length);
			final_data = [this.SOF].concat(final_data).concat([(crc16 >> 8) & 0xFF, (crc16) & 0xFF]);
			if (await this._write(final_data) == false)
				return (false);
			return (true);
		}
		final_data = [data_len & 0x0FF, this.REQUEST, cmd].concat(databuff);
		const crc:number = checksum(final_data);
		final_data = [this.SOF].concat(final_data).concat([crc]);
		if (await this._write(final_data) == false)
			return (false);
		return (true);
	}

	private async _sendNack(): Promise<boolean> {
		return (await (this._write([this.NAK])));
	}

	private async _sendAck(): Promise<boolean> {
		return (await (this._write([this.ACK])));
	}

	private async _waitSOF(timeout:number): Promise<boolean> {
		const sof_timeout:number = Date.now() + timeout;

		while (sof_timeout > Date.now()) {
			const sof:Array<number> = await this._read(0x1);
			if (sof.length == 0x0) {
				continue ;
			}
			if (sof[0x0] == this.SOF)
				return (true);
		}
		return (false);
	}

	private async _send_cmd(cmd:number, databuff:Array<number>,retries:number): Promise<SapiClassStatus> {
		let rbuff:Array<number>;

		if (this.b_open == false)
			return (SapiClassStatus.PORT_NOT_OPEN);
		await this._clear();
		for (;;) {
			if (await this._sendData(cmd, databuff) == false)
				return (SapiClassStatus.WRITE);
			rbuff = await this._read(0x1)
			if (rbuff.length == 0x0)
				return (SapiClassStatus.NO_ACK);
			if (rbuff[0] == this.ACK)
				break ;
			if (rbuff[0] == this.CAN) {
				await this._recvIncomingRequest(500);
				retries -= 1;
				if (retries > 0)
					continue ;
			}
			if (rbuff[0] == this.NAK) {
				retries -= 1;
				if (retries > 0)
					continue ;
			}
			return (SapiClassStatus.NO_ACK);
		}
		return (SapiClassStatus.OK);
	}

	private async _request(filters?:SapiSerialOptionFilters[]): Promise<SapiClassStatus> {
		let port:SapiPort;

		const nav_ext_serial:NavigatorExtSerial = ((window.navigator as unknown) as NavigatorExtSerial);
		if (this.port != undefined)
			return (SapiClassStatus.REQUEST_ONE_SHOT);
		try {
			const options:SapiSerialOption = {filters:filters};
			port = await nav_ext_serial.serial.requestPort(options);
		} catch(e) {
			return (SapiClassStatus.REQUEST_NO_SELECT);
		}
		this.port = port;
		return (SapiClassStatus.OK);
	}

	private async _open(baudRate:number): Promise<boolean> {
		if (this.port == undefined)
			return (false);
		if (this.b_open == true)
			return (false);
		try {
			await this.port.open({ baudRate, bufferSize: 8192 });
		} catch(e) {
			return (false);
		}
		this.b_open = true;
		return (true);
	}

	private async _close(): Promise<boolean> {
		if (this.port == undefined)
			return (false);
		if (this.b_open == false)
			return (false);
		await this.port.close();
		this.b_open = false;
		return (true);
	}

	private async _recvIncomingRequest_add(wait_timeout:number, lenght:number): Promise<Array<number>> {
		let buff_data:Array<number>;

		buff_data = [];
		for (;;) {
			const buffer:Array<number> = await this._read(lenght - buff_data.length);
			buff_data = buff_data.concat(buffer);
			if (buff_data.length == lenght)
				break ;
			const current_timeout:number = Date.now();
			if (current_timeout >= wait_timeout) {
				await this._sendNack();
				return ([]);
			}
		}
		return (buff_data);
	}

	private async _recvIncomingRequest(timeout:number): Promise<SapiClassRet> {
		let buff_data:Array<number>;

		const out:SapiClassRet = { status: SapiClassStatus.OK, crc:0x0, cmd:0x0, raw:[], data:[]};
		if (this.b_open == false) {
			out.status = SapiClassStatus.PORT_NOT_OPEN;
			return (out);
		}
		const wait_timeout:number = Date.now() + timeout;
		if (await this._waitSOF(timeout) == false) {
			out.status = SapiClassStatus.NO_SOF;
			return (out);
		}
		buff_data = await this._recvIncomingRequest_add(wait_timeout, 0x1);
		if (buff_data.length != 0x1) {
			out.status = SapiClassStatus.NO_LENGHT;
			return (out);
		}
		const len_data:number = buff_data[0x0];
		if (len_data < 0x3) {
			out.status = SapiClassStatus.WRONG_LENGHT;
			return (out);
		}
		buff_data = await this._recvIncomingRequest_add(wait_timeout, len_data);
		if (buff_data.length != len_data) {
			out.status = SapiClassStatus.INVALID_DATA_LEN;
			return (out);
		}
		out.crc = checksum([len_data].concat(buff_data.slice(0, len_data - 0x1)));
		if (out.crc != buff_data[len_data - 1]) {
			await this._sendNack();
			out.status = SapiClassStatus.INVALID_CRC;
			return (out);
		}
		await this._sendAck();
		out.raw = [this.SOF, len_data].concat(buff_data);
		out.cmd = out.raw[0x3];
		out.data = out.raw.slice(0x4, out.raw.length - 0x1);
		return (out);
	}

	private _sendCommandUnSz_rcv_test(res:SapiClassRet, cmd:number): boolean {
		if (res.status != SapiClassStatus.OK)
			return (false);
		if (res.cmd != cmd)
			return (false);
		return (true);
	}

	private async _sendCommandUnSz(cmd:number, args:Array<number>, retries:number, timeout:number, cmd_ret?:number): Promise<SapiClassRet> {
		const out:SapiClassRet = { status: SapiClassStatus.OK, crc:0x0, cmd:0x0, raw:[], data:[]};
		out.status = await this._send_cmd(cmd, args, retries);
		if (out.status != SapiClassStatus.OK)
			return (out);
		const wait_timeout:number = Date.now() + timeout;
		for (;;) {
			const current_timeout:number = Date.now();
			if (current_timeout >= wait_timeout) {
				out.status = SapiClassStatus.TIMOUT_RCV;
				return (out);
			}
			const res:SapiClassRet = await this._recvIncomingRequest(wait_timeout - current_timeout);
			if (cmd_ret == undefined)
				cmd_ret = cmd;
			if (this._sendCommandUnSz_rcv_test(res, cmd_ret) == true)
				return (res);
		}
	}

	public async recvIncomingRequest(timeout:number): Promise<SapiClassRet> {
		const out:SapiClassRet = { status: SapiClassStatus.OK, crc:0x0, cmd:0x0, raw:[], data:[]};
		if (this.busy() == true) {
			out.status = SapiClassStatus.PORT_BUSY;
			return (out);
		}
		this.b_busy = true;
		const res = await this._recvIncomingRequest(timeout);
		this.b_busy = false;
		return (res);
	}

	public async sendCommandUnSz(cmd:number, args:Array<number>, retries:number = 0x3, timeout:number = 2000, cmd_ret?:number): Promise<SapiClassRet> {
		const out:SapiClassRet = { status: SapiClassStatus.OK, crc:0x0, cmd:0x0, raw:[], data:[]};
		if (this.busy() == true) {
			out.status = SapiClassStatus.PORT_BUSY;
			return (out);
		}
		this.b_busy = true;
		const res = await this._sendCommandUnSz(cmd, args, retries, timeout, cmd_ret);
		this.b_busy = false;
		return (res);
	}

	public busy(): boolean {
		return (this.b_busy);
	}
	public static supported(): boolean {
		if (!("serial" in window.navigator))
			return (false);
		return (true);
	}

	public async request(filters?:SapiSerialOptionFilters[]): Promise<SapiClassStatus> {
		if (this.busy() == true)
			return (SapiClassStatus.SERIAL_BUSY);
		if (SapiClass.supported() == false)
			return (SapiClassStatus.SERIAL_UN_SUPPORT);
		this.b_busy = true;
		const out:SapiClassStatus = await this._request(filters);
		this.b_busy = false;
		return (out);
	}

	public async open(baudRate:number): Promise<boolean> {
		if (this.busy() == true)
			return (false);
		this.b_busy = true;
		const out:boolean = await this._open(baudRate);
		this.b_busy = false;
		return (out);
	}

	public async close(): Promise<boolean> {
		if (this.busy() == true)
			return (false);
		this.b_busy = true;
		const out:boolean = await this._close();
		this.b_busy = false;
		return (out);
	}

	private async _open_2(baudRate:number): Promise<SapiClassStatus> {
		if (this.port == undefined)
			return (SapiClassStatus.PORT_NOT_REQUEST);
		if (this.b_open == true)
			return (SapiClassStatus.PORT_NOT_OPEN);
		try {
			await this.port.open({ baudRate, bufferSize: 8192 });
		} catch(e) {
			return (SapiClassStatus.PORT_USED);
		}
		this.b_open = true;
		return (SapiClassStatus.OK);
	}

	private async _close_2(): Promise<SapiClassStatus> {
		if (this.port == undefined)
			return (SapiClassStatus.PORT_NOT_REQUEST);
		if (this.b_open == false)
			return (SapiClassStatus.PORT_NOT_CLOSE);
		await this.port.close();
		this.b_open = false;
		return (SapiClassStatus.OK);
	}

	private async _detect(out:SapiClassDetect, baudrate:Array<number>): Promise<void> {
		let i:number;

		if (this.port == undefined) {
			out.status = SapiClassStatus.PORT_NOT_REQUEST;
			return ;
		}
		if (this.b_open == true) {
			out.status = await this._close_2();
			if (out.status != SapiClassStatus.OK)
				return ;
			await sleep(this.dtr_timeout);
		}
		const baudrate_array:Array<number> = this.BAUDRATE;
		i = baudrate.length;
		while (i != 0x0) {
			i--;
			if (this.BAUDRATE.indexOf(baudrate[i]) != -1) {
				baudrate_array.splice(baudrate_array.indexOf(baudrate[i]), 0x1);
				baudrate_array.unshift(baudrate[i]);
			}
		}
		i = 0x0;
		while (i < baudrate_array.length) {
			out.baudrate = baudrate_array[i];
			out.status = await this._open_2(baudrate_array[i]);
			if (out.status != SapiClassStatus.OK)
				return ;
			const res:SapiClassRet = await this._recvIncomingRequest(300);
			if (res.status == SapiClassStatus.OK) {
				if (res.cmd == SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET) {
					const freeze_zuno_info:SapiClassRet = await this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x2], 0x2, 3000);
					if (freeze_zuno_info.status != SapiClassStatus.OK || freeze_zuno_info.data[0x0] != 0x0) {
						out.status = SapiClassStatus.ZUNO_NO_FREEZE;
						return ;
					}
					out.type = SapiClassDetectType.ZUNO;
					return ;
				}
				if (res.cmd == SapiClassFuncId.FUNC_ID_SERIAL_API_STARTED) {
					out.type = SapiClassDetectType.RAZBERRY;
					return ;
				}
				out.status = SapiClassStatus.DETECTED_UNC_COMMAND;
				return ;
			}
			const capabilities_info:SapiClassRet = await this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_GET_CAPABILITIES, [], 0x1, 300);
			if (capabilities_info.status == SapiClassStatus.OK) {
				out.type = SapiClassDetectType.RAZBERRY;
				return ;
			}
			out.status = await this._close_2();
			if (out.status != SapiClassStatus.OK)
				return ;
			await sleep(this.dtr_timeout);
			i++;
		}
	}

	public async detect(baudrate:Array<number>): Promise<SapiClassDetect> {
		const out:SapiClassDetect = {status: SapiClassStatus.OK, type: SapiClassDetectType.ZUNO, baudrate:0x0};
	
		if (this.busy() == true) {
			out.status = SapiClassStatus.PORT_BUSY;
			return (out);
		}
		this.b_busy = true;
		await this._detect(out, baudrate);
		this.b_busy = false;
		return (out);
	}

	constructor() {
	}

}