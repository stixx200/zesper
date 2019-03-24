import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = { auth: fromAuth.reducer };

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

// auth state selectors
const selectAuthState = (state: AppState) => state.auth;
export const selectCurrentUser = createSelector(
  selectAuthState,
  fromAuth.selectCurrentUser,
);
