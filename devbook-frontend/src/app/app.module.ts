import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { HeaderComponent } from './components/header/header.component';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './components/form/preview.component';
import { PreviewService } from './services/preview.service';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/form/login.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { UpdateService } from './services/update.service';
import { HomeComponent } from './components/main/home.component';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleComponent } from './components/google/google.component';
import { SharedService } from './services/shared.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PreviewComponent,
    LoginComponent,
    SnackbarComponent,
    GoogleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    NgxMaterialRatingModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    PreviewService,
    BackendService,
    UpdateService,
    SharedService,
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
