import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './common/filters/entity-not-found-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: true });
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, skipMissingProperties: false }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/docs', app, swaggerDocument);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(1337);

  Logger.log(`Listening on http://localhost:1337`, 'Bootstrap');
}

bootstrap();
