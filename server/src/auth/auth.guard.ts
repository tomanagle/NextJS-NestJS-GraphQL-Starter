/*
 * Requires that the user is logged in to use a query, mutation or subscription
 * To use it, import this AuthGuard and UseGuards
 * import { UseGuards } from '@nestjs/common';
 * import { AuthGuard } from 'src/auth.guard';
 * Then a use it add the decorator above your querie, mutation or subscription
 * @UseGuards(AuthGuard)
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from '@enums';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return Boolean(req.user && Object.values(Roles).includes(req.user.role));
  }
}
