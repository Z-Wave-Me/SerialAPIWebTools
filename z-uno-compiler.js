(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ZUnoCompiler"] = factory();
	else
		root["ZUnoCompiler"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hardware/chip.ts":
/*!******************************!*\
  !*** ./src/hardware/chip.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HardwareChipClass = void 0;
class HardwareChipClass {
    constructor() {
    }
}
exports.HardwareChipClass = HardwareChipClass;
HardwareChipClass.FAMILY_ZGM13 = 0x00;
HardwareChipClass.CHIP_ZGM130S037HGN = 0x01;
HardwareChipClass.CHIP_ZGM130S037HGN1 = 0x02;
HardwareChipClass.FAMILY_EFR32MG21 = 0x01;
HardwareChipClass.CHIP_EFR32MG21A010F1024IM32 = 0x01;
HardwareChipClass.CHIP_EFR32MG21A010F512IM32 = 0x02;
HardwareChipClass.CHIP_EFR32MG21A010F768IM32 = 0x03;
HardwareChipClass.CHIP_EFR32MG21A020F1024IM32 = 0x04;
HardwareChipClass.CHIP_EFR32MG21A020F512IM32 = 0x05;
HardwareChipClass.CHIP_EFR32MG21A020F768IM32 = 0x06;
HardwareChipClass.CHIP_EFR32MG21B010F1024IM32 = 0x07;
HardwareChipClass.CHIP_EFR32MG21B010F512IM32 = 0x08;
HardwareChipClass.CHIP_EFR32MG21B010F768IM32 = 0x09;
HardwareChipClass.CHIP_EFR32MG21B020F1024IM32 = 0x0A;
HardwareChipClass.CHIP_EFR32MG21B020F512IM32 = 0x0B;
HardwareChipClass.CHIP_EFR32MG21B020F768IM32 = 0x0C;
HardwareChipClass.FAMILY_ZGM23 = 0x02;
HardwareChipClass.CHIP_ZGM230SA27HGN = 0x01;
HardwareChipClass.CHIP_ZGM230SA27HNN = 0x02;
HardwareChipClass.CHIP_ZGM230SB27HGN = 0x03;
HardwareChipClass.CHIP_ZGM230SB27HNN = 0x04;
HardwareChipClass.FAMILY_MGM21 = 0x03;
HardwareChipClass.CHIP_MGM210L022JIF = 0x01;
HardwareChipClass.CHIP_MGM210L022JNF = 0x02;
HardwareChipClass.CHIP_MGM210LA22JIF = 0x03;
HardwareChipClass.CHIP_MGM210LA22JNF = 0x04;
HardwareChipClass.CHIP_MGM210P022JIA = 0x05;
HardwareChipClass.CHIP_MGM210P032JIA = 0x06;
HardwareChipClass.CHIP_MGM210PA22JIA = 0x07;
HardwareChipClass.CHIP_MGM210PA32JIA = 0x08;
HardwareChipClass.CHIP_MGM210PB22JIA = 0x09;
HardwareChipClass.CHIP_MGM210PB32JIA = 0x0A;
HardwareChipClass.CHIP_MGM211LA02JNF = 0x0B;
HardwareChipClass.FAMILY_EFR32ZG23 = 0x04;
HardwareChipClass.CHIP_EFR32ZG23A010F512GM40 = 0x01;
HardwareChipClass.CHIP_EFR32ZG23A010F512GM48 = 0x02;
HardwareChipClass.CHIP_EFR32ZG23A020F512GM40 = 0x03;
HardwareChipClass.CHIP_EFR32ZG23A020F512GM48 = 0x04;
HardwareChipClass.CHIP_EFR32ZG23B010F512IM40 = 0x05;
HardwareChipClass.CHIP_EFR32ZG23B010F512IM48 = 0x06;
HardwareChipClass.CHIP_EFR32ZG23B011F512IM40 = 0x07;
HardwareChipClass.CHIP_EFR32ZG23B020F512IM40 = 0x08;
HardwareChipClass.CHIP_EFR32ZG23B020F512IM48 = 0x09;
HardwareChipClass.CHIP_EFR32ZG23B021F512IM40 = 0x0A;
HardwareChipClass.FAMILY_EFR32MG24 = 0x05;
HardwareChipClass.CHIP_EFR32MG24A010F1024IM40 = 0x01;
HardwareChipClass.CHIP_EFR32MG24A010F1024IM48 = 0x02;
HardwareChipClass.CHIP_EFR32MG24A010F1536GM40 = 0x03;
HardwareChipClass.CHIP_EFR32MG24A010F1536GM48 = 0x04;
HardwareChipClass.CHIP_EFR32MG24A010F1536IM40 = 0x05;
HardwareChipClass.CHIP_EFR32MG24A010F1536IM48 = 0x06;
HardwareChipClass.CHIP_EFR32MG24A010F768IM40 = 0x07;
HardwareChipClass.CHIP_EFR32MG24A010F768IM48 = 0x08;
HardwareChipClass.CHIP_EFR32MG24A020F1024IM40 = 0x09;
HardwareChipClass.CHIP_EFR32MG24A020F1024IM48 = 0x0A;
HardwareChipClass.CHIP_EFR32MG24A020F1536GM40 = 0x0B;
HardwareChipClass.CHIP_EFR32MG24A020F1536GM48 = 0x0C;
HardwareChipClass.CHIP_EFR32MG24A020F1536IM40 = 0x0D;
HardwareChipClass.CHIP_EFR32MG24A020F1536IM48 = 0x0E;
HardwareChipClass.CHIP_EFR32MG24A020F768IM40 = 0x0F;
HardwareChipClass.CHIP_EFR32MG24A021F1024IM40 = 0x10;
HardwareChipClass.CHIP_EFR32MG24A110F1024IM48 = 0x11;
HardwareChipClass.CHIP_EFR32MG24A110F1536GM48 = 0x12;
HardwareChipClass.CHIP_EFR32MG24A111F1536GM48 = 0x13;
HardwareChipClass.CHIP_EFR32MG24A120F1536GM48 = 0x14;
HardwareChipClass.CHIP_EFR32MG24A121F1536GM48 = 0x15;
HardwareChipClass.CHIP_EFR32MG24A410F1536IM40 = 0x16;
HardwareChipClass.CHIP_EFR32MG24A410F1536IM48 = 0x17;
HardwareChipClass.CHIP_EFR32MG24A420F1536IM40 = 0x18;
HardwareChipClass.CHIP_EFR32MG24A420F1536IM48 = 0x19;
HardwareChipClass.CHIP_EFR32MG24A610F1536IM40 = 0x1A;
HardwareChipClass.CHIP_EFR32MG24A620F1536IM40 = 0x1B;
HardwareChipClass.CHIP_EFR32MG24B010F1024IM48 = 0x1C;
HardwareChipClass.CHIP_EFR32MG24B010F1536IM40 = 0x1D;
HardwareChipClass.CHIP_EFR32MG24B010F1536IM48 = 0x1E;
HardwareChipClass.CHIP_EFR32MG24B020F1024IM48 = 0x1F;
HardwareChipClass.CHIP_EFR32MG24B020F1536IM40 = 0x20;
HardwareChipClass.CHIP_EFR32MG24B020F1536IM48 = 0x21;
HardwareChipClass.CHIP_EFR32MG24B110F1536GM48 = 0x22;
HardwareChipClass.CHIP_EFR32MG24B110F1536IM48 = 0x23;
HardwareChipClass.CHIP_EFR32MG24B120F1536IM48 = 0x24;
HardwareChipClass.CHIP_EFR32MG24B210F1536IM40 = 0x25;
HardwareChipClass.CHIP_EFR32MG24B210F1536IM48 = 0x26;
HardwareChipClass.CHIP_EFR32MG24B220F1536IM48 = 0x27;
HardwareChipClass.CHIP_EFR32MG24B310F1536IM48 = 0x28;
HardwareChipClass.CHIP_EFR32MG24B610F1536IM40 = 0x29;


/***/ }),

/***/ "./src/lang/ui_lang.ts":
/*!*****************************!*\
  !*** ./src/lang/ui_lang.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiLangClass = void 0;
const ui_lang_en_1 = __webpack_require__(/*! ./ui_lang_en */ "./src/lang/ui_lang_en.ts");
class ControllerUiLangClass {
    getLocale(id) {
        if (this.locale[id] != undefined)
            return (this.locale[id]);
        return ("");
    }
    constructor() {
        this.locale = ui_lang_en_1.controller_lang_en;
    }
}
exports.ControllerUiLangClass = ControllerUiLangClass;


/***/ }),

/***/ "./src/lang/ui_lang_define.ts":
/*!************************************!*\
  !*** ./src/lang/ui_lang_define.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiLangClassId = void 0;
var ControllerUiLangClassId;
(function (ControllerUiLangClassId) {
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_PORT_NOT_SELECT"] = 0] = "MESSAGE_PORT_NOT_SELECT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_NOT_SUPPORT_BROWSER"] = 1] = "MESSAGE_NOT_SUPPORT_BROWSER";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_PORT_USE"] = 2] = "MESSAGE_PORT_USE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_CONNECT"] = 3] = "MESSAGE_CONNECT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_DETECTION"] = 4] = "MESSAGE_DETECTION";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_CAPABILITIES"] = 5] = "MESSAGE_READ_CAPABILITIES";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_REGION"] = 6] = "MESSAGE_READ_REGION";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_SEC"] = 7] = "MESSAGE_READ_SEC";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_POWER"] = 8] = "MESSAGE_READ_POWER";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_LICENSE"] = 9] = "MESSAGE_READ_LICENSE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_LICENSE"] = 10] = "MESSAGE_SET_LICENSE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_BOARD_INFO"] = 11] = "MESSAGE_READ_BOARD_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_REGION"] = 12] = "MESSAGE_SET_REGION";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_POWER"] = 13] = "MESSAGE_SET_POWER";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_SEC"] = 14] = "MESSAGE_SET_SEC";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_DEFAULT"] = 15] = "MESSAGE_SET_DEFAULT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_PLEASE_WAIT"] = 16] = "MESSAGE_PLEASE_WAIT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_UPDATE_DOWNLOAD_INFO"] = 17] = "MESSAGE_UPDATE_DOWNLOAD_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_UPDATE_DOWNLOAD_FILE"] = 18] = "MESSAGE_UPDATE_DOWNLOAD_FILE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_UPDATE_START_FIRMWARE"] = 19] = "MESSAGE_UPDATE_START_FIRMWARE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_UPDATE_START_BOOTLOADER"] = 20] = "MESSAGE_UPDATE_START_BOOTLOADER";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_SERIAL_API_VERSION"] = 21] = "TABLE_NAME_SERIAL_API_VERSION";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_SERIAL_API_VERSION_TITLE"] = 22] = "TABLE_NAME_SERIAL_API_VERSION_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VENDOR"] = 23] = "TABLE_NAME_VENDOR";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VENDOR_TITLE"] = 24] = "TABLE_NAME_VENDOR_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VENDOR_ID"] = 25] = "TABLE_NAME_VENDOR_ID";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VENDOR_ID_TITLE"] = 26] = "TABLE_NAME_VENDOR_ID_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION"] = 27] = "TABLE_NAME_REGION";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION_TITLE"] = 28] = "TABLE_NAME_REGION_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION_SELECT_TITLE"] = 29] = "TABLE_NAME_REGION_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION_BUTTON"] = 30] = "TABLE_NAME_REGION_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION_BUTTON_TITLE"] = 31] = "TABLE_NAME_REGION_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_RESET_DEFAULT"] = 32] = "TABLE_NAME_RESET_DEFAULT";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_RESET_DEFAULT_TITLE"] = 33] = "TABLE_NAME_RESET_DEFAULT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_RESET_DEFAULT_BUTTON"] = 34] = "TABLE_NAME_RESET_DEFAULT_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE"] = 35] = "TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER"] = 36] = "TABLE_NAME_POWER";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER_TITLE"] = 37] = "TABLE_NAME_POWER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER_SELECT_TITLE"] = 38] = "TABLE_NAME_POWER_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER_BUTTON"] = 39] = "TABLE_NAME_POWER_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER_BUTTON_TITLE"] = 40] = "TABLE_NAME_POWER_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE_BUTTON"] = 41] = "TABLE_NAME_UPDATE_FIRMWARE_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE"] = 42] = "TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER_BUTTON"] = 43] = "TABLE_NAME_UPDATE_BOOTLOADER_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE"] = 44] = "TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_UUID"] = 45] = "TABLE_NAME_LICENSE_UUID";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_UUID_TITLE"] = 46] = "TABLE_NAME_LICENSE_UUID_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_MORE_OPTIONS"] = 47] = "TABLE_NAME_LICENSE_MORE_OPTIONS";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE"] = 48] = "TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_SUBVENDOR_ID"] = 49] = "TABLE_NAME_LICENSE_SUBVENDOR_ID";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE"] = 50] = "TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_MAX_NODE"] = 51] = "TABLE_NAME_LICENSE_MAX_NODE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_MAX_NODE_TITLE"] = 52] = "TABLE_NAME_LICENSE_MAX_NODE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_SUPPORT"] = 53] = "TABLE_NAME_LICENSE_SUPPORT";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_SUPPORT_TITLE"] = 54] = "TABLE_NAME_LICENSE_SUPPORT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BETA"] = 55] = "TABLE_NAME_UPDATE_BETA";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BETA_SELECT_TITLE"] = 56] = "TABLE_NAME_UPDATE_BETA_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BETA_TITLE"] = 57] = "TABLE_NAME_UPDATE_BETA_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE"] = 58] = "TABLE_NAME_UPDATE_FIRMWARE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE_TITLE"] = 59] = "TABLE_NAME_UPDATE_FIRMWARE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE"] = 60] = "TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE"] = 61] = "TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER"] = 62] = "TABLE_NAME_UPDATE_BOOTLOADER";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER_TITLE"] = 63] = "TABLE_NAME_UPDATE_BOOTLOADER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE"] = 64] = "TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_DOWNLOAD_INFO"] = 65] = "TABLE_NAME_UPDATE_DOWNLOAD_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_DOWNLOAD_FILE"] = 66] = "TABLE_NAME_UPDATE_DOWNLOAD_FILE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_WAIT_BUS_SERIAL"] = 67] = "TABLE_NAME_UPDATE_WAIT_BUS_SERIAL";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_WAIT_UPDATE"] = 68] = "TABLE_NAME_UPDATE_WAIT_UPDATE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DETECTION_SYNC_MANUAL"] = 69] = "TABLE_NAME_DETECTION_SYNC_MANUAL";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE"] = 70] = "TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE"] = 71] = "TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_HEADER"] = 72] = "LOG_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_DONE"] = 73] = "LOG_DONE";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_FAILED"] = 74] = "LOG_FAILED";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_FAILED_CODE"] = 75] = "LOG_FAILED_CODE";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_UNSUPPORTED"] = 76] = "LOG_UNSUPPORTED";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_NOT_FIND_ELEMENT"] = 77] = "LOG_NOT_FIND_ELEMENT";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_XHR_TIMEOUT"] = 78] = "LOG_XHR_TIMEOUT";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_XHR_ERROR"] = 79] = "LOG_XHR_ERROR";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_XHR_INVALID_DATA"] = 80] = "LOG_XHR_INVALID_DATA";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_COPY_TEXT"] = 81] = "BUTTON_COPY_TEXT";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_COPY_TITLE"] = 82] = "BUTTON_COPY_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_CLOSE_TEXT"] = 83] = "BUTTON_CLOSE_TEXT";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_CLOSE_TITLE"] = 84] = "BUTTON_CLOSE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_COPY_DSK"] = 85] = "BUTTON_COPY_DSK";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_COPY_DSK_TITLE"] = 86] = "BUTTON_COPY_DSK_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["BOARD_INFO_HEADER"] = 87] = "BOARD_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["LICENSE_INFO_HEADER"] = 88] = "LICENSE_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["UPDATE_INFO_HEADER"] = 89] = "UPDATE_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["DEFAULT_RESET_WARNING"] = 90] = "DEFAULT_RESET_WARNING";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_INFO_HEADER"] = 91] = "MIGRATION_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER"] = 92] = "MIGRATION_ABOUT_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER_TITLE"] = 93] = "MIGRATION_ABOUT_HEADER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER_TEXT_HTML"] = 94] = "MIGRATION_ABOUT_HEADER_TEXT_HTML";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5"] = 95] = "MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT"] = 96] = "MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_HEADER"] = 97] = "MIGRATION_PROCESS_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_HEADER_TITLE"] = 98] = "MIGRATION_PROCESS_HEADER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_BUTTON_START"] = 99] = "MIGRATION_PROCESS_BUTTON_START";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_BUTTON_START_TITLE"] = 100] = "MIGRATION_PROCESS_BUTTON_START_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_BUTTON_START_WARNING"] = 101] = "MIGRATION_PROCESS_BUTTON_START_WARNING";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_TEST_INCLUDE"] = 102] = "MIGRATION_TEST_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_HOME_ID"] = 103] = "MESSAGE_READ_HOME_ID";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_UNKNOWN_ERROR"] = 104] = "MIGRATION_UNKNOWN_ERROR";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_GOOD_RESULT"] = 105] = "MIGRATION_GOOD_RESULT";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ACTION_STOP"] = 106] = "MIGRATION_ACTION_STOP";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ACTION_CONTINUE"] = 107] = "MIGRATION_ACTION_CONTINUE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ACTION_STOP_TITLE"] = 108] = "MIGRATION_ACTION_STOP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ACTION_CONTINUE_TITLE"] = 109] = "MIGRATION_ACTION_CONTINUE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUESTION_EXCLUDE"] = 110] = "MIGRATION_QUESTION_EXCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_STOP_RESULT"] = 111] = "MIGRATION_STOP_RESULT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_INIT_DATA"] = 112] = "MESSAGE_READ_INIT_DATA";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_EXCLUDING"] = 113] = "MESSAGE_START_EXCLUDING";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_WIDE_EXCLUDING"] = 114] = "MESSAGE_START_WIDE_EXCLUDING";
    ControllerUiLangClassId[ControllerUiLangClassId["SECONDS"] = 115] = "SECONDS";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_WAIT_EXCLUDE_START_MASTER"] = 116] = "MIGRATION_WAIT_EXCLUDE_START_MASTER";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_CLEAR_NODE"] = 117] = "MESSAGE_CLEAR_NODE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_INCLUDE"] = 118] = "MESSAGE_START_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_WIDE_INCLUDE"] = 119] = "MESSAGE_START_WIDE_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUESTION_INCLUDE"] = 120] = "MIGRATION_QUESTION_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_WAIT_INCLUDE_START_MASTER"] = 121] = "MIGRATION_WAIT_INCLUDE_START_MASTER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FINALIZE"] = 122] = "MIGRATION_FINALIZE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_DETECTION"] = 123] = "MIGRATION_DETECTION";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_HOME_ID"] = 124] = "MESSAGE_SET_HOME_ID";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_REMOVE_NODE"] = 125] = "MESSAGE_REMOVE_NODE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SOFT_RESET"] = 126] = "MESSAGE_SOFT_RESET";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_NOP"] = 127] = "MESSAGE_NOP";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_PORT_SELECT"] = 128] = "MESSAGE_PORT_SELECT";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_INFO_HEADER"] = 129] = "DETECTION_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_HEADER"] = 130] = "DETECTION_PROCESS_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_HEADER_TITLE"] = 131] = "DETECTION_PROCESS_HEADER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS"] = 132] = "DETECTION_PROCESS";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_STOP"] = 133] = "DETECTION_PROCESS_STOP";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_CONTINUE"] = 134] = "DETECTION_PROCESS_CONTINUE";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_STOP_TITLE"] = 135] = "DETECTION_PROCESS_STOP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_CONTINUE_TITLE"] = 136] = "DETECTION_PROCESS_CONTINUE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_QUEST_SYNC"] = 137] = "DETECTION_PROCESS_QUEST_SYNC";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_BUTTON_RE_SYNC"] = 138] = "DETECTION_PROCESS_BUTTON_RE_SYNC";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE"] = 139] = "DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["SLAVE_MESSAGE_READ_BOARD_INFO"] = 140] = "SLAVE_MESSAGE_READ_BOARD_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VERSION"] = 141] = "TABLE_NAME_VERSION";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VERSION_TITLE"] = 142] = "TABLE_NAME_VERSION_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_BUILD_TIME_STAMP"] = 143] = "TABLE_NAME_BUILD_TIME_STAMP";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_BUILD_TIME_STAMP_TITLE"] = 144] = "TABLE_NAME_BUILD_TIME_STAMP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UUID"] = 145] = "TABLE_NAME_UUID";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UUID_TITLE"] = 146] = "TABLE_NAME_UUID_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_HOME"] = 147] = "TABLE_NAME_HOME";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_HOME_TITLE"] = 148] = "TABLE_NAME_HOME_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_NODE"] = 149] = "TABLE_NAME_NODE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_NODE_TITLE"] = 150] = "TABLE_NAME_NODE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DSK"] = 151] = "TABLE_NAME_DSK";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DSK_TITLE"] = 152] = "TABLE_NAME_DSK_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_QR_CODE"] = 153] = "TABLE_NAME_QR_CODE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_QR_CODE_TITLE"] = 154] = "TABLE_NAME_QR_CODE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["SLAVE_MESSAGE_FREEZE_ERROR"] = 155] = "SLAVE_MESSAGE_FREEZE_ERROR";
    ControllerUiLangClassId[ControllerUiLangClassId["SLAVE_DEFAULT_RESET_WARNING"] = 156] = "SLAVE_DEFAULT_RESET_WARNING";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_TYPE"] = 157] = "TABLE_NAME_TYPE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_TYPE_TITLE"] = 158] = "TABLE_NAME_TYPE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_TYPE_CONTROLER"] = 159] = "TABLE_NAME_TYPE_CONTROLER";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_TYPE_SLAVE"] = 160] = "TABLE_NAME_TYPE_SLAVE";
    ControllerUiLangClassId[ControllerUiLangClassId["ERROR_ARGUMENT_FOR_UPDATE_SELECT"] = 161] = "ERROR_ARGUMENT_FOR_UPDATE_SELECT";
    ControllerUiLangClassId[ControllerUiLangClassId["ERROR_ARGUMENT_FIND_TYPE"] = 162] = "ERROR_ARGUMENT_FIND_TYPE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_INCLUDE_EXCLUDE"] = 163] = "TABLE_NAME_INCLUDE_EXCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_INCLUDE_EXCLUDE_TITLE"] = 164] = "TABLE_NAME_INCLUDE_EXCLUDE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_INCLUDE_EXCLUDE_BUTTON"] = 165] = "TABLE_NAME_INCLUDE_EXCLUDE_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE"] = 166] = "TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["INCLUDE_EXCLUDE_WAIT"] = 167] = "INCLUDE_EXCLUDE_WAIT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_ENABLE_NIF_DEFAULT"] = 168] = "MESSAGE_ENABLE_NIF_DEFAULT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_ENABLE_EVENT_FOR_LEARN"] = 169] = "MESSAGE_ENABLE_EVENT_FOR_LEARN";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_LEARN"] = 170] = "MESSAGE_START_LEARN";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_LEARN_INFO_TIMEOUT"] = 171] = "MESSAGE_LEARN_INFO_TIMEOUT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART"] = 172] = "MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_LEARN_INFO_INCLUDE_RESTART"] = 173] = "MESSAGE_LEARN_INFO_INCLUDE_RESTART";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_LEARN_INFO_EXCLUDE_RESTART"] = 174] = "MESSAGE_LEARN_INFO_EXCLUDE_RESTART";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_CONTINUE"] = 175] = "PROCESS_CONTINUE";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_CONTINUE_TITLE"] = 176] = "PROCESS_CONTINUE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_STOP"] = 177] = "PROCESS_STOP";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_STOP_TITLE"] = 178] = "PROCESS_STOP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_REPEAT"] = 179] = "PROCESS_REPEAT";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_REPEAT_TITLE"] = 180] = "PROCESS_REPEAT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_ABORT"] = 181] = "PROCESS_ABORT";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_ABORT_TITLE"] = 182] = "PROCESS_ABORT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE"] = 183] = "LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE_TITLE"] = 184] = "LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_GET_URL_INFO"] = 185] = "MIGRATION_NOT_GET_URL_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_UPDATE"] = 186] = "MIGRATION_NOT_UPDATE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_LAST_UPDATE_DETECT"] = 187] = "MIGRATION_LAST_UPDATE_DETECT";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_UPDATE_TYPE"] = 188] = "MIGRATION_FAILED_UPDATE_TYPE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_UPDATE_VERSION"] = 189] = "MIGRATION_FAILED_UPDATE_VERSION";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_CHANGE_REGION"] = 190] = "MIGRATION_FAILED_CHANGE_REGION";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_SUPPORT_INCLUDE_EXCLUDE"] = 191] = "MIGRATION_NOT_SUPPORT_INCLUDE_EXCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["LEARN_PROCESS_QUEST_EXCLUDE"] = 192] = "LEARN_PROCESS_QUEST_EXCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["LEARN_PROCESS_QUEST_EXCLUDE_TITLE"] = 193] = "LEARN_PROCESS_QUEST_EXCLUDE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_LEARN_INFO_EXCLUDE_INCLUDE"] = 194] = "MIGRATION_LEARN_INFO_EXCLUDE_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_DETECT"] = 195] = "MIGRATION_FAILED_DETECT";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_QUEST_INCLUDE"] = 196] = "MIGRATION_PROCESS_QUEST_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_QUEST_INCLUDE_TITLE"] = 197] = "MIGRATION_PROCESS_QUEST_INCLUDE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_SUPPORT_DUMP_KEY"] = 198] = "MIGRATION_NOT_SUPPORT_DUMP_KEY";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_S2_KEY"] = 199] = "MESSAGE_READ_S2_KEY";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_AVIABLE_FIRMWARE"] = 200] = "MIGRATION_NOT_AVIABLE_FIRMWARE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_SUPPORT_LR"] = 201] = "MIGRATION_NOT_SUPPORT_LR";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_SUPPORT_BACKUP"] = 202] = "MIGRATION_NOT_SUPPORT_BACKUP";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_SEE_LOG"] = 203] = "MIGRATION_FAILED_SEE_LOG";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER"] = 204] = "MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER_TITLE"] = 205] = "MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_SUCESS"] = 206] = "MIGRATION_SUCESS";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUEST_REPEATER_ALL_KEY"] = 207] = "MIGRATION_QUEST_REPEATER_ALL_KEY";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUEST_REPEATER_ALL_KEY_TITLE"] = 208] = "MIGRATION_QUEST_REPEATER_ALL_KEY_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUEST_ABORT_STEP"] = 209] = "MIGRATION_QUEST_ABORT_STEP";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUEST_ABORT_STEP_TITLE"] = 210] = "MIGRATION_QUEST_ABORT_STEP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_REPEAR_TYPE"] = 211] = "MIGRATION_FAILED_REPEAR_TYPE";
})(ControllerUiLangClassId || (exports.ControllerUiLangClassId = ControllerUiLangClassId = {}));


/***/ }),

