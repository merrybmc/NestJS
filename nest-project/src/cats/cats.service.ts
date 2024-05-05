import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  helloCatServiceProduct() {
    return 'hello cat!';
  }
}
