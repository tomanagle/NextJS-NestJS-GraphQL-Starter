import React from 'react';
import App from 'next/app';
import withGA from 'next-ga';
import NProgress from 'nprogress';
import { get } from 'lodash';
import { Provider as BumbagProvider, ToastManager } from 'bumbag';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from 'next/router';
import withDarkMode from 'next-dark-mode';
import withApolloClient from '../lib/with-apollo-client';
import { GA_ID } from '../constants';
import initSentry from '../lib/sentry';
import jwt from 'jsonwebtoken';
import parseCookie from 'helpers/parseCookie';
import theme from '../constants/theme';

export const Context = React.createContext({ ua: '' });

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const ua = get(ctx, 'req.headers[user-agent]', '');
    const token = parseCookie({
      cookie: get(ctx, 'req.headers.cookie', ''),
      name: 'token'
    });

    initSentry({ user: get(jwt.decode(token), 'user', null) });

    let pageProps = {
      query: null,
      userContext: null,
      ua
    };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;

    return { pageProps };
  }

  componentDidMount() {
    initSentry({ user: null });
  }

  render() {
    // @ts-ignore
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Context.Provider value={{ ua: pageProps.ua }}>
        <ApolloProvider client={apolloClient}>
          <BumbagProvider isSSR theme={theme}>
            <Component {...pageProps} />
            <ToastManager />
          </BumbagProvider>
        </ApolloProvider>
      </Context.Provider>
    );
  }
}

export default withGA(GA_ID, Router)(withApolloClient(withDarkMode(MyApp)));
