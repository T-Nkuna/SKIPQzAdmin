import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { getDayOfWeekString, WorkDay } from 'src/app/models/work-day.model';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { SchedulingService } from 'src/app/services/scheduling.service';
import {ScheduledWorkDay} from "../../models/scheduled-work-day.model";
import {ScheduledServiceProvider} from "../../models/scheduled-service-provider.model";
@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

  @Input() serviceProvider:ServiceProviderModel = new ServiceProviderModel();
  @Output() submit = new EventEmitter<ScheduledServiceProvider>();
  public timeSlots:string[]=[];
  public workDays:ScheduledWorkDay[] = WorkDay.getWorkDays().map(wd=>new ScheduledWorkDay(wd));
  constructor(private _schedulingService:SchedulingService,private _configService:ConfigurationService) { }

  ngOnInit(): void {
    this._configService.showSpinner();
    this._schedulingService.getTimeSlots()
    .then(response=>{
        this.timeSlots = response;
    }).finally(()=>this._configService.hideSpinner());
  }

  public workDayToString(workDay:WorkDay){
    let stringDay = getDayOfWeekString(workDay.dayOfWeek);
    return stringDay ;
  }

  public onSubmit=()=>{
    this.submit.emit(new ScheduledServiceProvider(this.serviceProvider,this.workDays.filter(w=>w.isScheduled)))
  }

}



