import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@auth/auth.module';
import { AuthService } from '@auth/auth.service';
import { SessionSchema } from '@auth/auth.schema';
import { UserModule } from '@user/user.module';
import { UserService } from '@user/user.service';
import { UserSchema } from '@user/user.schema';
import { AuthMiddleware } from './auth.middleware';
import {
  CORS_ORIGIN,
  MONO_DB_CONNECTION_STRING,
  ENGINE_API_KEY,
  ENV,
} from '@constants';
import { HealthzController } from './healthz/healthz.controller';
import SentryPlugin from './sentry.plugin';

@Module({
  imports: [
    MongooseModule.forRoot(MONO_DB_CONNECTION_STRING, {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Session', schema: SessionSchema },
    ]),
    GraphQLModule.forRoot({
      cors: {
        origin: CORS_ORIGIN,
        optionsSuccessStatus: 200,
        credentials: true,
      },
      plugins: [SentryPlugin],
      engine: {
        // The Graph Manager API key
        apiKey: ENGINE_API_KEY,
        // A tag for this specific environment (e.g. `development` or `production`).
        // For more information on schema tags/variants, see
        // https://www.apollographql.com/docs/platform/schema-registry/#associating-metrics-with-a-variant
        schemaTag: ENV,
      },
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [HealthzController],
  providers: [UserService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
