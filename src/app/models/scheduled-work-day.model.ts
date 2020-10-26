import {WorkDay} from '../models/work-day.model';
export class ScheduledWorkDay extends WorkDay{

    public isScheduled:boolean =false;
    public constructor(workDay:WorkDay,startTimeSlot:string="",endTimeSlot:string="",workingDayId:number=0,firstShiftId:number=0){
      super(workDay.dayOfWeek,startTimeSlot,endTimeSlot,workingDayId,firstShiftId);
    }
  }