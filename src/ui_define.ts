export {ControllerUiDefineClass, ControllerUiDefineClassReBeginFunc, TABLE_NAME_LICENSE_YES, TABLE_NAME_LICENSE_NO};

interface ControllerUiDefineClassReBeginFunc {
	(detection:boolean): Promise<void>
}

const TABLE_NAME_LICENSE_YES:string = '<input disabled="disabled" checked type="checkbox">';
const TABLE_NAME_LICENSE_NO:string = '<input disabled="disabled" type="checkbox">';

enum ControllerUiDefineClass
{
	NAME_APP = "SerialAPIWebTools",
	NAME_APP_VERSION_FULL =  NAME_APP + " 0.0.5",

}