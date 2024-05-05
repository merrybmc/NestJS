import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { strict } from 'assert';

// 에러 전송 커스텀 훅
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // ctx = 실행 환경에 대한 context
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception.getStatus();
    // const error = exception.getResponse(); // 메세지

    // return 되는 error 형태중에 message가 전송되었을 때 분기 처리 하고싶은 경우
    const error = exception.getResponse();
    // as
    //   | string
    //   | { error; string; number; message };

    if (typeof error === 'string') {
      // express와 같은 에러 전송 형태
      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        error,
      });
    } else {
      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        ...error,
      });
    }
  }
}
