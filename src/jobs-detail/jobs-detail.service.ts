import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import e from 'express';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class JobsDetailService {
  prisma = new PrismaClient();

  async getAllJobDetail() {
    let data = await this.prisma.chiTietLoaiCongViec.findMany({
      include: {
        LoaiCongViec:true
      }
    });
    return {
      message: 'Xử lý thành công',
      content: data,
    };
  }

  async createJobDetail(
    ten_chi_tiet_cv: string,
    ma_loai_cong_viec:number): Promise<ResponseDto> {
      let checkJobType = await this.prisma.loaiCongViec.findFirst({
        where: {
          id: ma_loai_cong_viec
        }
      })
      if(checkJobType) {
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
      } else {
        return {
          check:false,
          message:"Loại công việc không tồn tại",
          content:""
        }
      }
    
  }

  async getDetailPage(pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<ResponseDto> {
    let stringToSearch = {};
      if (keyword) {
        stringToSearch = {
          name: {
            contains: keyword,
          },
        };
      }
      let data = await this.prisma.chiTietLoaiCongViec.findMany({
        skip: pageIndex || 0,
        take: pageSize || 10,
        where: {
          ten_chi_tiet_cv: {
            contains: keyword || '',
          },
        },
      });
      return {
        check: true,
        message: 'Xử lý thành công',
        content: data,
      };
  }

  async getDetailById(id: number): Promise<ResponseDto> {
      let data = await this.prisma.chiTietLoaiCongViec.findFirst({
        where: {
          id: id,
        },
      });
      if (data) {
        return {
          check: true,
          message: 'Xử lý thành công',
          content: data,
        };
      } else {
        return {
          check: false,
          message: 'Không tồn tại id',
          content: '',
        };
      }
    } 

  async updateDetail(
      id: number,
      ten_chi_tiet_cv: string,
      ma_loai_cong_viec:number
    ): Promise<ResponseDto> {
      let checkDetail = await this.prisma.chiTietLoaiCongViec.findFirst({
        where: {id}
      })
      let checkJobTypeId= await this.prisma.loaiCongViec.findFirst({
        where: {id: ma_loai_cong_viec}
      })
      if(checkDetail) {
        if(checkJobTypeId) {
          let dataUpdate = await this.prisma.chiTietLoaiCongViec.update({
            where: {id},
            data: {
              ten_chi_tiet_cv,
              ma_loai_cong_viec
            },
          });
          return {
            check: true,
            message: 'Xử lý thành công',
            content: dataUpdate,
          };
        } else {
          return {
            check: false,
            message:"Mã loại công việc không đúng",
            content:""
          }
        }
        
      } else {
        return {
          check:false,
          message:"Không tồn tại chi tiết loại công việc",
          content:""
        }
      }
      } 

      async deleteDetail(id: number): Promise<ResponseDto> {
        let checkDetail = await this.prisma.chiTietLoaiCongViec.findFirst({
          where: {
            id: id,
          },
        });
    
        if (!checkDetail) {
          return {
            check: false,
            message: 'Không tồn lại loại công việc',
            content: '',
          };
        } else {
          let dataDelete=  await this.prisma.chiTietLoaiCongViec.delete({
            where: {
              id: id,
            },
          });
          return {
            check: true,
            message: 'Xử lý thành công',
            content: dataDelete,
          };
        }
      }


  }

