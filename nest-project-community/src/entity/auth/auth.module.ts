import { CatModule } from './../cat/cat.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatRepository } from '../cat/cats.repository';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    // PassportModule.register - Strategy 기본 설정
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),

    // jwt 서비스를 위용하기 위함
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1y' }, // 토큰 만료기간 - 1년
    }),

    // CatRepository를 사용하기 위함, auth 서비스에 의존성 주입
    // CatModule, // CatModule에 있는 exports 들을 사용 가능

    // module끼리 순환 공유할 때 문제가 생김 이럴 때
    forwardRef(() => CatModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
