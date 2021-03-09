import qs from 'qs';
import {
  IS_LOCAL,
  REFRESH_COOKIE_DURATION,
  COOKIE_DOMAIN,
  CORS_ORIGIN,
  SESSION_TOKEN_NAME,
} from '@constants';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { get } from 'lodash';
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  REDDIT_APP_ID,
  REDDIT_APP_SECRET,
  SIGNING_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '@secrets';
import axios from 'axios';
import { google } from 'googleapis';
import deepClean from 'deep-clean';
import { Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import querystring from 'querystring';
import { User, UserModel } from '../user/user.schema';
import { Session } from '@auth/auth.schema';
import { RedditUser, GitHubUser } from '@user/user.types';

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */
  `${CORS_ORIGIN}/auth/google`,
);

async function getRedditUser({ code }: { code: string }): Promise<RedditUser> {
  // Get an access token
  const session = await axios
    .post(
      'https://www.reddit.com/api/v1/access_token',
      qs.stringify({
        // eslint-disable-next-line @typescript-eslint/camelcase
        grant_type: 'authorization_code',
        code,
        // eslint-disable-next-line @typescript-eslint/camelcase
        redirect_uri: `${CORS_ORIGIN}/login/reddit`,
      }),
      {
        auth: {
          username: REDDIT_APP_ID,
          password: REDDIT_APP_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(res => res.data)
    .catch(error => {
      const message = get(error, 'message');
      Logger.error(
        `Error getting the Reddit user session with message: ${message}`,
      );
      throw new Error(message);
    });
  if (session.error) {
    throw new Error(`Error getting Reddit user session: ${session.error}`);
  }

  // Then use thw access token to get the user
  return axios
    .get(`https://oauth.reddit.com/api/v1/me`, {
      headers: {
        Authorization: `bearer ${session.access_token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      const message = get(error, 'message');
      Logger.error(`Error getting the Reddit user with message: ${message}`);
      throw new Error(message);
    });
}

async function getGitHubUser({ code }): Promise<GitHubUser> {
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
    )
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });

  const decoded = querystring.parse(githubToken);

  const accessToken = decoded.access_token;

  return axios
    .get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(res => deepClean(res.data))
    .catch(error => {
      Logger.error(`Error getting user from GitHub`);
      throw error;
    });
}

async function getGoogleUser({ code }) {
  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      },
    )
    .then(res => res.data)
    .catch(error => {
      throw new Error(error.message);
    });

  return googleUser;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Session') private readonly sessionModel: Model<Session>,
  ) {}

  async logout(context) {
    context.res.clearCookie(SESSION_TOKEN_NAME);
    return null;
  }

  async generateSession(input) {
    const session = await this.sessionModel.create(input);
    return jwt.sign({ user: input.user, _id: session._id }, SIGNING_KEY, {
      expiresIn: '1y',
    });
  }

  async getSession({ token }) {
    try {
      const decoded = jwt.verify(token, SIGNING_KEY);
      const session = await this.sessionModel.findById(decoded._id).lean();

      return session ? decoded : null;
    } catch (e) {
      return null;
    }
  }

  async redditAuth(input, context) {
    const redditUser = await getRedditUser({ code: input.code });

    let user = await this.userModel
      .findOne({ redditId: redditUser.id })
      .then(data => data)
      .catch(error => {
        Logger.error(
          `Error getting user from database with redditId ${redditUser.id}`,
        );
        throw error;
      });

    if (user) {
      await user.update({
        ...deepClean({
          ...{
            ...redditUser,
            // Fields to not overwrite
            name: redditUser.name,
          },
          avatar: redditUser.icon_img,
        }),
      });
    }

    if (!user) {
      user = await this.userModel
        .create({
          ...deepClean(redditUser),
          redditId: redditUser.id,
          active: true,
          avatar: redditUser.icon_img,
          name: redditUser.name,
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          throw error;
        });
    }

    const token = await this.generateSession({
      ip: context.req.ip,
      userAgent: context.req.headers['user-agent'],
      user: { _id: user._id, role: user.role },
    });

    context.res.cookie('token', token, {
      maxAge: REFRESH_COOKIE_DURATION,
      domain: COOKIE_DOMAIN,
      httpOnly: true,
      secure: !IS_LOCAL,
    });

    return user;
  }

  async githubAuth(input, context) {
    const githubUser = await getGitHubUser({ code: input.code });

    let user = await this.userModel
      .findOne({ githubId: String(githubUser.id) })
      .then(data => data)
      .catch(error => {
        Logger.error(
          `Error getting user from database with githubId ${githubUser.id}`,
        );
        throw error;
      });

    if (user) {
      await user.update({
        ...deepClean({
          ...{
            ...githubUser,
            // Fields to not overwrite
            name:
              get(user, 'name', null) ||
              get(githubUser, 'name', get(githubUser, 'login', null)),
            email: githubUser.email || user.email,
          },
          avatar: githubUser.avatar_url,
        }),
      });
    }

    if (!user) {
      user = await this.userModel
        .create({
          ...deepClean(githubUser),
          githubId: githubUser.id,
          active: true,
          avatar: githubUser.avatar_url,
          name: get(
            githubUser,
            'name',
            get(githubUser, 'login', faker.name.findName()),
          ),
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          throw error;
        });
    }

    const token = await this.generateSession({
      ip: context.req.ip,
      userAgent: context.req.headers['user-agent'],
      user: { _id: user._id, role: user.role },
    });

    context.res.cookie('token', token, {
      maxAge: REFRESH_COOKIE_DURATION,
      domain: COOKIE_DOMAIN,
      httpOnly: true,
      secure: !IS_LOCAL,
    });

    return user;
  }

  async googleAuth(input, context) {
    const googleUser = await getGoogleUser({ code: input.code });

    let user = await this.userModel
      .findOne({ googleId: String(googleUser.id) })
      .exec();

    if (user) {
      await user.update({
        ...deepClean({
          ...{
            ...googleUser,
            // Fields to not overwrite
            name:
              get(user, 'name', null) ||
              `${googleUser.given_name} ${googleUser.family_name}`,
            email: googleUser.email || user.email,
          },
          avatar: googleUser.picture,
        }),
      });
    }

    if (!user) {
      user = await this.userModel
        .create({
          ...deepClean(googleUser),
          googleId: googleUser.id,
          active: true,
          avatar: googleUser.picture,
          name: `${googleUser.given_name} ${googleUser.family_name}`,
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          throw error;
        });
    }

    const token = await this.generateSession({
      ip: context.req.ip,
      userAgent: context.req.headers['user-agent'],
      user: { _id: user._id, role: user.role },
    });

    context.res.cookie(SESSION_TOKEN_NAME, token, {
      maxAge: REFRESH_COOKIE_DURATION,
      domain: COOKIE_DOMAIN,
      httpOnly: true,
      secure: !IS_LOCAL,
    });

    return user;
  }

  getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2Client.generateAuthUrl({
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes, // If you only need one scope you can pass it as string
    });
  }
}
