import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

// 생성, 수정 시간을 만들어줄 것인지
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true, // 필수 여부
    unique: true, // 중복 여부
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  // 보여줄 데이터만 필터링
  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// 보여줄 데이터만 필터링
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
