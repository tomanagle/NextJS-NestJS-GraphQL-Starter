import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { SENTRY_DSN, ENV } from '@constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENV,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  Logger.log(`Starting server in ${ENV} mode`);
  await app.listen(5000);
}
bootstrap();
