import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Student } from '../interfaces/student.interface';
import { Page } from '../interfaces/page.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private backendUrl: string = environments.backendUrl;
  constructor(private http: HttpClient) { }

  getStudents():Observable<Page> {
    return this.http.get<Page>(`${ this.backendUrl }/student/name?name=`);
  }

  getStudentByName( name: string ): Observable<Student|undefined> {
    return this.http.get<Student>(`${ this.backendUrl }/student/name?name=${ name }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getStudentByCurp( curp: string ): Observable<Student|undefined> {
    return this.http.get<Student>(`${ this.backendUrl }/student/curp?curp=${ curp }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Page> {
    return this.http.get<Page>(`${ this.backendUrl }/student/name?name=` + query);
  }

  addStudent( student: Student ): Observable<Student> {
    return this.http.post<Student>(`${ this.backendUrl }/student/attachments`, student );
  }

  addStudentWithAttachments( student: Student, files:any, key:String, description: String ): Observable<Student> {
    let formData = new FormData();
    let entityMetaBlob = new Blob([JSON.stringify(student)], {type: 'application/json'});
    formData.append('student', entityMetaBlob);
    formData.append('key', key.toString());
    formData.append('description', description.toString());
    
    files.forEach((file:any, i:any) => {
      let fileBlob = new Blob([file.file], {type: 'application/octet-stream'});
      formData.append('files', fileBlob, file.file.name);
    });
    //let fileBlob = new Blob([files], {type: 'application/octet-stream'});
    //formData.append('files', fileBlob, files.name);
    return this.http.post<Student>(`${ this.backendUrl }/student/attachments`, formData );
  }

  updateStudentWithAttachments( student: Student, files:any, key:String, description: String ): Observable<Student> {
    let formData = new FormData();
    let entityMetaBlob = new Blob([JSON.stringify(student)], {type: 'application/json'});
    formData.append('student', entityMetaBlob);
    formData.append('key', key.toString());
    formData.append('description', description.toString());
    
    files.forEach((file:any, i:any) => {
      let fileBlob = new Blob([file.file], {type: 'application/octet-stream'});
      formData.append('files', fileBlob, file.file.name);
    });
    //let fileBlob = new Blob([files], {type: 'application/octet-stream'});
    //formData.append('files', fileBlob, files.name);
    return this.http.put<Student>(`${ this.backendUrl }/student/attachments`, formData );
  }

  updateStudent( student: Student ): Observable<Student> {
    if ( !student.id ) throw Error('Student id is required');
    return this.http.put<Student>(`${ this.backendUrl }/student`, student );
  }

  deleteStudentbyCurp( curp: string ): Observable<boolean> {
    return this.http.delete(`${ this.backendUrl }/student/${ curp }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  getValidaByCurp( curp: string ): Observable<Student|undefined> {
    return this.http.get<Student>(`${ this.backendUrl }/student/valida/curp/${ curp }`);
  }
}
