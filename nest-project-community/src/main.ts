import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // schema 사용 설정
  app.useGlobalPipes(new ValidationPipe());

  // Exception 전역 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger setting
  const config = new DocumentBuilder()
    .setTitle('cat community')
    .setDescription('hello api docs')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  // parameter 1 = swagger api의 end point 지정 (주소 지정 ex) "docs" - port/docs)
  SwaggerModule.setup('docs', app, document);

  // CORS 설정
  app.enableCors({
    origin: true, // true - 아무나 접근 가능, 특정 url 입력 - 해당 url만 접근 가능
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
