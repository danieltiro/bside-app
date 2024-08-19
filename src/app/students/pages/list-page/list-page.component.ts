import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  public students: Student[] = [];

  constructor( private studentService: StudentService ) {}

  ngOnInit(): void {
    this.studentService.getStudents()
      .subscribe( page => this.students = page.content );
  }

}
