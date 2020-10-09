import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

 
  private _env = "Dev";
  public busy =false;
  constructor() { }

  public get serviceHost(){
    return this._env==="Dev"?"https://localhost:44384":"https://skipqzapi.etiocs.co.za";
  }

  public  showSpinner(){
      this.busy = true;
  }

  public  hideSpinner()
  {
     this.busy = false;
  }

  
}
