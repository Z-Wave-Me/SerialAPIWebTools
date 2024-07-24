export {ControllerUiDefineClass, ControllerUiDefineClassReBeginFunc, TABLE_NAME_LICENSE_YES, TABLE_NAME_LICENSE_NO};

type ControllerUiDefineClassReBeginFunc = (detection:boolean) => Promise<void>;

const TABLE_NAME_LICENSE_YES:string = '<input disabled="disabled" checked type="checkbox">';
const TABLE_NAME_LICENSE_NO:string = '<input disabled="disabled" type="checkbox">';

enum ControllerUiDefineClass
{
	NAME_APP = "SerialAPIWebTools",
	NAME_APP_VERSION_FULL = NAME_APP + " 0.0.7",
	KEY_INCLUDE_EXLUDE_TIMOUT = NAME_APP + '_info_include_exlude_timout',
	KEY_BAUDRATE = ControllerUiDefineClass.NAME_APP + '_baudrate_cache',
	KEY_DETECTION_SYNC_MANUAL = ControllerUiDefineClass.NAME_APP + '_detection_sync_manual',
	KEY_UPDATE_BETA = ControllerUiDefineClass.NAME_APP + '_update_beta',
	STORAGE_VALUE_TRUE = 'true',
	STORAGE_VALUE_FALSE = 'false',
}