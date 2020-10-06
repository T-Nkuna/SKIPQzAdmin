import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

 
  private _env = "Dev";
  public showSpinner =false;
  constructor() { }

  public get serviceHost(){
    return this._env==="Dev"?"https://localhost:44384":"";
  }

  
}
