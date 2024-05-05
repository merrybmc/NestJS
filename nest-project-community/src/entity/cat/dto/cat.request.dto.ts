import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// 타입스크립트의 type 별칭이나 interface를 사용하지 않는 이유는 validator를 사용하기 위함
export class CatRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
