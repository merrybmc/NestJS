import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';

@Controller('cats')
// controller 단위 에러 커스텀 훅 사용
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  // router 단위 에러 커스텀 훅 사용
  // @UseFilters(HttpExceptionFilter)

  // router에 interceptor 주입
  @UseInterceptors(SuccessInterceptor)
  getAllCat() {
    // nest 에러 처리 (message, status)
    // throw new HttpException({ status: 'fail', message: 'api is broken' }, 401);

    // http-exception.filter 에러 훅을 만들었다면
    // throw new HttpException('api broken', 401);

    console.log('this is controller');

    return { cats: 'get all cat' };
  }

  @Get(':id')
  // id의 값을 받고 ParseIntPipe -> PositiveIntPipe -> param 순으로 거쳐서 전달된다. 미들웨어와 흡사한 구조다.
  // api 요청 life cycle
  // 1. middleware 로깅, 요청 검증, 헤더 설정 등의 작업 ->
  // 2. guard 권한 체크 등의 작업 ->
  // 3. interceptor 데이터 변환, 로깅, 캐싱 ->
  // 4. pipe 데이터 변환, 데이터 유효성 검사, 데이터 타입 검사, 타입 변환 ->
  // 5. controller 비즈니스 로직 처리 ->
  // 6. service -> DB 연결, 비즈니스 로직 수행, 외부 API 호출
  // 7 interceptor 요청, 응답 조작
  getCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: string) {
    // @Param()일 때
    // log 값 = { id : value }
    console.log(param); // cats/123 => { id : 123 }

    // @Param("id")일 때
    // log 값 = value (key : id)
    console.log(param, typeof param); // cats/123 => 123, string

    // Pipes
    // @Param("id", ParseIntPipe)일 때
    // 1. 타입이 string이며 숫자로 된 형태의 id 값을 number로 타입 변환 시켜줌
    // 2. 올바르지 않은 NaN 형태의 값을 전달받으면 바로 에러 예외처리
    console.log(param, typeof param); // cats/123 => 123, number
    console.log(param, typeof param); // cats/abc => 에러 예외처리
    return 'cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update put cat';
  }

  @Patch(':id')
  updatePatchCat() {
    return 'update patch cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete Cat';
  }
}
