import { TemplateRef, ViewChild } from '@angular/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceModel } from 'src/app/models/service.model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ServiceProviderService } from 'src/app/services/service-provider.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {

  @Input() service:ServiceModel = new ServiceModel("",0,0);
  @Output() serviceSubmit = new EventEmitter<ServiceModel>();
  @ViewChild("serviceForm") serviceForm:ElementRef;
  selectedServiceProvidersIds:string[] = [];
  imageFile;
  constructor(private _serviceProviderService:ServiceProviderService,private _configService:ConfigurationService) { }

  ngOnInit(): void {
      /*this._configService.showSpinner();
      this._serviceProviderService.getAllServiceProvders()
      .then(sProviders=>{
        this.service.serviceProviders = sProviders;
      }).finally(()=>{
        this._configService.hideSpinner();
      })*/
  }

  onSubmit()
  {
    let selectedFiles = this.serviceForm.nativeElement.querySelector("input[name='imageFile']").files;
   // this.service.serviceProviders = this.service.serviceProviders.filter(sp=>this.selectedServiceProvidersIds.indexOf(sp.serviceProviderId.toString())>=0);
    this.service.imageFile = selectedFiles.length>0?selectedFiles.item(0):null;
    this.serviceSubmit.emit(this.service);
  }

}
