import { HttpException, Injectable } from '@nestjs/common';
import { CatRepository } from '../cat/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatRepository,
    // jwt 서비스를 이용하기 위함
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // email check
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new HttpException('이메일을 올바르게 입력해주세요', 400);
    }

    // password check
    const isPasswordValid = await bcrypt.compare(password, cat.password);
    if (!isPasswordValid) {
      throw new HttpException('비밀번호를 올바르게 입력해주세요', 400);
    }

    const payload = { email, sub: cat.id };

    return {
      // 토큰 발급
      token: this.jwtService.sign(payload),
    };
  }
}