/***/ "./src/lang/ui_lang_en.ts":
/*!********************************!*\
  !*** ./src/lang/ui_lang_en.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.controller_lang_en = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ./ui_lang_define */ "./src/lang/ui_lang_define.ts");
const controller_lang_en = {
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_NOT_SELECT]: "No port selected",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER]: "Sorry, this feature is supported only on Chrome, Edge and Opera",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_USE]: "Check yours, maybe another application is using it",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT]: "Connect device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION]: "Detection device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES]: "Read capabilities the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION]: "Read region the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_SEC]: "Read securite the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER]: "Read power the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE]: "Read license the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_LICENSE]: "Set license the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO]: "Read board info the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION]: "Set region the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER]: "Set power the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_SEC]: "Set securite the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_DEFAULT]: "Set default the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PLEASE_WAIT]: "Please wait until the previous operation is completed.",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO]: "Download update info",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE]: "Download update file",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_START_FIRMWARE]: "Start firmware update",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_START_BOOTLOADER]: "Start bootloader update",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION]: "Serial API Version:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION_TITLE]: "It is specific to Z-Wave.Me",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR]: "Vendor:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_ID]: "Vendor ID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_ID_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION]: "Region:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_TITLE]: "Z-Wave frequency",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_SELECT_TITLE]: "Select region",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON]: "Apply",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE]: "Apply the selected region",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT]: "Reset default:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_TITLE]: "Reset to factory default settings",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON]: "Reset",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER]: "TX power level:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_SELECT_TITLE]: "Select the TX power level",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON]: "Apply",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE]: "Apply the selected TX power",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON]: "Update",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON]: "Update",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID]: "UUID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID_TITLE]: "Unique ID of your Z-Wave hardware",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS]: "More options:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE]: "Additional features available for your hardware",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID]: "Subvendor:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE]: "Nodes limit:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT]: "Support:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA]: 'Beta:',
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_SELECT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE]: 'Firmware:',
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE]: "Not updated",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER]: 'Bootloader:',
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO]: "Download info...",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE]: "Download file...",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_BUS_SERIAL]: "Wait bus serial...",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE]: "Wait update...",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL]: 'Sync manual:',
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_HEADER]: "Log",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_DONE]: " done",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_FAILED]: " failed",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_FAILED_CODE]: " failed: {{code}}",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_UNSUPPORTED]: " unsupported",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_NOT_FIND_ELEMENT]: "Not find element: {{element}}",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_TIMEOUT]: "<details><summary>Internet request - timeout </summary><span>{{url}}</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_ERROR]: "<details><summary>Internet request - error </summary><span>{{url}}</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_INVALID_DATA]: "<details><summary>Internet request - invalid data </summary><span>{{url}}</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_TEXT]: "Copy log",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_TITLE]: "Copy the log to clipboard",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_CLOSE_TEXT]: "Close",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_CLOSE_TITLE]: "Closes and stops working with the port",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_DSK]: "Copy",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_DSK_TITLE]: "Copy the dsk to clipboard",
    [ui_lang_define_1.ControllerUiLangClassId.BOARD_INFO_HEADER]: "Board Info",
    [ui_lang_define_1.ControllerUiLangClassId.LICENSE_INFO_HEADER]: "License Info",
    [ui_lang_define_1.ControllerUiLangClassId.UPDATE_INFO_HEADER]: "Update Info",
    [ui_lang_define_1.ControllerUiLangClassId.DEFAULT_RESET_WARNING]: "The Controller Reset will delete all included devices from your network without excluding them. You will need to manually exclude and include all of them. Do you really want to do this?",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_INFO_HEADER]: "Migration Info",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER]: "About",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML]: "<details><summary>Porting from your old controller</summary><span>to your new Z-Wave.Me hardware</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5]: "<details><summary>You have an old stick</summary><span>need a newer one</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT]: "<details><summary>Your stick is not supported</summary><span>migration works only to Z-Wave.Me hardware</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_HEADER]: "Migration:",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_HEADER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START]: "Start",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_WARNING]: "Are you sure you want to start the migration process? - During this process, all data will be lost.\nAlso make sure there are no power issues to avoid problems.",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_TEST_INCLUDE]: "Checking whether it is on...",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_HOME_ID]: "Read home and node id the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_UNKNOWN_ERROR]: "An unexpected error occurred, please try again.",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_GOOD_RESULT]: "Migration was successful.",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ACTION_STOP]: "Stop",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ACTION_CONTINUE]: "Continue",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ACTION_STOP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ACTION_CONTINUE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUESTION_EXCLUDE]: "You need to excluding first - click when you're ready",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_STOP_RESULT]: "Migration was stoping.",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_INIT_DATA]: "Read init data the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_EXCLUDING]: "Start excluding controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_WIDE_EXCLUDING]: "Start wide excluding controller",
    [ui_lang_define_1.ControllerUiLangClassId.SECONDS]: "s",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_WAIT_EXCLUDE_START_MASTER]: "We are waiting for you to begin the elimination process.",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CLEAR_NODE]: "Start clear node the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_INCLUDE]: "Start include controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_WIDE_INCLUDE]: "Start wide include controller",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUESTION_INCLUDE]: "You need to turn on the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_WAIT_INCLUDE_START_MASTER]: "We are waiting for you to begin the inclusion process.",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FINALIZE]: "Finishing...",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_DETECTION]: "Detection...",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_HOME_ID]: "Set home and node id the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_REMOVE_NODE]: "Remove node the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SOFT_RESET]: "Soft reset",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOP]: "Send nop",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_SELECT]: "Port selection",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_INFO_HEADER]: "Detection",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_HEADER]: "Sync:",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_HEADER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS]: "Sync...",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_STOP]: "Stop",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_CONTINUE]: "Continue",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_STOP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_CONTINUE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_QUEST_SYNC]: "Reset your hardware and try again",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_BUTTON_RE_SYNC]: "Try to sync again",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO]: "Read hardware information",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VERSION]: "Version:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VERSION_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_BUILD_TIME_STAMP]: "Build date and time:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_BUILD_TIME_STAMP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UUID]: "UUID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UUID_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_HOME]: "Home ID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_HOME_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_NODE]: "Node ID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_NODE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DSK]: "DSK:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DSK_TITLE]: "Key used to securely include your device",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_QR_CODE]: "QR-code:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_QR_CODE_TITLE]: "QR-code used to securely include your device",
    [ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_FREEZE_ERROR]: "Failed to pause slave",
    [ui_lang_define_1.ControllerUiLangClassId.SLAVE_DEFAULT_RESET_WARNING]: "Do you really want to do this?",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE]: "Type:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_CONTROLER]: "Controller",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE]: "Z-Uno / repeater",
    [ui_lang_define_1.ControllerUiLangClassId.ERROR_ARGUMENT_FOR_UPDATE_SELECT]: "error arg for update select",
    [ui_lang_define_1.ControllerUiLangClassId.ERROR_ARGUMENT_FIND_TYPE]: "error arg find type",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE]: "Include/Exclude:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_BUTTON]: "Start",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.INCLUDE_EXCLUDE_WAIT]: "Wait...",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT]: "Enable default NIF",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN]: "Enable event for learn mode",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_LEARN]: "Start learn mode",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT]: "Learn timout",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART]: "Learn timeout. Reloading",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_INCLUDE_RESTART]: "Included. Reloading",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_EXCLUDE_RESTART]: "Excluded. Reloading",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE]: "Continue",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_STOP]: "Stop",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_STOP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_REPEAT]: "Repeat",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_REPEAT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_ABORT]: "Abort",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_ABORT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE]: "Ready for inclusion/exclusion by you controller",
    [ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_GET_URL_INFO]: "Could not get a link to the information needed for migration",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_UPDATE]: "Failed to update",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LAST_UPDATE_DETECT]: "After the update, the firmware could not be detected",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_TYPE]: "The type of the updated firmware does not match",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_VERSION]: "After the update the version is not what it should be",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_CHANGE_REGION]: "Failed to change frequency",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_INCLUDE_EXCLUDE]: "No support for exclusion/inclusion",
    [ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE]: "Turn on exclusion mode on you controller",
    [ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LEARN_INFO_EXCLUDE_INCLUDE]: "Learn completed",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_DETECT]: "Сould not be detected",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_QUEST_INCLUDE]: "<div>Turn on inclusion mode on you controller</div><div>When inclusion starts, you have to select all the supported security keys and use the following security code:</div><div>${dsk}</div>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_QUEST_INCLUDE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_DUMP_KEY]: "No support for dump key",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_S2_KEY]: "Reading S2 keys",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_AVIABLE_FIRMWARE]: "The required firmware is not in the database",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_LR]: "Long Range is not supported",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_BACKUP]: "Backup is not supported",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_SEE_LOG]: "Failed - see log",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER]: "<div>The inclusion happeded without the required keys.</div><div>Please turn on exclusion mode on you controller</div>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_SUCESS]: "Success",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_REPEATER_ALL_KEY]: "<div>These are all the keys that we were able to read, is everything correct or will you try again?</div>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_REPEATER_ALL_KEY_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_ABORT_STEP]: "An error occurred, would you like to try this step again or abort?",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_ABORT_STEP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_REPEAR_TYPE]: "The type of the firmware does not match",
};
exports.controller_lang_en = controller_lang_en;


/***/ }),

/***/ "./src/other/define.ts":
/*!*****************************!*\
  !*** ./src/other/define.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WEB_TOOLS_BETA = exports.WEB_TOOLS_VERSION = void 0;
const WEB_TOOLS_VERSION = "00.00.17";
exports.WEB_TOOLS_VERSION = WEB_TOOLS_VERSION;
const WEB_TOOLS_BETA = true;
exports.WEB_TOOLS_BETA = WEB_TOOLS_BETA;


/***/ }),

/***/ "./src/other/utilities.ts":
/*!********************************!*\
  !*** ./src/other/utilities.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sleep = sleep;
exports.checksum = checksum;
exports.calcSigmaCRC16 = calcSigmaCRC16;
exports.costruct_int = costruct_int;
exports.hexToBytes = hexToBytes;
exports.arrayToStringHex = arrayToStringHex;
exports.versionNumberToString = versionNumberToString;
exports.intToBytearrayLsbMsb = intToBytearrayLsbMsb;
exports.intToBytearrayMsbLsb = intToBytearrayMsbLsb;
exports.versionNumberToStringSlave = versionNumberToStringSlave;
exports.numberToStringHex = numberToStringHex;
exports.conv2Decimal = conv2Decimal;
exports.toString = toString;
exports.conv2DecimalPadding = conv2DecimalPadding;
exports.version_str_to_int = version_str_to_int;
exports.version_int_to_str = version_int_to_str;
exports.splitHexBuff = splitHexBuff;
function toString(array) {
    let result;
    result = "";
    for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i]);
    }
    return result;
}
function numberToStringHex(num) {
    return (((num >> 24) & 0xFF).toString(0x10).padStart(2, '0') + ((num >> 16) & 0xFF).toString(0x10).padStart(2, '0') + ((num >> 8) & 0xFF).toString(0x10).padStart(2, '0') + ((num) & 0xFF).toString(0x10).padStart(2, '0'));
}
function versionNumberToString(version) {
    const txt = String((version >> 24) & 0xFF).padStart(2, '0') + "." + String((version >> 16) & 0xFF).padStart(2, '0') + "." + String((version >> 0x8) & 0xFF).padStart(2, '0') + "." + String((version) & 0xFF).padStart(2, '0');
    return (txt);
}
function versionNumberToStringSlave(version) {
    const txt = String((version >> 24) & 0xFF).padStart(2, '0') + "." + String((version >> 16) & 0xFF).padStart(2, '0') + "." + String((version) & 0xFFFF);
    return (txt);
}
function arrayToStringHex(data) {
    let str_hex, i;
    str_hex = "";
    i = 0x0;
    while (i < data.length) {
        str_hex = str_hex + data[i].toString(0x10);
        i++;
    }
    return (str_hex);
}
function splitHexBuff(data) {
    let str_hex, i;
    str_hex = "";
    i = 0x0;
    while (true) {
        str_hex = str_hex + data[i].toString(0x10).padStart(2, '0').toUpperCase();
        i++;
        if (i >= data.length)
            break;
        str_hex = str_hex + " ";
    }
    return (str_hex);
}
function hexToBytes(hex) {
    let i;
    if (hex.length == 0x0)
        return (undefined);
    if ((hex.length & 0x1) != 0x0)
        return (undefined);
    const bytes = [];
    i = 0x0;
    while (i < hex.length) {
        try {
            bytes.push(parseInt(hex.substring(i, i + 0x2), 0x10));
        }
        catch (error) {
            return (undefined);
        }
        i = i + 0x2;
    }
    return (bytes);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function checksum(data) {
    let ret = 0xff;
    let i = 0x0;
    while (i < data.length) {
        ret = ret ^ data[i];
        i++;
    }
    return (ret);
}
function calcSigmaCRC16(crc, data, offset, llen) {
    let new_bit, wrk_data, b, a, bit_mask;
    const bin_data = data;
    const CRC_POLY = 0x1021;
    while (llen != 0) {
        llen -= 1;
        if (offset >= bin_data.length)
            wrk_data = 0xFF;
        else
            wrk_data = bin_data[offset];
        offset += 1;
        bit_mask = 0x80;
        while (bit_mask != 0) {
            a = 0;
            b = 0;
            if ((wrk_data & bit_mask) != 0)
                a = 1;
            if ((crc & 0x8000) != 0)
                b = 1;
            new_bit = a ^ b;
            crc <<= 1;
            crc = crc & 0xffff;
            if (new_bit == 1) {
                crc ^= CRC_POLY;
            }
            bit_mask >>= 1;
        }
    }
    return (crc);
}
function costruct_int(arr, n, inv = true) {
    let val, i, indx;
    val = 0;
    i = 0x0;
    while (i < arr.length) {
        val <<= 8;
        indx = i;
        if (inv == true)
            indx = n - 1 - i;
        if ((indx < arr.length) && (indx >= 0))
            val += arr[indx];
        i++;
    }
    val = val >>> 0x0; //The only JavaScript operator that works using unsigned 32-bit integers is >>>. You can exploit this to convert a signed-integer-in-Number you've been working on with the other bitwise operators to an unsigned-integer-in-Number:
    return (val);
}
function intToBytearrayLsbMsb(data, size = 0x4) {
    let i;
    const array = new Uint8Array(size);
    i = 0x0;
    while (i < array.length) {
        array[i] = data & 0xFF;
        data = data >> 8;
        i = i + 1;
    }
    return (array);
}
function intToBytearrayMsbLsb(data, size = 0x4) {
    let i;
    const array = new Uint8Array(size);
    i = 0x0;
    while (size != 0) {
        size--;
        array[i] = (data >> (8 * size)) & 0xFF;
        i++;
    }
    return (array);
}
function conv2DecimalPadding(num, max) {
    let num_str = num.toString(0xA);
    while (num_str.length < max)
        num_str = '0' + num_str;
    return (num_str);
}
function conv2Decimal(buff, separator = "-") {
    let i, text, v;
    text = "";
    i = 0x0;
    while (i < (buff.length / 2)) {
        v = buff[(i * 2)];
        v <<= 8;
        v += buff[(i * 2) + 1];
        if (i != 0)
            text += separator;
        text += conv2DecimalPadding(v, 5);
        i = i + 1;
    }
    return (text);
}
function version_str_to_int(version) {
    let i, out;
    const version_list = version.split(".");
    i = version_list.length;
    out = 0x0;
    while (i != 0x0) {
        out = out | (Number(version_list[i - 0x1]) << (0x8 * (version_list.length - i)));
        i--;
    }
    return (out);
}
function version_int_to_str(version, min) {
    let out, i;
    const list = [];
    while (version != 0x0) {
        list.unshift(version & 0xFF);
        version = version >> 0x8;
    }
    while (list.length < min) {
        list.unshift(0x0);
    }
    out = "";
    i = 0x0;
    while (true) {
        out = out + String(list[i]).padStart(2, '0');
        i++;
        if (i < list.length) {
            out = out + ".";
            continue;
        }
        break;
    }
    return (out);
}


/***/ }),

