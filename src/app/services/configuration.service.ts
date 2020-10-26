import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

 
  private _env = "dev";
  public busy =false;
  constructor() { }

  public get serviceHost(){
    return this._env==="dev"?"https://localhost:44384":"https://skipqzapi.etiocs.co.za";
  }

  public  showSpinner(){
      this.busy = true;
  }

  public  hideSpinner()
  {
     this.busy = false;
  }

  
}
