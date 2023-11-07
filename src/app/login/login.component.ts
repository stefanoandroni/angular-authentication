import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, exhaustMap, map, merge, of, skip, takeUntil, withLatestFrom } from 'rxjs';
import { Credentials, Mode, Status } from './models/models';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from './constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  /* States */
  mode$ = new BehaviorSubject<Mode>('signin');
  status$ = new BehaviorSubject<Status>('initial');

  /* Events */
  signIn$ = new Subject<Credentials>();
  signUp$ = new Subject<Credentials>();
  destroy$ = new Subject<void>();

  /* Observables */
  sign$: Observable<boolean> = merge(
    this.signIn$.pipe(map((x): ['signin', Credentials] => ['signin', x])),
    this.signUp$.pipe(map((x): ['signup', Credentials] => ['signup', x]))
  ).pipe(
    exhaustMap(([type, credentials]) => {
      const call$ =
        type === 'signin'
          ? this.authService.signIn(credentials)
          : this.authService.signUp(credentials);
      return call$.pipe(
        catchError(() => of(false)),
        takeUntil(this.mode$.pipe(skip(1))) // N: stops the internal chain (http call) when the mode changes (optimization)
      );
    })
  );
  /* N:
    - a single flow (login + signup) to avoid there being simultaneous signin and signup calls (we maintain a single state status$)
    - exhaustMap: ... only if the previous projected Observable has completed. (waits for the server's response before making another login attempt)
  */

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // [Set] 'success' or 'error' status [When] sign$ (signIn or signUp attempt result)
    this.sign$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.status$.next(result ? 'success' : 'error');
      });

    // [Set] 'pending' status [When] signIn$ | signUp$ (signIn or signUp attempt start)
    merge(this.signIn$, this.signUp$)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.status$.next('pending');
      });

    // [Set] 'initial' status [When] $mode (tab change)
    this.mode$
    .pipe(
      skip(1),
      takeUntil(this.destroy$))
    .subscribe((mode) => {
      this.status$.next('initial');
    });

    // [Handle] signin/signup status change behaviour [When] status$ 
    this.status$
      .pipe(
        withLatestFrom(this.mode$),
        takeUntil(this.destroy$))
      .subscribe(([status, mode]) => {
        if (status === 'success') {
          if (mode === 'signin') {
            // (?) go to homepage
          } else { // mode === 'signup'
            // Set 'signin' mode
            this.mode$.next('signin');
          }
        } else if(status === 'error') {
          if (mode === 'signin') {
            this.openErrorSnackBar(ErrorMessage.SIGNIN)
          } else { // mode === 'signup'
            this.openErrorSnackBar(ErrorMessage.SIGNUP)
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, undefined, {duration: 2000, verticalPosition: 'bottom'});
  }
  
}