/***/ "./src/sapi/region.ts":
/*!****************************!*\
  !*** ./src/sapi/region.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SapiRegionClass = void 0;
class SapiRegionClass {
    isLr(region) {
        if (this.region_lr.includes(region) == false)
            return (false);
        return (true);
    }
    _getNameRegion(region, region_conv) {
        let i;
        i = 0x0;
        while (i < region_conv.length) {
            if (region_conv[i].id == region) {
                const region_list = this.getListRegion();
                if (region_list.includes(region_conv[i].name) == false)
                    return (undefined);
                return (region_conv[i].name);
            }
            i++;
        }
        return (undefined);
    }
    _getIdRegion(region, region_conv) {
        let i;
        const region_list = this.getListRegion();
        if (region_list.includes(region) == false)
            return (undefined);
        i = 0x0;
        while (i < region_conv.length) {
            if (region_conv[i].name == region)
                return (region_conv[i].id);
            i++;
        }
        return (undefined);
    }
    getNameRegion(region) {
        return (this._getNameRegion(region, this.region_string_to_number));
    }
    getNameRegionCustom(region) {
        return (this._getNameRegion(region, this.region_custom_string_to_number));
    }
    getIdRegion(region) {
        return (this._getIdRegion(region, this.region_string_to_number));
    }
    getIdRegionCustom(region) {
        return (this._getIdRegion(region, this.region_custom_string_to_number));
    }
    getListRegion() {
        let out;
        out = this.region_standart;
        if (this.us_lr == true)
            out = out.concat([this.REGION_US_LR]);
        if (this.eu_lr == true)
            out = out.concat([this.REGION_EU_LR]);
        out = out.sort();
        return (out);
    }
    constructor(us_lr, eu_lr) {
        this.REGION_EU = "EU";
        this.REGION_US = "US";
        this.REGION_ANZ = "ANZ";
        this.REGION_HK = "HK";
        this.REGION_IN = "IN";
        this.REGION_IL = "IL";
        this.REGION_RU = "RU";
        this.REGION_CN = "CN";
        this.REGION_JP = "JP";
        this.REGION_KR = "KR";
        this.REGION_EU_LR = "EU_LR";
        this.REGION_US_LR = "US_LR";
        this.region_lr = [
            this.REGION_EU_LR, this.REGION_US_LR
        ];
        this.region_standart = [
            this.REGION_EU, this.REGION_US, this.REGION_ANZ, this.REGION_HK, this.REGION_IN,
            this.REGION_IL, this.REGION_RU, this.REGION_CN, this.REGION_JP, this.REGION_KR,
        ];
        this.region_string_to_number = [
            { name: this.REGION_EU, id: 0x0 }, { name: this.REGION_US, id: 0x01 }, { name: this.REGION_ANZ, id: 0x02 },
            { name: this.REGION_HK, id: 0x3 }, { name: this.REGION_IN, id: 0x5 }, { name: this.REGION_IL, id: 0x6 },
            { name: this.REGION_RU, id: 0x7 }, { name: this.REGION_CN, id: 0x8 }, { name: this.REGION_JP, id: 0x20 },
            { name: this.REGION_KR, id: 0x21 }, { name: this.REGION_US_LR, id: 0x9 }, { name: this.REGION_EU_LR, id: 0xB },
            { name: this.REGION_EU, id: 0xFF }
        ];
        this.region_custom_string_to_number = [
            { name: this.REGION_EU, id: 0x0 }, { name: this.REGION_US, id: 0x03 }, { name: this.REGION_ANZ, id: 0x04 },
            { name: this.REGION_HK, id: 0x05 }, { name: this.REGION_IN, id: 0x02 }, { name: this.REGION_IL, id: 0x09 },
            { name: this.REGION_RU, id: 0x01 }, { name: this.REGION_CN, id: 0x06 }, { name: this.REGION_JP, id: 0x07 },
            { name: this.REGION_KR, id: 0x08 }, { name: this.REGION_US_LR, id: 0x0B }, { name: this.REGION_EU_LR, id: 0x0C },
        ];
        if (us_lr == undefined)
            us_lr = false;
        if (eu_lr == undefined)
            eu_lr = false;
        this.us_lr = us_lr;
        this.eu_lr = eu_lr;
    }
}
exports.SapiRegionClass = SapiRegionClass;


/***/ }),

