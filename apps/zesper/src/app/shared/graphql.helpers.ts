
import * as _ from 'lodash';
import { ApolloError } from 'apollo-client';

function messageToString(message: any) {
  if (typeof message === 'string') {
    return message;
  }
  return `${message.statusCode} - ${message.error}`;
}

export function parseGraphQLError(error: ApolloError) {
  let errorMessage = `Got an error from GraphQL request:\nError: ${messageToString(error.message)}`;

  // graphql errors
  for (const graphQLError of error.graphQLErrors) {
    errorMessage += `GraphQLError: ${messageToString(graphQLError.message)}`;
  }

  // network errors
  const networkErrors = _.get(error, "networkError.error.errors", []);
  for (const networkError of networkErrors) {
    errorMessage += `NetworkError: ${messageToString(networkError.message)}`;
  }

  return errorMessage;
}

export function getErrorMessage(error: ApolloError) {
  if (error.networkError) {
    switch (_.get(error, "networkError.status")) {
      case 0:
        return 'Unknown network error. Please check network connection';
      case 404:
        return 'Requested resource not available.';
      default:
        return error.networkError.message;
    }
  } else if (error.graphQLErrors) {
    return _.map(error.graphQLErrors, ({ extensions, locations, message, path }) => `${messageToString(message)}`).join("\n")
  }
  return error.message;
}
