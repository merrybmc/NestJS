import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status = exception.getStatus();
    const error = exception.getResponse();

    if (typeof error === 'string') {
      res.status(status).json({
        statusCode: status,
        error,
      });
    } else {
      res.status(status).json({
        statusCode: status,
        ...error,
      });
    }
  }
}
