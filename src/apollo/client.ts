import { setContext } from '@apollo/client/link/context';
import { ErrorHandler, onError } from '@apollo/client/link/error';
import { ApolloLink, ApolloClient, InMemoryCache, HttpLink, fromPromise } from '@apollo/client';
// import { Hermes } from 'apollo-cache-hermes';


import config from '../constants/config';
import { AuthService } from '../services/auth';

import { policies } from './policies';

// import typePolicies from './policies';

// function getNewToken() {
//   const token = AuthService.getToken();
//   console.log(config)
//   console.log(`${config.BE_PROTOCOL}://${config.BE_HOST}:${config.BE_PORT}/api/auth/token/refresh`)
//   return fetch(`${config.BE_PROTOCOL}://${config.BE_HOST}:${config.BE_PORT}/api/auth/token/refresh`, {
//     method: 'POST',
//     body: token.refreshToken
//   });
// }

const handleErrors: ErrorHandler = ({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

    // for (const error of graphQLErrors) {
    //   console.log(error.extensions.code);
    //   switch (error.extensions.code) {
    //     case 'UNAUTHENTICATED':
    //       return fromPromise(
    //         getNewToken().catch((error) => {
    //           return;
    //         })
    //       )
    //         .filter((value) => Boolean(value))
    //         .flatMap((accessToken) => {
    //           const oldHeaders = operation.getContext().headers;
    //           operation.setContext({
    //             headers: {
    //               ...oldHeaders,
    //               authorization: `Bearer ${accessToken}`,
    //             },
    //           });
    //           return forward(operation);
    //         });
    //   }
    // }
  }

  // if (networkError) {
  //   console.error(`[Network error]: ${networkError}`);
  // }
  // TODO SH-19 Implement refresh session flow
  // forward(operation);
};

// NOTE Prepare common headers for all requests
const authLink = setContext(({ operationName }, { headers }) => {
  // NOTE get the authentication access token from local storage if it exists
  const token = AuthService.getToken();
  // NOTE return the headers to the context so httpLink can read them
  return {
    headers: /Health|SignIn|SignUp/.test(operationName ?? '') ? {
      // TODO SH-18 Protect GraphQL public queries (IntrospectionQuery) with Basic
      // Authorization: `${config.AUTH_BASIC_TITLE} ${config.AUTH_BASIC_VALUE}`,
      ...headers,
    } : {
      Authorization: token ? `${config.AUTH_BEARER_TITLE} ${config.AUTH_BEARER_VALUE || token?.accessToken}` : '',
      ...headers,
    }
  };
});

const httpLink = new HttpLink({
  uri: `${config.BE_PROTOCOL}://${config.BE_HOST}:${config.BE_PORT}/${config.BE_URL}`,
});

const cache = new InMemoryCache({
  typePolicies: policies
});

// NOTE Apollo client
const client = new ApolloClient({
  link: ApolloLink.from([authLink, onError(handleErrors), httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      refetchWritePolicy: 'overwrite'
    },
  },
});

export default client;
