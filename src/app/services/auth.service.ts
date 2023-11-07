import { Injectable } from '@angular/core';
import { Credentials, User } from '../login/models/models';
import { Observable } from 'rxjs/internal/Observable';
import { of, timer, switchMap, throwError, map, BehaviorSubject, distinctUntilChanged, startWith } from 'rxjs';

/**
 * Authentication Service Mockup (random response)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject$.asObservable().pipe(startWith(this.currentUserSubject$.getValue()), distinctUntilChanged());

  public isAuthenticated$: Observable<boolean> = this.currentUserSubject$.asObservable().pipe(map((user) => !!user));

  constructor() { }

  signIn(credentials: Credentials): Observable<boolean> {
    const success = Math.random() > 0.5;
    const response = success ? of(true) : throwError(() => new Error('E: signIn'));
    return timer(2000).pipe(switchMap(() => response));
    // return timer(2000).pipe(switchMap(() => of(true)))
  }

  signUp(credentials: Credentials): Observable<boolean> {
    const success = Math.random() > 0.5;
    const response = success ? of(true) : throwError(() => new Error('E: signUp'));
    return timer(2000).pipe(switchMap(() => response));
    // return timer(2000).pipe(switchMap(() => of(true)))
  }


}
