import { Injectable } from '@angular/core';
import { Credentials } from '../login/models';
import { Observable } from 'rxjs/internal/Observable';
import { of, timer, switchMap, throwError } from 'rxjs';

/**
 * Authentication Service Mockup
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }

  signIn(credentials: Credentials): Observable<boolean> {
    const success = Math.random() > 0.5;
    const response = success ? of(true) : throwError(() => new Error('E: signIn'));
    // return timer(2000).pipe(switchMap(() => response));
    return timer(2000).pipe(switchMap(() => of(true)))
  }

  signUp(credentials: Credentials): Observable<boolean> {
    const success = Math.random() > 0.5;
    const response = success ? of(true) : throwError(() => new Error('E: signUp'));
    //return timer(2000).pipe(switchMap(() => response));
    return timer(2000).pipe(switchMap(() => of(true)))

  }
}
