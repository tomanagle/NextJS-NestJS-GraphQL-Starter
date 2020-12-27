import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider
} from '@apollo/client';
import nextWithApollo from 'next-with-apollo';

import {
  SERVER_API_ENDPOINT,
  BROWSER_API_ENDPOINT,
  IS_SERVER
} from 'config/env';

const withApollo = nextWithApollo(
  ({ initialState, headers, ...rest }) => {
    return new ApolloClient({
      ssrMode: IS_SERVER,
      link: new HttpLink({
        uri: IS_SERVER ? SERVER_API_ENDPOINT : BROWSER_API_ENDPOINT,
        headers: {
          ...headers
        },
        credentials: 'include'
      }),
      cache: new InMemoryCache().restore(initialState || {}),
      // A hack to get ctx oin the page's props on the initial render
      // @ts-ignore
      defaultOptions: rest
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

export default withApollo;
