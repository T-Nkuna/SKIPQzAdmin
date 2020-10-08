import { ServiceProviderModel } from './service-provider.model';

export class ServiceModel{
    public name:String;
    public duration:number;
    public cost:number;
    public serviceProviders:Array<ServiceProviderModel>;
    public serviceId:number = -1;
    constructor(name:string,duration:number,cost:number,serviceProviders:Array<ServiceProviderModel>=[])
    {
        this.name =name;
        this.duration = duration;
        this.cost =cost;
        this.serviceProviders = serviceProviders;
    }
}