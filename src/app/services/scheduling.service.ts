import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { JournalingService } from './journaling.service';

@Injectable()
export class SchedulingService extends JournalingService{

  public serviceUrl = "";
  constructor(private _configService:ConfigurationService,private _httpClient:HttpClient){ 
    super();
    this.serviceUrl = `${this._configService.serviceHost}/api/home`;
  }

  public getTimeSlots(){
      return this._httpClient.get<string[]>(this.serviceUrl)
      .toPromise()
      .catch(err=>this.reportError<Array<string>>(err,new Array<string>()))
  }

}
