import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { EmpformComponent } from './empform.component';

const routes: Routes = [
  { path: '', component: EmpformComponent }
];

@NgModule({
  declarations: [
    EmpformComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class EmpformModule { }
