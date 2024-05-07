import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { CatController } from './controller/cat.controller';
import { CatService } from './service/cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatRepository } from './cats.repository';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterExtendedModule } from 'nestjs-multer-extended';

@Module({
  // mongodb query schema 사용
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
    // 이미지 업로드
    MulterModule.register({
      // 이미지 저장 경로 : upload 폴더
      dest: './upload',
    }),
    // Multer + AWS S3 연동
    MulterExtendedModule.register({
      awsConfig: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECREY_KEY,
        region: 'us-east-1',
      },
      bucket: 'bmcnestcat',
      basePath: 'cis', // 어떤 폴더로 업로드될지 경로 지정
      fileSize: 1 * 1024 * 1024,
    }),
  ],
  controllers: [CatController],
  providers: [CatService, CatRepository], // private 사용
  exports: [CatService, CatRepository], // public화
})
export class CatModule {}
