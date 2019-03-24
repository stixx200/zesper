import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from '@zesper/api-interface';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppState, selectCurrentUser } from '../store/app.reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  currentUser$ = this.store.pipe(select(selectCurrentUser));

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.currentUser$.pipe(
      take(1),
      map((user: User) => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }),
    );
  }
}
