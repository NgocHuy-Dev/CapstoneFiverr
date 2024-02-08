import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentDto,CreateCommentDto } from './dto/comment.dto';
import { Request } from 'express';
import { ResponseDto } from 'src/dto/response.dto';

@ApiTags('BinhLuan')
@Controller('binh-luan')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private configService: ConfigService,
  ) {}

  @Get()
  getAllComment() {
    return this.commentsService.getAllComment();
  }

  @ApiBody({ type: CreateCommentDto })
  @Post()
  async createComment(@Req() req: Request): Promise<ResponseDto> {
    const {
      id_cong_viec,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    } = req.body;

    const checkComment = await this.commentsService.createComment(
      id_cong_viec,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    );

    if (checkComment.check) {
      throw new HttpException(
        {
          message: checkComment.message,
          content: checkComment.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkComment.message,
          content: checkComment.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({ type: CreateCommentDto })
  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  async updateComment(@Req() req: Request): Promise<ResponseDto> {
    const id = Number(req.params.id);
    const {
      id_cong_viec,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    } = req.body;

    const checkComment = await this.commentsService.updateComment(
      id,
      id_cong_viec,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    );
    if (checkComment.check) {
      throw new HttpException(
        {
          message: checkComment.message,
          content: checkComment.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkComment.message,
          content: checkComment.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteComment(@Req() req: Request): Promise<ResponseDto> {
    const id = Number(req.params.id);
    const checkComment = await this.commentsService.deleteComment(id);
    if (checkComment.check) {
      throw new HttpException(
        {
          message: checkComment.message,
          content: checkComment.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkComment.message,
          content: checkComment.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'jobId', type: Number })
  @Get('/lay-binh-luan-theo-cong-viec/:jobId')
  async getCommentById(@Req() req: Request): Promise<ResponseDto> {
    const jobId = Number(req.params.jobId);
    const checkComment = await this.commentsService.getCommentById(jobId);
    if (checkComment.check) {
      throw new HttpException(
        {
          message: checkComment.message,
          content: checkComment.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkComment.message,
          content: checkComment.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
