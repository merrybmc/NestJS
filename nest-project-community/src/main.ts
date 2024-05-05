import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // schema 사용 설정
  app.useGlobalPipes(new ValidationPipe());

  // Exception 전역 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8000);
}
bootstrap();
