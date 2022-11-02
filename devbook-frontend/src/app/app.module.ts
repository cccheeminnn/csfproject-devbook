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
import { ProfileComponent } from './components/profile/profile.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { UpdateService } from './services/update.service';
import { HomeComponent } from './components/main/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PreviewComponent,
    LoginComponent,
    ProfileComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    NgxMaterialRatingModule,
    HttpClientModule
  ],
  providers: [
    PreviewService,
    BackendService,
    UpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
