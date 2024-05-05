import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatRequestDto } from './dto/cat.request.dto';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';

@Controller('cat')
export class CatController {
  constructor(private readonly catsService: CatService) {}

  @Post()
  // DTO (Data Transfer Object)
  // 계층간 데이터 교환을 위한 객체
  // Client -> Controller -> Service -> DB

  // Dto 타입 지정
  // 값이 올바르지 않으면 에러 예외처리
  @UseInterceptors(SuccessInterceptor)
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }
}
