import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseHireJobDto } from './dto/hire-jobs.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { escape } from 'querystring';

@Injectable()
export class HireJobService {
    prisma = new PrismaClient()

    async getHireJob():Promise<ResponseHireJobDto> {
        let data =  await this.prisma.thueCongViec.findMany()
        return {
            content:data
        }
    }

    async createHireJob(
        ma_cong_viec:number,
        ma_nguoi_thue:number,
        ngay_thue:Date,
        hoan_thanh: boolean
    ):Promise<ResponseDto> {
        const checkJob = await this.prisma.congViec.findFirst({
            where: {
                id: ma_cong_viec
            }
        })
        const checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                id:ma_nguoi_thue
            }
        })

        if(checkJob && checkUser) {
            let data = await this.prisma.thueCongViec.create({
                data: {
                    ma_cong_viec,
                    ma_nguoi_thue,
                    ngay_thue,
                    hoan_thanh
                }
            })
            return {
                check:true,
                message:"Xử lý thành công",
                content:data
            }
        } else {
            return {
                check:false,
                message:"Người dùng hoặc công việc không tồn tại",
                content:""
            }
        }
    }   

    async getHireJobById(id:number):Promise<ResponseDto> {
        let data = await this.prisma.thueCongViec.findFirst({
            where: {
                id:id
            }
        })
        if(data) {
            return {
                check:true,
                message:"Xử lý thành công",
                content:data,
            }
        } else {
            return {
                check: false,
                message:"Không tìm thấy dữ liệu",
                content:""
            }
        }
    }

    async updateHireJob(
        id:number,
        ma_nguoi_thue:number,
        ma_cong_viec:number,
        ngay_thue:Date,
        hoan_thanh:boolean
    ):Promise<ResponseDto> {
        let checkId = await this.prisma.thueCongViec.findFirst({
            where: {id}
        })
        const checkJob = await this.prisma.congViec.findFirst({
            where: {
                id: ma_cong_viec
            }
        })
        const checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                id:ma_nguoi_thue
            }
        })
        if(!checkId) {
            return {
                check:false,
                message:"Không tồn tại ID",
                content:""
            }
        } else if(!checkJob || !checkUser) {
            return {
                check:false,
                message:"Người dùng hoặc công việc không tồn tại",
                content:""
            }
        }
            else {
            let data = await this.prisma.thueCongViec.update({
                where: { id },
                data: {
                  ma_cong_viec,
                  ma_nguoi_thue,
                  ngay_thue,
                  hoan_thanh,
                },
              });
              return {
                check:true,
                message:"Xử lý thành công",
                content: data
              }
        }
    }

    
    async deleteHireJob(id:number):Promise<ResponseDto> {
        let checkId = await this.prisma.thueCongViec.findFirst({
            where: {id:id}
        })
        if(!checkId) {
            return {
                check:false,
                message:"Không tìm thấy thuê công việc",
                content:""
            }
        } else {
            await this.prisma.thueCongViec.delete({
                where: {id:id}
            })
            return {
                check:true,
                message:"Xử lý thành công",
                content:""
            }
        }
    }

    async getHiredJob():Promise<ResponseDto> {
        let data = await this.prisma.thueCongViec.findMany({
            include: {
              CongViec: true,
            },
          });
          
          if(data && data.length>0) {
            return {
                check: true,
                message: "Xử lý thành công",
                content: data,
              };
          } else {
            return {
                check: false,
                message: "Không tìm thấy dữ liệu",
                content:""
            }
          }
    }


    async compeleteJob(id: number):Promise<ResponseDto> {
        let data = await this.prisma.thueCongViec.findFirst({
            where: {id}
        })
        if(data) {
            if(data.hoan_thanh) {
                return {
                    check:false,
                    message:"Công việc đã hoàn thành",
                    content:data
                }
            } else {
                let newData = await this.prisma.thueCongViec.update({
                    where: {id},
                    data: {
                        hoan_thanh: true
                    }
                })
                return {
                    check:true,
                    message:"Xử lý thành công",
                    content: newData
                }
            }
        } else {
            return {
                check:false,
                message:"Không tìm thấy dữ liệu",
                content:"Thuê công việc và thử lại"
            }
        }
    }
}


