import {WorkDay} from '../models/work-day.model';
export class ScheduledWorkDay extends WorkDay{

    public isScheduled:boolean =false;
    public constructor(workDay:WorkDay){
      super(workDay.dayOfWeek,workDay.startTimeSlot,workDay.endTimeSlot);
    }
  }