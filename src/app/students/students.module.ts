import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';
import { MaterialModule } from '../material/material.module';

import { StudentPageComponent } from './pages/student-page/student-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { StudentImagePipe } from './pipes/student-image.pipe';
import { JsonPrettyPipe } from './pipes/json-pretty.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgFileUploadModule } from 'ng-new-files-uploader';


@NgModule({
  declarations: [
    StudentPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,

    // Pipes  
    StudentImagePipe,
    JsonPrettyPipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    MaterialModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgFileUploadModule
  ]
})
export class StudentsModule { }
