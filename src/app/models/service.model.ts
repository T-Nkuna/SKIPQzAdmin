import { ServiceProviderModel } from './service-provider.model';

export class ServiceModel{
    public name:String;
    public duration:number;
    public cost:number;
    public serviceProviders:Array<ServiceProviderModel>;
    public serviceId:number = -1;
    public imageFile:File = null;
    public imageUrl:string="";
    public extraIds:Array<number> = [];
    constructor(name:string,duration:number,cost:number,serviceProviders:Array<ServiceProviderModel>=[],imageFile:File=null,imageUrl:string="")
    {
        this.name =name;
        this.duration = duration;
        this.cost =cost;
        this.serviceProviders = serviceProviders;
        this.imageFile = imageFile;
        this.imageUrl = imageUrl;
    }
}