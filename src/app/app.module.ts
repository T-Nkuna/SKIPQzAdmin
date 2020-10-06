import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {NbThemeModule, NbLayoutModule,NbSidebarModule, NbSidebarService,NbListModule,NbIconModule,NbTabsetModule,NbButtonModule, NbPopoverModule, NbInputModule} from '@nebular/theme';
import { ServiceProvidersComponent } from './components/service-providers/service-providers.component';
import { ServicesComponent } from './components/services/services.component';
import { FormsModule } from '@angular/forms';
import { ConfigurationService } from './services/configuration.service';
import {HttpClientModule} from "@angular/common/http";
import { ServiceProviderService } from './services/service-provider.service';
import { TableComponent } from './components/table/table.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceProvidersComponent,
    ServicesComponent,
    TableComponent,
    IconButtonComponent
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
    NbInputModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
      NbSidebarService,
      ConfigurationService,
      ServiceProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
