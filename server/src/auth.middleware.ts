import { get } from 'lodash';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { User, UserModel, UserSchema } from '@user/user.schema';
import { Model } from 'mongoose';
import { SessionSchema } from '@auth/auth.schema';

function parseCookie(cookie) {
  cookie.reduce((res, c) => {
    const [key, val] = c
      .trim()
      .split('=')
      .map(decodeURIComponent);
    try {
      return Object.assign(res, { [key]: JSON.parse(val) });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(
    req: Request & { user: string; ip: string },
    res: Response,
    next: Function,
  ) {
    const token = get(req, 'cookies.token');
    if (!token) {
      return next();
    }

    const refreshToken = await this.authService.getSession({ token });
    req.user = get(refreshToken, 'user', null);

    return next();
  }
}
