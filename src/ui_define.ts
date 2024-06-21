export {ControllerUiDefineClass, ControllerUiDefineClassReBeginFunc, LICENSE_MORE_OPTIONS_LINK, LICENSE_SERVISE_LINK, TABLE_NAME_LICENSE_YES, TABLE_NAME_LICENSE_NO};

interface ControllerUiDefineClassReBeginFunc {
	(detection:boolean): Promise<void>
}


const LICENSE_MORE_OPTIONS_LINK:string = "https://z-wave.me/hardware-capabilities/?uuid=";
const LICENSE_SERVISE_LINK:string = "https://service.z-wave.me/hardware/capabilities/?uuid=";
const TABLE_NAME_LICENSE_YES:string = '<input disabled="disabled" checked type="checkbox">';
const TABLE_NAME_LICENSE_NO:string = '<input disabled="disabled" type="checkbox">';

enum ControllerUiDefineClass
{
	NAME_APP = "SerialAPIWebTools",

}