
export {ControllerUiLangClassId, ControllerUiLangClassList};

enum ControllerUiLangClassId
{
	MESSAGE_PORT_NOT_SELECT,
	MESSAGE_NOT_SUPPORT_BROWSER,
	MESSAGE_PORT_USE,
	MESSAGE_CONNECT,
	MESSAGE_READ_CAPABILITIES,
	MESSAGE_READ_REGION,
	MESSAGE_READ_POWER,
	MESSAGE_READ_LICENSE,
	MESSAGE_SET_LICENSE,
	MESSAGE_READ_BOARD_INFO,
	MESSAGE_SET_REGION,
	MESSAGE_SET_POWER,
	MESSAGE_SET_DEFAULT,
	MESSAGE_PLEASE_WAIT,
	MESSAGE_UPDATE_DWNLOAD_INFO,
	MESSAGE_UPDATE_DWNLOAD_FILE,
	MESSAGE_UPDATE_START_FINWARE,
	TABLE_NAME_SERIAL_API_VERSION,
	TABLE_NAME_SERIAL_API_VERSION_TITLE,
	TABLE_NAME_VENDOR,
	TABLE_NAME_VENDOR_TITLE,
	TABLE_NAME_VENDOR_ID,
	TABLE_NAME_VENDOR_ID_TITLE,
	TABLE_NAME_REGION,
	TABLE_NAME_REGION_TITLE,
	TABLE_NAME_REGION_SELECT_TITLE,
	TABLE_NAME_REGION_BUTTON,
	TABLE_NAME_REGION_BUTTON_TITLE,
	TABLE_NAME_RESET_DEFAULT,
	TABLE_NAME_RESET_DEFAULT_TITLE,
	TABLE_NAME_RESET_DEFAULT_BUTTON,
	TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE,
	TABLE_NAME_POWER,
	TABLE_NAME_POWER_TITLE,
	TABLE_NAME_POWER_SELECT_TITLE,
	TABLE_NAME_POWER_BUTTON,
	TABLE_NAME_POWER_BUTTON_TITLE,
	TABLE_NAME_UPDATE_FINWARE_BUTTON,
	TABLE_NAME_UPDATE_FINWARE_BUTTON_TITLE,
	TABLE_NAME_UPDATE_BOOTLOADER_BUTTON,
	TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE,
	TABLE_NAME_LICENSE_UUID,
	TABLE_NAME_LICENSE_UUID_TITLE,
	TABLE_NAME_LICENSE_MORE_OPTIONS,
	TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE,
	TABLE_NAME_LICENSE_SUBVENDOR_ID,
	TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE,
	TABLE_NAME_LICENSE_MAX_NODE,
	TABLE_NAME_LICENSE_MAX_NODE_TITLE,
	TABLE_NAME_LICENSE_SUPPORT,
	TABLE_NAME_LICENSE_SUPPORT_TITLE,
	TABLE_NAME_UPDATE_BETA,
	TABLE_NAME_UPDATE_BETA_SELECT_TITLE,
	TABLE_NAME_UPDATE_BETA_TITLE,
	TABLE_NAME_UPDATE_FINWARE,
	TABLE_NAME_UPDATE_FINWARE_TITLE,
	TABLE_NAME_UPDATE_FINWARE_SELECT_TITLE,
	TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE,
	TABLE_NAME_UPDATE_BOOTLOADER,
	TABLE_NAME_UPDATE_BOOTLOADER_TITLE,
	TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE,
	TABLE_NAME_UPDATE_DOWNLOAD_INFO,
	TABLE_NAME_UPDATE_DOWNLOAD_FILE,
	TABLE_NAME_UPDATE_WAIT_BUS_SERIAL,
	TABLE_NAME_UPDATE_WAIT_UPDATE,
	TABLE_NAME_DETECTION_SYNC_MANUAL,
	TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE,
	TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE,
	LOG_HEADER,
	LOG_DONE,
	LOG_FALLED,
	LOG_FALLED_CODE,
	LOG_UNSUPPORTED,
	LOG_NOT_FIND_ELEMENT,
	LOG_XHR_TIMEOUT,
	LOG_XHR_ERROR,
	LOG_XHR_INVALID_DATA,
	BUTTON_COPY_TEXT,
	BUTTON_COPY_TITLE,
	BUTTON_CLOSE_TEXT,
	BUTTON_CLOSE_TITLE,
	CONTROLER_INFO_HEADER,
	LICENSE_INFO_HEADER,
	UPDATE_INFO_HEADER,
	DEFAULT_RESET_WARNING,
	MIGRATION_INFO_HEADER,
	MIGRATION_ABOUT_HEADER,
	MIGRATION_ABOUT_HEADER_TITLE,
	MIGRATION_ABOUT_HEADER_TEXT_HTML,
	MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5,
	MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT,
	MIGRATION_PROCESS_HEADER,
	MIGRATION_PROCESS_HEADER_TITLE,
	MIGRATION_PROCESS_BUTTON_START,
	MIGRATION_PROCESS_BUTTON_START_TITLE,
	MIGRATION_PROCESS_BUTTON_START_WARNING,
	MIGRATION_TEST_INCLUDE,
	MESSAGE_READ_HOME_ID,
	MIGRATION_UNKNOWN_ERROR,
	MIGRATION_GOOD_RESULT,
	MIGRATION_ACTION_STOP,
	MIGRATION_ACTION_CONTINUE,
	MIGRATION_ACTION_STOP_TITLE,
	MIGRATION_ACTION_CONTINUE_TITLE,
	MIGRATION_QUESTION_EXCLUDE,
	MIGRATION_STOP_RESULT,
	MESSAGE_READ_INIT_DATA,
	MESSAGE_START_EXLUDING,
	SECONDS,
	MIGRATION_WAIT_EXCLUDE_START_MASTER,
	MESSAGE_CLEAR_NODE,
	MESSAGE_START_INCLUDE,
	MIGRATION_QUESTION_INCLUDE,
	MIGRATION_WAIT_INCLUDE_START_MASTER,
	MIGRATION_FINALIZE,
	MESSAGE_SET_HOME_ID,
	MESSAGE_REMOVE_NODE,
	MESSAGE_SOFT_RESET,
	MESSAGE_NOP,
	MESSAGE_PORT_SELECT,
	DETECTION_INFO_HEADER,
	DETECTION_PROCESS_HEADER,
	DETECTION_PROCESS_HEADER_TITLE,
	DETECTION_PROCESS,
	DETECTION_PROCESS_STOP,
	DETECTION_PROCESS_CONTINUE,
	DETECTION_PROCESS_STOP_TITLE,
	DETECTION_PROCESS_CONTINUE_TITLE,
	DETECTION_PROCESS_QUEST_SYNC,
	DETECTION_PROCESS_BUTTON_RE_SYNC,
	DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE,
}

type ControllerUiLangClassList =
{
	[key in ControllerUiLangClassId]:string;
}
