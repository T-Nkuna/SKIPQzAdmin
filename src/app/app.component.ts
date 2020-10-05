import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   public sidebarItems:Array<{icon:string;text:string;link?:any[];}> = [
      {icon:"people-outline",text:"Service Providers",link:["serviceProviders"]},
      {icon:"gift-outline",text:"Services",link:["services"]}
    ];
}


