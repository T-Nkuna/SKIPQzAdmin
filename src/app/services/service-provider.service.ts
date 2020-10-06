import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProviderModel } from '../models/service-provider.model';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ServiceProviderService {

  private _serviceUrl="";
  constructor(private _httpClient:HttpClient,private _config:ConfigurationService) { 
     this._serviceUrl = `${_config.serviceHost}/api/serviceprovider`;
  }

  reportError<T>(err:any,errorReturnVal:T){
    alert("Unkown Error!");
    return errorReturnVal;
  }
  addServiceProvider(serviceProvider:ServiceProviderModel){
      return this._httpClient.post<ServiceProviderModel>(
        `${this._serviceUrl}`,
        serviceProvider
      ).toPromise()
      .catch(err=>this.reportError(err,new ServiceProviderModel()));
  }

  deleteServiceProvider(serviceProviderId:number){
    return this._httpClient.delete<ServiceProviderModel>(
      `${this._serviceUrl}/${serviceProviderId}`
    ).toPromise()
    .catch(err=>this.reportError(err,new ServiceProviderModel()));
  }

  updateServiceProvider(serviceProvider:ServiceProviderModel){
     return this._httpClient.put<ServiceProviderModel>(
       `${this._serviceUrl}/${serviceProvider.serviceProviderId}`,
       serviceProvider
     ).toPromise()
     .catch(err=>this.reportError(err,new ServiceProviderModel));
  }

  getServiceProviders(pageNumber:number,pageSize:number)
  {
    return this._httpClient.get<ServiceProviderModel[]>(
      `${this._serviceUrl}?pageIndex=${pageNumber-1}&pageSize=${pageSize}`
    ).toPromise()
    .catch(err=>this.reportError(err,new Array<ServiceProviderModel>()));
  }
}
