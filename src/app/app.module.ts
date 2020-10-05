import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {NbThemeModule, NbLayoutModule,NbSidebarModule, NbSidebarService,NbListModule,NbIconModule,NbTabsetModule,NbButtonModule, NbPopoverModule, NbInputModule} from '@nebular/theme';
import { ServiceProvidersComponent } from './components/service-providers/service-providers.component';
import { ServicesComponent } from './components/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceProvidersComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({name:"cosmic"}),
    NbEvaIconsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbListModule,
    NbIconModule,
    NbTabsetModule,
    NbButtonModule,
    NbPopoverModule,
    NbPopoverModule,
    NbInputModule
  ],
  providers: [
      NbSidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
