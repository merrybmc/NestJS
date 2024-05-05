import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // Cat 서비스를 다른 컨트롤러에서도 사용 가능하게 도와주는 기능
})
export class CatsModule {}
