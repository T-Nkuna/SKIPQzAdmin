import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExtraModel } from '../models/extra.model';
import { ConfigurationService } from './configuration.service';
import { JournalingService } from './journaling.service';

@Injectable({
  providedIn: 'root'
})
export class ExtraManagerService extends JournalingService {

  serviceUrl = "";
  constructor(private _configService:ConfigurationService,private _httpClient:HttpClient) { 
    super();
    this.serviceUrl = `${this._configService.serviceHost}/api/extra`;
  }

  public getAllExtras(){
    return this.getExtras(1,1000);
  }

  public getExtras(pageNumber:number,pageSize:number)
  {
     return this._httpClient.get<Array<ExtraModel>>(`${this.serviceUrl}?pageIndex=${pageNumber-1}&pageSize=${pageSize}`)
      .toPromise()
      .catch(err=>this.reportError(err,new Array<ExtraModel>()));
  }

  public deleteExtra(extraId:number)
  {
    return this._httpClient.post<ExtraModel>(`${this.serviceUrl}/${extraId}`,{})
    .toPromise()
    .catch(err=>this.reportError(err,new ExtraModel()));
  }

  public updateExtra(extra:ExtraModel)
  {
    return this._httpClient.post<ExtraModel>(`${this.serviceUrl}/Update`,extra)
    .toPromise()
    .catch(err=>this.reportError(err,new ExtraModel()));
  }

  public addExtra(extra:ExtraModel)
  {
    return this._httpClient.post<ExtraModel>(`${this.serviceUrl}`,extra)
    .toPromise()
    .catch(err=>this.reportError(err, new ExtraModel()))
  }
}
