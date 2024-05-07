import { Injectable } from '@nestjs/common';
import { CommentCreateDto } from '../dto/comment.create.dto';

@Injectable()
export class CommentService {
  async getAllComments() {
    return;
  }

  async createComment(id: string, comment: CommentCreateDto) {}

  async plusLike(id: string) {
    return;
  }
}
