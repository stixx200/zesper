import { Injectable } from '@angular/core';
import { User } from '@zesper/api-interface';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import gql from 'graphql-tag';
import { take } from 'rxjs/operators';
import { parseGraphQLError } from '../shared/graphql.helpers';
import { ApolloQueryResult } from 'apollo-client';

export const getUserQuery = gql`
  query getUser($id: ID!) {
    user(query: { id: $id }) {
      id
      email
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private readonly apollo: Apollo, private readonly authService: AuthService) {}

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
        console.error(parseGraphQLError(error));
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
}