/***/ "./src/sapi/sapi.ts":
/*!**************************!*\
  !*** ./src/sapi/sapi.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SapiClassDetectType = exports.SapiClassNodeIdBaseType = exports.SapiClassSerialAPISetupCmd = exports.SapiClassFuncId = exports.SapiClassStatus = exports.SapiClass = void 0;
const utilities_1 = __webpack_require__(/*! ../other/utilities */ "./src/other/utilities.ts");
const define_1 = __webpack_require__(/*! ../other/define */ "./src/other/define.ts");
const utilities_2 = __webpack_require__(/*! ../other/utilities */ "./src/other/utilities.ts");
var SapiClassDetectType;
(function (SapiClassDetectType) {
    SapiClassDetectType[SapiClassDetectType["RAZBERRY"] = 0] = "RAZBERRY";
    SapiClassDetectType[SapiClassDetectType["ZUNO"] = 1] = "ZUNO";
    SapiClassDetectType[SapiClassDetectType["UNKNOWN"] = 2] = "UNKNOWN";
})(SapiClassDetectType || (exports.SapiClassDetectType = SapiClassDetectType = {}));
var SapiClassStatus;
(function (SapiClassStatus) {
    SapiClassStatus[SapiClassStatus["OK"] = 0] = "OK";
    SapiClassStatus[SapiClassStatus["NO_ACK"] = 1] = "NO_ACK";
    SapiClassStatus[SapiClassStatus["INVALID_DATA_LEN"] = 2] = "INVALID_DATA_LEN";
    SapiClassStatus[SapiClassStatus["INVALID_CRC"] = 3] = "INVALID_CRC";
    SapiClassStatus[SapiClassStatus["NO_SOF"] = 4] = "NO_SOF";
    SapiClassStatus[SapiClassStatus["NO_LENGHT"] = 5] = "NO_LENGHT";
    SapiClassStatus[SapiClassStatus["WRITE"] = 6] = "WRITE";
    SapiClassStatus[SapiClassStatus["WRONG_LENGHT"] = 7] = "WRONG_LENGHT";
    SapiClassStatus[SapiClassStatus["WRONG_CMD"] = 8] = "WRONG_CMD";
    SapiClassStatus[SapiClassStatus["PORT_NOT_OPEN"] = 9] = "PORT_NOT_OPEN";
    SapiClassStatus[SapiClassStatus["PORT_NOT_CLOSE"] = 10] = "PORT_NOT_CLOSE";
    SapiClassStatus[SapiClassStatus["PORT_NOT_REQUEST"] = 11] = "PORT_NOT_REQUEST";
    SapiClassStatus[SapiClassStatus["PORT_USED"] = 12] = "PORT_USED";
    SapiClassStatus[SapiClassStatus["PORT_BUSY"] = 13] = "PORT_BUSY";
    SapiClassStatus[SapiClassStatus["TIMEOUT_RCV"] = 14] = "TIMEOUT_RCV";
    SapiClassStatus[SapiClassStatus["SERIAL_UN_SUPPORT"] = 15] = "SERIAL_UN_SUPPORT";
    SapiClassStatus[SapiClassStatus["SERIAL_BUSY"] = 16] = "SERIAL_BUSY";
    SapiClassStatus[SapiClassStatus["REQUEST_ONE_SHOT"] = 17] = "REQUEST_ONE_SHOT";
    SapiClassStatus[SapiClassStatus["REQUEST_NO_SELECT"] = 18] = "REQUEST_NO_SELECT";
    SapiClassStatus[SapiClassStatus["ZUNO_NO_FREEZE"] = 19] = "ZUNO_NO_FREEZE";
    SapiClassStatus[SapiClassStatus["ZUNO_START_WRONG_LENG"] = 20] = "ZUNO_START_WRONG_LENG";
    SapiClassStatus[SapiClassStatus["ZUNO_START_WRONG_DATA"] = 21] = "ZUNO_START_WRONG_DATA";
    SapiClassStatus[SapiClassStatus["ZUNO_START_WRONG_FRAME"] = 22] = "ZUNO_START_WRONG_FRAME";
    SapiClassStatus[SapiClassStatus["DETECTED_UNC_COMMAND"] = 23] = "DETECTED_UNC_COMMAND";
    SapiClassStatus[SapiClassStatus["DETECTED_NOT_FIND"] = 24] = "DETECTED_NOT_FIND";
    SapiClassStatus[SapiClassStatus["DETECTED_CANCEL"] = 25] = "DETECTED_CANCEL";
    SapiClassStatus[SapiClassStatus["DETECTED_UNC"] = 26] = "DETECTED_UNC";
    SapiClassStatus[SapiClassStatus["DETECTED_TARGET_TYPE"] = 27] = "DETECTED_TARGET_TYPE";
    SapiClassStatus[SapiClassStatus["UPDATE_UNK"] = 28] = "UPDATE_UNK";
    SapiClassStatus[SapiClassStatus["UPDATE_TIMEOUT"] = 29] = "UPDATE_TIMEOUT";
    SapiClassStatus[SapiClassStatus["UPDATE_PROCESS"] = 30] = "UPDATE_PROCESS";
    SapiClassStatus[SapiClassStatus["UPDATE_STEP_FAILL"] = 31] = "UPDATE_STEP_FAILL";
    SapiClassStatus[SapiClassStatus["WRONG_RETRIES_CAN"] = 32] = "WRONG_RETRIES_CAN";
    SapiClassStatus[SapiClassStatus["WRONG_RETRIES_NAK"] = 33] = "WRONG_RETRIES_NAK";
    SapiClassStatus[SapiClassStatus["TIMEOUT_RCV_I"] = 34] = "TIMEOUT_RCV_I";
    SapiClassStatus[SapiClassStatus["LAST_STATUS"] = 35] = "LAST_STATUS";
})(SapiClassStatus || (exports.SapiClassStatus = SapiClassStatus = {}));
var SapiClassNodeIdBaseType;
(function (SapiClassNodeIdBaseType) {
    SapiClassNodeIdBaseType[SapiClassNodeIdBaseType["TYPE_8_BIT"] = 1] = "TYPE_8_BIT";
    SapiClassNodeIdBaseType[SapiClassNodeIdBaseType["TYPE_16_BIT"] = 2] = "TYPE_16_BIT";
})(SapiClassNodeIdBaseType || (exports.SapiClassNodeIdBaseType = SapiClassNodeIdBaseType = {}));
var SapiClassSerialAPISetupCmd;
(function (SapiClassSerialAPISetupCmd) {
    //   /**
    //    * The first 8 commands are given as bit-flags, and when all bits were consumed, a byte-array was created to give
    //    * more room.
    //    * The first 8 flags are the only ones that shall be used to fill the first byte when generating the response in
    //    * pOutputBuffer for the command, SERIAL_API_SETUP_CMD_SUPPORTED.
    //    * This is kept for backwards compatibility.
    //    */
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_UNSUPPORTED"] = 0] = "SERIAL_API_SETUP_CMD_UNSUPPORTED";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_SUPPORTED"] = 1] = "SERIAL_API_SETUP_CMD_SUPPORTED";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_STATUS_REPORT"] = 2] = "SERIAL_API_SETUP_CMD_TX_STATUS_REPORT";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET"] = 4] = "SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET"] = 8] = "SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_GET_MAX_PAYLOAD_SIZE"] = 16] = "SERIAL_API_SETUP_CMD_TX_GET_MAX_PAYLOAD_SIZE";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_RF_REGION_GET"] = 32] = "SERIAL_API_SETUP_CMD_RF_REGION_GET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_RF_REGION_SET"] = 64] = "SERIAL_API_SETUP_CMD_RF_REGION_SET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_NODEID_BASETYPE_SET"] = 128] = "SERIAL_API_SETUP_CMD_NODEID_BASETYPE_SET";
    //   /**
    //    * The below values are not flags and shall only be used with BITMASK_ADD_CMD() when generating
    //    * the response for the command, SERIAL_API_SETUP_CMD_SUPPORTED.
    //    */
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_SET"] = 3] = "SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_SET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_GET"] = 5] = "SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_GET";
    // The values 6 and 7 are unused, but not reserved.
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_GET_MAX_LR_PAYLOAD_SIZE"] = 17] = "SERIAL_API_SETUP_CMD_TX_GET_MAX_LR_PAYLOAD_SIZE";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET_16_BIT"] = 18] = "SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET_16_BIT";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET_16_BIT"] = 19] = "SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET_16_BIT";
})(SapiClassSerialAPISetupCmd || (exports.SapiClassSerialAPISetupCmd = SapiClassSerialAPISetupCmd = {}));
var SapiClassFuncId;
(function (SapiClassFuncId) {
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_GET_INIT_DATA"] = 2] = "FUNC_ID_SERIAL_API_GET_INIT_DATA";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION"] = 3] = "FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_APPLICATION_COMMAND_HANDLER"] = 4] = "FUNC_ID_APPLICATION_COMMAND_HANDLER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_CONTROLLER_CAPABILITIES"] = 5] = "FUNC_ID_ZW_GET_CONTROLLER_CAPABILITIES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_SET_TIMEOUTS"] = 6] = "FUNC_ID_SERIAL_API_SET_TIMEOUTS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_GET_CAPABILITIES"] = 7] = "FUNC_ID_SERIAL_API_GET_CAPABILITIES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_SOFT_RESET"] = 8] = "FUNC_ID_SERIAL_API_SOFT_RESET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_PROTOCOL_VERSION"] = 9] = "FUNC_ID_ZW_GET_PROTOCOL_VERSION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_STARTED"] = 10] = "FUNC_ID_SERIAL_API_STARTED";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_SETUP"] = 11] = "FUNC_ID_SERIAL_API_SETUP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION_CMD_CLASSES"] = 12] = "FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION_CMD_CLASSES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_EX"] = 14] = "FUNC_ID_ZW_SEND_DATA_EX";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_MULTI_EX"] = 15] = "FUNC_ID_ZW_SEND_DATA_MULTI_EX";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_RF_RECEIVE_MODE"] = 16] = "FUNC_ID_ZW_SET_RF_RECEIVE_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_SLEEP_MODE"] = 17] = "FUNC_ID_ZW_SET_SLEEP_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_NODE_INFORMATION"] = 18] = "FUNC_ID_ZW_SEND_NODE_INFORMATION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA"] = 19] = "FUNC_ID_ZW_SEND_DATA";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_MULTI"] = 20] = "FUNC_ID_ZW_SEND_DATA_MULTI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_VERSION"] = 21] = "FUNC_ID_ZW_GET_VERSION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_ABORT"] = 22] = "FUNC_ID_ZW_SEND_DATA_ABORT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RF_POWER_LEVEL_SET"] = 23] = "FUNC_ID_ZW_RF_POWER_LEVEL_SET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_META"] = 24] = "FUNC_ID_ZW_SEND_DATA_META";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_SD"] = 25] = "FUNC_ID_ZW_RESERVED_SD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_SDM"] = 26] = "FUNC_ID_ZW_RESERVED_SDM";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_SRI"] = 27] = "FUNC_ID_ZW_RESERVED_SRI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_RANDOM"] = 28] = "FUNC_ID_ZW_GET_RANDOM";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RANDOM"] = 29] = "FUNC_ID_ZW_RANDOM";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RF_POWER_LEVEL_REDISCOVERY_SET"] = 30] = "FUNC_ID_ZW_RF_POWER_LEVEL_REDISCOVERY_SET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_GET_ID"] = 32] = "FUNC_ID_MEMORY_GET_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_GET_BYTE"] = 33] = "FUNC_ID_MEMORY_GET_BYTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_PUT_BYTE"] = 34] = "FUNC_ID_MEMORY_PUT_BYTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_GET_BUFFER"] = 35] = "FUNC_ID_MEMORY_GET_BUFFER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_PUT_BUFFER"] = 36] = "FUNC_ID_MEMORY_PUT_BUFFER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_GET_APPL_HOST_MEMORY_OFFSET"] = 37] = "FUNC_ID_SERIAL_API_GET_APPL_HOST_MEMORY_OFFSET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_DEBUG_OUTPUT"] = 38] = "FUNC_ID_DEBUG_OUTPUT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_AUTO_PROGRAMMING"] = 39] = "FUNC_ID_AUTO_PROGRAMMING";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVR_GET_VALUE"] = 40] = "FUNC_ID_NVR_GET_VALUE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_GET_ID"] = 41] = "FUNC_ID_NVM_GET_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_EXT_READ_LONG_BUFFER"] = 42] = "FUNC_ID_NVM_EXT_READ_LONG_BUFFER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER"] = 43] = "FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_EXT_READ_LONG_BYTE"] = 44] = "FUNC_ID_NVM_EXT_READ_LONG_BYTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_EXT_WRITE_LONG_BYTE"] = 45] = "FUNC_ID_NVM_EXT_WRITE_LONG_BYTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_BACKUP_RESTORE"] = 46] = "FUNC_ID_NVM_BACKUP_RESTORE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NVR_GET_APP_VALUE"] = 47] = "FUNC_ID_ZW_NVR_GET_APP_VALUE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_CLOCK_SET"] = 48] = "FUNC_ID_CLOCK_SET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_CLOCK_GET"] = 49] = "FUNC_ID_CLOCK_GET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_CLOCK_CMP"] = 50] = "FUNC_ID_CLOCK_CMP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RTC_TIMER_CREATE"] = 51] = "FUNC_ID_RTC_TIMER_CREATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RTC_TIMER_READ"] = 52] = "FUNC_ID_RTC_TIMER_READ";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RTC_TIMER_DELETE"] = 53] = "FUNC_ID_RTC_TIMER_DELETE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RTC_TIMER_CALL"] = 54] = "FUNC_ID_RTC_TIMER_CALL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_CLEAR_TX_TIMERS"] = 55] = "FUNC_ID_CLEAR_TX_TIMERS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_TX_TIMERS"] = 56] = "FUNC_ID_GET_TX_TIMERS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_CLEAR_NETWORK_STATS"] = 57] = "FUNC_ID_ZW_CLEAR_NETWORK_STATS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_NETWORK_STATS"] = 58] = "FUNC_ID_ZW_GET_NETWORK_STATS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_BACKGROUND_RSSI"] = 59] = "FUNC_ID_ZW_GET_BACKGROUND_RSSI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_LISTEN_BEFORE_TALK_THRESHOLD"] = 60] = "FUNC_ID_ZW_SET_LISTEN_BEFORE_TALK_THRESHOLD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REMOVE_NODE_ID_FROM_NETWORK"] = 63] = "FUNC_ID_ZW_REMOVE_NODE_ID_FROM_NETWORK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_LEARN_NODE_STATE"] = 64] = "FUNC_ID_ZW_SET_LEARN_NODE_STATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_NODE_PROTOCOL_INFO"] = 65] = "FUNC_ID_ZW_GET_NODE_PROTOCOL_INFO";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_DEFAULT"] = 66] = "FUNC_ID_ZW_SET_DEFAULT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NEW_CONTROLLER"] = 67] = "FUNC_ID_ZW_NEW_CONTROLLER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REPLICATION_COMMAND_COMPLETE"] = 68] = "FUNC_ID_ZW_REPLICATION_COMMAND_COMPLETE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REPLICATION_SEND_DATA"] = 69] = "FUNC_ID_ZW_REPLICATION_SEND_DATA";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ASSIGN_RETURN_ROUTE"] = 70] = "FUNC_ID_ZW_ASSIGN_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_DELETE_RETURN_ROUTE"] = 71] = "FUNC_ID_ZW_DELETE_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE"] = 72] = "FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NODETYPE_NEIGHBOR_UPDATE"] = 104] = "FUNC_ID_ZW_REQUEST_NODETYPE_NEIGHBOR_UPDATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_APPLICATION_UPDATE"] = 73] = "FUNC_ID_ZW_APPLICATION_UPDATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ADD_NODE_TO_NETWORK"] = 74] = "FUNC_ID_ZW_ADD_NODE_TO_NETWORK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REMOVE_NODE_FROM_NETWORK"] = 75] = "FUNC_ID_ZW_REMOVE_NODE_FROM_NETWORK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_CREATE_NEW_PRIMARY"] = 76] = "FUNC_ID_ZW_CREATE_NEW_PRIMARY";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_CONTROLLER_CHANGE"] = 77] = "FUNC_ID_ZW_CONTROLLER_CHANGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_FN"] = 78] = "FUNC_ID_ZW_RESERVED_FN";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ASSIGN_PRIORITY_RETURN_ROUTE"] = 79] = "FUNC_ID_ZW_ASSIGN_PRIORITY_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_LEARN_MODE"] = 80] = "FUNC_ID_ZW_SET_LEARN_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ASSIGN_SUC_RETURN_ROUTE"] = 81] = "FUNC_ID_ZW_ASSIGN_SUC_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ENABLE_SUC"] = 82] = "FUNC_ID_ZW_ENABLE_SUC";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NETWORK_UPDATE"] = 83] = "FUNC_ID_ZW_REQUEST_NETWORK_UPDATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_SUC_NODE_ID"] = 84] = "FUNC_ID_ZW_SET_SUC_NODE_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_DELETE_SUC_RETURN_ROUTE"] = 85] = "FUNC_ID_ZW_DELETE_SUC_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_SUC_NODE_ID"] = 86] = "FUNC_ID_ZW_GET_SUC_NODE_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_SUC_ID"] = 87] = "FUNC_ID_ZW_SEND_SUC_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ASSIGN_PRIORITY_SUC_RETURN_ROUTE"] = 88] = "FUNC_ID_ZW_ASSIGN_PRIORITY_SUC_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REDISCOVERY_NEEDED"] = 89] = "FUNC_ID_ZW_REDISCOVERY_NEEDED";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE_OPTION"] = 90] = "FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE_OPTION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SUPPORT9600_ONLY"] = 91] = "FUNC_ID_ZW_SUPPORT9600_ONLY";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NEW_ROUTE_DESTINATIONS"] = 92] = "FUNC_ID_ZW_REQUEST_NEW_ROUTE_DESTINATIONS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_NODE_WITHIN_DIRECT_RANGE"] = 93] = "FUNC_ID_ZW_IS_NODE_WITHIN_DIRECT_RANGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_EXPLORE_REQUEST_INCLUSION"] = 94] = "FUNC_ID_ZW_EXPLORE_REQUEST_INCLUSION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_EXPLORE_REQUEST_EXCLUSION"] = 95] = "FUNC_ID_ZW_EXPLORE_REQUEST_EXCLUSION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NODE_INFO"] = 96] = "FUNC_ID_ZW_REQUEST_NODE_INFO";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REMOVE_FAILED_NODE_ID"] = 97] = "FUNC_ID_ZW_REMOVE_FAILED_NODE_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_FAILED_NODE_ID"] = 98] = "FUNC_ID_ZW_IS_FAILED_NODE_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REPLACE_FAILED_NODE"] = 99] = "FUNC_ID_ZW_REPLACE_FAILED_NODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_ROUTING_MAX_6_00"] = 101] = "FUNC_ID_ZW_SET_ROUTING_MAX_6_00";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_PRIMARY_CTRL"] = 102] = "FUNC_ID_ZW_IS_PRIMARY_CTRL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_AES_ECB"] = 103] = "FUNC_ID_ZW_AES_ECB";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_TIMER_START"] = 112] = "FUNC_ID_TIMER_START";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_TIMER_RESTART"] = 113] = "FUNC_ID_TIMER_RESTART";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_TIMER_CANCEL"] = 114] = "FUNC_ID_TIMER_CANCEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_TIMER_CALL"] = 115] = "FUNC_ID_TIMER_CALL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_FIRMWARE_UPDATE_NVM"] = 120] = "FUNC_ID_ZW_FIRMWARE_UPDATE_NVM";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_ROUTING_TABLE_LINE"] = 128] = "FUNC_ID_GET_ROUTING_TABLE_LINE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_TX_COUNTER"] = 129] = "FUNC_ID_GET_TX_COUNTER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RESET_TX_COUNTER"] = 130] = "FUNC_ID_RESET_TX_COUNTER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_STORE_NODEINFO"] = 131] = "FUNC_ID_STORE_NODEINFO";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_STORE_HOMEID"] = 132] = "FUNC_ID_STORE_HOMEID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_LOCK_ROUTE_RESPONSE"] = 144] = "FUNC_ID_LOCK_ROUTE_RESPONSE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_ROUTE_DEMO"] = 145] = "FUNC_ID_ZW_SEND_DATA_ROUTE_DEMO";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_PRIORITY_ROUTE"] = 146] = "FUNC_ID_ZW_GET_PRIORITY_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_PRIORITY_ROUTE"] = 147] = "FUNC_ID_ZW_SET_PRIORITY_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_TEST"] = 149] = "FUNC_ID_SERIAL_API_TEST";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_EXT"] = 152] = "FUNC_ID_SERIAL_API_EXT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SECURITY_SETUP"] = 156] = "FUNC_ID_ZW_SECURITY_SETUP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_APPLICATION_SECURITY_EVENT"] = 157] = "FUNC_ID_APPLICATION_SECURITY_EVENT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_APPL_SLAVE_NODE_INFORMATION"] = 160] = "FUNC_ID_SERIAL_API_APPL_SLAVE_NODE_INFORMATION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_APPLICATION_SLAVE_COMMAND_HANDLER"] = 161] = "FUNC_ID_APPLICATION_SLAVE_COMMAND_HANDLER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_SLAVE_NODE_INFORMATION"] = 162] = "FUNC_ID_ZW_SEND_SLAVE_NODE_INFORMATION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_SLAVE_DATA"] = 163] = "FUNC_ID_ZW_SEND_SLAVE_DATA";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_SLAVE_LEARN_MODE"] = 164] = "FUNC_ID_ZW_SET_SLAVE_LEARN_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_VIRTUAL_NODES"] = 165] = "FUNC_ID_ZW_GET_VIRTUAL_NODES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_VIRTUAL_NODE"] = 166] = "FUNC_ID_ZW_IS_VIRTUAL_NODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_SSD"] = 167] = "FUNC_ID_ZW_RESERVED_SSD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_APPLICATION_COMMAND_HANDLER_BRIDGE"] = 168] = "FUNC_ID_APPLICATION_COMMAND_HANDLER_BRIDGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_BRIDGE"] = 169] = "FUNC_ID_ZW_SEND_DATA_BRIDGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_META_BRIDGE"] = 170] = "FUNC_ID_ZW_SEND_DATA_META_BRIDGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_MULTI_BRIDGE"] = 171] = "FUNC_ID_ZW_SEND_DATA_MULTI_BRIDGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PWR_SETSTOPMODE"] = 176] = "FUNC_ID_PWR_SETSTOPMODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PWR_CLK_PD"] = 177] = "FUNC_ID_PWR_CLK_PD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PWR_CLK_PUP"] = 178] = "FUNC_ID_PWR_CLK_PUP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PWR_SELECT_CLK"] = 179] = "FUNC_ID_PWR_SELECT_CLK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_WUT_TIMEOUT"] = 180] = "FUNC_ID_ZW_SET_WUT_TIMEOUT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_WUT_KICKED"] = 181] = "FUNC_ID_ZW_IS_WUT_KICKED";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_ENABLE"] = 182] = "FUNC_ID_ZW_WATCHDOG_ENABLE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_DISABLE"] = 183] = "FUNC_ID_ZW_WATCHDOG_DISABLE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_KICK"] = 184] = "FUNC_ID_ZW_WATCHDOG_KICK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_EXT_INT_LEVEL"] = 185] = "FUNC_ID_ZW_SET_EXT_INT_LEVEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RF_POWER_LEVEL_GET"] = 186] = "FUNC_ID_ZW_RF_POWER_LEVEL_GET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_NEIGHBOR_COUNT"] = 187] = "FUNC_ID_ZW_GET_NEIGHBOR_COUNT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ARE_NODES_NEIGHBOURS"] = 188] = "FUNC_ID_ZW_ARE_NODES_NEIGHBOURS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_TYPE_LIBRARY"] = 189] = "FUNC_ID_ZW_TYPE_LIBRARY";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_TEST_FRAME"] = 190] = "FUNC_ID_ZW_SEND_TEST_FRAME";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_PROTOCOL_STATUS"] = 191] = "FUNC_ID_ZW_GET_PROTOCOL_STATUS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_PROMISCUOUS_MODE"] = 208] = "FUNC_ID_ZW_SET_PROMISCUOUS_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROMISCUOUS_APPLICATION_COMMAND_HANDLER"] = 209] = "FUNC_ID_PROMISCUOUS_APPLICATION_COMMAND_HANDLER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_START"] = 210] = "FUNC_ID_ZW_WATCHDOG_START";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_STOP"] = 211] = "FUNC_ID_ZW_WATCHDOG_STOP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_ROUTING_MAX"] = 212] = "FUNC_ID_ZW_SET_ROUTING_MAX";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_ROUTING_MAX"] = 213] = "FUNC_ID_ZW_GET_ROUTING_MAX";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PM_STAY_AWAKE"] = 215] = "FUNC_ID_PM_STAY_AWAKE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PM_CANCEL"] = 216] = "FUNC_ID_PM_CANCEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NETWORK_MANAGEMENT_SET_MAX_INCLUSION_REQUEST_INTERVALS"] = 214] = "FUNC_ID_ZW_NETWORK_MANAGEMENT_SET_MAX_INCLUSION_REQUEST_INTERVALS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_INITIATE_SHUTDOWN"] = 217] = "FUNC_ID_ZW_INITIATE_SHUTDOWN";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_GET_LR_NODES"] = 218] = "FUNC_ID_SERIAL_API_GET_LR_NODES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_LR_CHANNEL"] = 219] = "FUNC_ID_GET_LR_CHANNEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SET_LR_CHANNEL"] = 220] = "FUNC_ID_SET_LR_CHANNEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_LR_VIRTUAL_IDS"] = 221] = "FUNC_ID_ZW_SET_LR_VIRTUAL_IDS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_DCDC_CONFIG"] = 222] = "FUNC_ID_GET_DCDC_CONFIG";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SET_DCDC_CONFIG"] = 223] = "FUNC_ID_SET_DCDC_CONFIG";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_CMD"] = 224] = "FUNC_ID_ZW_NUNIT_CMD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_INIT"] = 225] = "FUNC_ID_ZW_NUNIT_INIT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_LIST"] = 226] = "FUNC_ID_ZW_NUNIT_LIST";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_RUN"] = 227] = "FUNC_ID_ZW_NUNIT_RUN";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_END"] = 228] = "FUNC_ID_ZW_NUNIT_END";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ENABLE_RADIO_PTI"] = 231] = "FUNC_ID_ENABLE_RADIO_PTI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_RADIO_PTI"] = 232] = "FUNC_ID_GET_RADIO_PTI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SEND_NOP"] = 233] = "FUNC_ID_SEND_NOP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_POWER_MANAGEMENT"] = 238] = "FUNC_ID_SERIAL_API_POWER_MANAGEMENT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_READY"] = 239] = "FUNC_ID_SERIAL_API_READY";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_0"] = 240] = "FUNC_ID_PROPRIETARY_0";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_1"] = 241] = "FUNC_ID_PROPRIETARY_1";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_2"] = 242] = "FUNC_ID_PROPRIETARY_2";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_3"] = 243] = "FUNC_ID_PROPRIETARY_3";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_4"] = 244] = "FUNC_ID_PROPRIETARY_4";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_5"] = 245] = "FUNC_ID_PROPRIETARY_5";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_6"] = 246] = "FUNC_ID_PROPRIETARY_6";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_7"] = 247] = "FUNC_ID_PROPRIETARY_7";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_8"] = 248] = "FUNC_ID_PROPRIETARY_8";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_9"] = 249] = "FUNC_ID_PROPRIETARY_9";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_A"] = 250] = "FUNC_ID_PROPRIETARY_A";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_B"] = 251] = "FUNC_ID_PROPRIETARY_B";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_C"] = 252] = "FUNC_ID_PROPRIETARY_C";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_D"] = 253] = "FUNC_ID_PROPRIETARY_D";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_E"] = 254] = "FUNC_ID_PROPRIETARY_E";
})(SapiClassFuncId || (exports.SapiClassFuncId = SapiClassFuncId = {}));
class SapiClass {
    _readWithTimeout(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let out;
            if (this.port == undefined || this.port.readable == null)
                return (new Uint8Array([]));
            const reader = this.port.readable.getReader();
            const timer = setTimeout(() => {
                reader.releaseLock();
            }, timeout);
            try {
                out = (yield reader.read()).value;
            }
            catch (err) {
                out = new Uint8Array([]);
            }
            clearTimeout(timer);
            reader.releaseLock();
            return (out);
        });
    }
    _read(num) {
        return __awaiter(this, void 0, void 0, function* () {
            let out, i, rep, tempos;
            rep = 0x0;
            while (rep < 1) {
                if (this.queue.length >= num) {
                    out = [];
                    i = 0x0;
                    while (i < num) {
                        tempos = this.queue.shift();
                        if (tempos == undefined)
                            break;
                        out.push(tempos);
                        i++;
                    }
                    return (out);
                }
                const value = yield this._readWithTimeout(20);
                i = 0x0;
                while (i < value.byteLength) {
                    this.queue.push(value[i]);
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
                    break;
                out.push(tempos);
                i++;
            }
            return (out);
        });
    }
    _write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.port == undefined || this.port.writable == null)
                return (false);
            const data_uint8 = new Uint8Array(data);
            const writer = this.port.writable.getWriter();
            yield writer.write(data_uint8);
            writer.releaseLock();
            if (define_1.WEB_TOOLS_BETA == true)
                console.log(">> ", (0, utilities_2.splitHexBuff)(data_uint8));
            return (true);
        });
    }
    _recv_async() {
        return __awaiter(this, void 0, void 0, function* () {
            for (;;) {
                if ((yield this._recvIncomingRequestAsyn(100)) == false)
                    break;
            }
        });
    }
    _clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._recv_async();
            this.queue = [];
            for (;;) {
                const value = yield this._read(50);
                if (value.length == 0x0)
                    return;
            }
        });
    }
    _sendData(cmd, databuff) {
        return __awaiter(this, void 0, void 0, function* () {
            let final_data;
            const data_len = databuff.length + this.ADDITIONAL_SIZE;
            if (data_len > 255) {
                const crc_data = [0x00, this.REQUEST, cmd].concat(databuff);
                final_data = [0x00, (data_len >> 8) & 0x0FF, data_len & 0x0FF, this.REQUEST, cmd].concat(databuff);
                const crc16 = (0, utilities_1.calcSigmaCRC16)(0x1D0F, crc_data, 0, crc_data.length);
                final_data = [this.SOF].concat(final_data).concat([(crc16 >> 8) & 0xFF, (crc16) & 0xFF]);
                if ((yield this._write(final_data)) == false)
                    return (false);
                return (true);
            }
            final_data = [data_len & 0x0FF, this.REQUEST, cmd].concat(databuff);
            const crc = (0, utilities_1.checksum)(final_data);
            final_data = [this.SOF].concat(final_data).concat([crc]);
            if ((yield this._write(final_data)) == false)
                return (false);
            return (true);
        });
    }
    _sendNack() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (this._write([this.NAK])));
        });
    }
    _sendAck() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (this._write([this.ACK])));
        });
    }
    _waitSOF(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const sof_timeout = Date.now() + timeout;
            while (sof_timeout > Date.now()) {
                const sof = yield this._read(0x1);
                if (sof.length == 0x0) {
                    continue;
                }
                if (sof[0x0] == this.SOF)
                    return (true);
            }
            return (false);
        });
    }
    _send_cmd(cmd, databuff) {
        return __awaiter(this, void 0, void 0, function* () {
            let rbuff, retries_nak, retries_can, retries_ack;
            if (this.b_open == false)
                return (SapiClassStatus.PORT_NOT_OPEN);
            yield this._recv_async();
            retries_nak = 0x3;
            retries_can = this.RETRIES_CAN;
            retries_ack = 0x6;
            for (;;) {
                if (retries_nak < 0x0)
                    return (SapiClassStatus.WRONG_RETRIES_NAK);
                if (retries_can < 0x0)
                    return (SapiClassStatus.WRONG_RETRIES_CAN);
                if ((yield this._sendData(cmd, databuff)) == false)
                    return (SapiClassStatus.WRITE);
                for (;;) {
                    if (retries_ack < 0x0)
                        return (SapiClassStatus.NO_ACK);
                    rbuff = yield this._read(0x1);
                    if (rbuff.length == 0x0) {
                        retries_ack--;
                        continue;
                    }
                    if (rbuff[0] == this.SOF) {
                        yield this._recvIncomingRequestAsyn(100, false);
                        continue;
                    }
                    break;
                }
                if (rbuff[0] == this.ACK)
                    break;
                if (rbuff[0] == this.CAN) {
                    yield this._recv_async();
                    retries_can--;
                    continue;
                }
                if (rbuff[0] == this.NAK) {
                    retries_nak--;
                    continue;
                }
            }
            return (SapiClassStatus.OK);
        });
    }
    _request(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let port;
            const nav_ext_serial = window.navigator;
            if (this.port != undefined)
                return (SapiClassStatus.REQUEST_ONE_SHOT);
            try {
                const options = { filters: filters };
                port = yield nav_ext_serial.serial.requestPort(options);
            }
            catch (e) {
                return (SapiClassStatus.REQUEST_NO_SELECT);
            }
            this.port = port;
            return (SapiClassStatus.OK);
        });
    }
    _open(baudRate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.port == undefined)
                return (SapiClassStatus.PORT_NOT_REQUEST);
            if (this.b_open == true)
                return (SapiClassStatus.PORT_NOT_OPEN);
            try {
                yield this.port.open({ baudRate, bufferSize: 8192 });
            }
            catch (e) {
                return (SapiClassStatus.PORT_USED);
            }
            this.b_open = true;
            return (SapiClassStatus.OK);
        });
    }
    _close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.port == undefined)
                return (SapiClassStatus.PORT_NOT_REQUEST);
            if (this.b_open == false)
                return (SapiClassStatus.PORT_NOT_CLOSE);
            yield this.port.close();
            this.b_open = false;
            return (SapiClassStatus.OK);
        });
    }
    _recvIncomingRequest_add(lenght) {
        return __awaiter(this, void 0, void 0, function* () {
            let buff_data, wait_timeout;
            const timout = 100;
            buff_data = [];
            wait_timeout = Date.now() + timout;
            for (;;) {
                const buffer = yield this._read(lenght - buff_data.length);
                buff_data = buff_data.concat(buffer);
                if (buff_data.length == lenght)
                    break;
                if (buffer.length > 0x0) {
                    wait_timeout = Date.now() + timout;
                    continue;
                }
                if (Date.now() >= wait_timeout) {
                    yield this._sendNack();
                    return ([]);
                }
            }
            return (buff_data);
        });
    }
    _recvIncomingRequest(timeout_1) {
        return __awaiter(this, arguments, void 0, function* (timeout, wait_sof = true) {
            let buff_data;
            const out = { status: SapiClassStatus.OK, crc: 0x0, cmd: 0x0, raw: [], data: [] };
            if (this.b_open == false) {
                out.status = SapiClassStatus.PORT_NOT_OPEN;
                return (out);
            }
            if (wait_sof == true) {
                if ((yield this._waitSOF(timeout)) == false) {
                    out.status = SapiClassStatus.NO_SOF;
                    return (out);
                }
            }
            buff_data = yield this._recvIncomingRequest_add(0x1);
            if (buff_data.length != 0x1) {
                out.status = SapiClassStatus.NO_LENGHT;
                return (out);
            }
            const len_data = buff_data[0x0];
            if (len_data < 0x3) {
                out.status = SapiClassStatus.WRONG_LENGHT;
                return (out);
            }
            buff_data = yield this._recvIncomingRequest_add(len_data);
            if (buff_data.length != len_data) {
                out.status = SapiClassStatus.INVALID_DATA_LEN;
                return (out);
            }
            out.crc = (0, utilities_1.checksum)([len_data].concat(buff_data.slice(0, len_data - 0x1)));
            if (out.crc != buff_data[len_data - 1]) {
                yield this._sendNack();
                out.status = SapiClassStatus.INVALID_CRC;
                return (out);
            }
            yield this._sendAck();
            out.raw = [this.SOF, len_data].concat(buff_data);
            if (define_1.WEB_TOOLS_BETA == true)
                console.log("<< ", (0, utilities_2.splitHexBuff)(out.raw));
            out.cmd = out.raw[0x3];
            out.data = out.raw.slice(0x4, out.raw.length - 0x1);
            return (out);
        });
    }
    _recvIncomingRequestAsyn(timeout_1) {
        return __awaiter(this, arguments, void 0, function* (timeout, wait_sof = true) {
            const res = yield this._recvIncomingRequest(timeout, wait_sof);
            if (res.status != SapiClassStatus.OK)
                return (false);
            // this.async_ret.push(res);
            return (true);
        });
    }
    _sendCommandUnSz_rcv_test(res, cmd) {
        if (res.status != SapiClassStatus.OK)
            return (false);
        if (res.cmd != cmd)
            return (false);
        return (true);
    }
    _sendCommandUnSz(cmd, args, timeout, cmd_ret) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, crc: 0x0, cmd: 0x0, raw: [], data: [] };
            out.status = yield this._send_cmd(cmd, args);
            if (out.status != SapiClassStatus.OK) {
                return (out);
            }
            const wait_timeout = Date.now() + timeout;
            for (;;) {
                const current_timeout = Date.now();
                if (current_timeout >= wait_timeout) {
                    out.status = SapiClassStatus.TIMEOUT_RCV;
                    return (out);
                }
                const res = yield this._recvIncomingRequest(wait_timeout - current_timeout);
                if (cmd_ret == undefined)
                    cmd_ret = cmd;
                if (this._sendCommandUnSz_rcv_test(res, cmd_ret) == true)
                    return (res);
            }
        });
    }
    _recvIncomingRequest_wait(timeout, cmd_ret) {
        return __awaiter(this, void 0, void 0, function* () {
            let res, i;
            res = yield this._recvIncomingRequest(timeout);
            if (cmd_ret == undefined)
                return (res);
            i = this.RETRIES_CAN;
            for (;;) {
                if (res.status != SapiClassStatus.OK)
                    break;
                if (res.cmd == cmd_ret)
                    break;
                if (i < 0x0) {
                    res.status = SapiClassStatus.TIMEOUT_RCV_I;
                    break;
                }
                res = yield this._recvIncomingRequest(100);
                i--;
            }
            return (res);
        });
    }
    recvIncomingRequest(timeout, cmd_ret) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, crc: 0x0, cmd: 0x0, raw: [], data: [] };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            this.b_busy = true;
            const res = yield this._recvIncomingRequest_wait(timeout, cmd_ret);
            this.b_busy = false;
            return (res);
        });
    }
    sendCommandUnSz(cmd_1, args_1) {
        return __awaiter(this, arguments, void 0, function* (cmd, args, timeout = 2000, cmd_ret) {
            const out = { status: SapiClassStatus.OK, crc: 0x0, cmd: 0x0, raw: [], data: [] };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            this.b_busy = true;
            const res = yield this._sendCommandUnSz(cmd, args, timeout, cmd_ret);
            this.b_busy = false;
            return (res);
        });
    }
    lock() {
        this.state_lock = true;
    }
    unlock() {
        this.state_lock = false;
    }
    is_busy() {
        if (this.state_lock == true)
            return (true);
        return (this.busy());
    }
    busy() {
        return (this.b_busy);
    }
    static supported() {
        if (!("serial" in window.navigator))
            return (false);
        return (true);
    }
    request(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.busy() == true)
                return (SapiClassStatus.SERIAL_BUSY);
            if (SapiClass.supported() == false)
                return (SapiClassStatus.SERIAL_UN_SUPPORT);
            this.b_busy = true;
            const out = yield this._request(filters);
            this.b_busy = false;
            return (out);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.busy() == true)
                return (SapiClassStatus.SERIAL_BUSY);
            this.b_busy = true;
            yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [], 500);
            const out = yield this._close();
            this.b_busy = false;
            this.detect_type = SapiClassDetectType.UNKNOWN;
            this.unlock();
            return (out);
        });
    }
    type() {
        return (this.detect_type);
    }
    _detect_rcv_freeze_zuno(out) {
        return __awaiter(this, void 0, void 0, function* () {
            const freeze_zuno_info = yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x2], 3000);
            if (freeze_zuno_info.status != SapiClassStatus.OK || freeze_zuno_info.data[0x0] != 0x0) {
                out.status = SapiClassStatus.ZUNO_NO_FREEZE;
                return;
            }
            out.type = SapiClassDetectType.ZUNO;
            return;
        });
    }
    _detect_rcv(res, out) {
        return __awaiter(this, void 0, void 0, function* () {
            out.status = SapiClassStatus.OK;
            if (res.status == SapiClassStatus.OK && res.cmd == SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET) {
                if (res.data.length < 0x2) {
                    out.status = SapiClassStatus.ZUNO_START_WRONG_LENG;
                    return;
                }
                if (res.data[0x0] != 0xFF) {
                    out.status = SapiClassStatus.ZUNO_START_WRONG_FRAME;
                    return;
                }
                yield this._detect_rcv_freeze_zuno(out);
                return;
            }
            if (res.cmd == SapiClassFuncId.FUNC_ID_SERIAL_API_STARTED) {
                out.type = SapiClassDetectType.RAZBERRY;
                return;
            }
            const capabilities_info = yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_GET_CAPABILITIES, [], 300);
            if (capabilities_info.status == SapiClassStatus.OK) {
                //VendorID = 0x0115 and ProductTypeID = 0x0210
                if (capabilities_info.data.length >= 0x6 && capabilities_info.data[0x2] == 0x1 && capabilities_info.data[0x3] == 0x15 && capabilities_info.data[0x4] == 0x2 && capabilities_info.data[0x5] == 0x10) {
                    yield this._detect_rcv_freeze_zuno(out);
                    return;
                }
                out.type = SapiClassDetectType.RAZBERRY;
                return;
            }
            out.status = SapiClassStatus.UPDATE_PROCESS;
        });
    }
    _detect_update(res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (res.status != SapiClassStatus.OK)
                return (SapiClassStatus.UPDATE_PROCESS);
            if (res.cmd != SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET)
                return (SapiClassStatus.DETECTED_UNC_COMMAND);
            if (res.data.length < 0x2)
                return (SapiClassStatus.ZUNO_START_WRONG_LENG);
            if (res.data[0x0] != 0x4 && res.data[0x1] != 0x1)
                return (SapiClassStatus.ZUNO_START_WRONG_DATA);
            return (SapiClassStatus.OK);
        });
    }
    _detect(out, baudrate, func) {
        return __awaiter(this, void 0, void 0, function* () {
            let i, res;
            if (this.port == undefined) {
                out.status = SapiClassStatus.PORT_NOT_REQUEST;
                return;
            }
            if (this.b_open == true) {
                out.status = yield this._close();
                if (out.status != SapiClassStatus.OK)
                    return;
                yield (0, utilities_1.sleep)(this.dtr_timeout);
            }
            const baudrate_array = this.BAUDRATE;
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
                out.status = yield this._open(baudrate_array[i]);
                if (out.status != SapiClassStatus.OK)
                    return;
                res = yield this._recvIncomingRequest(1000);
                if (res.status != SapiClassStatus.OK && func != null) {
                    yield this._clear();
                    if ((yield func()) == false) {
                        out.status = SapiClassStatus.DETECTED_CANCEL;
                        return;
                    }
                    res = yield this._recvIncomingRequest(2000);
                }
                const wait = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN };
                yield this._detect_rcv(res, wait);
                if (wait.status == SapiClassStatus.OK) {
                    out.type = wait.type;
                    return;
                }
                if (wait.status != SapiClassStatus.UPDATE_PROCESS) {
                    out.status = wait.status;
                    return;
                }
                out.status = yield this._close();
                if (out.status != SapiClassStatus.OK)
                    return;
                yield (0, utilities_1.sleep)(this.dtr_timeout);
                i++;
            }
            out.status = SapiClassStatus.DETECTED_NOT_FIND;
        });
    }
    detect(baudrate, func) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN, baudrate: 0x0 };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            this.b_busy = true;
            yield this._detect(out, baudrate, func);
            this.detect_type = out.type;
            this.b_busy = false;
            return (out);
        });
    }
    getQuantumSize() {
        return (this.MAX_SEND_DATA_LENGHT);
    }
    _checkBootImage(addr) {
        return __awaiter(this, void 0, void 0, function* () {
            const data_addr = [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF];
            yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x04].concat(data_addr), 100);
        });
    }
    _update_wait_zuno(target_type, out) {
        return __awaiter(this, void 0, void 0, function* () {
            const wait_timeout = Date.now() + 30000;
            while (wait_timeout > Date.now()) {
                const res = yield this._recvIncomingRequest(1000);
                out.status = yield this._detect_update(res);
                if (out.status == SapiClassStatus.UPDATE_PROCESS)
                    continue;
                break;
            }
            if (target_type == SapiClassDetectType.RAZBERRY) {
                yield (0, utilities_1.sleep)(20000);
                const out_detect = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN, baudrate: 0x0 };
                yield this._detect(out_detect, [115200], null);
                out.type = out_detect.type;
                out.status = out_detect.status;
                return;
            }
            while (wait_timeout > Date.now()) {
                const res = yield this._recvIncomingRequest(1000);
                yield this._detect_rcv(res, out);
                if (out.status == SapiClassStatus.UPDATE_PROCESS)
                    continue;
                return;
            }
            out.status = SapiClassStatus.UPDATE_TIMEOUT;
        });
    }
    _update_wait_razberry(target_type, out) {
        return __awaiter(this, void 0, void 0, function* () {
            const wait_timeout = Date.now() + 30000;
            if (target_type == SapiClassDetectType.RAZBERRY) {
                while (wait_timeout > Date.now()) {
                    const res = yield this._recvIncomingRequest(1000);
                    yield this._detect_rcv(res, out);
                    if (out.status == SapiClassStatus.UPDATE_PROCESS)
                        continue;
                    return;
                }
                out.status = SapiClassStatus.UPDATE_TIMEOUT;
                return;
            }
            yield (0, utilities_1.sleep)(20000);
            const out_detect = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN, baudrate: 0x0 };
            yield this._detect(out_detect, [115200], null);
            out.type = out_detect.type;
            out.status = out_detect.status;
        });
    }
    _update(addr, target_type, out) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.detect_type) {
                case SapiClassDetectType.ZUNO:
                    yield this._checkBootImage(addr);
                    yield this._update_wait_zuno(target_type, out);
                    break;
                case SapiClassDetectType.RAZBERRY:
                    yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [], 200);
                    yield this._update_wait_razberry(target_type, out);
                    break;
                default:
                    out.status = SapiClassStatus.UPDATE_UNK;
                    break;
            }
        });
    }
    update(addr, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            if (target_type == SapiClassDetectType.UNKNOWN) {
                out.status = SapiClassStatus.DETECTED_UNC;
                return (out);
            }
            this.b_busy = true;
            yield this._update(addr, target_type, out);
            this.detect_type = out.type;
            this.b_busy = false;
            if (out.status == SapiClassStatus.OK && out.type != target_type) {
                out.status = SapiClassStatus.DETECTED_TARGET_TYPE;
                return (out);
            }
            return (out);
        });
    }
    _detect_rcv_add(out) {
        return __awaiter(this, void 0, void 0, function* () {
            const wait_timeout = Date.now() + 3000;
            while (wait_timeout > Date.now()) {
                const res = yield this._recvIncomingRequest(1000);
                yield this._detect_rcv(res, out);
                if (out.status == SapiClassStatus.UPDATE_PROCESS)
                    continue;
                return;
            }
        });
    }
    detect_rcv() {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            if (this.detect_type == SapiClassDetectType.UNKNOWN) {
                out.status = SapiClassStatus.DETECTED_UNC;
                return (out);
            }
            this.b_busy = true;
            const detect_type = this.detect_type;
            yield this._detect_rcv_add(out);
            this.detect_type = out.type;
            this.b_busy = false;
            if (out.type != detect_type) {
                out.status = SapiClassStatus.DETECTED_TARGET_TYPE;
                return (out);
            }
            return (out);
        });
    }
    constructor() {
        this.MAX_SEND_DATA_LENGHT = 0xA0;
        this.SOF = 0x01;
        this.ACK = 0x06;
        this.NAK = 0x15;
        this.CAN = 0x18;
        this.REQUEST = 0x00;
        this.RESPONSE = 0x01;
        this.ADDITIONAL_SIZE = 0x03;
        this.BAUDRATE = [115200, 230400, 460800, 921600];
        this.dtr_timeout = 250; // The time for the capacitor on the DTR line to recharge
        this.RETRIES_CAN = 100;
        this.b_busy = false;
        this.state_lock = false;
        this.b_open = false;
        this.port = undefined;
        this.queue = [];
        this.async_ret = [];
        this.detect_type = SapiClassDetectType.UNKNOWN;
    }
}
exports.SapiClass = SapiClass;


