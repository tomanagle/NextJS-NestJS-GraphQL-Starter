import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/user.schema';
import { GitHubAuthInput, RedditAuthInput } from '@input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(_returns => User)
  async gitHubAuth(@Args('input') input: GitHubAuthInput, @Context() context) {
    return this.authService.githubAuth(input, context);
  }

  @Query(_returns => User)
  async redditAuth(@Args('input') input: RedditAuthInput, @Context() context) {
    return this.authService.redditAuth(input, context);
  }

  @Query(_returns => User)
  async googleAuth(@Args('input') input: RedditAuthInput, @Context() context) {
    return this.authService.googleAuth(input, context);
  }

  @Query(_returns => String)
  async getGoogleAuthURL() {
    return this.authService.getGoogleAuthURL();
  }

  @Mutation(_returns => User, { nullable: true })
  async logout(@Context() context) {
    return this.authService.logout(context);
  }
}
