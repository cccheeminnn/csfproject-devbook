import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { LoginComponent } from './components/form/login.component';
import { HomeComponent } from './components/main/home.component';
import { RegisterComponent } from './components/form/register/register.component';

const appRoutes: Routes = [
  { path: '', title: 'TalentBook', component: HomeComponent },
  { path: 'filter', title: 'TalentBook', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'login/verified', title: 'Login', component: LoginComponent },
  { path: 'user/:id/profile', title: 'Profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'user/:id/edit', title: 'Edit', loadChildren: () => import('./components/profile/edit.module').then(m => m.EditModule) }, // edit logged in user profile
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'register/user', title: 'Register', loadChildren: () => import('./components/form/register/form.module').then(m => m.FormModule) },
  { path: 'register/employer', title: 'Register', loadChildren: () => import('./components/form/register/empform.module').then(m => m.EmpformModule) },
  { path: 'register/user/demo', title: 'Register', loadChildren: () => import('./components/form/register/form.module').then(m => m.FormModule) },
  { path: 'catalogue', title: 'Catalogue', loadChildren: () => import('./components/catalogue/catalogue.module').then(m => m.CatalogueModule) },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
