import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { getDayOfWeekString, WorkDay } from 'src/app/models/work-day.model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { SchedulingService } from 'src/app/services/scheduling.service';
import {ScheduledWorkDay} from "../../models/scheduled-work-day.model";
import {ScheduledServiceProvider} from "../../models/scheduled-service-provider.model";
import { ServiceModel } from 'src/app/models/service.model';
import { ServiceManagerService } from 'src/app/services/service-manager.service';
@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

  @Input() serviceProvider:ServiceProviderModel = new ServiceProviderModel();
  @Output() submit = new EventEmitter<ScheduledServiceProvider>();
  @Input() public selectedServicesIds:number[] =[];
  public timeSlots:string[]=[];
  public workDays:ScheduledWorkDay[] = WorkDay.getWorkDays().map(wd=>new ScheduledWorkDay(wd));
  public serviceOptions:ServiceModel[] = [];
  
  constructor(
    private _schedulingService:SchedulingService,
    private _configService:ConfigurationService,
    private _serviceManagerService:ServiceManagerService) { }

  ngOnInit(): void {
    this._configService.showSpinner();
    Promise.all([this._schedulingService.getTimeSlots(),this._serviceManagerService.getAllServices()])
    .then(responses=>{
        this.timeSlots = responses[0];
        this.serviceOptions = responses[1];
        
    }).finally(()=>this._configService.hideSpinner());
  }

  public workDayToString(workDay:WorkDay){
    let stringDay = getDayOfWeekString(workDay.dayOfWeek);
    return stringDay ;
  }

  public onSubmit=()=>{
    
    let scheduledServiceProvider = new ScheduledServiceProvider(this.serviceProvider,this.workDays.filter(w=>w.isScheduled));
    scheduledServiceProvider.services = this.serviceOptions.filter(service=>this.selectedServicesIds.indexOf(service.serviceId)>=0);
    this.submit.emit(scheduledServiceProvider);
  }

  public onSelectionChange(changes:any){
    this.selectedServicesIds = changes;
  }

}



