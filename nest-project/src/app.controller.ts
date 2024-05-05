import { Body, Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { CatsService } from './cats/cats.service';

// @Controller() 데코레이터
// express의 router 기능
// @Controller() === "/"
// @Controller("cats") === "/cats"
@Controller('cats')
export class AppController {
  // 서비스 의존성 주입
  constructor(
    private readonly appService: AppService,
    // cats 모듈에서 export를 했기 때문에 App 서비스에서도 Cats 서비스를 사용 가능
    private readonly catsService: CatsService,
  ) {}

  // @Get()데코레이터
  // express의 app.get()
  // @Get() === route.get("/")
  // @Get("hello") === route.get("/hello")
  @Get('hello/:id')
  getHello(
    @Req() req: Request,
    @Res() res: Response,
    @Body() Body,
    @Param() Param: { id: string }, // type 지정
    @Query() Query,
  ): string {
    // const body = req.body; // next.js에서도 가능 (express)
    const body = Body; // nest 축약 버전 - const body =req.body; 와 같음

    // const param = req.params; // next.js에서도 가능 (express)
    const param = Param; // nest 축약 버전 - const param = req.params; 와 같음

    // const query = req.query; // next.js에서도 가능 (express)
    const query = Query; // nest 축약 버전 - const query - req.query; 와 같음

    // 서비스 코드에서 사용할 데이터를 인자로 넘겨주기
    return this.appService.getHello(body, param);
  }
}
