
import { QRCode, QRCodeOption, QRErrorCorrectLevel } from "./qr_code/qrcode";
import {ControllerUiDefineClass, NAME_APP_VERSION_FULL} from "./ui_define"
import {SapiClass, SapiClassDetect, SapiClassStatus, SapiClassDetectType} from "./sapi/sapi";
import {ZunoSapiClass, ZunoSapiClassBoardInfo, ZunoSapiClassStatus, ZunoSapiClassRegion, ZunoSapiClassPower, ZunoSapiClassSec} from "./sapi/zuno_sapi";
import {ControllerUiLangClassId} from "./lang/ui_lang_define"
import {ControllerUiLangClass} from "./lang/ui_lang"
import {conv2Decimal} from "./other/utilities"
import {SapiRegionClass} from "./sapi/region"

export {ZUnoCompilerClass};

type ZUnoCompilerProgressCbkProt = (severity:string, message:string) => void;

type ZUnoCompilerLoadSketchResultProt = {
	"status":number,
	"log":string,
	"message":string,
	"bin":string,
};


type ZUnoCompilerVersionHwResultProt = {
	[index:string]:{"seq":number},
};

type ZUnoCompilerVersionResultProt = {
	"status":number,
	"log":string,
	"message":string,
	"version":{"hw": ZUnoCompilerVersionHwResultProt}
};

type ZUnoCompilerLoadSketchOutProt = {
	"dsk"?:string,
	"smart_qr"?:string,
}

enum XhrStatus
{
	OK,
	TIMEOUT,
	ERROR,
	INVALID_DATA,
}

interface XhrOut
{
	status:XhrStatus;
	error:string;
	url:string;
	data:any;
}

interface XhrOutBuildNumber
{
	res:XhrOut;
	build_number:number;
}

interface XhrOutBinary
{
	res:XhrOut;
	bin:Uint8Array;
}

class ZUnoCompilerClass {
	private readonly sapi:SapiClass											= new SapiClass();
	private readonly zuno:ZunoSapiClass										= new ZunoSapiClass(this.sapi);
	private readonly locale:ControllerUiLangClass							= new ControllerUiLangClass();

	private readonly COM_PORT_FILTERS										= [{ usbVendorId: 0x10c4, usbProductId: 0xea60 }];

	private xhr_version														= new XMLHttpRequest();
	private xhr_compile														= new XMLHttpRequest();
	private xhr_download_finware											= new XMLHttpRequest();

	private error_complite:boolean											= false;

	private progressCbk:ZUnoCompilerProgressCbkProt|null;
	private promise_wait: Promise<ZUnoCompilerLoadSketchOutProt|void>;

	private _progress(severity:string, txt:string): void {
		if (this.progressCbk == null)
			return ;
		this.progressCbk(severity, txt);
	}

	private async _close(): Promise<void> {
		this.xhr_version.abort();
		this.xhr_compile.abort();
		this.xhr_download_finware.abort();
		await this.sapi.close();
	}

	private _info(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this._progress("info", txt);
	}

	public _info_wait(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this._info(txt + "...");
	}

	
	public _info_done(txt:string|ControllerUiLangClassId): void {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		this._info(txt + this.locale.getLocale(ControllerUiLangClassId.LOG_DONE));
	}

	private async _error(txt:string|ControllerUiLangClassId): Promise<void> {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		txt = txt + this.locale.getLocale(ControllerUiLangClassId.LOG_FAILED);
		this._progress("error", txt);
		await this._close();
		throw new Error(txt);
	}

	private async _error_code(txt:string|ControllerUiLangClassId, code:number): Promise<void> {
		if (typeof txt !== "string")
			txt = this.locale.getLocale(txt);
		txt = txt + this.locale.getLocale(ControllerUiLangClassId.LOG_FAILED_CODE).replace('{{code}}', code.toString());
		this._progress("error", txt);
		await this._close();
		throw new Error(txt);
	}

