import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ServiceModel } from '../models/service.model';
import { ConfigurationService } from './configuration.service';
import { JournalingService } from './journaling.service';

@Injectable()
export class ServiceManagerService extends JournalingService{

    public serviceUrl:string = "";
    public constructor(
        private _configurationService:ConfigurationService,
        private _httpClient:HttpClient
    ){
        super();
        this.serviceUrl = `${this._configurationService.serviceHost}/api/service`;
    }

    getServices(pageNumber:number,pageSize:number)
    {
       return this._httpClient.get<ServiceModel[]>(`${this.serviceUrl}?pageIndex=${pageNumber-1}&pageSize=${pageSize}`)
        .toPromise()
        .catch((err)=>this.reportError<ServiceModel[]>(err, new Array<ServiceModel>()));
    }

    getAllServices()
    {
       return this.getServices(1,1000);
    }

    addService(service:ServiceModel)
    {
        let formData = new FormData();
        Object.keys(service).forEach(prop=>{
            formData.append(prop,prop==="imageFile"?service[prop]:(typeof(service[prop])).toLowerCase()==="object"?JSON.stringify(service[prop]):service[prop]);
        });
        return this._httpClient.post<ServiceModel>(this.serviceUrl,formData)
            .toPromise()
            .catch((err)=>this.reportError(err,new ServiceModel("",0,0)))
    }

    deleteService(serviceId:number)
    {
        return this._httpClient.delete<ServiceModel>(`${this.serviceUrl}/${serviceId}`)
        .toPromise()
        .catch(err=>this.reportError<ServiceModel>(err,new ServiceModel("",0,0)));
    }

    updateService(service:ServiceModel)
    {
        return this._httpClient.put<ServiceModel>(
            `${this.serviceUrl}/${service.serviceId}`,
            this.toForm(service)
        )
        .toPromise()
        .catch(err=>this.reportError<ServiceModel>(err, new ServiceModel("",0,0)));
    }

    


}