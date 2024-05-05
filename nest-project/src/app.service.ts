import { Injectable } from '@nestjs/common';

// @Injectable() 공급자 데코레이터
// 의존성 주입 가능, Controller로부터 인스턴스를 제공받을 수 있음
@Injectable()
export class AppService {
  getHello(body, param): string {
    console.log('Hello World');
    return 'Hello World!';
  }
}
