import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, of, map, catchError, throwError } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private username:string = '';
  private password:string = '';

  user: undefined | User = {
    user: '',
    email: '',
    id: 0
  };

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( username:string, password:string):Observable<User>{
    if (username=="admin" && password == "admin"){
      localStorage.setItem('token', 'asdfasdfasdf.asdasd.234223asdfas');
      this.user = {email: 'daniel@gmail.com', user: 'Daniel Tiro', id: 1};

      return Observable.create((observer:any) => {
        setTimeout(() => {
          observer.next(this.user);
          observer.complete();
        }, 100);
      });
    }else{
      return throwError(new Error('user / password are invalid'));
    }
    
  }

  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return Observable.create((observer:any) => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 100);

    })
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
