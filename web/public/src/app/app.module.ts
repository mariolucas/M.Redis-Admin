import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

// Vendors
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { KeyinfoComponent } from './modals/keyinfo/keyinfo.component';
import { FormComponent } from './modals/form/form.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { InfoComponent } from './pages/info/info.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HostInfoComponent } from './components/host-info/host-info.component';
import { KeyFilterPipe } from './pipe/key-filter.pipe';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    HomeComponent,
    KeyinfoComponent,
    FormComponent,
    ConfirmComponent,
    InfoComponent,
    PageNotFoundComponent,
    HostInfoComponent,
    KeyFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  entryComponents: [
    KeyinfoComponent,
    FormComponent,
    ConfirmComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
