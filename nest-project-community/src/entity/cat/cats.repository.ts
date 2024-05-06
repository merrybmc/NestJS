import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { CatRequestDto } from './dto/cat.request.dto';

@Injectable()
export class CatRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  // 이메일을 받았을 때
  async existsByEmail(email: string) {
    try {
      // 이메일 존재 여부 체크
      const result = await this.catModel.exists({ email });
      return result;
    } catch (error) {
      // db랑 연결이 안될 경우 에러 처리
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto) {
    return await this.catModel.create(cat);
  }
}
