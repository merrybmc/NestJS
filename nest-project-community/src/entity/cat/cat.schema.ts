import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

// 생성, 수정 시간을 만들어줄 것인지
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  // @ApiProperty 데코레이터 - swagger 예시에 클라이언트가 req에 넣어야할 데이터 예시 추가
  @ApiProperty({
    example: '1q2w3e4r',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'hello@world.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true, // 필수 여부
    unique: true, // 중복 여부
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'hellouser',
    description: 'name',
    required: true,
  })
  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'img.url',
    description: 'password',
  })
  @Prop()
  @IsString()
  imgUrl: string;

  // res 반환할 때 보여줄 데이터만 필터링
  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// res 반환할 때 보여줄 데이터만 필터링
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
