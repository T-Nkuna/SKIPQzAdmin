import { ServiceModel } from './service.model';

export class ServiceProviderModel{
   public name:string;
   public  email:string;
   public serviceProviderId:number =-1;
   public services:ServiceModel[] =[];

   constructor(){}
}