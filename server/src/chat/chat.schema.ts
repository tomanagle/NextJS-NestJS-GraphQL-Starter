import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => String, { nullable: false })
  @Field({ nullable: false })
  readonly body: string;

  @Field({ nullable: false })
  readonly sent: string;
}
