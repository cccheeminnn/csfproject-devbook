import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { LoginComponent } from './components/form/login.component';
import { HomeComponent } from './components/main/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: '', title: 'Devbook', component: HomeComponent },
  { path: 'filter', title: 'Devbook', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'user/:id/profile', title: 'Profile', component: ProfileComponent }, // logged in user profile
  { path: 'user/:id/edit', title: 'Edit', loadChildren: () => import('./components/profile/edit.module').then(m => m.EditModule) }, // edit logged in user profile
  { path: 'register', title: 'Register', loadChildren: () => import('./components/form/form.module').then(m => m.FormModule) },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
