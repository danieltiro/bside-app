import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'student-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public student!: Student;


  ngOnInit(): void {
    if ( !this.student ) throw Error('Student property is required');
  }

}
