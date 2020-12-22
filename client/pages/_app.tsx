import React from 'react';
import withGA from 'next-ga';
import NProgress from 'nprogress';
import { get } from 'lodash';
import { Provider as BumbagProvider, ToastManager } from 'bumbag';
import Router from 'next/router';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { GA_ID } from '../constants';
import initSentry from '../lib/sentry';
import jwt from 'jsonwebtoken';
import parseCookie from 'helpers/parseCookie';
import theme from '../constants/theme';
import withApollo from '../lib/withApollo';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <BumbagProvider isSSR theme={theme}>
      <Component {...pageProps} />
      <ToastManager />
    </BumbagProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const ua = get(ctx, 'req.headers[user-agent]', '');
  const token = parseCookie({
    cookie: get(ctx, 'req.headers.cookie', ''),
    name: 'token'
  });

  initSentry({ user: get(jwt.decode(token), 'user', null) });

  const initialProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  const pageProps = {
    query: get(ctx, 'query', null),
    userContext: null,
    ua,
    ...initialProps
  };

  return { pageProps };
};

export default withGA(GA_ID, Router)(withApollo(MyApp, { getDataFromTree }));
