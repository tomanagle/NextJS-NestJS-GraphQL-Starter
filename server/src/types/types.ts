import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class WithId {
  @Field(_type => ID, { nullable: false })
  _id: string;
}
