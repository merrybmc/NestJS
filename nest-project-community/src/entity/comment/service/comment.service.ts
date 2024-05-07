import { CatRepository } from 'src/entity/cat/cats.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentCreateDto } from '../dto/comment.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../comment.schema';
import { Model } from 'mongoose';
import { error } from 'console';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly catRepository: CatRepository,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, comment: CommentCreateDto) {
    try {
      const targetCat = await this.catRepository.findCatByWithoutPassword(id);
      const { content, author } = await comment;
      const validatedAuthor =
        await this.catRepository.findCatByWithoutPassword(author);
      const newComment = new this.commentModel({
        author: validatedAuthor._id,
        content,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
    return;
  }
}
