import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { withClientState } from 'apollo-link-state';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { onError } from 'apollo-link-error';
import {
  SERVER_API_ENDPOINT,
  BROWSER_API_ENDPOINT,
  IS_SERVER
} from 'config/env';

let apolloClient = null;

const create = (initialState, headers) => {
  const cache = new InMemoryCache().restore(initialState || {});
  const ssrMode = !process.browser;
  const request = async operation => {
    operation.setContext({
      http: {
        includeExtensions: true,
        includeQuery: false
      },
      headers
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  // Create File Upload Link
  // const isFile = value =>
  //   (typeof File !== 'undefined' && value instanceof File) ||
  //   (typeof Blob !== 'undefined' && value instanceof Blob);

  const httpLink = new BatchHttpLink({
    uri: IS_SERVER ? SERVER_API_ENDPOINT : BROWSER_API_ENDPOINT,
    credentials: 'include',
    fetch
  });

  // Make sure the wsLink is only created on the browser. The server doesn't have a native implemention for websockets
  // const wsLink = process.browser
  //   ? new WebSocketLink({
  //       uri: WEBSOCKET_API_URL,
  //       options: {
  //         reconnect: true
  //       }
  //     })
  //   : () => {
  //       // eslint-disable-next-line no-console
  //       return;
  //     };

  // Let Apollo figure out if the request is over ws or http
  // const terminatingLink = split(
  //   ({ query }) => {
  //     // @ts-ignore
  //     const { kind, operation } = getMainDefinition(query);

  //     return (
  //       kind === 'OperationDefinition' && operation === 'subscription'
  //       //  && process.browser
  //     );
  //   },
  //   // @ts-ignore
  //   wsLink,
  //   httpLink
  // );

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          // eslint-disable-next-line no-console
          console.error({ graphQLErrors });
        }
        if (networkError) {
          // eslint-disable-next-line no-console
          console.error({ networkError });
        }
      }),
      requestLink,
      // fetch,
      withClientState({
        defaults: {
          isConnected: true
        },
        resolvers: {
          Mutation: {
            // eslint-disable-next-line no-shadow
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
              cache.writeData({ data: { isConnected } });
              return null;
            }
          }
        },
        cache,
        // @ts-ignore
        ssrMode // Disables forceFetch on the server (so queries are only run once)
      }),

      // Push the links into the Apollo client
      createPersistedQueryLink().concat(httpLink)
    ]),

    cache
  });
};

export default (initialState, headers) => {
  if (!process.browser) {
    return create(initialState, headers);
  }
  if (!apolloClient) {
    apolloClient = create(initialState, headers);
  }

  return apolloClient;
};
