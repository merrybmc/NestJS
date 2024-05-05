import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CatModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
