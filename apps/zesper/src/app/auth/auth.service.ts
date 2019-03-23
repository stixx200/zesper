import { Injectable } from '@angular/core';
import { User } from '@zesper/api-interface';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<User>(null);

  constructor() {}

  getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }

  login(email: string, password: string): Observable<User> {
    this.logout();

    return this.sendLoginRequest(email, password).pipe(
      tap((user: User) => {
        this.currentUser$.next(user);
      })
    );
  }

  logout() {
    this.currentUser$.next(null);
  }

  private sendLoginRequest(email: string /* , password: string */) {
    return timer(1000).pipe(
      map(
        (): User => ({
          email,
          displayName: 'user'
        })
      )
    );
  }
}
