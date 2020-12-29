import { Resolver, Query, Context, Args, Mutation } from '@nestjs/graphql';
import deepClean from 'deep-clean';
import { get } from 'lodash';
import { UserService } from '@user/user.service';
import { User } from '@user/user.schema';
import { GetUserInput, UpdateUserInput } from './user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput, @Context() context) {
    const userId = get(context, 'req.user._id');
    return this.userService.updateById({ userId, input: deepClean(input) });
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async me(@Context() context) {
    return this.userService.findOne({ _id: context.req.user });
  }

  @Query(() => User, { nullable: true })
  async user(@Args('input') input: GetUserInput) {
    return this.userService.findOne({ permalink: input.userPermalink });
  }
}
