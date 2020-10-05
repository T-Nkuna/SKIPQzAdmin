import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceProvidersComponent } from './components/service-providers/service-providers.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  {path:"serviceProviders", component:ServiceProvidersComponent},
  {path:"services",component:ServicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
