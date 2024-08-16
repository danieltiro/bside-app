import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, of, map, catchError } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ){
    localStorage.setItem('token', 'asdfasdfasdf.asdasd.234223asdfas');
    this.user = {email: 'john.doe@gmail.com', user: 'John', id: 1};
    // http.post('login',{ email, password });
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
