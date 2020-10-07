import {ServiceProviderModel} from "../models/service-provider.model";
import {ScheduledWorkDay} from '../models/scheduled-work-day.model';
export class ScheduledServiceProvider extends ServiceProviderModel{
    
    public scheduledWorkDays:ScheduledWorkDay[];
    constructor(serviceProvider:ServiceProviderModel,scheduledWorkDays:Array<ScheduledWorkDay>){
      super();
      this.email = serviceProvider.email;
      this.name = serviceProvider.name;
      this.serviceProviderId = serviceProvider.serviceProviderId;
      this.scheduledWorkDays = scheduledWorkDays;
    }
 }