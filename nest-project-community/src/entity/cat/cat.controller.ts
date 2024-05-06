import { AuthService } from './../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CatRequestDto } from './dto/cat.request.dto';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatResponseDto } from './dto/cat.response.dto';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Controller('cat')
export class CatController {
  constructor(
    private readonly catsService: CatService,
    private readonly AuthService: AuthService,
  ) {}

  @ApiOperation({ summary: '고양이 정보 가져오기' })
  // JwtAuthGuard 사용
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  // swagger ApiOperation 데코레이터 - api 설명 추가
  // ApiResponse 데코레이터 - res 반환할 때 데이터 예시 추가
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CatResponseDto, // 성공 시 예시 데이터
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
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

  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.AuthService.jwtLogIn(data);
  }
}
