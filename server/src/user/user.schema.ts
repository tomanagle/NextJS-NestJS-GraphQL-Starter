import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import validator from 'validator';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import permalink from 'mongoose-permalink';
import jwt from 'jsonwebtoken';
import { SIGNING_KEY } from '../config/secrets';
import randomBytes from '../utils/randomBytes';
import { Roles } from '@enums';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String },
    name: String,
    password: { type: String },
    active: { type: Boolean, default: false },
    bio: String,
    role: { type: String, enum: Object.values(Roles), default: Roles.USER },
    tokens: {
      emailVerification: { type: String, default: randomBytes() },
    },
    githubId: { type: String, required: false },
    redditId: { type: String, required: false },
    googleId: { type: String, required: false },
    avatar: String,
  },
  {
    timestamps: true,
  },
);

function encryptPassword(
  this: User & { password: string },
  next: mongoose.HookNextFunction,
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    return bcrypt.genSalt(5, (saltErr, salt) => {
      if (saltErr) return next(saltErr);
      return bcrypt.hash(
        user.password,
        salt,
        () => {
          return;
        },
        (hashErr: Error, hash: string) => {
          if (hashErr) return next(hashErr);

          user.password = hash;
          return next();
        },
      );
    });
  } catch (error) {
    return next(error);
  }
}

function validateEmail(this: User, next: mongoose.HookNextFunction) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (!this.email) {
      return next();
    }
    if (validator.isEmail(user.email)) {
      return next();
    }
    return next(new Error('Invalid email address'));
  } catch (e) {
    return next(e);
  }
}

UserSchema.pre('save', encryptPassword);
UserSchema.pre('save', validateEmail);

UserSchema.plugin(permalink, {
  sources: ['name'],
});

UserSchema.methods.generateJWT = function(): string {
  return jwt.sign({ _id: this._id }, SIGNING_KEY, { expiresIn: '1h' });
};

@ObjectType()
export class User extends Document {
  @Field(_type => ID, { nullable: false })
  readonly _id: string;

  @Field({ nullable: true })
  readonly email: string;

  @Field({ nullable: false })
  readonly name: string;

  @Field({ nullable: false })
  readonly permalink: string;

  @Field({ nullable: false })
  readonly active: boolean;

  @Field()
  readonly githubId: string;

  @Field()
  readonly redditId: string;

  @Field({ nullable: true })
  readonly avatar?: string;

  @Field({ nullable: true })
  readonly bio?: string;

  @Field(_type => Roles, { nullable: false })
  readonly role: Roles;
}

export interface UserModel extends User {
  generateJWT(): string;
}
