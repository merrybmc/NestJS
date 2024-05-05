import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // nest console.log 찍는법

  use(req: Request, res: Response, next: NextFunction) {
    console.log('this is middleware js log', req, res);
    this.logger.log('this is middleware nest log', req, res);

    next();
  }
}
