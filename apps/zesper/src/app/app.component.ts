import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';
import { User } from '@zesper/api-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'zesper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userLoggedInSubscription: Subscription;

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  ngOnDestroy(): void {
    this.userLoggedInSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userService.init();

    // check if user is authenticated. If true, redirect to landing page
    this.userLoggedInSubscription = this.userService.currentUser$
      .subscribe((user: User) => {
        if (user) {
          // tslint:disable-next-line:no-console
          console.info(`Redirect to root page, because user '${JSON.stringify(user)}' is logged in.`);
          this.router.navigate(['/']);
        } else {
          // tslint:disable-next-line:no-console
          console.info('Redirect to login page, because user has logged out');
          this.router.navigate(['/login']);
        }
      });
  }
}
