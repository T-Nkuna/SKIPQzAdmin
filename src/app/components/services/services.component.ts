import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogConfig, NbDialogRef, NbDialogService } from '@nebular/theme';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ServiceManagerService } from 'src/app/services/service-manager.service';
import {ServiceModel} from "../../models/service.model";
import { RowAction } from '../table/table.component';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit,AfterViewInit {

  public services:Array<ServiceModel> = [];
  public addedService:ServiceModel = new ServiceModel("",0,0);
  public editedService:ServiceModel = new ServiceModel("",0,0);
  public actions:Array<RowAction<ServiceModel>> = [];
  public openedDialog:NbDialogRef<any>;
  public excludedColumns:string[] = ["imageFile","imageUrl"];
  editDialog:NbDialogRef<any>;
  @ViewChild("editServiceTemplate") public editServiceTemplate:TemplateRef<any>;
  constructor(private _dialogService:NbDialogService,private _configService:ConfigurationService,private _serviceManagerService:ServiceManagerService) {
      
   }

  ngOnInit(): void {
    this._configService.showSpinner();
    this._serviceManagerService.getServices(1,10)
    .then(services=>{
      this.services = services;
    }).finally(()=>this._configService.hideSpinner())
  }

  ngAfterViewInit(){
    this.actions = [
      {icon:"edit-outline",rowclick:this.editService ,popupTrigger:true,popupContent:this.editServiceTemplate,text:""}
    ]
  }

  editService = (serviceModel:ServiceModel,dialogRef:NbDialogRef<any>)=>
  {
    this.editedService =serviceModel;
    this.editDialog = dialogRef;
     /* this._configServ
     thiice.showSpinner();
      this._serviceManagerService.updateService(serviceModel)
      .then(updatedService=>{
        console.log(updatedService);
        alert("Updated");
      }).finally(()=>this._configService.hideSpinner())*/
  }

  submitServiceEditions = (service:ServiceModel)=>{

     this._configService.showSpinner();
      this._serviceManagerService.updateService(service)
      .then(updatedService=>{
        this.services = this.services.map(sv=>sv.serviceId===updatedService.serviceId?updatedService:sv);
        if(updatedService.serviceId>0){
            alert("Updated");
        }
      }).finally(()=>{
        this._configService.hideSpinner();
        if(this.editDialog)
        {
          this.editDialog.close();
        }
      })
  }

  deleteService = (serviceModel:ServiceModel)=>
  {

  }

  addService = (serviceModel:ServiceModel)=>{
    this._configService.showSpinner();
    serviceModel.cost = parseFloat(serviceModel.cost.toString());
    serviceModel.duration = parseFloat(serviceModel.duration.toString());
    serviceModel.serviceId = undefined;
    this._serviceManagerService.addService(serviceModel)
    .then(newService=>{
       if(newService.serviceId && newService.serviceId!==-1){
         this.services= [newService].concat(this.services);
       }
       this.openedDialog.close();
    }).finally(()=>{
      this._configService.hideSpinner();
    })
  }

  addServiceProviders= (serviceModel:ServiceModel,serviceProviders:ServiceProviderModel[])=>
  {

  }

  open(templateEle:TemplateRef<any>)
  {
   this.openedDialog= this._dialogService.open(templateEle);
  }

}
