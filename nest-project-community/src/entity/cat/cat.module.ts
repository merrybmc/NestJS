import { forwardRef, Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatRepository } from './cats.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  // mongodb query schema 사용
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatController],
  providers: [CatService, CatRepository], // private 사용
  exports: [CatService, CatRepository], // public화
})
export class CatModule {}