	private _get_baudrate_cache():Array<number> {
		let baudrate:Array<number>, i:number;

		const baudrate_str:string|null = localStorage.getItem(ControllerUiDefineClass.KEY_BAUDRATE);
		if (baudrate_str == null)
			return ([]);
		try {
			baudrate = JSON.parse(baudrate_str);
		} catch (error) {
			return ([]);
		}
		if (Array.isArray(baudrate) == false)
			return ([]);
		i = 0x0;
		while (i < baudrate.length) {
			if (this.sapi.BAUDRATE.indexOf(baudrate[i]) == -1)
				baudrate.splice(i, 0x1);
			i++;
		}
		return (baudrate);
	}

	private _set_baudrate_cache(baudrate_array:Array<number>, baudrate:number):void {
		const i:number = baudrate_array.indexOf(baudrate);
		if (i != -1)
			baudrate_array.splice(i, 0x1);
		baudrate_array.unshift(baudrate);
		localStorage.setItem(ControllerUiDefineClass.KEY_BAUDRATE, JSON.stringify(baudrate_array));
	}

	private async _xhr(xhr:XMLHttpRequest, url:string, data:FormData|null): Promise<XhrOut> {
		return new Promise(function(resolve) {
			const out:XhrOut = {status:XhrStatus.OK, error:"", url:'https://service.z-wave.me/z-uno-compilation-server/?' + url, data:""};
			xhr.open("POST", out.url);
			xhr.responseType = 'json';
			xhr.timeout = 30000;//30 sec
			xhr.ontimeout = function () {
				out.status = XhrStatus.TIMEOUT;
				resolve(out);
			};
			xhr.onload = function () {
				out.data = xhr.response;
				resolve(out);
			};
			xhr.onerror = function () {
				out.status = XhrStatus.ERROR;
				resolve(out);
			};
			xhr.send(data);
		});
	}

	private async _xhr_common(xhr:XMLHttpRequest, url:string, data:FormData|null): Promise<XhrOut> {
		const res:XhrOut = await this._xhr(xhr, url, data);
		if (res.status == XhrStatus.OK)
			return (res);
		if (res.status == XhrStatus.TIMEOUT) {
			res.error = this.locale.getLocale(ControllerUiLangClassId.LOG_XHR_TIMEOUT).replace('{{url}}', res.url);
			return (res);
		}
		res.error = this.locale.getLocale(ControllerUiLangClassId.LOG_XHR_ERROR).replace('{{url}}', res.url);
		return (res);
	}

	private async _xhr_build_number(hw_str:string): Promise<XhrOutBuildNumber> {
		const res:XhrOut = await this._xhr_common(this.xhr_version, 'version', null);
		const out:XhrOutBuildNumber = {res:res, build_number:0x0};
		if (res.status != XhrStatus.OK)
			return (out);
		try {
			const result:ZUnoCompilerVersionResultProt = res.data;
			if (result["status"] != 0x0) {
				out.res.status = XhrStatus.INVALID_DATA;
				out.res.error = "Get version returned incorrect status: " + result["status"] + " message: " +  result["message"];
				return (out);
			}
			const version_list:ZUnoCompilerVersionHwResultProt = result["version"]["hw"];
			const build_number:number = version_list[hw_str].seq;
			if (build_number === undefined) {
				out.res.status = XhrStatus.INVALID_DATA;
				out.res.error = "The server does not support the specified board revision";
				return (out);
			}
			out.build_number = build_number;
		} catch (error) {
			out.res.status = XhrStatus.INVALID_DATA;
			out.res.error = this.locale.getLocale(ControllerUiLangClassId.LOG_XHR_INVALID_DATA).replace('{{url}}', out.res.url);
			return (out);
		}
		return (out);
	}

