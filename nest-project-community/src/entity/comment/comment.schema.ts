import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

// 생성, 수정 시간을 만들어줄 것인지
const options: SchemaOptions = {
  //   collection: 'cats', // collections 이름도 지정 가능, 넣지 않을 시 class 이름이 들어감
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  // @ApiProperty 데코레이터 - swagger 예시에 클라이언트가 req에 넣어야할 데이터 예시 추가

  @Prop({
    type: Types.ObjectId,
    required: true, // 필수 여부
    unique: true, // 중복 여부
    ref: 'cats',
  })
  @IsEmail()
  @IsNotEmpty()
  author: Types.ObjectId; // 상대방 Id

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  info: Types.ObjectId; // 누구한테 썼는지 상대방 Id

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @Prop({
    default: 0, // 기본값 설정
    required: true,
  })
  @IsPositive()
  likeCount: number;

  // res 반환할 때 보여줄 데이터만 필터링
  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

// res 반환할 때 보여줄 데이터만 필터링
CommentSchema.virtual('readOnlyData').get(function (this: Comment) {
  return {
    id: this.id,
    // email: this.email,
    // name: this.name,
  };
});
