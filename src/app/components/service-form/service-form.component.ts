import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  selectedServiceProvidersIds:number[] = [];
  constructor(private _serviceProviderService:ServiceProviderService,private _configService:ConfigurationService) { }

  ngOnInit(): void {
      this._configService.showSpinner();
      this._serviceProviderService.getAllServiceProvders()
      .then(sProviders=>{
        this.service.serviceProviders = sProviders;
      }).finally(()=>{
        this._configService.hideSpinner();
      })
  }

  onSubmit()
  {
    this.service.serviceProviders = this.service.serviceProviders.filter(sp=>this.selectedServiceProvidersIds.indexOf(sp.serviceProviderId)>=0);
    this.serviceSubmit.emit(this.service);
  }

}
