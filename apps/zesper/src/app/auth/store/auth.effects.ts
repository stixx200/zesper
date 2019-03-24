import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { AuthActionTypes, Login, LoginSuccessful } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  LogIn = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => {
      return new LoginSuccessful({
        email: action.payload.email,
        id: '',
        name: 'Hugo',
      });
    }),
    // catchError(error => {
    //   console.error('Failed to login. Dispatch LoginFailed action.');
    //   return new LoginFailed({ error });
    // }),
  );

  @Effect({ dispatch: false })
  LogInSuccessful = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccessful),
    map(() => {
      this.router.navigate(['/orders']);
    }),
  );

  @Effect({ dispatch: false })
  Logout = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    map(() => {
      this.router.navigate(['/login']);
    }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
  ) {}
}
