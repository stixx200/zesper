import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { AuthPayload, User } from '@zesper/api-interface';
import { Router } from '@angular/router';
import { parseGraphQLError } from '../shared/graphql.helpers';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';

export const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login( data: {
      email: $email
      password: $password
    }) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

@Component({
  selector: 'zesper-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;

  private userLoggedInSubscription: Subscription;

  constructor(private userService: UserService,
              private apollo: Apollo,
              private router: Router) {
  }

  ngOnInit() {
    // check if user is authenticated. If true, redirect to landing page
    this.userLoggedInSubscription = this.userService.currentUser$
      .subscribe((user: User) => {
        if (user) {
          // tslint:disable-next-line:no-console
          console.info(`Redirect to root page, because user '${JSON.stringify(user)}' is logged in.`);
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.userLoggedInSubscription.unsubscribe();
  }


  login(loginForm: NgForm) {
    this.apollo.mutate<{ login: AuthPayload }>({
      mutation: loginMutation,
      variables: loginForm.value,
    }).subscribe(({ data }) => {
      this.userService.login(data.login.user, data.login.token);
      this.router.navigate(['/']);
    }, (error) => {
      console.error(parseGraphQLError(error));
    });
  }
}
