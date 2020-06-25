import { get } from 'lodash';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

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
