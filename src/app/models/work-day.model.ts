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
    public startTimeSlot:string;
    public endTimeSlot:string;

    public constructor(dayOfWeek:DayOfWeek,startTimeSlot:string,endTimeSlot:string)
    {
        this.dayOfWeek =dayOfWeek;
        this.startTimeSlot =startTimeSlot;
        this.endTimeSlot = endTimeSlot;
    }
    public static getWorkDays(){
         return Object.keys(DayOfWeek).filter(prop=>isNaN(Number(prop))).map(prop=>{
            return new WorkDay(DayOfWeek[prop],"","");
         });
    }
}