import { get } from 'lodash';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from './auth/auth.middleware';
import {
  CORS_ORIGIN,
  MONO_DB_CONNECTION_STRING,
  ENGINE_API_KEY,
  ENV,
} from '@constants';
import { HealthzController } from './healthz/healthz.controller';
import SentryPlugin from './sentry.plugin';
import { services, schemas, resolvers } from './config/providers';
import { ChatModule } from '@chat/chat.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(MONO_DB_CONNECTION_STRING, {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([...schemas]),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,

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
      context: ({ req, res, connection }) => {
        const clientId = get(connection, 'context.clientId');
        return { req, res, ...(clientId && { clientId }) };
      },
    }),
    AuthModule,
    ChatModule,
    UserModule,
  ],
  controllers: [HealthzController],
  providers: [...services, ...resolvers],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
