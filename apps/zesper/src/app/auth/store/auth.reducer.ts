import { User } from '@zesper/api-interface';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State {
  currentUser?: User;
}

export const initialState: State = {
  currentUser: null,
};

export const selectCurrentUser = (state: State) => state.currentUser;

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccessful:
      return {
        ...state,
        currentUser: action.payload,
      };
    case AuthActionTypes.Logout:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
}
