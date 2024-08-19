import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../interfaces/student.interface';
import { environments } from '../../../environments/environments';

@Pipe({
  name: 'studentImage'
})
export class StudentImagePipe implements PipeTransform {

  private backendUrl: string = environments.backendUrl;

  transform( student: Student ): string {
    if(student.avatar !== null && student.avatar !== '') return this.backendUrl + '/attachment/download/' + student.avatar;
    return 'assets/no-image.png';
  }

}
