import { TuyaContext } from '@tuya/tuya-connector-nodejs';

class _Tuya{
    private region: string
    private key: string
    private secret: string
    private user: string 
    private api: TuyaContext

    private possible_region: Array <string> = ['us','eu','cn','in']

    constructor(_region: string, _key: string, _secret: string){
        if (this.possible_region.indexOf(_region) < 0){
            throw new Error("wrong region paramenter, possible parameters are: ['us','eu','cn','in']");
        }
        this.api = new TuyaContext({
            baseUrl: `https://openapi.tuya${_region}.com`,
            accessKey: _key,
            secretKey: _secret
        });
        this.region = _region;
        this.key = _key;
        this.secret = _secret;
    }
    getApi(){
        return this.api;
    }

    async setUser(_devID:string){
        let result = await this.api.request({
            method: 'GET',
            path: `/v1.0/devices/${_devID}`
        });
        
        if (!result.success) {
            throw new Error(`${result.code}: ${result.msg}`);
        }
        else{
            this.user = (result.result as any).uid;
            return result.success; 
        }
    }
    async getDevices(){
        if(this.user == undefined){
            throw new Error("user was undefined, please set it with setUser(_devID)");
        }
        let result = await this.api.request({
            method: 'GET',
            path: `/v1.0/users/${this.user}/devices`
        });
        
        if (!result.success) {
            throw new Error(`${result.code}: ${result.msg}`);
        }
        else{
            return result; 
        }
    }
}



class Device {
    id: string
    api: _Tuya

    constructor(_id:string, _api:_Tuya){
        this.api = _api;
        this.id = _id;    
    }
    async getData(){
        let result = await this.api.getApi().request({
            method: 'GET',
            path: `/v1.0/devices/${this.id}`
        });
        
        if (!result.success) {
            throw new Error(`${result.code}: ${result.msg}`);
        }
        else{
            return result; 
        }
    }

    async deviceFunctions(){
        let result = await this.api.getApi().request({
            method: 'GET',
            path: `/v1.0/devices/${this.id}/specifications`
        });
        
        if (!result.success) {
            throw new Error(`${result.code}: ${result.msg}`);
        }
        else{
            return (result.result as any).functions; 
        }
    }

    async control(_toSet:{}[]){
        
        let result = await this.api.getApi().request({
            method: 'POST',
            path: `/v1.0/devices/bff89e2b5a8e1516d6l89a/commands`,
            body:{
              commands: _toSet
            }
          });

        if (!result.success) {
            throw new Error(`${result.code}: ${result.msg}`);
        }
        else{
            return result; 
        }
    }

}

export {_Tuya, Device}