import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class JobsDetailService {
  prisma = new PrismaClient();

  async getAllJobDetail() {
    let data = await this.prisma.chiTietLoaiCongViec.findMany();
    return {
      message: 'Xử lý thành công',
      content: data,
    };
  }

  async createJobDetail(ten_chi_tiet_cv: string): Promise<ResponseDto> {
    let data = await this.prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet_cv: ten_chi_tiet_cv,
      },
    });
    return {
      check: true,
      message: 'Xử lý thành công',
      content: {
        id: data.id,
        ten_chi_tiet_cv: data.ten_chi_tiet_cv,
      },
    };
  }
}
