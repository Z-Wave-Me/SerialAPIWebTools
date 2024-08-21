
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
	MESSAGE_UPDATE_DOWNLOAD_INFO,
	MESSAGE_UPDATE_DOWNLOAD_FILE,
	MESSAGE_UPDATE_START_FIRMWARE,
	MESSAGE_UPDATE_START_BOOTLOADER,
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
	TABLE_NAME_UPDATE_FIRMWARE_BUTTON,
	TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE,
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
	TABLE_NAME_UPDATE_FIRMWARE,
	TABLE_NAME_UPDATE_FIRMWARE_TITLE,
	TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE,
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
	LOG_FAILED,
	LOG_FAILED_CODE,
	LOG_UNSUPPORTED,
	LOG_NOT_FIND_ELEMENT,
	LOG_XHR_TIMEOUT,
	LOG_XHR_ERROR,
	LOG_XHR_INVALID_DATA,
	BUTTON_COPY_TEXT,
	BUTTON_COPY_TITLE,
	BUTTON_CLOSE_TEXT,
	BUTTON_CLOSE_TITLE,
	BUTTON_COPY_DSK,
	BUTTON_COPY_DSK_TITLE,
	BOARD_INFO_HEADER,
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
	MESSAGE_START_EXCLUDING,
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
	SLAVE_MESSAGE_READ_BOARD_INFO,
	TABLE_NAME_VERSION,
	TABLE_NAME_VERSION_TITLE,
	TABLE_NAME_BUILD_TIME_STAMP,
	TABLE_NAME_BUILD_TIME_STAMP_TITLE,
	TABLE_NAME_UUID,
	TABLE_NAME_UUID_TITLE,
	TABLE_NAME_HOME,
	TABLE_NAME_HOME_TITLE,
	TABLE_NAME_NODE,
	TABLE_NAME_NODE_TITLE,
	TABLE_NAME_DSK,
	TABLE_NAME_DSK_TITLE,
	TABLE_NAME_QR_CODE,
	TABLE_NAME_QR_CODE_TITLE,
	SLAVE_MESSAGE_FREEZE_ERROR,
	SLAVE_DEFAULT_RESET_WARNING,
	TABLE_NAME_TYPE,
	TABLE_NAME_TYPE_TITLE,
	TABLE_NAME_TYPE_CONTROLER,
	TABLE_NAME_TYPE_SLAVE,
	ERROR_ARGUMENT_FOR_UPDATE_SELECT,
	ERROR_ARGUMENT_FIND_TYPE,
	TABLE_NAME_INCLUDE_EXCLUDE,
	TABLE_NAME_INCLUDE_EXCLUDE_TITLE,
	TABLE_NAME_INCLUDE_EXCLUDE_BUTTON,
	TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE,
	INCLUDE_EXCLUDE_WAIT,
	MESSAGE_ENABLE_NIF_DEFAULT,
	MESSAGE_ENABLE_EVENT_FOR_LEARN,
	MESSAGE_START_LEARN,
	MESSAGE_LEARN_INFO_TIMEOUT,
	MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART,
	MESSAGE_LEARN_INFO_INCLUDE_RESTART,
	MESSAGE_LEARN_INFO_EXCLUDE_RESTART,
	LEARN_PROCESS_CONTINUE,
	LEARN_PROCESS_CONTINUE_TITLE,
	LEARN_PROCESS_STOP,
	LEARN_PROCESS_STOP_TITLE,
	LEARN_PROCESS_REPEAT,
	LEARN_PROCESS_REPEAT_TITLE,
	LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE,
	LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE_TITLE,
	MIGRATION_NOT_GET_URL_INFO,
	MIGRATION_NOT_UPDATE,
	MIGRATION_LAST_UPDATE_DETECT,
	MIGRATION_FAILED_UPDATE_TYPE,
	MIGRATION_FAILED_UPDATE_VERSION,
	MIGRATION_FAILED_CHANGE_REGION,
	MIGRATION_NOT_SUPPORT_INCLUDE_EXCLUDE,
	LEARN_PROCESS_QUEST_EXCLUDE,
	LEARN_PROCESS_QUEST_EXCLUDE_TITLE,
	MIGRATION_LEARN_INFO_EXCLUDE_INCLUDE,
	MIGRATION_FAILED_DETECT,
	MIGRATION_PROCESS_QUEST_INCLUDE,
	MIGRATION_PROCESS_QUEST_INCLUDE_TITLE,
	MIGRATION_NOT_SUPPORT_DUMP_KEY,
	MESSAGE_READ_S2_KEY,
	MIGRATION_NOT_AVIABLE_FIRMWARE,
	MIGRATION_NOT_SUPPORT_LR,
	MIGRATION_NOT_SUPPORT_BACKUP,
	MIGRATION_FAILED_SEE_LOG,
	MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER,
	MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER_TITLE,
	MIGRATION_SUCESS,
	MIGRATION_QUEST_REPEATER_ALL_KEY,
	MIGRATION_QUEST_REPEATER_ALL_KEY_TITLE,
}

type ControllerUiLangClassList =
{
	[key in ControllerUiLangClassId]:string;
}
