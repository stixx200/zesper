import { Action } from '@ngrx/store';
import { User } from '@zesper/api-interface';

export enum AuthActionTypes {
  LoginSuccessful = '[Auth] LoginSuccessful',
  LoginFailed = '[Auth] LoginFailed',
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccessful implements Action {
  readonly type = AuthActionTypes.LoginSuccessful;

  constructor(public payload: User) {}
}

export class LoginFailed implements Action {
  readonly type = AuthActionTypes.LoginFailed;

  constructor(public payload: { error: Error }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;

  constructor() {}
}

export type AuthActions = Login | LoginSuccessful | LoginFailed | Logout;
