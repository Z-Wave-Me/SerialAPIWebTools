
import {SapiClass, SapiClassStatus, SapiClassFuncId, SapiClassRet} from "./sapi";

export {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo};

enum ZunoSapiClassStatus
{
	OK = SapiClassStatus.OK,
	NOT_INIT = SapiClassStatus.LAST_STATUS,
	WRONG_LENGTH_CMD,
}

interface ZunoSapiClassBoardInfo
{
	status:ZunoSapiClassStatus;
	version:number;
	build_number:number;
}


// ------------------------------------------------------------------------------------------------------

class ZunoSapiClass {
	private readonly sapi:SapiClass;
	private board_info:ZunoSapiClassBoardInfo												= {status:ZunoSapiClassStatus.NOT_INIT, version:0x0, build_number:0x0};

	private async _readNVM(addr:number, size:number): Promise<SapiClassRet> {
		return (await this.sapi.sendCommandUnSz(SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER, [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF]));
	}

	private async _get_board_info(out:ZunoSapiClassBoardInfo): Promise<void> {
		const board_info:SapiClassRet = await this._readNVM(0xFFFF00, 0x01);
		if (board_info.status != SapiClassStatus.OK) {
			out.status = ((board_info.status as unknown) as ZunoSapiClassStatus);
			return ;
		}
		if (board_info.data.length < 10) {
			out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
			return ;
		}
		const info:Array<number> = board_info.data;
		out.build_number = (info[2] << 24) | (info[3] << 16) |  (info[4] << 8) | (info[5]);
		out.version = (((info[0] << 8) | (info[1])) << 16 | (out.build_number & 0xFFFF))
		// const param_info:SapiClassRet = await this._readNVM(0xFFE000, 0x09);
		// if (param_info.data.length < 10) {
		// 	out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
		// 	return ;
		// }
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
		this.board_info.status = ZunoSapiClassStatus.NOT_INIT;
		await this._get_board_info(this.board_info);
		// await this._begin(true);
	}

	constructor(sapi:SapiClass) {
		this.sapi = sapi;
	}
}