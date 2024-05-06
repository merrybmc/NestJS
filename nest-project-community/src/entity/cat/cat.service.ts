import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CatRequestDto } from './dto/cat.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cat.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatService {
  // 값을 DB에 넣으려면 query를 써야하는데 schema가 이 때 필요하다.
  // schema 의존성 주입
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    // 해당하는 db에서 email field를 검색해서 email과 일치하는 데이터가 존재하는지 확인
    // 이미 존재하는 이메일이라면 true
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      //   throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403);
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.'); // 403 에러 반환 함수
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create - DB 저장
    const cat = await this.catModel.create({
      email,
      name,
      password: hash,
    });

    // res 반환할 때 보여줄 데이터만 필터링
    return cat.readOnlyData;
  }
}
