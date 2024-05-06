import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

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

  // 해당 경로로 접근 시도시 아이디,비밀번호 입력
  app.use(
    ['/docs', '/docs-json', '/test'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.ADMIN_NAME]: process.env.ADMIN_PASSWORD,
      },
    }),
  );

  // CORS 설정
  app.enableCors({
    origin: true, // true - 아무나 접근 가능, 특정 url 입력 - 해당 url만 접근 가능
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();

// Repository pattern과 레이어 분리
// 서비스 간에 서로 참조가 필요할 때 순환 참조가 가능하긴 하지만 가독성이 떨어짐.
// 다른 서비스가 하나의 repository를 참조하면 서비스는 각각의 비즈니스 로직에만 집중 가능
// 모듈간의 책임 분리 가능
// 서비스에서 데이터의 출처와 관계없이 데이터 참조 가능
// 리액트의 상태관리 라이브러리와 유사한듯
