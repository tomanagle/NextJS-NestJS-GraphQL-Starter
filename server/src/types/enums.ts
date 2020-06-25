import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  USER = 'User',
  ADMIN = 'Admin',
}

registerEnumType(Roles, {
  name: 'Roles',
});
