import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from '../cat.schema';

export class CatResponseDto extends PickType(Cat, [
  'id',
  'email',
  'name',
] as const) {}
