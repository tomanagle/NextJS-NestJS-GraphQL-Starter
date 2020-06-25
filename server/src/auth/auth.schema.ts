import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import randomBytes from '../utils/randomBytes';

export const SessionSchema = new mongoose.Schema(
  {
    ip: String,
    userAgent: String,
    token: { type: String, default: randomBytes(128) },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  },
);

@ObjectType()
export class Session extends Document {
  @Field(_type => ID, { nullable: false })
  readonly _id: string;

  @Field()
  readonly userAgent: string;

  @Field({ nullable: false })
  readonly token: string;

  @Field(_type => ID, { nullable: false })
  readonly user: string;
}
