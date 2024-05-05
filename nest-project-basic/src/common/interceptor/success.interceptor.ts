import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

// Aspect Oriented Programming 시각으로 모듈화
@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // controller로 가기 전 처리
    console.log('before');

    // const now = Date.now();

    // contorller 이후 처리
    return (
      next
        .handle()
        // .pipe(tap(() => console.log(`After ${Date.now() - now}ms`)));
        .pipe(
          map((data) => ({
            success: true,
            data,
          })),
        )
    );
  }
}
