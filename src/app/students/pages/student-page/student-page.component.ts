import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  public student?: Student;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ curp }) => this.studentService.getStudentByCurp( curp )),
      )
      .subscribe( student => {

        if ( !student ) return this.router.navigate([ '/students/list' ]);

        this.student = student;
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('students/list')
  }

}
