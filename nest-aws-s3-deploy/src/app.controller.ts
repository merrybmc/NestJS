import { AwsService } from './aws.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly AwsService: AwsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('key')
  getImageUrl(@Body('key') key: string) {
    return this.AwsService.getAwsS3FileUrl(key);
  }
}
