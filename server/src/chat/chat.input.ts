import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MessageSentInput {
  @Field()
  clientId: string;
}

@InputType()
export class SendMessageInput {
  @Field({ nullable: false })
  body: string;
}
