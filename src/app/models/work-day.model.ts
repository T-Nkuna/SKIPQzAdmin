export enum DayOfWeek{Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday};
export function getDayOfWeekString(workDay:DayOfWeek){
    let returnedStr = "";
    switch(workDay)
    {
        case DayOfWeek.Monday:
            returnedStr = "Monday";
            break;
        case DayOfWeek.Tuesday:
            returnedStr ="Tuesday";
            break;
        case DayOfWeek.Wednesday:
            returnedStr = "Wednesday";
            break;
        case DayOfWeek.Thursday:
            returnedStr = "Thursday";
            break;
        case DayOfWeek.Friday:
            returnedStr = "Friday";
            break;
        case DayOfWeek.Saturday:
            returnedStr = "Saturday";
            break;
        case DayOfWeek.Sunday:
            returnedStr = "Sunday";
        break;
    }

    return returnedStr;
}

export class WorkDay{
    public dayOfWeek:DayOfWeek;
    public shifts:Array<Shift> =[];
    public workingDayId:number;
    public firstShiftId:number=0;
    public constructor(dayOfWeek:DayOfWeek,startTimeSlot:string="",endTimeSlot:string="", workingDayId:number=0,firstShiftId:number=0)
    {
        this.dayOfWeek =dayOfWeek;
        this.workingDayId = workingDayId;
        this.firstShiftId = firstShiftId;
        if(startTimeSlot!=="" && endTimeSlot!=="")
        {
            this.shifts.push({startTimeSlot,endTimeSlot,timeIntervalId:firstShiftId});
        }
       
    }

    public get firstShift():Shift
    {
        if(this.shifts.length==0){
            this.shifts.push(new Shift("",""));
        }
        return this.shifts[0];
    }
    public static getWorkDays(){
         return Object.keys(DayOfWeek).filter(prop=>isNaN(Number(prop))).map(prop=>{
            return new WorkDay(DayOfWeek[prop],"","");
         });
    }
}

export class Shift{
    public startTimeSlot:string;
    public  endTimeSlot:string;
    public timeIntervalId:number
    constructor(startTimeSlot:string,endTimeSlot:string,  timeIntervalId:number =0)
    {
        this.startTimeSlot =startTimeSlot;
        this.endTimeSlot =endTimeSlot;
        this.timeIntervalId = timeIntervalId;
    }
}