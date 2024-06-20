export {ControllerUiDefineClass, ControllerUiDefineClassReBeginFunc};

interface ControllerUiDefineClassReBeginFunc {
	(detection:boolean): Promise<void>
}


enum ControllerUiDefineClass
{
	NAME_APP = "SerialAPIWebTools"
}