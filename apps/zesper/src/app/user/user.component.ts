import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, selectCurrentUser } from '../store/app.reducers';

@Component({
  selector: 'zesper-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser$ = this.store.pipe(select(selectCurrentUser));

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {}

  update() {
    // this.store.dispatch(new )
  }
}
