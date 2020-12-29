import { Field, InputType } from '@nestjs/graphql';

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
