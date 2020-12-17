require('dotenv').config();
const withOffline = require('next-offline');
const withManifest = require('next-manifest');
const compose = require('next-compose');
const withSourceMaps = require('@zeit/next-source-maps');
// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { version } = require('./package.json');

const manifestConfig = {
  manifest: {
    output: './public/', // The folder where the manifest will be generated.
    version: version,
    name: 'My site name',
    short_name: 'Short name',
    start_url: 'https://example.com',
    background_color: '#ffffff',
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '127x144',
        type: 'image/png'
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
};

const nextOfflineConfig = {
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: false,
  workboxOpts: {
    swDest: './public/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

const sentryConfig = {
  webpack: (config, options) => {
    const {
      SENTRY_DSN,
      SENTRY_ORG,
      SENTRY_PROJECT,
      SENTRY_AUTH_TOKEN,
      NODE_ENV
    } = process.env;

    // In `pages/_app.js`, Sentry is imported from @sentry/node. While
    // @sentry/browser will run in a Node.js environment, @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs#customizing-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          urlPrefix: '~/_next',
          release: options.buildId
        })
      );
    }

    return config;
  }
};

const config = compose([
  [withSourceMaps, sentryConfig],
  [withManifest, manifestConfig],
  [withOffline, nextOfflineConfig]
]);

config.excludeFile = str => /\*.{spec,test}.js/.test(str);

config.poweredByHeader = false;

config.publicRuntimeConfig = {
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
  WEBSOCKET_API_URL:
    process.env.WEBSOCKET_API_URL || 'ws://localhost:5000/graphql',

  // Google Analytics UA-
  GA_ID: process.env.GA_ID || '',
  SENTRY_DSN: process.env.SENTRY_DSN,
  BROWSER_API_ENDPOINT: process.env.BROWSER_API_ENDPOINT,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN || `http://localhost:3000`,
  REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID
};

config.serverRuntimeConfig = {
  SERVER_API_ENDPOINT:
    process.env.SERVER_API_ENDPOINT || 'http://localhost:5000/graphql'
};

config.assetPrefix =
  process.env.NODE_ENV === 'production' ? 'https://static.example.com' : '';

module.exports = config;