	private async _xhr_download_finware(hw_str:string, build_number:number): Promise<XhrOutBinary> {
		const url = 'bootloader&' + 'hw=' + hw_str + "&seq=" + String(build_number);
		const res:XhrOut = await this._xhr_common(this.xhr_download_finware, url, null);
		const out:XhrOutBinary = {res:res, bin: new Uint8Array()};
		if (res.status != XhrStatus.OK)
			return (out);
		try {
			const result:ZUnoCompilerLoadSketchResultProt = res.data;
			if (result["status"] != 0x0) {
				out.res.status = XhrStatus.INVALID_DATA;
				out.res.error = "Get bootloader returned incorrect status: " + result["status"] + " log: " + result["log"] + " message: " +  result["message"];
				return (out);
			}
			out.bin = this._base64ToArrayBuffer(result["bin"]);
		} catch (error) {
			out.res.status = XhrStatus.INVALID_DATA;
			out.res.error = this.locale.getLocale(ControllerUiLangClassId.LOG_XHR_INVALID_DATA).replace('{{url}}', out.res.url);
			return (out);
		}
		return (out);
	}

	private _base64ToArrayBuffer(base64:string): Uint8Array {
		const binaryString:string = atob(base64);
		const bytes:Array<number> = new Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return new Uint8Array(bytes);
	}

	private async _xhr_compile(hw_str:string, code:string): Promise<XhrOutBinary> {
		const formData:FormData = new FormData();
		formData.append("sketch", new File([new Blob([code])], "sketch", { lastModified: Date.now(), type: "text/x-arduino"}));
		formData.append("referer", document.location.href);
		const url = 'compile&' + 'hw=' + hw_str;
		const res:XhrOut = await this._xhr_common(this.xhr_compile, url, formData);
		const out:XhrOutBinary = {res:res, bin: new Uint8Array()};
		if (res.status != XhrStatus.OK)
			return (out);
		try {
			const result:ZUnoCompilerLoadSketchResultProt = res.data;
			if (result["status"] != 0x0) {
				out.res.status = XhrStatus.INVALID_DATA;
				out.res.error = "Compilation returned incorrect status: " + result["status"] + " log: " + result["log"] + " message: " +  result["message"];
				return (out);
			}
			out.bin = this._base64ToArrayBuffer(result["bin"]);
		} catch (error) {
			out.res.status = XhrStatus.INVALID_DATA;
			out.res.error = this.locale.getLocale(ControllerUiLangClassId.LOG_XHR_INVALID_DATA).replace('{{url}}', out.res.url);
			return (out);
		}
		return (out);
	}

