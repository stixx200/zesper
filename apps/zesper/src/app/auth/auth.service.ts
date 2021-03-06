import { Injectable } from '@angular/core';
import { ApolloLink } from 'apollo-link';

const localStorageUserId = 'USER_ID';
const localStorageAuthToken = 'AUTH_TOKEN';

@Injectable()
export class AuthService {
  userId: string = null;
  authToken: string = null;

  authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: this.authToken ? `Bearer ${this.authToken}` : ''
      }
    });
    return forward(operation);
  });

  constructor() {
    // get user id from localStorage
    this.userId = localStorage.getItem(localStorageUserId);
    this.authToken = localStorage.getItem(localStorageAuthToken);
  }

  setUser(id: string, token: string) {
    console.log(`Set user (${id}) and token (${token})`);
    localStorage.setItem(localStorageUserId, id);
    localStorage.setItem(localStorageAuthToken, token);
    this.userId = id;
    this.authToken = token;
  }

  logout() {
    localStorage.removeItem(localStorageUserId);
    localStorage.removeItem(localStorageAuthToken);
    this.userId = null;
    this.authToken = null;
  }
}
