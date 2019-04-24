import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { AuthPayload } from '@zesper/api-interface';
import { parseGraphQLError } from '../shared/graphql.helpers';
import { UserService } from '../user/user.service';

export const createUserMutation = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser( data: {
      name: $name
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
  selector: 'zesper-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: string;
  email: string;
  password: string;

  constructor(private apollo: Apollo,
              private readonly userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  signup(signupForm: NgForm) {
    this.apollo.mutate<{ createUser: AuthPayload }>({
      mutation: createUserMutation,
      variables: signupForm.value,
    }).subscribe(({ data }) => {
      this.userService.login(data.createUser.user, data.createUser.token);
      this.router.navigate(['/']);
    },(error) => {
      console.error(parseGraphQLError(error));
    });
  }
}
