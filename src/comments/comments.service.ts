import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseDto } from 'src/dto/response.dto';
import { ResponseCommentDto } from './dto/comment.dto';
import e from 'express';

@Injectable()
export class CommentsService {
  prisma = new PrismaClient();

  async getAllComment() {
    try {
      let data = await this.prisma.binhLuan.findMany();
      return {
        message: 'Xử lý thành công',
        content: data,
      };
    } catch (error) {
      throw error;
    }
  }

  async createComment(
    id_cong_viec: number,
    ma_nguoi_binh_luan: number,
    ngay_binh_luan: Date,
    noi_dung: string,
    sao_binh_luan: number,
  ): Promise<ResponseDto> {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        id: ma_nguoi_binh_luan,
      },
    });
    let checkJob = await this.prisma.congViec.findFirst({
      where: {
        id: id_cong_viec,
      },
    });

    if (!checkUser) {
      return {
        check: false,
        message: 'Người dùng không tồn tại',
        content: '',
      };
    } else if (!checkJob) {
      return {
        check: false,
        message: 'Không tồn tại công việc',
        content: '',
      };
    } else {
      let data = await this.prisma.binhLuan.create({
        data: {
          id_cong_viec,
          ma_nguoi_binh_luan,
          ngay_binh_luan,
          noi_dung,
          sao_binh_luan,
        },
      });
      return {
        check: true,
        message: 'Xử lý thành công',
        content: data,
      };
    }
  }

  async updateComment(
    id: number,
    id_cong_viec: number,
    ma_nguoi_binh_luan: number,
    ngay_binh_luan: Date,
    noi_dung: string,
    sao_binh_luan: number,
  ): Promise<ResponseDto> {
    let data = await this.prisma.binhLuan.update({
      where: {
        id: id,
      },
      data: {
        id_cong_viec,
        ma_nguoi_binh_luan,
        ngay_binh_luan,
        noi_dung,
        sao_binh_luan,
      },
    });

    return {
      check: true,
      message: 'Xử lý thành công nhe!!!!',
      content: data,
    };
  }

  async deleteComment(id: number): Promise<ResponseDto> {
    let checkComment = await this.prisma.binhLuan.findFirst({
      where: {
        id: id,
      },
    });

    if (!checkComment) {
      return {
        check: false,
        message: 'Không tồn tại bình luận',
        content: '',
      };
    } else {
      await this.prisma.binhLuan.delete({
        where: {
          id: id,
        },
      });
      return {
        check: true,
        message: 'Xử lý thành công',
        content: 'Binh luận đã bị xóa',
      };
    }
  }

  async getCommentById(jobId: number): Promise<ResponseDto> {
    let checkComment = await this.prisma.binhLuan.findFirst({
      where: {
        id_cong_viec: jobId,
      },
    });
    if (!checkComment) {
      return {
        check: false,
        message: 'Không tồn lại mã công việc',
        content: 'Thêm mã công việc và thử lại nhé',
      };
    } else {
      let data = await this.prisma.binhLuan.findMany({
        where: {
          id_cong_viec: jobId,
        },
      });
      return {
        check: true,
        message: 'Xử lý thành công',
        content: data,
      };
    }
  }
}
