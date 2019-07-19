import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { AuthPayload } from '@zesper/api-interface';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ErrorSnackbarComponent } from '../shared/error-snackbar/error-snackbar.component';

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
export class LoginComponent {
  email: string;
  password: string;

  constructor(private readonly userService: UserService,
              private readonly apollo: Apollo,
              private readonly snackBar: MatSnackBar) {
  }

  login(loginForm: NgForm) {
    this.apollo.mutate<{ login: AuthPayload }>({
      mutation: loginMutation,
      variables: loginForm.value,
    }).subscribe(({ data }) => {
      this.userService.login(data.login.user, data.login.token);
    }, (error) => {
      this.snackBar.openFromComponent(ErrorSnackbarComponent, {
        data: error,
        horizontalPosition: 'end',
      });
    });
  }
}
