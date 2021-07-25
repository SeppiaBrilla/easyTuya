The _tuya class implements the standard Api needed for all the operations, the only parameters needed are the key, secret key and region from the tuya cloud project you are implementing 

The Device class provides some easy to use function to interact with a device. The only parameters needed are the device id and a _tuya Api.
getData() return all the Device informations 
deviceFunctions() return all the possible functions of the device
control(obj) set the values specified on the obj object.
the obj object is formatted as: 
obj = { 
	"code": name of the value to change,
	"value": value to set
}  
