import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { getDayOfWeekString, Shift, WorkDay } from 'src/app/models/work-day.model';
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

  @Input() serviceProvider:ServiceProviderModel|ScheduledServiceProvider = new ServiceProviderModel();
  @Output() serviceProviderFormSubmit = new EventEmitter<ScheduledServiceProvider>();
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
    if("scheduledWorkDays" in this.serviceProvider){
      for(let workDay of this.workDays){
        let targetWorkIndex = this.serviceProvider.scheduledWorkDays.findIndex(wD=>workDay.dayOfWeek===wD.dayOfWeek);

        if(targetWorkIndex>=0)
        {
          let targetWorkDay = this.serviceProvider.scheduledWorkDays[targetWorkIndex];
          workDay.isScheduled = true;
          let firstShift = targetWorkDay.shifts.length>0?new Shift(targetWorkDay.shifts[0].startTimeSlot,targetWorkDay.shifts[0].endTimeSlot):workDay.firstShift;
          workDay.firstShift.startTimeSlot = firstShift.startTimeSlot;
          workDay.firstShift.endTimeSlot = firstShift.endTimeSlot;
        }
      }
    }
    this.selectedServicesIds = this.serviceProvider.services.map(s=>s.serviceId);
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
    this.serviceProviderFormSubmit.emit(scheduledServiceProvider);
  }

  public onSelectionChange(changes:Array<number>){
    this.selectedServicesIds = changes;
  }
}



