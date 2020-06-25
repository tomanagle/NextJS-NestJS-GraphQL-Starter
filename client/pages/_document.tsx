import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Manifest from 'next-manifest/manifest';
import * as Sentry from '@sentry/browser';
import { SITE_NAME } from 'config/env';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

// @ts-ignore
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    // const page = ctx.renderPage(App => props =>
    //   styledComponentSheet.collectStyles(<App {...props} />)
    // );

    const styleTags = styledComponentSheet.getStyleElement();

    try {
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [<React.Fragment key="styles">{styleTags}</React.Fragment>]
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <style>
            {`
            #__next { min-height: 100% }
          `}
          </style>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />

          <meta property="og:type" content="website" />

          <Manifest
            // path for manifest will be deploying
            href="/manifest.json"
            // color for `theme-color`
            themeColor="#D500F9"
            // scale for `viewport` meta tag
            initialScale="1"
            title={SITE_NAME}
            short_name={SITE_NAME}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
