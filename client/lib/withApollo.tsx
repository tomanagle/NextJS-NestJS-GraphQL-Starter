import {
  split,
  ApolloLink,
  ApolloClient,
  concat,
  InMemoryCache,
  HttpLink,
  ApolloProvider
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import nextWithApollo from 'next-with-apollo';

import {
  SERVER_API_ENDPOINT,
  BROWSER_API_ENDPOINT,
  IS_SERVER
} from 'config/env';

const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      link: new HttpLink({
        uri: IS_SERVER ? SERVER_API_ENDPOINT : BROWSER_API_ENDPOINT,
        headers: {
          ...headers
        },
        credentials: 'include'
      }),
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);

export default withApollo;