	private async _sketch(code:string, freq:string|null, sec:boolean, main_pow:number): Promise<ZUnoCompilerLoadSketchOutProt|void> {
		let hw_str:string, board_info:ZunoSapiClassBoardInfo, detect_dict:SapiClassDetect;

		this._info(NAME_APP_VERSION_FULL);
		const status:SapiClassStatus = await this.sapi.request(this.COM_PORT_FILTERS);
		if (status == SapiClassStatus.SERIAL_UN_SUPPORT)
			return (this._error(ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER));
		if (status == SapiClassStatus.REQUEST_NO_SELECT)
			return (this._error(ControllerUiLangClassId.MESSAGE_PORT_SELECT));
		if (status != SapiClassStatus.OK)
			return (this._error_code(ControllerUiLangClassId.MESSAGE_PORT_SELECT, status));
		this._info(ControllerUiLangClassId.MESSAGE_DETECTION);
		const baudrate_array:Array<number> = this._get_baudrate_cache();
		detect_dict = await this.sapi.detect(baudrate_array, null);
		if (detect_dict.status != SapiClassStatus.OK) {
			this._error_code(ControllerUiLangClassId.MESSAGE_DETECTION, detect_dict.status);
			return ;
		}
		this._set_baudrate_cache(baudrate_array, detect_dict.baudrate);
		this._info_done(ControllerUiLangClassId.MESSAGE_DETECTION);
		this._info(ControllerUiLangClassId.MESSAGE_CONNECT);
		if (this.sapi.type() != SapiClassDetectType.ZUNO) {
			this._error(ControllerUiLangClassId.MESSAGE_CONNECT);
			return ;
		}
		await this.zuno.connect();
		this._info(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		board_info = this.zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			this._error_code(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
			return ;
		}
		this._info_done(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		this._info(ControllerUiLangClassId.MESSAGE_READ_REGION);
		const region_info:ZunoSapiClassRegion = this.zuno.getRegion();
		if (region_info.status != ZunoSapiClassStatus.OK) {
			this._error_code(ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
			return ;
		}
		this._info_done(ControllerUiLangClassId.MESSAGE_READ_REGION);
		this._info(ControllerUiLangClassId.MESSAGE_READ_POWER);
		const power:ZunoSapiClassPower = this.zuno.getPower();
		if (power.status != ZunoSapiClassStatus.OK) {
			this._error_code(ControllerUiLangClassId.MESSAGE_READ_POWER, power.status);
			return ;
		}
		this._info_done(ControllerUiLangClassId.MESSAGE_READ_POWER);
		this._info(ControllerUiLangClassId.MESSAGE_READ_SEC);
		const sec_info:ZunoSapiClassSec = this.zuno.getSec();
		if (sec_info.status != ZunoSapiClassStatus.OK) {
			this._error_code(ControllerUiLangClassId.MESSAGE_READ_SEC, sec_info.status);
			return ;
		}
		this._info_done(ControllerUiLangClassId.MESSAGE_READ_SEC);
		if (freq != null && freq != region_info.region) {
			this._info(ControllerUiLangClassId.MESSAGE_SET_REGION);
			const set_region_status:ZunoSapiClassStatus = await this.zuno.setRegion(freq);
			if (set_region_status != ZunoSapiClassStatus.OK) {
				this._error_code(ControllerUiLangClassId.MESSAGE_SET_REGION, set_region_status);
				return ;
			}
			this._info_done(ControllerUiLangClassId.MESSAGE_SET_REGION);
		}
		if (main_pow < power.min || main_pow > power.max) {
			this._error("Radio power is out of range");
			return ;
		}
		if (power.power_raw != main_pow) {
			this._info(ControllerUiLangClassId.MESSAGE_SET_POWER);
			const set_power_status:ZunoSapiClassStatus = await this.zuno.setPower(main_pow);
			if (set_power_status != ZunoSapiClassStatus.OK) {
				this._error_code(ControllerUiLangClassId.MESSAGE_SET_POWER, set_power_status);
				return ;
			}
			this._info_done(ControllerUiLangClassId.MESSAGE_SET_POWER);
		}
		if (sec_info.sec != sec) {
			this._info(ControllerUiLangClassId.MESSAGE_SET_SEC);
			const set_power_status:ZunoSapiClassStatus = await this.zuno.setSec(sec);
			if (set_power_status != ZunoSapiClassStatus.OK) {
				this._error_code(ControllerUiLangClassId.MESSAGE_SET_SEC, set_power_status);
				return ;
			}
			this._info_done(ControllerUiLangClassId.MESSAGE_SET_SEC);
		}
		hw_str = board_info.hw_rev.toString(0x10);
		while (hw_str.length < 0x4)
			hw_str = '0' + hw_str;
		const promise_compile: Promise<XhrOutBinary> = this._xhr_compile(hw_str, code);
		this._info_wait("Checking Z-Uno version");
		const res_build_number:XhrOutBuildNumber = await this._xhr_build_number(hw_str);
		if (res_build_number.res.status != XhrStatus.OK) {
			this._error(res_build_number.res.error);
			return ;
		}
		if (board_info.build_number > res_build_number.build_number) {
			this._error("The firmware on the board is newer than on the server");
			return ;
		}
		this._info_done("Checking Z-Uno version");
		if (board_info.build_number != res_build_number.build_number) {
			this._info_wait("Downloading new firmware");
			const res_download_finware:XhrOutBinary = await this._xhr_download_finware(hw_str, res_build_number.build_number);
			if (res_download_finware.res.status != XhrStatus.OK) {
				this._error(res_download_finware.res.error);
				return ;
			}
			this._info_done("Downloading new firmware");
			this._info_wait("Uploading a new firmware to the Z-Uno");
			const status:ZunoSapiClassStatus = await this.zuno.updateFirmware(res_download_finware.bin, null, SapiClassDetectType.ZUNO);
			if (status != ZunoSapiClassStatus.OK) {
				this._error_code("Uploading a new firmware to the Z-Uno", status);
				return ;
			}
			await this.zuno.connect();
			this._info_done("Uploading a new firmware to the Z-Uno");
			this._info(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
			board_info = this.zuno.getBoardInfo();
			if (board_info.status != ZunoSapiClassStatus.OK) {
				this._error_code(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
				return ;
			}
			this._info_done(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
			if (res_build_number.build_number != board_info.build_number) {
				this._error("Although the firmware was successfully updated, the actual version was no longer needed");
				return ;
			}
		}
		this._info_wait("Compiling the sketch");
		const res_compile:XhrOutBinary = await promise_compile;
		if (res_compile.res.status != XhrStatus.OK) {
			this.error_complite = true;
			this._error(res_compile.res.error);
			return ;
		}
		this._info_done("Compiling the sketch");
		this._info_wait("Uploading the sketch");
		const status_upload_scetch:ZunoSapiClassStatus = await this.zuno.updateSketch(res_compile.bin, null);
		if (status_upload_scetch != ZunoSapiClassStatus.OK) {
			this._error_code("Uploading the sketch", status_upload_scetch);
			return ;
		}
		this._info_done("Uploading the sketch");
		this._info_wait("QR code read");
		await this._close();
		detect_dict = await this.sapi.detect([detect_dict.baudrate], null);
		if (detect_dict.status != SapiClassStatus.OK) {
			this._error_code(ControllerUiLangClassId.MESSAGE_DETECTION, detect_dict.status);
			return ;
		}
		if (this.sapi.type() != SapiClassDetectType.ZUNO) {
			this._error(ControllerUiLangClassId.MESSAGE_CONNECT);
			return ;
		}
		await this.zuno.connect();
		board_info = this.zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			this._error_code(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
			return ;
		}
		await this._close();
		this._info_done("QR code read");
		const out:ZUnoCompilerLoadSketchOutProt = {smart_qr:board_info.smart_qr, dsk:conv2Decimal(board_info.s2_pub, " - ")};
		return (out);
	}

	private _generateQrCode(id:HTMLElement|string, text:string): boolean {
		let obj_QRCode:QRCode;
		const option:QRCodeOption = {
			text: text,
			width: 256,
			height: 256,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRErrorCorrectLevel.L,
		};

		try {
			obj_QRCode = new QRCode(id, option);
		} catch(e) {
			this._progress("error", "Failed to create \"object QRCode\", check parameters.");
			return (false);
		}
		return (true);
	}

	/**
	 * Draw the QR code of the board
	 *
	 * @param {*} id Id of the div tag that will host the QR-code image
	 * @param {*} qrContent Content of the QR-code to be printed
	 */
	public drawQR(id:HTMLElement|string, text:string): boolean {
		return (this._generateQrCode(id, text));
	}

	public cancel(): void {
		this._close();
	}

	public errorComplite(): boolean {
		return this.error_complite;
	}

	public getWait(): Promise<ZUnoCompilerLoadSketchOutProt|void> {
		return (this.promise_wait);
	}

	/**
	 *
	 * @returns List freq
	 */
	public static getFreqList(): Array<string> {
		const region:SapiRegionClass = new SapiRegionClass(true, true);
		return (region.getListRegion());
	}

	constructor(code:string, freq:string|null, sec:boolean, main_pow:number, cbk:ZUnoCompilerProgressCbkProt|null = null) {
		this.progressCbk = cbk;
		this.promise_wait = this._sketch(code, freq, sec, main_pow);
	}
}
