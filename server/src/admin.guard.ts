/*
 * Requires that the user is logged in and is of type Admin to use a query, mutation or subscription
 * To use it, import this AdminGuard and UseGuards
 * import { UseGuards } from '@nestjs/common';
 * import { AdminGuard } from 'src/admin.guard';
 * Then a use it add the decorator above your querie, mutation or subscription
 * @UseGuards(AdminGuard)
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from '@enums';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return Boolean(req.user && req.user.role === Roles.ADMIN);
  }
}
