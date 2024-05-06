import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from '../cat.schema';

// 타입스크립트의 type 별칭이나 interface를 사용하지 않는 이유는 validator를 사용하기 위함
// PickType - 필요한 것만 골라서 옴 schema의 key 값을 ['key'] 로 넣으면 됨
// OmitType - 전체 중에서 필요 없는것만 뺌 PickType의 반대
export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
