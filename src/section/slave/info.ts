import {ControllerUiLangClassId} from "../../lang/ui_lang_define"
import {ControllerUiLangClass} from "../../lang/ui_lang"
import {ZunoSapiClass, ZunoSapiClassStatus, ZunoSapiClassBoardInfo} from "../../sapi/zuno_sapi";
import {ControllerUiLogClass} from "../../log/ui_log"
import {CommonUiSectionClass} from "../common"
import {versionNumberToStringSlave, arrayToStringHex, numberToStringHex, conv2Decimal} from "../../other/utilities";
import { QRCode, QRCodeOption, QRErrorCorrectLevel } from "./../../qr_code/qrcode";

export {SlaveUiSectionInfoClass};

interface ControllerUiSectionInfoClassReBegin {
	(): Promise<void>
}


class SlaveUiSectionInfoClass extends CommonUiSectionClass {
	private readonly zuno:ZunoSapiClass;
	private readonly re_begin_func:ControllerUiSectionInfoClassReBegin;

	private _board_info(): boolean {
		let dsk:string;

		this.log.infoStart(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		const board_info:ZunoSapiClassBoardInfo = this.zuno.getBoardInfo();
		if (board_info.status != ZunoSapiClassStatus.OK) {
			this.log.errorFalledCode(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
			return (false);
		}
		this.create_tr_el(ControllerUiLangClassId.SLAVE_TABLE_NAME_VERSION, ControllerUiLangClassId.SLAVE_TABLE_NAME_VERSION_TITLE, versionNumberToStringSlave(board_info.version), "");
		const build_data_time:Date = new Date(board_info.build_ts * 1000);
		this.create_tr_el(ControllerUiLangClassId.SLAVE_TABLE_NAME_BUILD_TIME_STAMP, ControllerUiLangClassId.SLAVE_TABLE_NAME_BUILD_TIME_STAMP_TITLE, build_data_time.toLocaleString(), "");
		this.create_tr_el(ControllerUiLangClassId.SLAVE_TABLE_NAME_UUID, ControllerUiLangClassId.SLAVE_TABLE_NAME_UUID_TITLE, arrayToStringHex(board_info.chip_uuid), "");
		if (board_info.home_id != undefined)
			this.create_tr_el(ControllerUiLangClassId.SLAVE_TABLE_NAME_HOME, ControllerUiLangClassId.SLAVE_TABLE_NAME_HOME_TITLE, numberToStringHex(board_info.home_id), "");
		if (board_info.node_id != undefined)
			this.create_tr_el(ControllerUiLangClassId.SLAVE_TABLE_NAME_NODE, ControllerUiLangClassId.SLAVE_TABLE_NAME_NODE_TITLE, board_info.node_id.toString(0xA), "");
		dsk = conv2Decimal(board_info.s2_pub, " - ");
		dsk = "<b>" + dsk.substring(0x0, 0x5) + "</b>" + dsk.substring(0x5);
		this.create_tr_el(ControllerUiLangClassId.SLAVE_TABLE_NAME_DSK, ControllerUiLangClassId.SLAVE_TABLE_NAME_DSK_TITLE, dsk, "");
		if (board_info.smart_qr != undefined) {
			const el_span:HTMLSpanElement = document.createElement("span");
			const option:QRCodeOption = {
				text: board_info.smart_qr,
				width: 128,
				height: 128,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRErrorCorrectLevel.L,
			};
			try {
				new QRCode(el_span, option);
			} catch(e) {
				el_span.textContent = board_info.smart_qr;
			}
			this.create_tr_el(ControllerUiLangClassId.SLAVE_TABLE_NAME_QR_CODE, ControllerUiLangClassId.SLAVE_TABLE_NAME_QR_CODE_TITLE, el_span, "");
		}
		this.log.infoDone(ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
		return (true);
	}

	private async _begin(): Promise<boolean> {
		let display:boolean;

		display = false;
		if (this._board_info() == true)
			display = true;
		return (display);
	}

	private async _end(): Promise<void> {

	}

	constructor(el_section:HTMLElement, locale:ControllerUiLangClass, zuno:ZunoSapiClass, log:ControllerUiLogClass, re_begin_func:ControllerUiSectionInfoClassReBegin) {
		super(el_section, locale, zuno, log, ControllerUiLangClassId.SLAVE_INFO_HEADER, async ():Promise<boolean> => {return (await this._begin());}, async ():Promise<void> => {return (await this._end());});
		this.zuno = zuno;
		this.re_begin_func = re_begin_func;
	}
}