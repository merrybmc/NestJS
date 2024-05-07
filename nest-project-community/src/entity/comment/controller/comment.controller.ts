import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentCreateDto } from '../dto/comment.create.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @ApiOperation({ summary: '모든 댓글 읽어오기' })
  @Get('')
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '댓글 남기기' })
  @Post(':id')
  async createComment(@Param('id') id: string, @Body() body: CommentCreateDto) {
    return this.commentsService.createComment(id, body);
  }

  @ApiOperation({ summary: '좋아요 수' })
  @Post(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.createComment(id);
  }
}
