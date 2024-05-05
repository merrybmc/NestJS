import { updateCat } from './../../../letsStart/src/cats/cats.service';
import { CatsService } from './cats.service';
import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cat';
  }

  @Get(':id')
  getCat() {
    return 'cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update put cat';
  }

  @Patch(':id')
  updatePatchCat() {
    return 'update patch cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete Cat';
  }
}
