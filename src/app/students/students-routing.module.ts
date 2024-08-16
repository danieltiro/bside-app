import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';


// localhost:4200/students
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new', component: NewPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'edit/:curp', component: NewPageComponent },
      { path: 'list', component: ListPageComponent },
      { path: ':curp', component: StudentPageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
