export {ControllerUiDefineClass, TABLE_NAME_LICENSE_YES, TABLE_NAME_LICENSE_NO, NAME_APP_VERSION_FULL};

const TABLE_NAME_LICENSE_YES:string = '<input disabled="disabled" checked type="checkbox">';
const TABLE_NAME_LICENSE_NO:string = '<input disabled="disabled" type="checkbox">';

declare const WEB_TOOLS_VERSION : string;


enum ControllerUiDefineClass
{
	NAME_APP = "SerialAPIWebTools",
	KEY_INCLUDE_EXCLUDE_TIMEOUT = NAME_APP + '_info_include_exlude_timout',
	KEY_BAUDRATE = ControllerUiDefineClass.NAME_APP + '_baudrate_cache',
	KEY_DETECTION_SYNC_MANUAL = ControllerUiDefineClass.NAME_APP + '_detection_sync_manual',
	KEY_UPDATE_BETA = ControllerUiDefineClass.NAME_APP + '_update_beta',
	STORAGE_VALUE_TRUE = 'true',
	STORAGE_VALUE_FALSE = 'false',
}

const NAME_APP_VERSION_FULL:string = ControllerUiDefineClass.NAME_APP + " " + WEB_TOOLS_VERSION;