import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const SIGNING_KEY = env.SIGNING_KEY;

export const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

export const REDDIT_APP_ID = env.REDDIT_APP_ID;
export const REDDIT_APP_SECRET = env.REDDIT_APP_SECRET;

export const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
