import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogConfig, NbDialogRef, NbDialogService, NbTabComponent } from '@nebular/theme';
import { ExtraModel } from 'src/app/models/extra.model';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ExtraManagerService } from 'src/app/services/extra-manager.service';
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
  public extras:Array<ExtraModel> = [];
  public addedService:ServiceModel = new ServiceModel("",0,0);
  public editedService:ServiceModel = new ServiceModel("",0,0);
  public editedExtra:ExtraModel = new ExtraModel();
  public addedExtra = new ExtraModel();
  public actions:Array<RowAction<ServiceModel>> = [];
  public extraActions: Array<RowAction<ExtraModel>> = [];
  public openedDialog:NbDialogRef<any>;
  public excludedColumns:string[] = ["imageFile","imageUrl","extraIds"];
  public tabData = [
    {tabTitle:"Services"},
    {tabTitle:"Extras"}
  ];

  editDialog:NbDialogRef<any>;
  @ViewChild("editServiceTemplate") public editServiceTemplate:TemplateRef<any>;
  @ViewChild("editExtraTemplate") public editExtraTemplate:TemplateRef<any>;
  constructor(
    private _dialogService:NbDialogService,
    private _configService:ConfigurationService,
    private _serviceManagerService:ServiceManagerService,
    private _extraManagerService:ExtraManagerService
    ) {
      
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.actions = [
      {icon:"edit-outline",rowclick:this.editService ,popupTrigger:true,popupContent:this.editServiceTemplate,text:""},
      {icon:"trash-outline",rowclick:this.deleteService,text:""}
    ];

    this.extraActions = [
      {icon:"edit-outline",rowclick:this.editExtra ,popupTrigger:true,popupContent:this.editExtraTemplate,text:""},
      {icon:"trash-outline",rowclick:this.deleteExtra,text:""}
    ];
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

  editExtra = (extraModel:ExtraModel,dialogRef:NbDialogRef<any>)=>{
      this.editedExtra = extraModel;
      this.editDialog = dialogRef;
  }

  submitExtraEditions = (extra:ExtraModel)=>{
    this._configService.showSpinner();
    this._extraManagerService.updateExtra(extra)
    .then(updatedExtra=>{
      if(updatedExtra.extraId>0){
        alert("Updated");
      }

      this.extras = this.extras.map(ex=>ex.extraId===updatedExtra.extraId?updatedExtra:ex);
    }).finally(()=>{
      this._configService.hideSpinner();
      if(this.editDialog){
        this.editDialog.close();
      }
    });
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
      this._configService.showSpinner();
      this._serviceManagerService.deleteService(serviceModel.serviceId)
      .then(deletedService=>{
        if(deletedService.serviceId>0)
        {
          this.services = this.services.filter(sv=>sv.serviceId!==deletedService.serviceId);
          alert("Deleted");
        }
      }).finally(()=>{
        this._configService.hideSpinner();
      })
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
tabChanged(tabComponent:NbTabComponent){
      switch(tabComponent.tabTitle){
        case "Services":
          //fetch services
          this._configService.showSpinner();
          this._serviceManagerService.getServices(1,10)
          .then(services=>{
            this.services = services;
          }).finally(()=>this._configService.hideSpinner())
        break;
        case "Extras":
          //fetch extras
          this._configService.showSpinner();
          this._extraManagerService.getAllExtras()
          .then(extras=>{
            this.extras =extras;
          }).finally(()=>this._configService.hideSpinner());
        break;
      }
  }

  addExtra=(extra:ExtraModel)=>{
    this._configService.showSpinner();
    this._extraManagerService.addExtra(extra)
    .then(addedExtra=>{
      if(addedExtra.extraId>0){
        this.extras = [addedExtra].concat(this.extras);
      }

      this.openedDialog.close();
    }).finally(()=>this._configService.hideSpinner());
  }

  deleteExtra = (extra:ExtraModel)=>
  {
    this._configService.showSpinner();
    this._extraManagerService.deleteExtra(extra.extraId)
    .then(deletedExtra=>{
        if(deletedExtra.extraId>0)
        {
          this.extras = this.extras.filter(ex=>ex.extraId!==deletedExtra.extraId);
        }
        alert("Deleted!");
    }).finally(()=>this._configService.hideSpinner());
  }
}
