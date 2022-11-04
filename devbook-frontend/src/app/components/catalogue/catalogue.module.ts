import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CatalogueComponent } from './catalogue.component';


const routes: Routes = [
  { path: '', component: CatalogueComponent }
];

@NgModule({
  declarations: [
    CatalogueComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ]
})
export class CatalogueModule { }
