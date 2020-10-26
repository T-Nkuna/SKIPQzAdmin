import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduledServiceProvider } from '../models/scheduled-service-provider.model';
import { ServiceProviderModel } from '../models/service-provider.model';
import { ConfigurationService } from './configuration.service';
import { JournalingService } from './journaling.service';

@Injectable()
export class ServiceProviderService extends JournalingService{

  private _serviceUrl="";
  constructor(private _httpClient:HttpClient,private _config:ConfigurationService) { 
      super();
     this._serviceUrl = `${_config.serviceHost}/api/serviceprovider`;
  }

  addServiceProvider(serviceProvider:ServiceProviderModel){
    let formData = this.toForm(serviceProvider);
      return this._httpClient.post<ServiceProviderModel>(
        `${this._serviceUrl}`,
         formData
      ).toPromise()
      .catch(err=>this.reportError(err,new ServiceProviderModel()));
  }

  deleteServiceProvider(serviceProviderId:number){
    return this._httpClient.delete<ServiceProviderModel>(
      `${this._serviceUrl}/${serviceProviderId}`
    ).toPromise()
    .catch(err=>this.reportError(err,new ServiceProviderModel()));
  }

  updateServiceProvider(serviceProvider:ScheduledServiceProvider){
     return this._httpClient.put<ScheduledServiceProvider>(
       `${this._serviceUrl}`,
       this.toForm(serviceProvider)
     ).toPromise()
     .catch(err=>this.reportError(err,new ScheduledServiceProvider(new ServiceProviderModel(),[])));
  }

  getServiceProviders(pageNumber:number,pageSize:number)
  {
    return this._httpClient.get<ServiceProviderModel[]>(
      `${this._serviceUrl}?pageIndex=${pageNumber-1}&pageSize=${pageSize}`
    ).toPromise()
    .catch(err=>this.reportError(err,new Array<ServiceProviderModel>()));
  }

  getAllServiceProvders(){
    return this.getServiceProviders(1,1000);
  }
}
