import React from 'react';
import { get } from 'lodash';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';
import initApollo from './init-apollo';

const WithApolloClient = App => {
  class Apollo extends React.Component {
    static displayName = 'withApollo(App)';

    static async getInitialProps(ctx) {
      const { Component, router } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }
      const headers = get(ctx, 'ctx.req.headers', {});

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(null, headers);

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error); // eslint-disable-line no-console
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        headers,
        ...appProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);
      // @ts-ignore
      this.apolloClient = initApollo(props.apolloState, props.headers);
    }

    render() {
      // @ts-ignore
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  }

  return Apollo;
};

export default WithApolloClient;
