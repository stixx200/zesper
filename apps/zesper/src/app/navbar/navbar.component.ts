import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Logout } from '../auth/store/auth.actions';
import { AppState, selectCurrentUser } from '../store/app.reducers';

@Component({
  selector: 'zesper-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() title: string;

  currentUser$ = this.store.pipe(select(selectCurrentUser));

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
