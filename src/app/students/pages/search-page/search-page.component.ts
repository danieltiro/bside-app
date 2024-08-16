import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Student } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public students: Student[] = [];
  public selectedStudent?: Student;

  constructor( private studentService: StudentService ){}

  search() {
    const value: string = this.searchInput.value || '';

    this.studentService.getSuggestions( value )
      .subscribe( result => this.students = result.content );
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedStudent = undefined;
      return;
    }

    const student: Student = event.option.value;
    this.searchInput.setValue( student.name + ' ' + student.lastname + " [" + student.curp + "]" );

    this.selectedStudent = student;

  }


}