/***/ }),

/***/ "./src/sapi/zuno_sapi.ts":
/*!*******************************!*\
  !*** ./src/sapi/zuno_sapi.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZunoSapiClassStatus = exports.ZunoSapiClass = void 0;
const sapi_1 = __webpack_require__(/*! ./sapi */ "./src/sapi/sapi.ts");
const region_1 = __webpack_require__(/*! ./region */ "./src/sapi/region.ts");
const utilities_1 = __webpack_require__(/*! ../other/utilities */ "./src/other/utilities.ts");
const chip_1 = __webpack_require__(/*! ../hardware/chip */ "./src/hardware/chip.ts");
var ELearnStatus;
(function (ELearnStatus) {
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_COMPLETE"] = 0] = "ELEARNSTATUS_ASSIGN_COMPLETE";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_NODEID_DONE"] = 1] = "ELEARNSTATUS_ASSIGN_NODEID_DONE";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_RANGE_INFO_UPDATE"] = 2] = "ELEARNSTATUS_ASSIGN_RANGE_INFO_UPDATE";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_INFO_PENDING"] = 3] = "ELEARNSTATUS_ASSIGN_INFO_PENDING";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_WAITING_FOR_FIND"] = 4] = "ELEARNSTATUS_ASSIGN_WAITING_FOR_FIND";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_SMART_START_IN_PROGRESS"] = 5] = "ELEARNSTATUS_SMART_START_IN_PROGRESS";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_LEARN_IN_PROGRESS"] = 6] = "ELEARNSTATUS_LEARN_IN_PROGRESS";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_LEARN_MODE_COMPLETED_TIMEOUT"] = 7] = "ELEARNSTATUS_LEARN_MODE_COMPLETED_TIMEOUT";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_LEARN_MODE_COMPLETED_FAILED"] = 8] = "ELEARNSTATUS_LEARN_MODE_COMPLETED_FAILED";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_PROCESS"] = -1] = "ELEARNSTATUS_PROCESS";
})(ELearnStatus || (ELearnStatus = {}));
var ZunoSapiClassStatus;
(function (ZunoSapiClassStatus) {
    ZunoSapiClassStatus[ZunoSapiClassStatus["OK"] = 0] = "OK";
    ZunoSapiClassStatus[ZunoSapiClassStatus["NOT_INIT"] = 35] = "NOT_INIT";
    ZunoSapiClassStatus[ZunoSapiClassStatus["WRONG_LENGTH_CMD"] = 36] = "WRONG_LENGTH_CMD";
    ZunoSapiClassStatus[ZunoSapiClassStatus["WRONG_STATUS"] = 37] = "WRONG_STATUS";
    ZunoSapiClassStatus[ZunoSapiClassStatus["WRONG_IN_DATA"] = 38] = "WRONG_IN_DATA";
    ZunoSapiClassStatus[ZunoSapiClassStatus["NO_FREEZE"] = 39] = "NO_FREEZE";
    ZunoSapiClassStatus[ZunoSapiClassStatus["INVALID_ARG"] = 40] = "INVALID_ARG";
    ZunoSapiClassStatus[ZunoSapiClassStatus["TIMEOUT"] = 41] = "TIMEOUT";
    ZunoSapiClassStatus[ZunoSapiClassStatus["UN_SUPPORT"] = 42] = "UN_SUPPORT";
    ZunoSapiClassStatus[ZunoSapiClassStatus["TIMEOUT_FORCE_RESTART"] = 43] = "TIMEOUT_FORCE_RESTART";
    ZunoSapiClassStatus[ZunoSapiClassStatus["LEARN_EXCLUDE"] = 44] = "LEARN_EXCLUDE";
    ZunoSapiClassStatus[ZunoSapiClassStatus["LEARN_INCLUDE"] = 45] = "LEARN_INCLUDE";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_TOO_LONG"] = 46] = "SCETCH_TOO_LONG";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_FALLED_PRIAMLE"] = 47] = "SCETCH_FALLED_PRIAMLE";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_FALLED_CORE_VERSION"] = 48] = "SCETCH_FALLED_CORE_VERSION";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_FALLED_REVISION"] = 49] = "SCETCH_FALLED_REVISION";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_FALLED_CRC16"] = 50] = "SCETCH_FALLED_CRC16";
})(ZunoSapiClassStatus || (exports.ZunoSapiClassStatus = ZunoSapiClassStatus = {}));
// ------------------------------------------------------------------------------------------------------
class ZunoSapiClass {
    _get_param_info_default() {
        const param_info = {
            status: ZunoSapiClassStatus.NOT_INIT, freq_i: 0x0, raw: [], main_pow: 0x0, sec: false
        };
        return (param_info);
    }
    _get_board_info_default() {
        const board_info = {
            status: ZunoSapiClassStatus.NOT_INIT, version: 0x0, build_number: 0x0, build_ts: 0x0, hw_rev: 0x0, code_size: 0x0, ram_size: 0x0, dbg_lock: 0x0, custom_code_offset: 0x30000, chip_uuid: new Uint8Array(), s2_pub: new Uint8Array(),
            boot_offset: 0x3a000, boot_version: 0x0, max_default_power: 50, ext_nvm: 0x0, chip: { chip_type: chip_1.HardwareChipClass.CHIP_ZGM130S037HGN1, chip_family: chip_1.HardwareChipClass.FAMILY_ZGM13, keys_hash: 0x8E19CC54, se_version: 0x0 },
            core_version: 0x0
        };
        return (board_info);
    }
    compile_zwave_qrcode(product_data, dsk, version) {
        return __awaiter(this, void 0, void 0, function* () {
            let protocol_map, text;
            text = (0, utilities_1.conv2DecimalPadding)(product_data["s2_keys"], 3);
            text = text + (0, utilities_1.conv2Decimal)(dsk, "");
            // #ProductType
            text = text + "0010" + (0, utilities_1.conv2DecimalPadding)(product_data["device_type"], 5) + (0, utilities_1.conv2DecimalPadding)(product_data["device_icon"], 5);
            // #ProductID
            text = text + "0220" + (0, utilities_1.conv2DecimalPadding)(product_data["vendor"], 5) + (0, utilities_1.conv2DecimalPadding)(product_data["product_type"], 5) + (0, utilities_1.conv2DecimalPadding)(product_data["product_id"], 5) + (0, utilities_1.conv2DecimalPadding)(version, 5);
            // # Supported Protocols
            protocol_map = 0x01;
            if (product_data["LR"] == true)
                protocol_map = protocol_map | 0x02;
            text += "0803" + (0, utilities_1.conv2DecimalPadding)(protocol_map, 3);
            // # MaxInclusionInterval
            text = text + "0403005"; // # ==5*128=640
            const buf = Uint8Array.from(unescape(encodeURIComponent(text)), c => c.charCodeAt(0)).buffer;
            const digest = new Uint8Array(yield crypto.subtle.digest('SHA-1', buf));
            text = "9001" + (0, utilities_1.conv2DecimalPadding)((digest[0x0] << 0x8) | digest[0x1], 5) + text;
            return (text);
        });
    }
    _readNVM(addr, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER, [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF]));
        });
    }
    _writeNVM(addr, buff) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = buff.length;
            const data_addr = [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF];
            return (yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER, data_addr.concat(buff)));
        });
    }
    _get_param_info() {
        return __awaiter(this, void 0, void 0, function* () {
            this.param_info = this._get_param_info_default();
            const out = this.param_info;
            const param_info = yield this._readNVM(0xFFE000, 0x09);
            if (param_info.status != sapi_1.SapiClassStatus.OK) {
                out.status = param_info.status;
                return;
            }
            const param = param_info.data;
            if (param.length < 0x5) {
                out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
                return;
            }
            out.status = ZunoSapiClassStatus.OK;
            out.raw = param;
            out.freq_i = param_info.data[1];
            out.main_pow = param_info.data[2];
            if (param_info.data[4] != 0x0)
                out.sec = true;
        });
    }
    _get_board_info_add() {
        return __awaiter(this, void 0, void 0, function* () {
            let code_sz_shift, shift_smrt, eu_lr, byte_i, bit_i;
            this.board_info = this._get_board_info_default();
            const out = this.board_info;
            const board_info = yield this._readNVM(0xFFFF00, 0x01);
            if (board_info.status != sapi_1.SapiClassStatus.OK) {
                out.status = board_info.status;
                return;
            }
            const info = board_info.data;
            if (info.length < 42) {
                out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
                return;
            }
            out.status = ZunoSapiClassStatus.OK;
            const version = ((info[0] << 8) | (info[1]));
            out.core_version = version;
            out.build_number = (info[2] << 24) | (info[3] << 16) | (info[4] << 8) | (info[5]);
            out.version = (version << 16 | (out.build_number & 0xFFFF));
            out.build_ts = (info[6] << 24) | (info[7] << 16) | (info[8] << 8) | (info[9]);
            out.hw_rev = (info[10] << 8) | (info[11]);
            if (out.build_number > 1116) {
                code_sz_shift = 0x1;
                out.code_size = (0, utilities_1.costruct_int)(info.slice(12, 12 + 3), 3, false);
            }
            else {
                code_sz_shift = 0x0;
                out.code_size = (info[12] << 8) | (info[13]);
            }
            out.ram_size = (info[14 + code_sz_shift] << 8) | (info[15 + code_sz_shift]);
            out.chip_uuid = new Uint8Array(info.slice(16 + code_sz_shift, 16 + code_sz_shift + 8));
            out.s2_pub = new Uint8Array(info.slice(24 + code_sz_shift, 24 + code_sz_shift + 16));
            out.dbg_lock = info[40 + code_sz_shift];
            const offset_base = 46;
            if (info.length < offset_base)
                return;
            out.home_id = (0, utilities_1.costruct_int)(info.slice(41 + code_sz_shift, 41 + code_sz_shift + 4), 4, false);
            out.node_id = info[45 + code_sz_shift];
            if (out.build_number < 1669) {
                shift_smrt = 90;
                if (info.length < (offset_base + code_sz_shift + shift_smrt))
                    return;
                out.smart_qr = (0, utilities_1.toString)(info.slice(46 + code_sz_shift, 46 + code_sz_shift + 90));
            }
            else {
                shift_smrt = 11;
                if (info.length < (offset_base + code_sz_shift + shift_smrt))
                    return;
                out.zwdata =
                    {
                        s2_keys: info[46 + code_sz_shift],
                        device_type: (0, utilities_1.costruct_int)(info.slice(47 + code_sz_shift, 47 + code_sz_shift + 2), 2, false),
                        device_icon: (0, utilities_1.costruct_int)(info.slice(49 + code_sz_shift, 49 + code_sz_shift + 2), 2, false),
                        vendor: (0, utilities_1.costruct_int)(info.slice(51 + code_sz_shift, 51 + code_sz_shift + 2), 2, false),
                        product_type: (0, utilities_1.costruct_int)(info.slice(53 + code_sz_shift, 53 + code_sz_shift + 2), 2, false),
                        product_id: (0, utilities_1.costruct_int)(info.slice(55 + code_sz_shift, 55 + code_sz_shift + 2), 2, false),
                        version: version,
                        LR: false,
                    };
                out.smart_qr = yield this.compile_zwave_qrcode(out.zwdata, out.s2_pub, out.zwdata.version);
            }
            const offset_code = offset_base + code_sz_shift + shift_smrt;
            if (info.length < (offset_code + 0x4))
                return;
            out.custom_code_offset = (0, utilities_1.costruct_int)(info.slice(offset_code, offset_code + 0x4), 0x4, false);
            if (out.custom_code_offset > 0x36000)
                out.boot_offset = 0x40000;
            const offset_prod = offset_code + 0x4;
            if (info.length < (offset_prod + 0x10))
                return;
            out.product =
                {
                    prod_raw: new Uint8Array(info.slice(offset_prod, offset_prod + 0x10)),
                    prod_parent_uuid: new Uint8Array(info.slice(offset_prod, offset_prod + 0x8)),
                    prod_ts: (0, utilities_1.costruct_int)(info.slice(offset_prod + 0x8, offset_prod + 0x8 + 0x4), 0x4, true),
                    prod_sn: (0, utilities_1.costruct_int)(info.slice(offset_prod + 0x8 + 0x4, offset_prod + 0x8 + 0x4 + 0x3), 0x3, true),
                    prod_crc8: info[offset_prod + 0x8 + 0x4 + 0x3],
                    prod_valid: (info[offset_prod + 0x8 + 0x4 + 0x3] == (0, utilities_1.checksum)(info.slice(offset_prod, offset_prod + 0x10 - 0x1))) ? true : false
                };
            const offset_license = offset_prod + 0x10;
            if (info.length < (offset_license + 0xA))
                return;
            out.license =
                {
                    lic_subvendor: (0, utilities_1.costruct_int)(info.slice(offset_license, offset_license + 0x2), 0x2, false),
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
            if (out.license.lic_flags[this.LICENSE_KEY_LONG_RANGE] != undefined && out.license.lic_flags[this.LICENSE_KEY_LONG_RANGE].active == true) {
                if (out.version >= 0x30D124B)
                    eu_lr = true;
                else
                    eu_lr = false;
                this.region = new region_1.SapiRegionClass(true, eu_lr);
                if (out.zwdata != undefined && this.param_info.status == ZunoSapiClassStatus.OK) {
                    const region = this.region.getNameRegion(this.param_info.freq_i);
                    if (region != undefined && this.region.isLr(region) == true) {
                        out.zwdata.LR = true;
                        out.smart_qr = yield this.compile_zwave_qrcode(out.zwdata, out.s2_pub, out.zwdata.version);
                    }
                }
            }
            const offset_power = offset_license + 0xA;
            if (info.length < (offset_power + 0x1))
                return;
            out.max_default_power = info[offset_power];
            const offset_ext_nvm = offset_power + 0x1;
            if (info.length < (offset_ext_nvm + 0x2))
                return;
            out.ext_nvm = (0, utilities_1.costruct_int)(info.slice(offset_ext_nvm, offset_ext_nvm + 0x2), 0x2, false);
            if (out.ext_nvm >= 512)
                out.boot_offset = 0xA10000 + ((out.ext_nvm - 512) << 10);
            const offset_chip = offset_ext_nvm + 0x2;
            const size_chip = 0xA;
            if (info.length < (offset_chip + size_chip))
                return;
            out.chip =
                {
                    chip_family: info[offset_chip],
                    chip_type: info[offset_chip + 0x1],
                    keys_hash: (0, utilities_1.costruct_int)(info.slice(offset_chip + 0x2, offset_chip + 0x2 + 0x4), 0x4, false),
                    se_version: (0, utilities_1.costruct_int)(info.slice(offset_chip + 0x2 + 0x4, offset_chip + 0x2 + 0x4 + 0x4), 0x4, false)
                };
            const offset_boot_version = offset_chip + size_chip;
            const size_boot_version = 0x4;
            if (info.length < (offset_boot_version + size_boot_version))
                return;
            out.boot_version = (0, utilities_1.costruct_int)(info.slice(offset_boot_version, offset_boot_version + size_boot_version), size_boot_version, false);
        });
    }
    _get_board_info() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._get_board_info_add();
            if (this.board_info.status != ZunoSapiClassStatus.OK)
                return;
            if (this.board_info.boot_version == 0x0) {
                this.board_info.boot_version = 0x01090001;
            }
            if (this.board_info.chip.keys_hash == 0x0) {
                this.board_info.chip.keys_hash = 0x8E19CC54;
                this.board_info.chip.chip_type = chip_1.HardwareChipClass.CHIP_ZGM130S037HGN1;
                this.board_info.chip.chip_family = chip_1.HardwareChipClass.FAMILY_ZGM13;
            }
        });
    }
    _apply_param(raw) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._writeNVM(0xFFE000, raw);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            if (res.data.length < 0x1)
                return (ZunoSapiClassStatus.WRONG_LENGTH_CMD);
            if (res.data[0x0] != 0x1)
                return (ZunoSapiClassStatus.WRONG_STATUS);
            const soft_reset = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, []);
            if (soft_reset.status != sapi_1.SapiClassStatus.OK)
                return soft_reset.status;
            const freeze_zuno_info = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x2], 3000);
            if (freeze_zuno_info.status != sapi_1.SapiClassStatus.OK || freeze_zuno_info.data[0x0] != 0x0)
                return (ZunoSapiClassStatus.NO_FREEZE);
            return (ZunoSapiClassStatus.OK);
        });
    }
    _load_file(addr, data, process) {
        return __awaiter(this, void 0, void 0, function* () {
            let step, i, percentage;
            step = this.getQuantumSize();
            percentage = 0x0;
            i = 0x0;
            while (i < data.length) {
                if (i + step > data.length)
                    step = data.length - i;
                percentage = (i * 100.0) / data.length;
                if (process != null)
                    process(percentage);
                const status = yield this._writeNVM(addr, Array.from(data.subarray(i, i + step)));
                if (status.status != sapi_1.SapiClassStatus.OK)
                    return status.status;
                i = i + step;
                addr = addr + step;
            }
            if (process != null && percentage < 100.00)
                process(100.00);
            return (ZunoSapiClassStatus.OK);
        });
    }
    updateFirmware(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.board_info.status != ZunoSapiClassStatus.OK)
                return (this.board_info.status);
            const status = yield this._load_file(this.board_info.boot_offset, data, process);
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const res = yield this.sapi.update(this.board_info.boot_offset, target_type);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ZunoSapiClassStatus.OK);
        });
    }
    _pushSketch(addr, size, crc16) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.sendCommandUnSz(0x08, [0x01, (addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF, (crc16 >> 8) & 0xFF, (crc16) & 0xFF]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            if (res.data.length < 0x1)
                return (ZunoSapiClassStatus.WRONG_LENGTH_CMD);
            if (res.data[0x0] == 0xFE)
                return (ZunoSapiClassStatus.SCETCH_FALLED_CRC16);
            return (ZunoSapiClassStatus.OK);
        });
    }
    updateSketch(scetch, process) {
        return __awaiter(this, void 0, void 0, function* () {
            let status;
            if (this.board_info.status != ZunoSapiClassStatus.OK)
                return (this.board_info.status);
            if (scetch.length > this.board_info.code_size)
                return (ZunoSapiClassStatus.SCETCH_TOO_LONG);
            const data_uint8 = scetch.slice(0, this.ZUNO_HEADER_PREAMBL.length);
            const preamble = new TextDecoder().decode(data_uint8);
            if (this.ZUNO_HEADER_PREAMBL != preamble)
                return (ZunoSapiClassStatus.SCETCH_FALLED_PRIAMLE);
            const header_version = (scetch[this.SK_HEADER_VERSION_MSB_OFFSET] << 8) | scetch[this.SK_HEADER_VERSION_LSB_OFFSET];
            if (header_version != this.board_info.core_version)
                return (ZunoSapiClassStatus.SCETCH_FALLED_CORE_VERSION);
            if (this.board_info.hw_rev != -1 && this.board_info.build_number >= 2849) {
                const header_hw_rev = (0, utilities_1.costruct_int)(scetch.slice(this.SK_HEADER_HWREW_OFFSET, this.SK_HEADER_HWREW_OFFSET + 0x2), 2);
                if (this.board_info.hw_rev != header_hw_rev)
                    return (ZunoSapiClassStatus.SCETCH_FALLED_REVISION);
            }
            status = yield this._load_file(this.board_info.custom_code_offset, scetch, process);
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const crc16 = (0, utilities_1.calcSigmaCRC16)(0x1D0F, scetch, 0, scetch.length);
            status = yield this._pushSketch(this.board_info.custom_code_offset, scetch.length, crc16);
            return (status);
        });
    }
    getBoardInfo() {
        return (this.board_info);
    }
    _isSupportRegionAndPower() {
        if (this.param_info.status != ZunoSapiClassStatus.OK)
            return (this.param_info.status);
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.version < 0x3080517)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isMustResetDefault() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.version < 0x30D124B)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isSupportResetDefault() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.version < 0x3080517)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isSupportIncludeExclude() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.version < 0x30C108C)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isSupportUpdateBootloader() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.product == undefined)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        if (this.board_info.product.prod_valid == false)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        const prod_date = new Date(this.board_info.product.prod_ts * 1000);
        if (prod_date.getUTCFullYear() <= 2022)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isSupportDumpKey() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info == undefined)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        if (this.board_info.license == undefined)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        if (this.board_info.license.lic_flags[this.LICENSE_KEY_DUMP_S2] != undefined && this.board_info.license.lic_flags[this.LICENSE_KEY_DUMP_S2].active == true)
            return (ZunoSapiClassStatus.OK);
        return (ZunoSapiClassStatus.UN_SUPPORT);
    }
    _test_dump_key(array) {
        const empty_v1 = "00000000000000000000000000000000";
        const empty_v2 = "ffffffffffffffffffffffffffffffff";
        const key = (0, utilities_1.arrayToStringHex)(array);
        if (key === empty_v1 || key === empty_v2)
            return (false);
        return (true);
    }
    readS2Key() {
        return __awaiter(this, void 0, void 0, function* () {
            let i;
            const out = { status: ZunoSapiClassStatus.OK, list: [] };
            out.status = this.isSupportDumpKey();
            if (out.status != ZunoSapiClassStatus.OK)
                return (out);
            const dump_key_info = yield this._readNVM(0xFFCCC0, 0x40);
            if (dump_key_info.status != sapi_1.SapiClassStatus.OK) {
                out.status = dump_key_info.status;
                return (out);
            }
            if (dump_key_info.data.length != 0x40) {
                out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
                return (out);
            }
            out.list.push({ key: new Uint8Array(dump_key_info.data.slice(0, 16)), name: this.KEY_UNAUTH_NAME });
            out.list.push({ key: new Uint8Array(dump_key_info.data.slice(16, 32)), name: this.KEY_AUTH_NAME });
            out.list.push({ key: new Uint8Array(dump_key_info.data.slice(32, 48)), name: this.KEY_ACCESS_NAME });
            out.list.push({ key: new Uint8Array(dump_key_info.data.slice(48, 64)), name: this.KEY_S0_NAME });
            i = 0x0;
            while (i < out.list.length) {
                if (this._test_dump_key(out.list[i].key) == false)
                    out.list[i].key = new Uint8Array([]);
                i++;
            }
            return (out);
        });
    }
    getRegion() {
        const out = { status: this._isSupportRegionAndPower(), region: "", region_array: this.region.getListRegion() };
        if (out.status != ZunoSapiClassStatus.OK)
            return (out);
        const region = this.region.getNameRegion(this.param_info.freq_i);
        if (region == undefined) {
            out.status = ZunoSapiClassStatus.WRONG_IN_DATA;
            return (out);
        }
        out.region = region;
        return (out);
    }
    setRegion(region) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this._isSupportRegionAndPower();
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const region_id = this.region.getIdRegion(region);
            if (region_id == undefined)
                return (ZunoSapiClassStatus.INVALID_ARG);
            if (this.param_info.status != ZunoSapiClassStatus.OK)
                return (this.param_info.status);
            const raw = this.param_info.raw;
            raw[0x1] = region_id;
            if (raw.length > 0x8)
                raw[0x8] = region_id;
            return (yield this._apply_param(raw));
        });
    }
    getPower() {
        const out = {
            status: this._isSupportRegionAndPower(),
            power_raw: this.param_info.main_pow,
            step: 0x1,
            min: 1,
            max: this.board_info.max_default_power,
        };
        if (out.status != ZunoSapiClassStatus.OK)
            return (out);
        return (out);
    }
    getSec() {
        const out = {
            status: this._isSupportRegionAndPower(),
            sec: this.param_info.sec,
        };
        if (out.status != ZunoSapiClassStatus.OK)
            return (out);
        return (out);
    }
    setSec(sec) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this._isSupportRegionAndPower();
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const raw = this.param_info.raw;
            if (sec == true)
                raw[0x4] = 0x1;
            else
                raw[0x4] = 0x0;
            return (yield this._apply_param(raw));
        });
    }
    setPower(power) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this._isSupportRegionAndPower();
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const raw = this.param_info.raw;
            raw[0x2] = power;
            return (yield this._apply_param(raw));
        });
    }
    enableNif() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x0A]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ZunoSapiClassStatus.OK);
        });
    }
    enableEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x09, 0x1]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ZunoSapiClassStatus.OK);
        });
    }
    _enableLearn_get_status() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.recvIncomingRequest(1000);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return (ELearnStatus.ELEARNSTATUS_PROCESS);
            if (res.cmd != sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER)
                return (ELearnStatus.ELEARNSTATUS_PROCESS);
            if (res.data.length < 0x3)
                return (ELearnStatus.ELEARNSTATUS_PROCESS);
            if (res.data[0x1] != 0xA0)
                return (ELearnStatus.ELEARNSTATUS_PROCESS);
            return (res.data[0x2]);
        });
    }
    _enableLearn_include() {
        return __awaiter(this, void 0, void 0, function* () {
            let retries;
            const wait_timeout = Date.now() + ((30 + 0x1) * 1000);
            retries = 0x0;
            while (wait_timeout > Date.now()) {
                switch (yield this._enableLearn_get_status()) {
                    case ELearnStatus.ELEARNSTATUS_PROCESS:
                        retries++;
                        break;
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_NODEID_DONE:
                        retries = 0x0;
                        break;
                    default:
                        return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
                        break;
                }
                if (retries >= 0x3)
                    return (ZunoSapiClassStatus.LEARN_INCLUDE);
            }
            return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
        });
    }
    _enableLearn_exlude() {
        return __awaiter(this, void 0, void 0, function* () {
            let retries;
            retries = 0x0;
            while (retries < 0x3) {
                retries++;
                switch (yield this._enableLearn_get_status()) {
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_COMPLETE:
                        break;
                    case ELearnStatus.ELEARNSTATUS_PROCESS:
                        break;
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_NODEID_DONE:
                        return (yield this._enableLearn_include());
                        break;
                }
            }
            return (ZunoSapiClassStatus.LEARN_EXCLUDE);
        });
    }
    enableLearn(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let detect_wait, status;
            timeout = timeout & 0xFF;
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x07, timeout & 0xFF, 0x1 & 0xFF]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            const wait_timeout = Date.now() + ((timeout + 0x1) * 1000);
            this.lock();
            while (wait_timeout > Date.now()) {
                switch (yield this._enableLearn_get_status()) {
                    case ELearnStatus.ELEARNSTATUS_LEARN_MODE_COMPLETED_TIMEOUT:
                        this.unlock();
                        detect_wait = yield this.sapi.detect_rcv();
                        if (detect_wait.status != sapi_1.SapiClassStatus.OK)
                            return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
                        return (ZunoSapiClassStatus.TIMEOUT);
                        break;
                    case ELearnStatus.ELEARNSTATUS_LEARN_MODE_COMPLETED_FAILED:
                        this.unlock();
                        return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
                        break;
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_COMPLETE:
                        status = yield this._enableLearn_exlude();
                        this.unlock();
                        return (status);
                        break;
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_NODEID_DONE:
                        status = yield this._enableLearn_include();
                        this.unlock();
                        return (status);
                        break;
                }
            }
            this.unlock();
            return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
        });
    }
    setDefault() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x5]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ZunoSapiClassStatus.OK);
        });
    }
    getQuantumSize() {
        return (this.sapi.getQuantumSize());
    }
    lock() {
        return (this.sapi.lock());
    }
    unlock() {
        return (this.sapi.unlock());
    }
    is_busy() {
        return (this.sapi.is_busy());
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.region = new region_1.SapiRegionClass();
            yield this._get_param_info();
            yield this._get_board_info();
            // await this._begin(true);
        });
    }
    detect(baudrate, func) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.sapi.detect(baudrate, func));
        });
    }
    constructor(sapi) {
        this.KEY_UNAUTH_NAME = "unauth";
        this.KEY_AUTH_NAME = "auth";
        this.KEY_ACCESS_NAME = "access";
        this.KEY_S0_NAME = "s0";
        this.ZUNO_HEADER_PREAMBL = "ZMEZUNOC";
        this.SK_HEADER_SIZE = 0xC0;
        this.SK_HEADER_VERSION_MSB_OFFSET = 0x08;
        this.SK_HEADER_VERSION_LSB_OFFSET = 0x09;
        this.SK_HEADER_NAME_START = 56;
        this.SK_HEADER_MAX_NAME = 47;
        this.SK_HEADER_HWREW_OFFSET = this.SK_HEADER_NAME_START + this.SK_HEADER_MAX_NAME + 1;
        this.LICENSE_KEY_DUMP_S2 = 0x1;
        this.LICENSE_KEY_LONG_RANGE = 0x5;
        this.license_flags = {
            0x00: { name: "Pti", title: "Provides Packet Trace Interface (PTI) capabilities. Turns ZUno to advanced sniffer.", active: false },
            0x01: { name: "Key dump", title: "Enables Z-Wave network key dump using Z-Uno.", active: false },
            0x02: { name: "Custom vendor", title: "Use custom vendor code intead of 0115 (ZME)", active: false },
            0x03: { name: "Modem", title: "ZUno works as direct transmitter.", active: false },
            0x04: { name: "Max power", title: "User is able to use the maximum power of radio amplifier.", active: false },
            0x05: { name: "Long Range", title: "Enables Z-Wave LongRange technology support.", active: false },
        };
        this.board_info = this._get_board_info_default();
        this.param_info = this._get_param_info_default();
        this.region = new region_1.SapiRegionClass();
        this.sapi = sapi;
    }
}
exports.ZunoSapiClass = ZunoSapiClass;


