import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { extractCritical } from 'bumbag-server';
import { InitializeColorMode } from 'bumbag';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <InitializeColorMode />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async ctx => {
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
};

MyDocument.renderDocument = Document.renderDocument;

export default MyDocument;
