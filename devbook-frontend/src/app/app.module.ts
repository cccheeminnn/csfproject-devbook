import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { PersonalComponent } from './components/main/personal/personal.component';
import { HomeComponent } from './components/main/home/home.component';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './components/form/preview.component';
import { PreviewService } from './services/preview.service';
import { BackendService } from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/form/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { EditComponent } from './components/profile/edit.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'filter', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/:id/details', component: PersonalComponent}, // other users profile
  {path: 'user/:id/profile', component: ProfileComponent}, // logged in user profile
  {path: 'user/:id/edit', component: EditComponent}, // edit logged in user profile
  {path: 'register', component: FormComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonalComponent,
    HomeComponent,
    FormComponent,
    PreviewComponent,
    LoginComponent,
    ProfileComponent,
    SnackbarComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    NgxMaterialRatingModule,
    HttpClientModule
  ],
  providers: [
    PreviewService,
    BackendService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
