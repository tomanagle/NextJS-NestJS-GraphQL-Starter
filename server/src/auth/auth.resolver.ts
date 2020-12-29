import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/user.schema';
import { SocialAuthInput } from './auth.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User)
  async gitHubAuth(@Args('input') input: SocialAuthInput, @Context() context) {
    return this.authService.githubAuth(input, context);
  }

  @Query(() => User)
  async redditAuth(@Args('input') input: SocialAuthInput, @Context() context) {
    return this.authService.redditAuth(input, context);
  }

  @Query(() => User)
  async googleAuth(@Args('input') input: SocialAuthInput, @Context() context) {
    return this.authService.googleAuth(input, context);
  }

  @Query(() => String)
  async getGoogleAuthURL() {
    return this.authService.getGoogleAuthURL();
  }

  @Mutation(() => User, { nullable: true })
  async logout(@Context() context) {
    return this.authService.logout(context);
  }
}
