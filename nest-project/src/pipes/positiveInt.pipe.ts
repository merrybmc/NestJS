import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

// 파이프 커스텀 훅 만들기
@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    console.log(value);

    // 파이프에서 에러 예외처리도 가능하다.
    if (value < 0) {
      throw new HttpException('value = 0', 400);
    }

    return value;
  }
}
