import { ChatResolver } from '@chat/chat.resolver';

import { SessionSchema } from '@auth/auth.schema';
import { AuthService } from '@auth/auth.service';
import { AuthResolver } from '@auth/auth.resolver';

import { UserSchema } from '@user/user.schema';
import { UserService } from '@user/user.service';
import { UserResolver } from '@user/user.resolver';

export const services = [UserService, AuthService];

export const resolvers = [UserResolver, AuthResolver, ChatResolver];

export const schemas = [
  { name: 'User', schema: UserSchema },
  { name: 'Session', schema: SessionSchema },
];