/***/ }),

/***/ "./src/ui_define.ts":
/*!**************************!*\
  !*** ./src/ui_define.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NAME_APP_VERSION_FULL = exports.TABLE_NAME_LICENSE_NO = exports.TABLE_NAME_LICENSE_YES = exports.ControllerUiDefineClass = void 0;
const define_1 = __webpack_require__(/*! ./other/define */ "./src/other/define.ts");
const TABLE_NAME_LICENSE_YES = '<input disabled="disabled" checked type="checkbox">';
exports.TABLE_NAME_LICENSE_YES = TABLE_NAME_LICENSE_YES;
const TABLE_NAME_LICENSE_NO = '<input disabled="disabled" type="checkbox">';
exports.TABLE_NAME_LICENSE_NO = TABLE_NAME_LICENSE_NO;
var ControllerUiDefineClass;
(function (ControllerUiDefineClass) {
    ControllerUiDefineClass["NAME_APP"] = "SerialAPIWebTools";
    ControllerUiDefineClass["KEY_INCLUDE_EXCLUDE_TIMEOUT"] = "SerialAPIWebTools_info_include_exlude_timout";
    ControllerUiDefineClass["KEY_BAUDRATE"] = "SerialAPIWebTools_baudrate_cache";
    ControllerUiDefineClass["KEY_DETECTION_SYNC_MANUAL"] = "SerialAPIWebTools_detection_sync_manual";
    ControllerUiDefineClass["KEY_UPDATE_BETA"] = "SerialAPIWebTools_update_beta";
    ControllerUiDefineClass["STORAGE_VALUE_TRUE"] = "true";
    ControllerUiDefineClass["STORAGE_VALUE_FALSE"] = "false";
})(ControllerUiDefineClass || (exports.ControllerUiDefineClass = ControllerUiDefineClass = {}));
const NAME_APP_VERSION_FULL = ControllerUiDefineClass.NAME_APP + " " + define_1.WEB_TOOLS_VERSION;
exports.NAME_APP_VERSION_FULL = NAME_APP_VERSION_FULL;


