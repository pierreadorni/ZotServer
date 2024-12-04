import EndpointInterface from '../types/EndpointInterface';


export default class Ping implements EndpointInterface {
    supportedMethods = ['GET'];

    public async init(request: any) {

        return [200, 'text/plain', "ZotServer is running !"];
    }
}
