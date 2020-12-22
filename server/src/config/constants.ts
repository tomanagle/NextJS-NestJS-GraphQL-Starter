import dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.NODE_ENV || 'development';

export const IS_LOCAL = ENV === 'development';

export const TOKEN_COOKIE_DURATION = process.env.TOKEN_COOKIE_DURATION || 3.6e6; // 1 hour

export const REFRESH_COOKIE_DURATION =
  process.env.REFRESH_COOKIE_DURATION || 3.154e10; // 1 year

export const SESSION_TOKEN_NAME = process.env.SESSION_TOKEN_NAME || 'token';

export const DB_NAME = process.env.DB_NAME || 'NextNextStarter';

export const MONO_DB_CONNECTION_STRING =
  process.env.MONO_DB_CONNECTION_STRING ||
  `mongodb://localhost:27017/${DB_NAME}`;

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

/*
 * Set this to your client application's domain
 * E.g. .example.com
 */
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || 'localhost';

export const SENTRY_DSN = process.env.SENTRY_DSN;

// https://engine.apollographql.com/
export const ENGINE_API_KEY = process.env.ENGINE_API_KEY;

// Google analytics ID
export const GA_ID = process.env.GA_ID;
