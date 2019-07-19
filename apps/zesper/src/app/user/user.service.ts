import { Injectable } from '@angular/core';
import { User } from '@zesper/api-interface';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import gql from 'graphql-tag';
import { take } from 'rxjs/operators';
import { parseGraphQLError } from '../shared/graphql.helpers';
import { ApolloQueryResult } from 'apollo-client';
import { MatSnackBar } from '@angular/material';
import { ErrorSnackbarComponent } from '../shared/error-snackbar/error-snackbar.component';

export const getUserQuery = gql`
  query getUser($id: ID!) {
    user(query: { id: $id }) {
      id
      email
      name
    }
  }
`;

export const deleteUserMutation = gql`
  mutation DeleteUser {
    deleteUser {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private readonly apollo: Apollo, 
              private readonly authService: AuthService,
              private readonly snackBar: MatSnackBar) {}

  init() {
    const userId = this.authService.userId;
    const authToken = this.authService.authToken;
    if (userId && authToken) {
      this.apollo.query<{ user: User }>({
        query: getUserQuery,
        variables: { id: userId },
      }).pipe(take(1)).subscribe(({ data }: ApolloQueryResult<{ user: User }>) => {
        this.login(data.user, authToken);
      }, (error) => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: error,
          horizontalPosition: 'end',
        });
      });
    }
  }

  login(user: User, token: string) {
    this.authService.setUser(user.id, token);
    this.currentUser$.next(user);
  }

  logout() {
    this.authService.logout();
    this.currentUser$.next(null);
  }

  delete() {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error("Can't delete user, because there is currently no user logged in.");
    }

    this.apollo.mutate<{ deleteUser: User }>({ mutation: deleteUserMutation }).subscribe(({ data }) => {
      console.log(`Deleted user ${data.deleteUser.id}`);
      this.logout();    
    }, (error) => {
      this.snackBar.openFromComponent(ErrorSnackbarComponent, {
        data: error,
        horizontalPosition: 'end',
      });
    });
  }

  private getCurrentUser(): User {
    let currentUser;
    this.currentUser$.pipe(take(1)).subscribe((user: User) => (currentUser = user));
    return currentUser;
  }
}
