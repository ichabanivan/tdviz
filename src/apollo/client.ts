import { setContext } from '@apollo/client/link/context';
import { ErrorHandler, onError } from '@apollo/client/link/error';
import { ApolloLink, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import config from '../constants/config';
import { AuthService } from '../services/auth';

import typePolicies from './policies';


const handleErrors: ErrorHandler = ({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
  // TODO SH-19 Implement refresh session flow
  forward(operation);
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
      Authorization: token ? `${config.AUTH_BEARER_TITLE} ${config.AUTH_BEARER_VALUE || token?.value}` : '',
      ...headers,
    }
  };
});

const httpLink = new HttpLink({
  uri: `${config.BE_PROTOCOL}://${config.BE_HOST}:${config.BE_PORT}/${config.BE_URL}`,
});

// NOTE Apollo client
const client = new ApolloClient({
  link: ApolloLink.from([authLink, onError(handleErrors), httpLink]),
  cache: new InMemoryCache({ typePolicies }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

export default client;
