
import * as _ from 'lodash';
import { ApolloError } from 'apollo-client';

export function parseGraphQLError(error: ApolloError) {
  let errorMessage = `Got an error from GraphQL request:\nError: ${error.message}`;

  // graphql errors
  for (const graphQLError of error.graphQLErrors) {
    errorMessage += `GraphQLError: ${graphQLError.message}`;
  }

  // network errors
  const networkErrors = _.get(error, "networkError.error.errors", []);
  for (const networkError of networkErrors) {
    errorMessage += `NetworkError: ${networkError.message}`;
  }

  return errorMessage;
}
