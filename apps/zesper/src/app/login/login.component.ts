import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState, selectCurrentUser } from '../store/app.reducers';
import { Login } from '../auth/store/auth.actions';

@Component({
  selector: 'zesper-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  email: string;
  password: string;
  showSpinner = false;

  private currentUser$ = this.store.pipe(select(selectCurrentUser));
  private currentUserSubscription = this.currentUser$.subscribe(
    () => {
      this.showSpinner = false;
    },
    () => {
      this.showSpinner = false;
    },
  );

  constructor(private readonly store: Store<AppState>) {}

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  login(loginForm: NgForm) {
    // stop here if form is invalid
    if (loginForm.invalid) {
      return;
    }

    this.showSpinner = true;
    this.store.dispatch(
      new Login({ email: this.email, password: this.password }),
    );
  }
}
