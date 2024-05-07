import { forwardRef, Module } from '@nestjs/common';
import { CatController } from './controller/cat.controller';
import { CatService } from './service/cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatRepository } from './cats.repository';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // mongodb query schema 사용
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
    // 이미지 업로드
    MulterModule.register({
      // 이미지 저장 경로 : upload 폴더
      dest: './upload',
    }),
  ],
  controllers: [CatController],
  providers: [CatService, CatRepository], // private 사용
  exports: [CatService, CatRepository], // public화
})
export class CatModule {}
