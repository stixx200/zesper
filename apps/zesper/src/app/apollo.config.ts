import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { AuthService } from './auth/auth.service';


@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink, auth: AuthService) {

    const uri = 'http://localhost:3333/graphql';
    const http = httpLink.create({ uri });

    apollo.create({
      link: auth.authLink.concat(http),
      cache: new InMemoryCache()
    });
  }
}
