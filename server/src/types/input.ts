import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateTaxonomyInput {
  @Field({ nullable: false })
  friendlyName: string;
}

@InputType()
export class CreateTagInput {
  @Field({ nullable: false })
  friendlyName: string;
  @Field(_type => ID, { nullable: false })
  taxonomy: string;
}

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  limit?: number;
}

@InputType()
export class GitHubAuthInput {
  @Field({ nullable: true })
  code: string;
}
@InputType()
export class RedditAuthInput {
  @Field({ nullable: true })
  code: string;
}

@InputType()
export class LoginInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

@InputType()
export class ConfirmEmailInput {
  @Field(_type => ID, { nullable: false })
  _id: string;
  @Field(_type => String, { nullable: false })
  emailVerification: string;
}

/*
 * Post
 */

@InputType()
export class CreatePostInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  code: string;

  @Field({ nullable: false })
  description: string;

  @Field(_type => ID, { nullable: false })
  language: string;

  @Field(_type => [ID], { nullable: true })
  algorithms: string[];

  @Field(_type => [ID], { nullable: true })
  dataStructures: string[];
}

@InputType()
export class GetUserInput {
  @Field(_type => String, { nullable: false })
  userPermalink: string;
}

@InputType()
export class UpdateUserInput {
  @Field(_type => String, { nullable: true })
  email?: string;

  @Field(_type => String, { nullable: true })
  name?: string;

  @Field(_type => String, { nullable: true })
  bio?: string;
}

@InputType()
export class CreateFeedbackInput {
  @Field(_type => String, { nullable: false })
  message: string;

  @Field(_type => Number, { nullable: false })
  rating: number;
}
