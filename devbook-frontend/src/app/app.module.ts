import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
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
import { UpdateService } from './services/update.service';
import { HomeComponent } from './components/main/home.component';

const appRoutes: Routes = [
  {path: '', title: 'Devbook', component: HomeComponent},
  {path: 'filter', title: 'Devbook', component: HomeComponent},
  {path: 'login', title: 'Login', component: LoginComponent},
  {path: 'user/:id/profile', title: 'Profile', component: ProfileComponent}, // logged in user profile
  {path: 'user/:id/edit', title: 'Edit', component: EditComponent}, // edit logged in user profile
  {path: 'register', title: 'Register', component: FormComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    RouterModule.forRoot(appRoutes, { useHash: true }),
    NgxMaterialRatingModule,
    HttpClientModule
  ],
  providers: [
    PreviewService,
    BackendService,
    UpdateService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
