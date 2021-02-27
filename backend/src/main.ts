import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as ContextService from 'request-context';
import { AppModule } from './app.module';
import { setRequestContextMiddleware } from './common/middlewares/context.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationPipe = new ValidationPipe({
    whitelist: true,
  });

  app.use(ContextService.middleware('request'));
  app.use(setRequestContextMiddleware);

  app.enableCors();
  app.useGlobalPipes(validationPipe);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
