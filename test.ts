import { _Tuya, Device } from "./easyTuya";
import * as dotenv from "dotenv";
dotenv.config();

let dev1 = process.env.DEV1;
let dev2 = process.env.DEV2;
let region = process.env.REG;
let key = process.env.KEY;
let secret = process.env.SECRET;

async function testApiAndDevices(d1:string, d2:string, reg:string, k:string, sec:string){
    let api = new _Tuya(reg, k, sec);
    console.log(await api.setUser(d1)); 
    let dev1 = new Device(d1, api);
    let dev2 = new Device(d2, api);
    console.log("device1; ",(await dev1.getData()).result);
    console.log("device2: ",(await dev2.getData()).result);
    console.log("user devices:", await api.getDevices());
    let functions = await dev1.deviceFunctions();
    let name = functions[0].code;
    let data = [{
        "code" : name,
        "value" : true
    }]
    console.log(data)
    console.log(await dev1.control(data))
}

testApiAndDevices(dev1 as string,dev2 as string,region as string,key as string,secret as string);
