import { NgModule } from "@angular/core";

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCommonModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MatModules = [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    ScrollingModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
]

@NgModule({
    imports: MatModules,
    exports: MatModules,
})
export class MaterialModule { }
