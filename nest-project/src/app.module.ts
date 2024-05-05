import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { CatsService } from './cats/cats.service';

@Module({
  // 각 모듈이 앱 모듈로 하나로 묶여서 main으로 가게 된다.
  // 리액트와 유사한 것 같다.
  imports: [CatsModule, UsersModule], // 리액트의 하위 컴포넌트들과 비슷해보인다.
  controllers: [AppController], // 리액트의 상위 App.js 컴포넌트 역할일 것 같다.
  providers: [AppService], // 리액트의 App.js 컴포넌트의 구현부와 유사할 것 같다.
})
export class AppModule {} // 리액트의 index.js와 유사해보인다.
