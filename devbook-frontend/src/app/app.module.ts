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

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/:userId', component: PersonalComponent},
  {path: 'form', component: FormComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonalComponent,
    HomeComponent,
    FormComponent,
    PreviewComponent
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
