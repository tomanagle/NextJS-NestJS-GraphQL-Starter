import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import Manifest from 'next-manifest/manifest';
import { extractCritical } from 'bumbag-server';
import { InitializeColorMode } from 'bumbag';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

// @ts-ignore
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      )
    };
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
          <link rel="stylesheet" type="text/css" href="/react-mde-all.css" />

          <meta property="og:type" content="website" />

          <Manifest
            // path for manifest will be deploying
            href="/manifest.json"
            // color for `theme-color`
            themeColor="#D500F9"
            // scale for `viewport` meta tag
            initialScale="1"
            title="Snipd"
            short_name="Snipd"
          />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
