import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../interfaces/student.interface';

@Pipe({
  name: 'studentImage'
})
export class StudentImagePipe implements PipeTransform {

  transform( student: Student ): string {
    return 'assets/no-image.png';
  }

}
