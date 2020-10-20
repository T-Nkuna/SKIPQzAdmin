import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { NbDialogService, NbTabComponent , NbDialogConfig, NbDialogRef} from '@nebular/theme';
import { RowAction} from '../table/table.component';
import {ServiceProviderModel} from "../../models/service-provider.model"
import {ServiceProviderService} from "../../services/service-provider.service"
import { ScheduledServiceProvider } from 'src/app/models/scheduled-service-provider.model';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.css'],
})
export class ServiceProvidersComponent implements OnInit,AfterViewInit {
  
   public tabTitles = {
    ServiceProviders:"Service Providers", 
    DailyWorkingHours:"Daily Working Hours",
    BusinessClosedDates:"Business Closed Dates"
  };
  public tabData:{tabTitle:string}[];
  public serviceProviders:Array<ServiceProviderModel> = [];
  public trackServiceProviderByProp = "serviceProviderId";
  public rowActions:RowAction<ServiceProviderModel>[] =[];
  public serviceProviderData:ServiceProviderModel =new ServiceProviderModel();
  public serviceProviderEditedData = new ServiceProviderModel();
  public openedDialog:NbDialogRef<any>;
  @Input() public excludedColumns:Array<string> = [];
  @ViewChild("editServiceProviderTemplate") editServiceProviderTemplate:TemplateRef<any>;
  constructor(
    private _serviceProviderService:ServiceProviderService,
    private _dialogService:NbDialogService,
    private _configService:ConfigurationService
    ) {
   this.tabData = [
      {tabTitle:this.tabTitles.ServiceProviders},
      {tabTitle:this.tabTitles.DailyWorkingHours},
      {tabTitle:this.tabTitles.BusinessClosedDates}
    ];

    this.excludedColumns = [(this.trackServiceProviderByProp),"services","scheduledWorkDays","imageFile"];
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.rowActions =  [
      {icon:"edit-outline",text:"Edit",rowclick:this.editServiceProvider,popupTrigger:true,popupContent:this.editServiceProviderTemplate},
      {icon:"trash-outline",text:"Delete",rowclick:this.deleteServiceProvider}
    ]
  }

  tabChanged(tabComponent:NbTabComponent){
      switch(tabComponent.tabTitle){
        case this.tabTitles.ServiceProviders:
          //fetch service providers
          this._configService.showSpinner();
          this._serviceProviderService.getServiceProviders(1,10)
          .then(response=>{
            this.serviceProviders = response;
           
          }).finally(()=>this._configService.hideSpinner())
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

  open=(template:TemplateRef<any>)=>
  {
    this.openedDialog = this._dialogService.open(template,{hasBackdrop:true});
  }
  

  serviceProviderFormSubmit= (data:ScheduledServiceProvider)=>
  {
    data.serviceProviderId = undefined;
    this._configService.showSpinner();
      this._serviceProviderService.addServiceProvider(data)
          .then(newServiceProvider=>{
            this.serviceProviders = newServiceProvider && newServiceProvider.serviceProviderId!==-1?[newServiceProvider].concat(this.serviceProviders):this.serviceProviders;
            this.serviceProviderData.name = this.serviceProviderData.email = "";
            this.openedDialog.close();
          })
          .finally(()=>this._configService.hideSpinner());
  }

  editServiceProvider = (serviceProvider:ServiceProviderModel)=>{
      this.serviceProviderEditedData = serviceProvider;
  }

  submitServiceProviderEditions= (serviceProviderEdition:ServiceProviderModel)=>
  {
    console.log(serviceProviderEdition);
  }

  deleteServiceProvider=(serviceProvider:ServiceProviderModel)=>{
      this._serviceProviderService.deleteServiceProvider(serviceProvider.serviceProviderId)
      .then(removed=>{
        if(removed && removed.serviceProviderId>0){
          this.serviceProviders = this.serviceProviders.filter(sp=>sp && sp.serviceProviderId!==removed.serviceProviderId);
        }
      })
  }

}


