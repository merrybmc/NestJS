import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatRepository } from 'src/entity/cat/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY, // 유출되면 안되는 key
      ignoreExpiration: false, // 만료 기간 설정
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByWithoutPassword(payload.sub);

    if (cat) {
      return cat;
    } else {
      throw new HttpException('접근 오류', 400);
    }
  }
}
