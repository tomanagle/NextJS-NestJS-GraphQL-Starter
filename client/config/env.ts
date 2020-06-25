import getConfig from 'next/config';
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const IS_DEBUG = process.env.NODE_ENV !== 'production';
export const IS_DEV = IS_DEBUG;
export const IS_SERVER = !process.browser;

export const ENV = process.env.NODE_ENV || 'development';

export const {
  CLIENT_DOMAIN,
  SITE_NAME,
  BROWSER_API_ENDPOINT,
  SENTRY_DSN,
  GITHUB_CLIENT_ID,
  WEBSOCKET_API_URL,
  REDDIT_CLIENT_ID,
  TWITTER_HANDLE
} = publicRuntimeConfig;

export const { SERVER_API_ENDPOINT } = serverRuntimeConfig;