/***/ }),

/***/ "./src/z-uno-compiler.ts":
/*!*******************************!*\
  !*** ./src/z-uno-compiler.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZUnoCompilerClass = void 0;
const qrcode_1 = __webpack_require__(/*! ./qr_code/qrcode */ "./src/qr_code/qrcode.js");
const ui_define_1 = __webpack_require__(/*! ./ui_define */ "./src/ui_define.ts");
const sapi_1 = __webpack_require__(/*! ./sapi/sapi */ "./src/sapi/sapi.ts");
const zuno_sapi_1 = __webpack_require__(/*! ./sapi/zuno_sapi */ "./src/sapi/zuno_sapi.ts");
const ui_lang_define_1 = __webpack_require__(/*! ./lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const ui_lang_1 = __webpack_require__(/*! ./lang/ui_lang */ "./src/lang/ui_lang.ts");
const utilities_1 = __webpack_require__(/*! ./other/utilities */ "./src/other/utilities.ts");
const region_1 = __webpack_require__(/*! ./sapi/region */ "./src/sapi/region.ts");
var XhrStatus;
(function (XhrStatus) {
    XhrStatus[XhrStatus["OK"] = 0] = "OK";
    XhrStatus[XhrStatus["TIMEOUT"] = 1] = "TIMEOUT";
    XhrStatus[XhrStatus["ERROR"] = 2] = "ERROR";
    XhrStatus[XhrStatus["INVALID_DATA"] = 3] = "INVALID_DATA";
})(XhrStatus || (XhrStatus = {}));
class ZUnoCompilerClass {
    _progress(severity, txt) {
        if (this.progressCbk == null)
            return;
        this.progressCbk(severity, txt);
    }
    _close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.xhr_version.abort();
            this.xhr_compile.abort();
            this.xhr_download_finware.abort();
            yield this.sapi.close();
        });
    }
    _info(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this._progress("info", txt);
    }
    _info_wait(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this._info(txt + "...");
    }
    _info_done(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this._info(txt + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_DONE));
    }
    _error(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof txt !== "string")
                txt = this.locale.getLocale(txt);
            txt = txt + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_FAILED);
            this._progress("error", txt);
            yield this._close();
            throw new Error(txt);
        });
    }
    _error_code(txt, code) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof txt !== "string")
                txt = this.locale.getLocale(txt);
            txt = txt + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_FAILED_CODE).replace('{{code}}', code.toString());
            this._progress("error", txt);
            yield this._close();
            throw new Error(txt);
        });
    }
    _get_baudrate_cache() {
        let baudrate, i;
        const baudrate_str = localStorage.getItem(ui_define_1.ControllerUiDefineClass.KEY_BAUDRATE);
        if (baudrate_str == null)
            return ([]);
        try {
            baudrate = JSON.parse(baudrate_str);
        }
        catch (error) {
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
    _set_baudrate_cache(baudrate_array, baudrate) {
        const i = baudrate_array.indexOf(baudrate);
        if (i != -1)
            baudrate_array.splice(i, 0x1);
        baudrate_array.unshift(baudrate);
        localStorage.setItem(ui_define_1.ControllerUiDefineClass.KEY_BAUDRATE, JSON.stringify(baudrate_array));
    }
    _xhr(xhr, url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                const out = { status: XhrStatus.OK, error: "", url: 'https://service.z-wave.me/z-uno-compilation-server/?' + url, data: "" };
                xhr.open("POST", out.url);
                xhr.responseType = 'json';
                xhr.timeout = 30000; //30 sec
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
        });
    }
    _xhr_common(xhr, url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._xhr(xhr, url, data);
            if (res.status == XhrStatus.OK)
                return (res);
            if (res.status == XhrStatus.TIMEOUT) {
                res.error = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_TIMEOUT).replace('{{url}}', res.url);
                return (res);
            }
            res.error = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_ERROR).replace('{{url}}', res.url);
            return (res);
        });
    }
    _xhr_build_number(hw_str) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._xhr_common(this.xhr_version, 'version', null);
            const out = { res: res, build_number: 0x0 };
            if (res.status != XhrStatus.OK)
                return (out);
            try {
                const result = res.data;
                if (result["status"] != 0x0) {
                    out.res.status = XhrStatus.INVALID_DATA;
                    out.res.error = "Get version returned incorrect status: " + result["status"] + " message: " + result["message"];
                    return (out);
                }
                const version_list = result["version"]["hw"];
                const build_number = version_list[hw_str].seq;
                if (build_number === undefined) {
                    out.res.status = XhrStatus.INVALID_DATA;
                    out.res.error = "The server does not support the specified board revision";
                    return (out);
                }
                out.build_number = build_number;
            }
            catch (error) {
                out.res.status = XhrStatus.INVALID_DATA;
                out.res.error = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_INVALID_DATA).replace('{{url}}', out.res.url);
                return (out);
            }
            return (out);
        });
    }
    _xhr_download_finware(hw_str, build_number) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'bootloader&' + 'hw=' + hw_str + "&seq=" + String(build_number);
            const res = yield this._xhr_common(this.xhr_download_finware, url, null);
            const out = { res: res, bin: new Uint8Array() };
            if (res.status != XhrStatus.OK)
                return (out);
            try {
                const result = res.data;
                if (result["status"] != 0x0) {
                    out.res.status = XhrStatus.INVALID_DATA;
                    out.res.error = "Get version returned incorrect status: " + result["status"] + " message: " + result["message"];
                    return (out);
                }
                out.bin = this._base64ToArrayBuffer(result["bin"]);
            }
            catch (error) {
                out.res.status = XhrStatus.INVALID_DATA;
                out.res.error = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_INVALID_DATA).replace('{{url}}', out.res.url);
                return (out);
            }
            return (out);
        });
    }
    _base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const bytes = new Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new Uint8Array(bytes);
    }
    _xhr_compile(hw_str, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append("sketch", new File([new Blob([code])], "sketch", { lastModified: Date.now(), type: "text/x-arduino" }));
            formData.append("referer", document.location.href);
            const url = 'compile&' + 'hw=' + hw_str;
            const res = yield this._xhr_common(this.xhr_compile, url, formData);
            const out = { res: res, bin: new Uint8Array() };
            if (res.status != XhrStatus.OK)
                return (out);
            try {
                const result = res.data;
                if (result["status"] != 0x0) {
                    out.res.status = XhrStatus.INVALID_DATA;
                    out.res.error = "Get version returned incorrect status: " + result["status"] + " message: " + result["message"];
                    return (out);
                }
                out.bin = this._base64ToArrayBuffer(result["bin"]);
            }
            catch (error) {
                out.res.status = XhrStatus.INVALID_DATA;
                out.res.error = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_INVALID_DATA).replace('{{url}}', out.res.url);
                return (out);
            }
            return (out);
        });
    }
    _sketch(code, freq, sec, main_pow) {
        return __awaiter(this, void 0, void 0, function* () {
            let hw_str, board_info, detect_dict;
            this._info(ui_define_1.NAME_APP_VERSION_FULL);
            const status = yield this.sapi.request(this.COM_PORT_FILTERS);
            if (status == sapi_1.SapiClassStatus.SERIAL_UN_SUPPORT)
                return (this._error(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER));
            if (status == sapi_1.SapiClassStatus.REQUEST_NO_SELECT)
                return (this._error(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_SELECT));
            if (status != sapi_1.SapiClassStatus.OK)
                return (this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_SELECT, status));
            this._info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION);
            const baudrate_array = this._get_baudrate_cache();
            detect_dict = yield this.sapi.detect(baudrate_array, null);
            if (detect_dict.status != sapi_1.SapiClassStatus.OK) {
                this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION, detect_dict.status);
                return;
            }
            this._set_baudrate_cache(baudrate_array, detect_dict.baudrate);
            this._info_done(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION);
            this._info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT);
            if (this.sapi.type() != sapi_1.SapiClassDetectType.ZUNO) {
                this._error(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT);
                return;
            }
            yield this.zuno.connect();
            this._info(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
            board_info = this.zuno.getBoardInfo();
            if (board_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this._error_code(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
                return;
            }
            this._info_done(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
            this._info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
            const region_info = this.zuno.getRegion();
            if (region_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
                return;
            }
            this._info_done(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
            this._info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER);
            const power = this.zuno.getPower();
            if (power.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER, power.status);
                return;
            }
            this._info_done(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER);
            this._info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_SEC);
            const sec_info = this.zuno.getSec();
            if (sec_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_SEC, sec_info.status);
                return;
            }
            this._info_done(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_SEC);
            if (freq != null && freq != region_info.region) {
                this._info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
                const set_region_status = yield this.zuno.setRegion(freq);
                if (set_region_status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                    this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION, set_region_status);
                    return;
                }
                this._info_done(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
            }
            if (main_pow < power.min || main_pow > power.max) {
                this._error("Radio power is out of range");
                return;
            }
            if (power.power_raw != main_pow) {
                this._info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER);
                const set_power_status = yield this.zuno.setPower(main_pow);
                if (set_power_status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                    this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER, set_power_status);
                    return;
                }
                this._info_done(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER);
            }
            if (sec_info.sec != sec) {
                this._info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_SEC);
                const set_power_status = yield this.zuno.setSec(sec);
                if (set_power_status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                    this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_SEC, set_power_status);
                    return;
                }
                this._info_done(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_SEC);
            }
            hw_str = board_info.hw_rev.toString(0x10);
            while (hw_str.length < 0x4)
                hw_str = '0' + hw_str;
            const promise_compile = this._xhr_compile(hw_str, code);
            this._info_wait("Checking Z-Uno version");
            const res_build_number = yield this._xhr_build_number(hw_str);
            if (res_build_number.res.status != XhrStatus.OK) {
                this._error(res_build_number.res.error);
                return;
            }
            if (board_info.build_number > res_build_number.build_number) {
                this._error("The firmware on the board is newer than on the server");
                return;
            }
            this._info_done("Checking Z-Uno version");
            if (board_info.build_number != res_build_number.build_number) {
                this._info_wait("Downloading new firmware");
                const res_download_finware = yield this._xhr_download_finware(hw_str, res_build_number.build_number);
                if (res_download_finware.res.status != XhrStatus.OK) {
                    this._error(res_download_finware.res.error);
                    return;
                }
                this._info_done("Downloading new firmware");
                this._info_wait("Uploading a new firmware to the Z-Uno");
                const status = yield this.zuno.updateFirmware(res_download_finware.bin, null, sapi_1.SapiClassDetectType.ZUNO);
                if (status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                    this._error_code("Uploading a new firmware to the Z-Uno", status);
                    return;
                }
                yield this.zuno.connect();
                this._info_done("Uploading a new firmware to the Z-Uno");
                this._info(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
                board_info = this.zuno.getBoardInfo();
                if (board_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                    this._error_code(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
                    return;
                }
                this._info_done(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
                if (res_build_number.build_number != board_info.build_number) {
                    this._error("Although the firmware was successfully updated, the actual version was no longer needed");
                    return;
                }
            }
            this._info_wait("Compiling the sketch");
            const res_compile = yield promise_compile;
            if (res_compile.res.status != XhrStatus.OK) {
                this.error_complite = true;
                this._error(res_compile.res.error);
                return;
            }
            this._info_done("Compiling the sketch");
            this._info_wait("Uploading the sketch");
            const status_upload_scetch = yield this.zuno.updateSketch(res_compile.bin, null);
            if (status_upload_scetch != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this._error_code("Uploading the sketch", status_upload_scetch);
                return;
            }
            this._info_done("Uploading the sketch");
            this._info_wait("QR code read");
            yield this._close();
            detect_dict = yield this.sapi.detect([detect_dict.baudrate], null);
            if (detect_dict.status != sapi_1.SapiClassStatus.OK) {
                this._error_code(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION, detect_dict.status);
                return;
            }
            if (this.sapi.type() != sapi_1.SapiClassDetectType.ZUNO) {
                this._error(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT);
                return;
            }
            yield this.zuno.connect();
            board_info = this.zuno.getBoardInfo();
            if (board_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this._error_code(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
                return;
            }
            yield this._close();
            this._info_done("QR code read");
            const out = { smart_qr: board_info.smart_qr, dsk: (0, utilities_1.conv2Decimal)(board_info.s2_pub, " - ") };
            return (out);
        });
    }
    _generateQrCode(id, text) {
        let obj_QRCode;
        const option = {
            text: text,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: 1 /* QRErrorCorrectLevel.L */,
        };
        try {
            obj_QRCode = new qrcode_1.QRCode(id, option);
        }
        catch (e) {
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
    drawQR(id, text) {
        return (this._generateQrCode(id, text));
    }
    cancel() {
        this._close();
    }
    errorComplite() {
        return this.error_complite;
    }
    getWait() {
        return (this.promise_wait);
    }
    /**
     *
     * @returns List freq
     */
    static getFreqList() {
        const region = new region_1.SapiRegionClass(true, true);
        return (region.getListRegion());
    }
    constructor(code, freq, sec, main_pow, cbk = null) {
        this.sapi = new sapi_1.SapiClass();
        this.zuno = new zuno_sapi_1.ZunoSapiClass(this.sapi);
        this.locale = new ui_lang_1.ControllerUiLangClass();
        this.COM_PORT_FILTERS = [{ usbVendorId: 0x10c4, usbProductId: 0xea60 }];
        this.xhr_version = new XMLHttpRequest();
        this.xhr_compile = new XMLHttpRequest();
        this.xhr_download_finware = new XMLHttpRequest();
        this.error_complite = false;
        this.progressCbk = cbk;
        this.promise_wait = this._sketch(code, freq, sec, main_pow);
    }
}
exports.ZUnoCompilerClass = ZUnoCompilerClass;


/***/ }),

/***/ "./src/qr_code/qrcode.js":
/*!*******************************!*\
  !*** ./src/qr_code/qrcode.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QRCode: () => (/* binding */ QRCode)
/* harmony export */ });
/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 * 
 * @author davidshimjs
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 */

var QRCode;

