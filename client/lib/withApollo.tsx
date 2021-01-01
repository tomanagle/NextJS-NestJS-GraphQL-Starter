import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  split
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import nextWithApollo from 'next-with-apollo';
import { WebSocketLink } from '@apollo/client/link/ws';
import { nanoid } from 'nanoid';

import {
  SERVER_API_ENDPOINT,
  BROWSER_API_ENDPOINT,
  WEBSOCKET_API_URL,
  IS_SERVER
} from 'config/env';

const withApollo = nextWithApollo(
  ({ initialState, headers, ...rest }) => {
    const httpLink = new HttpLink({
      uri: IS_SERVER ? SERVER_API_ENDPOINT : BROWSER_API_ENDPOINT,
      headers: {
        ...headers
      },
      credentials: 'include'
    });

    return new ApolloClient({
      ssrMode: IS_SERVER,
      link: httpLink,
      cache: new InMemoryCache().restore(initialState || {}),
      // A hack to get ctx oin the page's props on the initial render
      // @ts-ignore
      defaultOptions: { ...rest }
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...props.apollo.defaultOptions.ctx} />
        </ApolloProvider>
      );
    }
  }
);

export const withApolloWithSubscriptions = nextWithApollo(
  ({ initialState, headers, ...rest }) => {
    const clientId = nanoid();

    const wsLink = !IS_SERVER
      ? new WebSocketLink({
          uri: WEBSOCKET_API_URL,
          options: {
            reconnect: true,
            connectionParams: {
              clientId
            }
          }
        })
      : null;

    const httpLink = new HttpLink({
      uri: IS_SERVER ? SERVER_API_ENDPOINT : BROWSER_API_ENDPOINT,
      headers: {
        ...headers
      },
      credentials: 'include'
    });

    /*
     * Only create a split link on the browser
     * The server can not use websockets and is therefore
     * always a http link
     */
    const splitLink = !IS_SERVER
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

    return new ApolloClient({
      ssrMode: IS_SERVER,
      link: splitLink,
      cache: new InMemoryCache().restore(initialState || {}),
      // A hack to get ctx oin the page's props on the initial render
      // @ts-ignore
      defaultOptions: { ...rest, clientId }
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page
            {...props}
            {...props.apollo.defaultOptions.ctx}
            clientId={props.apollo.defaultOptions.clientId}
          />
        </ApolloProvider>
      );
    }
  }
);

export default withApollo;
