import { Component, OnInit } from '@angular/core';
import { NbTabComponent } from '@nebular/theme';
import { TableComponent } from '../table/table.component';
import {ServiceProviderModel} from "../../models/service-provider.model"

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.css']
})
export class ServiceProvidersComponent implements OnInit {
  
   public tabTitles = {
    ServiceProviders:"Service Providers", 
    DailyWorkingHours:"Daily Working Hours",
    BusinessClosedDates:"Business Closed Dates"
  };
  public tabData:{tabTitle:string}[];

  public serviceProviderData:ServiceProviderModel = new ServiceProviderModel();
  constructor() {
   this.tabData = [
      {tabTitle:this.tabTitles.ServiceProviders},
      {tabTitle:this.tabTitles.DailyWorkingHours},
      {tabTitle:this.tabTitles.BusinessClosedDates}
    ];
   }

  ngOnInit(): void {
  }

  tabChanged(tabComponent:NbTabComponent){
      switch(tabComponent.tabTitle){
        case this.tabTitles.ServiceProviders:
          //fetch service providers
        break;
        case this.tabTitles.DailyWorkingHours:
          //fetch daily workgin hours for service providers
          break;
        case this.tabTitles.BusinessClosedDates:

          break;
      }
  }

  serviceProviderKeys(){
    return Object.keys(this.serviceProviderData);
  }

  serviceProviderFormSubmit(){}

}