(function () {
	//---------------------------------------------------------------------
	// QRCode for JavaScript
	//
	// Copyright (c) 2009 Kazuhiko Arase
	//
	// URL: http://www.d-project.com/
	//
	// Licensed under the MIT license:
	//   http://www.opensource.org/licenses/mit-license.php
	//
	// The word "QR Code" is registered trademark of 
	// DENSO WAVE INCORPORATED
	//   http://www.denso-wave.com/qrcode/faqpatent-e.html
	//
	//---------------------------------------------------------------------
	function QR8bitByte(data) {
		this.mode = QRMode.MODE_8BIT_BYTE;
		this.data = data;
		this.parsedData = [];

		// Added to support UTF-8 Characters
		for (var i = 0, l = this.data.length; i < l; i++) {
			var byteArray = [];
			var code = this.data.charCodeAt(i);

			if (code > 0x10000) {
				byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
				byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
				byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[3] = 0x80 | (code & 0x3F);
			} else if (code > 0x800) {
				byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
				byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[2] = 0x80 | (code & 0x3F);
			} else if (code > 0x80) {
				byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
				byteArray[1] = 0x80 | (code & 0x3F);
			} else {
				byteArray[0] = code;
			}

			this.parsedData.push(byteArray);
		}

		this.parsedData = Array.prototype.concat.apply([], this.parsedData);

		if (this.parsedData.length != this.data.length) {
			this.parsedData.unshift(191);
			this.parsedData.unshift(187);
			this.parsedData.unshift(239);
		}
	}

	QR8bitByte.prototype = {
		getLength: function (buffer) {
			return this.parsedData.length;
		},
		write: function (buffer) {
			for (var i = 0, l = this.parsedData.length; i < l; i++) {
				buffer.put(this.parsedData[i], 8);
			}
		}
	};

	function QRCodeModel(typeNumber, errorCorrectLevel) {
		this.typeNumber = typeNumber;
		this.errorCorrectLevel = errorCorrectLevel;
		this.modules = null;
		this.moduleCount = 0;
		this.dataCache = null;
		this.dataList = [];
	}

	QRCodeModel.prototype={addData:function(data){var newData=new QR8bitByte(data);this.dataList.push(newData);this.dataCache=null;},isDark:function(row,col){if(row<0||this.moduleCount<=row||col<0||this.moduleCount<=col){throw new Error(row+","+col);}
	return this.modules[row][col];},getModuleCount:function(){return this.moduleCount;},make:function(){this.makeImpl(false,this.getBestMaskPattern());},makeImpl:function(test,maskPattern){this.moduleCount=this.typeNumber*4+17;this.modules=new Array(this.moduleCount);for(var row=0;row<this.moduleCount;row++){this.modules[row]=new Array(this.moduleCount);for(var col=0;col<this.moduleCount;col++){this.modules[row][col]=null;}}
	this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(test,maskPattern);if(this.typeNumber>=7){this.setupTypeNumber(test);}
	if(this.dataCache==null){this.dataCache=QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);}
	this.mapData(this.dataCache,maskPattern);},setupPositionProbePattern:function(row,col){for(var r=-1;r<=7;r++){if(row+r<=-1||this.moduleCount<=row+r)continue;for(var c=-1;c<=7;c++){if(col+c<=-1||this.moduleCount<=col+c)continue;if((0<=r&&r<=6&&(c==0||c==6))||(0<=c&&c<=6&&(r==0||r==6))||(2<=r&&r<=4&&2<=c&&c<=4)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}},getBestMaskPattern:function(){var minLostPoint=0;var pattern=0;for(var i=0;i<8;i++){this.makeImpl(true,i);var lostPoint=QRUtil.getLostPoint(this);if(i==0||minLostPoint>lostPoint){minLostPoint=lostPoint;pattern=i;}}
	return pattern;},createMovieClip:function(target_mc,instance_name,depth){var qr_mc=target_mc.createEmptyMovieClip(instance_name,depth);var cs=1;this.make();for(var row=0;row<this.modules.length;row++){var y=row*cs;for(var col=0;col<this.modules[row].length;col++){var x=col*cs;var dark=this.modules[row][col];if(dark){qr_mc.beginFill(0,100);qr_mc.moveTo(x,y);qr_mc.lineTo(x+cs,y);qr_mc.lineTo(x+cs,y+cs);qr_mc.lineTo(x,y+cs);qr_mc.endFill();}}}
	return qr_mc;},setupTimingPattern:function(){for(var r=8;r<this.moduleCount-8;r++){if(this.modules[r][6]!=null){continue;}
	this.modules[r][6]=(r%2==0);}
	for(var c=8;c<this.moduleCount-8;c++){if(this.modules[6][c]!=null){continue;}
	this.modules[6][c]=(c%2==0);}},setupPositionAdjustPattern:function(){var pos=QRUtil.getPatternPosition(this.typeNumber);for(var i=0;i<pos.length;i++){for(var j=0;j<pos.length;j++){var row=pos[i];var col=pos[j];if(this.modules[row][col]!=null){continue;}
	for(var r=-2;r<=2;r++){for(var c=-2;c<=2;c++){if(r==-2||r==2||c==-2||c==2||(r==0&&c==0)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}}}},setupTypeNumber:function(test){var bits=QRUtil.getBCHTypeNumber(this.typeNumber);for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=mod;}
	for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=mod;}},setupTypeInfo:function(test,maskPattern){var data=(this.errorCorrectLevel<<3)|maskPattern;var bits=QRUtil.getBCHTypeInfo(data);for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<6){this.modules[i][8]=mod;}else if(i<8){this.modules[i+1][8]=mod;}else{this.modules[this.moduleCount-15+i][8]=mod;}}
	for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<8){this.modules[8][this.moduleCount-i-1]=mod;}else if(i<9){this.modules[8][15-i-1+1]=mod;}else{this.modules[8][15-i-1]=mod;}}
	this.modules[this.moduleCount-8][8]=(!test);},mapData:function(data,maskPattern){var inc=-1;var row=this.moduleCount-1;var bitIndex=7;var byteIndex=0;for(var col=this.moduleCount-1;col>0;col-=2){if(col==6)col--;while(true){for(var c=0;c<2;c++){if(this.modules[row][col-c]==null){var dark=false;if(byteIndex<data.length){dark=(((data[byteIndex]>>>bitIndex)&1)==1);}
	var mask=QRUtil.getMask(maskPattern,row,col-c);if(mask){dark=!dark;}
	this.modules[row][col-c]=dark;bitIndex--;if(bitIndex==-1){byteIndex++;bitIndex=7;}}}
	row+=inc;if(row<0||this.moduleCount<=row){row-=inc;inc=-inc;break;}}}}};QRCodeModel.PAD0=0xEC;QRCodeModel.PAD1=0x11;QRCodeModel.createData=function(typeNumber,errorCorrectLevel,dataList){var rsBlocks=QRRSBlock.getRSBlocks(typeNumber,errorCorrectLevel);var buffer=new QRBitBuffer();for(var i=0;i<dataList.length;i++){var data=dataList[i];buffer.put(data.mode,4);buffer.put(data.getLength(),QRUtil.getLengthInBits(data.mode,typeNumber));data.write(buffer);}
	var totalDataCount=0;for(var i=0;i<rsBlocks.length;i++){totalDataCount+=rsBlocks[i].dataCount;}
	if(buffer.getLengthInBits()>totalDataCount*8){throw new Error("code length overflow. ("
	+buffer.getLengthInBits()
	+">"
	+totalDataCount*8
	+")");}
	if(buffer.getLengthInBits()+4<=totalDataCount*8){buffer.put(0,4);}
	while(buffer.getLengthInBits()%8!=0){buffer.putBit(false);}
	while(true){if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD0,8);if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD1,8);}
	return QRCodeModel.createBytes(buffer,rsBlocks);};QRCodeModel.createBytes=function(buffer,rsBlocks){var offset=0;var maxDcCount=0;var maxEcCount=0;var dcdata=new Array(rsBlocks.length);var ecdata=new Array(rsBlocks.length);for(var r=0;r<rsBlocks.length;r++){var dcCount=rsBlocks[r].dataCount;var ecCount=rsBlocks[r].totalCount-dcCount;maxDcCount=Math.max(maxDcCount,dcCount);maxEcCount=Math.max(maxEcCount,ecCount);dcdata[r]=new Array(dcCount);for(var i=0;i<dcdata[r].length;i++){dcdata[r][i]=0xff&buffer.buffer[i+offset];}
	offset+=dcCount;var rsPoly=QRUtil.getErrorCorrectPolynomial(ecCount);var rawPoly=new QRPolynomial(dcdata[r],rsPoly.getLength()-1);var modPoly=rawPoly.mod(rsPoly);ecdata[r]=new Array(rsPoly.getLength()-1);for(var i=0;i<ecdata[r].length;i++){var modIndex=i+modPoly.getLength()-ecdata[r].length;ecdata[r][i]=(modIndex>=0)?modPoly.get(modIndex):0;}}
	var totalCodeCount=0;for(var i=0;i<rsBlocks.length;i++){totalCodeCount+=rsBlocks[i].totalCount;}
	var data=new Array(totalCodeCount);var index=0;for(var i=0;i<maxDcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<dcdata[r].length){data[index++]=dcdata[r][i];}}}
	for(var i=0;i<maxEcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<ecdata[r].length){data[index++]=ecdata[r][i];}}}
	return data;};var QRMode={MODE_NUMBER:1<<0,MODE_ALPHA_NUM:1<<1,MODE_8BIT_BYTE:1<<2,MODE_KANJI:1<<3};var QRErrorCorrectLevel={L:1,M:0,Q:3,H:2};var QRMaskPattern={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var QRUtil={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:(1<<10)|(1<<8)|(1<<5)|(1<<4)|(1<<2)|(1<<1)|(1<<0),G18:(1<<12)|(1<<11)|(1<<10)|(1<<9)|(1<<8)|(1<<5)|(1<<2)|(1<<0),G15_MASK:(1<<14)|(1<<12)|(1<<10)|(1<<4)|(1<<1),getBCHTypeInfo:function(data){var d=data<<10;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)>=0){d^=(QRUtil.G15<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)));}
	return((data<<10)|d)^QRUtil.G15_MASK;},getBCHTypeNumber:function(data){var d=data<<12;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)>=0){d^=(QRUtil.G18<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)));}
	return(data<<12)|d;},getBCHDigit:function(data){var digit=0;while(data!=0){digit++;data>>>=1;}
	return digit;},getPatternPosition:function(typeNumber){return QRUtil.PATTERN_POSITION_TABLE[typeNumber-1];},getMask:function(maskPattern,i,j){switch(maskPattern){case QRMaskPattern.PATTERN000:return(i+j)%2==0;case QRMaskPattern.PATTERN001:return i%2==0;case QRMaskPattern.PATTERN010:return j%3==0;case QRMaskPattern.PATTERN011:return(i+j)%3==0;case QRMaskPattern.PATTERN100:return(Math.floor(i/2)+Math.floor(j/3))%2==0;case QRMaskPattern.PATTERN101:return(i*j)%2+(i*j)%3==0;case QRMaskPattern.PATTERN110:return((i*j)%2+(i*j)%3)%2==0;case QRMaskPattern.PATTERN111:return((i*j)%3+(i+j)%2)%2==0;default:throw new Error("bad maskPattern:"+maskPattern);}},getErrorCorrectPolynomial:function(errorCorrectLength){var a=new QRPolynomial([1],0);for(var i=0;i<errorCorrectLength;i++){a=a.multiply(new QRPolynomial([1,QRMath.gexp(i)],0));}
	return a;},getLengthInBits:function(mode,type){if(1<=type&&type<10){switch(mode){case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:return 8;case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:"+mode);}}else if(type<27){switch(mode){case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:"+mode);}}else if(type<41){switch(mode){case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:"+mode);}}else{throw new Error("type:"+type);}},getLostPoint:function(qrCode){var moduleCount=qrCode.getModuleCount();var lostPoint=0;for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount;col++){var sameCount=0;var dark=qrCode.isDark(row,col);for(var r=-1;r<=1;r++){if(row+r<0||moduleCount<=row+r){continue;}
	for(var c=-1;c<=1;c++){if(col+c<0||moduleCount<=col+c){continue;}
	if(r==0&&c==0){continue;}
	if(dark==qrCode.isDark(row+r,col+c)){sameCount++;}}}
	if(sameCount>5){lostPoint+=(3+sameCount-5);}}}
	for(var row=0;row<moduleCount-1;row++){for(var col=0;col<moduleCount-1;col++){var count=0;if(qrCode.isDark(row,col))count++;if(qrCode.isDark(row+1,col))count++;if(qrCode.isDark(row,col+1))count++;if(qrCode.isDark(row+1,col+1))count++;if(count==0||count==4){lostPoint+=3;}}}
	for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount-6;col++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row,col+1)&&qrCode.isDark(row,col+2)&&qrCode.isDark(row,col+3)&&qrCode.isDark(row,col+4)&&!qrCode.isDark(row,col+5)&&qrCode.isDark(row,col+6)){lostPoint+=40;}}}
	for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount-6;row++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row+1,col)&&qrCode.isDark(row+2,col)&&qrCode.isDark(row+3,col)&&qrCode.isDark(row+4,col)&&!qrCode.isDark(row+5,col)&&qrCode.isDark(row+6,col)){lostPoint+=40;}}}
	var darkCount=0;for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount;row++){if(qrCode.isDark(row,col)){darkCount++;}}}
	var ratio=Math.abs(100*darkCount/moduleCount/moduleCount-50)/5;lostPoint+=ratio*10;return lostPoint;}};var QRMath={glog:function(n){if(n<1){throw new Error("glog("+n+")");}
	return QRMath.LOG_TABLE[n];},gexp:function(n){while(n<0){n+=255;}
	while(n>=256){n-=255;}
	return QRMath.EXP_TABLE[n];},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var i=0;i<8;i++){QRMath.EXP_TABLE[i]=1<<i;}
	for(var i=8;i<256;i++){QRMath.EXP_TABLE[i]=QRMath.EXP_TABLE[i-4]^QRMath.EXP_TABLE[i-5]^QRMath.EXP_TABLE[i-6]^QRMath.EXP_TABLE[i-8];}
	for(var i=0;i<255;i++){QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]]=i;}
	function QRPolynomial(num,shift){if(num.length==undefined){throw new Error(num.length+"/"+shift);}
	var offset=0;while(offset<num.length&&num[offset]==0){offset++;}
	this.num=new Array(num.length-offset+shift);for(var i=0;i<num.length-offset;i++){this.num[i]=num[i+offset];}}
	QRPolynomial.prototype={get:function(index){return this.num[index];},getLength:function(){return this.num.length;},multiply:function(e){var num=new Array(this.getLength()+e.getLength()-1);for(var i=0;i<this.getLength();i++){for(var j=0;j<e.getLength();j++){num[i+j]^=QRMath.gexp(QRMath.glog(this.get(i))+QRMath.glog(e.get(j)));}}
	return new QRPolynomial(num,0);},mod:function(e){if(this.getLength()-e.getLength()<0){return this;}
	var ratio=QRMath.glog(this.get(0))-QRMath.glog(e.get(0));var num=new Array(this.getLength());for(var i=0;i<this.getLength();i++){num[i]=this.get(i);}
	for(var i=0;i<e.getLength();i++){num[i]^=QRMath.gexp(QRMath.glog(e.get(i))+ratio);}
	return new QRPolynomial(num,0).mod(e);}};function QRRSBlock(totalCount,dataCount){this.totalCount=totalCount;this.dataCount=dataCount;}
	QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];QRRSBlock.getRSBlocks=function(typeNumber,errorCorrectLevel){var rsBlock=QRRSBlock.getRsBlockTable(typeNumber,errorCorrectLevel);if(rsBlock==undefined){throw new Error("bad rs block @ typeNumber:"+typeNumber+"/errorCorrectLevel:"+errorCorrectLevel);}
	var length=rsBlock.length/3;var list=[];for(var i=0;i<length;i++){var count=rsBlock[i*3+0];var totalCount=rsBlock[i*3+1];var dataCount=rsBlock[i*3+2];for(var j=0;j<count;j++){list.push(new QRRSBlock(totalCount,dataCount));}}
	return list;};QRRSBlock.getRsBlockTable=function(typeNumber,errorCorrectLevel){switch(errorCorrectLevel){case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+3];default:return undefined;}};function QRBitBuffer(){this.buffer=[];this.length=0;}
	QRBitBuffer.prototype={get:function(index){var bufIndex=Math.floor(index/8);return((this.buffer[bufIndex]>>>(7-index%8))&1)==1;},put:function(num,length){for(var i=0;i<length;i++){this.putBit(((num>>>(length-i-1))&1)==1);}},getLengthInBits:function(){return this.length;},putBit:function(bit){var bufIndex=Math.floor(this.length/8);if(this.buffer.length<=bufIndex){this.buffer.push(0);}
	if(bit){this.buffer[bufIndex]|=(0x80>>>(this.length%8));}
	this.length++;}};var QRCodeLimitLength=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];
	
	function _isSupportCanvas() {
		return typeof CanvasRenderingContext2D != "undefined";
	}
	
	// android 2.x doesn't support Data-URI spec
	function _getAndroid() {
		var android = false;
		var sAgent = navigator.userAgent;
		
		if (/android/i.test(sAgent)) { // android
			android = true;
			var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
			
			if (aMat && aMat[1]) {
				android = parseFloat(aMat[1]);
			}
		}
		
		return android;
	}
	
	var svgDrawer = (function() {

		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};

		Drawing.prototype.draw = function (oQRCode) {
			var _htOption = this._htOption;
			var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);

			this.clear();

			function makeSVG(tag, attrs) {
				var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
				for (var k in attrs)
					if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
				return el;
			}

			var svg = makeSVG("svg" , {'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight});
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
			_el.appendChild(svg);

			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorLight, "width": "100%", "height": "100%"}));
			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template"}));

			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					if (oQRCode.isDark(row, col)) {
						var child = makeSVG("use", {"x": String(row), "y": String(col)});
						child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
						svg.appendChild(child);
					}
				}
			}
		};
		Drawing.prototype.clear = function () {
			while (this._el.hasChildNodes())
				this._el.removeChild(this._el.lastChild);
		};
		return Drawing;
	})();

	var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

	// Drawing in DOM by using Table tag
	var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};
			
		/**
		 * Draw the QRCode
		 * 
		 * @param {QRCode} oQRCode
		 */
		Drawing.prototype.draw = function (oQRCode) {
            var _htOption = this._htOption;
            var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);
			var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
			
			for (var row = 0; row < nCount; row++) {
				aHTML.push('<tr>');
				
				for (var col = 0; col < nCount; col++) {
					aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
				}
				
				aHTML.push('</tr>');
			}
			
			aHTML.push('</table>');
			_el.innerHTML = aHTML.join('');
			
			// Fix the margin values as real size.
			var elTable = _el.childNodes[0];
			var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
			var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
			
			if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
				elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";	
			}
		};
		
		/**
		 * Clear the QRCode
		 */
		Drawing.prototype.clear = function () {
			this._el.innerHTML = '';
		};
		
		return Drawing;
	})() : (function () { // Drawing in Canvas
		function _onMakeImage() {
			this._elImage.src = this._elCanvas.toDataURL("image/png");
			this._elImage.style.display = "block";
			this._elCanvas.style.display = "none";			
		}
		
		// Android 2.1 bug workaround
		// http://code.google.com/p/android/issues/detail?id=5141
		if (this != undefined && this._android && this._android <= 2.1) {
	    	var factor = 1 / window.devicePixelRatio;
	        var drawImage = CanvasRenderingContext2D.prototype.drawImage; 
	    	CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
	    		if (("nodeName" in image) && /img/i.test(image.nodeName)) {
		        	for (var i = arguments.length - 1; i >= 1; i--) {
		            	arguments[i] = arguments[i] * factor;
		        	}
	    		} else if (typeof dw == "undefined") {
	    			arguments[1] *= factor;
	    			arguments[2] *= factor;
	    			arguments[3] *= factor;
	    			arguments[4] *= factor;
	    		}
	    		
	        	drawImage.apply(this, arguments); 
	    	};
		}
		
		/**
		 * Check whether the user's browser supports Data URI or not
		 * 
		 * @private
		 * @param {Function} fSuccess Occurs if it supports Data URI
		 * @param {Function} fFail Occurs if it doesn't support Data URI
		 */
		function _safeSetDataURI(fSuccess, fFail) {
            var self = this;
            self._fFail = fFail;
            self._fSuccess = fSuccess;

            // Check it just once
            if (self._bSupportDataURI === null) {
                var el = document.createElement("img");
                var fOnError = function() {
                    self._bSupportDataURI = false;

                    if (self._fFail) {
                        self._fFail.call(self);
                    }
                };
                var fOnSuccess = function() {
                    self._bSupportDataURI = true;

                    if (self._fSuccess) {
                        self._fSuccess.call(self);
                    }
                };

                el.onabort = fOnError;
                el.onerror = fOnError;
                el.onload = fOnSuccess;
                el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                return;
            } else if (self._bSupportDataURI === true && self._fSuccess) {
                self._fSuccess.call(self);
            } else if (self._bSupportDataURI === false && self._fFail) {
                self._fFail.call(self);
            }
		};
		
		/**
		 * Drawing QRCode by using canvas
		 * 
		 * @constructor
		 * @param {HTMLElement} el
		 * @param {Object} htOption QRCode Options 
		 */
		var Drawing = function (el, htOption) {
    		this._bIsPainted = false;
    		this._android = _getAndroid();
		
			this._htOption = htOption;
			this._elCanvas = document.createElement("canvas");
			this._elCanvas.width = htOption.width;
			this._elCanvas.height = htOption.height;
			el.appendChild(this._elCanvas);
			this._el = el;
			this._oContext = this._elCanvas.getContext("2d");
			this._bIsPainted = false;
			this._elImage = document.createElement("img");
			this._elImage.alt = "Scan me!";
			this._elImage.style.display = "none";
			this._el.appendChild(this._elImage);
			this._bSupportDataURI = null;
		};
			
		/**
		 * Draw the QRCode
		 * 
		 * @param {QRCode} oQRCode 
		 */
		Drawing.prototype.draw = function (oQRCode) {
            var _elImage = this._elImage;
            var _oContext = this._oContext;
            var _htOption = this._htOption;
            
			var nCount = oQRCode.getModuleCount();
			var nWidth = _htOption.width / nCount;
			var nHeight = _htOption.height / nCount;
			var nRoundedWidth = Math.round(nWidth);
			var nRoundedHeight = Math.round(nHeight);

			_elImage.style.display = "none";
			this.clear();
			
			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					var bIsDark = oQRCode.isDark(row, col);
					var nLeft = col * nWidth;
					var nTop = row * nHeight;
					_oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
					_oContext.lineWidth = 1;
					_oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;					
					_oContext.fillRect(nLeft, nTop, nWidth, nHeight);
					
					// 안티 앨리어싱 방지 처리
					_oContext.strokeRect(
						Math.floor(nLeft) + 0.5,
						Math.floor(nTop) + 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
					
					_oContext.strokeRect(
						Math.ceil(nLeft) - 0.5,
						Math.ceil(nTop) - 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
				}
			}
			
			this._bIsPainted = true;
		};
			
		/**
		 * Make the image from Canvas if the browser supports Data URI.
		 */
		Drawing.prototype.makeImage = function () {
			if (this._bIsPainted) {
				_safeSetDataURI.call(this, _onMakeImage);
			}
		};
			
		/**
		 * Return whether the QRCode is painted or not
		 * 
		 * @return {Boolean}
		 */
		Drawing.prototype.isPainted = function () {
			return this._bIsPainted;
		};
		
		/**
		 * Clear the QRCode
		 */
		Drawing.prototype.clear = function () {
			this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
			this._bIsPainted = false;
		};
		
		/**
		 * @private
		 * @param {Number} nNumber
		 */
		Drawing.prototype.round = function (nNumber) {
			if (!nNumber) {
				return nNumber;
			}
			
			return Math.floor(nNumber * 1000) / 1000;
		};
		
		return Drawing;
	})();
	
	/**
	 * Get the type by string length
	 * 
	 * @private
	 * @param {String} sText
	 * @param {Number} nCorrectLevel
	 * @return {Number} type
	 */
	function _getTypeNumber(sText, nCorrectLevel) {			
		var nType = 1;
		var length = _getUTF8Length(sText);
		
		for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
			var nLimit = 0;
			
			switch (nCorrectLevel) {
				case QRErrorCorrectLevel.L :
					nLimit = QRCodeLimitLength[i][0];
					break;
				case QRErrorCorrectLevel.M :
					nLimit = QRCodeLimitLength[i][1];
					break;
				case QRErrorCorrectLevel.Q :
					nLimit = QRCodeLimitLength[i][2];
					break;
				case QRErrorCorrectLevel.H :
					nLimit = QRCodeLimitLength[i][3];
					break;
			}
			
			if (length <= nLimit) {
				break;
			} else {
				nType++;
			}
		}
		
		if (nType > QRCodeLimitLength.length) {
			throw new Error("Too long data");
		}
		
		return nType;
	}

	function _getUTF8Length(sText) {
		var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
		return replacedText.length + (replacedText.length != sText ? 3 : 0);
	}
	
	/**
	 * @class QRCode
	 * @constructor
	 * @example 
	 * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
	 *
	 * @example
	 * var oQRCode = new QRCode("test", {
	 *    text : "http://naver.com",
	 *    width : 128,
	 *    height : 128
	 * });
	 * 
	 * oQRCode.clear(); // Clear the QRCode.
	 * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
	 *
	 * @param {HTMLElement|String} el target element or 'id' attribute of element.
	 * @param {Object|String} vOption
	 * @param {String} vOption.text QRCode link data
	 * @param {Number} [vOption.width=256]
	 * @param {Number} [vOption.height=256]
	 * @param {String} [vOption.colorDark="#000000"]
	 * @param {String} [vOption.colorLight="#ffffff"]
	 * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H] 
	 */
	QRCode = function (el, vOption) {
		this._htOption = {
			width : 256, 
			height : 256,
			typeNumber : 4,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRErrorCorrectLevel.H
		};
		
		if (typeof vOption === 'string') {
			vOption	= {
				text : vOption
			};
		}
		
		// Overwrites options
		if (vOption) {
			for (var i in vOption) {
				this._htOption[i] = vOption[i];
			}
		}
		
		if (typeof el == "string") {
			el = document.getElementById(el);
		}

		if (this._htOption.useSVG) {
			Drawing = svgDrawer;
		}
		
		this._android = _getAndroid();
		this._el = el;
		this._oQRCode = null;
		this._oDrawing = new Drawing(this._el, this._htOption);
		
		if (this._htOption.text) {
			this.makeCode(this._htOption.text);	
		}
	};
	
	/**
	 * Make the QRCode
	 * 
	 * @param {String} sText link data
	 */
	QRCode.prototype.makeCode = function (sText) {
		this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
		this._oQRCode.addData(sText);
		this._oQRCode.make();
		this._el.title = sText;
		this._oDrawing.draw(this._oQRCode);			
		this.makeImage();
	};
	
	/**
	 * Make the Image from Canvas element
	 * - It occurs automatically
	 * - Android below 3 doesn't support Data-URI spec.
	 * 
	 * @private
	 */
	QRCode.prototype.makeImage = function () {
		if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
			this._oDrawing.makeImage();
		}
	};
	
	/**
	 * Clear the QRCode
	 */
	QRCode.prototype.clear = function () {
		this._oDrawing.clear();
	};
	
	/**
	 * @name QRCode.CorrectLevel
	 */
	QRCode.CorrectLevel = QRErrorCorrectLevel;
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/z-uno-compiler.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=z-uno-compiler.js.map