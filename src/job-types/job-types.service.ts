import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AllJobType, JobTypeDto } from './dto/job-types.dto';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class JobTypesService {
    prisma = new PrismaClient()

    async findAll(): Promise<AllJobType> {
      try {
        const data = await this.prisma.loaiCongViec.findMany();
        return {
          content: data,
        };
      } catch (exception) {
        if(exception.status != 500)
        throw new HttpException("lỗi tè le... ", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async addType(ten_loai_cong_viec:string):Promise<ResponseDto> {
      try {
        let data = await this.prisma.loaiCongViec.create({
          data: {
            ten_loai_cong_viec,
          }
        })
        return {
          check: true,
          message: "Thêm loại công việc thàng công",
          content: {
            id: data.id,
            ten_loai_cong_viec: ten_loai_cong_viec
          }
        }
      } catch  (exception) {
        if(exception.status != 500)
        
        throw new HttpException("lỗi tè le... ", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async getTypePage(pageIndex:number, pageSize:number, keyword:string): Promise<ResponseDto> {
      try {
        let stringToSearch = {}
        if(keyword) {
          stringToSearch = {
            name: {
              contains: keyword
            }
        }
      }
        let data = await this.prisma.loaiCongViec.findMany(
          {
            skip: pageIndex || 0,
            take: pageSize || 10,
            where: {
              ten_loai_cong_viec: {
                contains: keyword || ""
              }
            }
          }
        )
        return {
          check: true, 
          message: "Xử lý thành công",
          content:data
        }
      } catch (exception) {
        if(exception.status != 500)
        throw new HttpException("lỗi tè le... ", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async getTypeById(typeId:number):Promise<ResponseDto> {
      try {
        let data = await this.prisma.loaiCongViec.findFirst({
          where: {
            id: typeId
          }
        })
        if(data) {
          return {
            check: true,
            message: "Xử lý thành công",
            content: data
          }
        } else {
          return {
            check: false,
            message:"Không tồn tại id",
            content:""
          }
        }
        
          } catch (exception) {
            if(exception.status != 500)
            
            throw new HttpException("lỗi tè le... ", HttpStatus.INTERNAL_SERVER_ERROR)
          }   
    }


    



    


    async updateType( typeId:number, ten_loai_cong_viec:string):Promise<ResponseDto> {
      try {
       const loaiCongViec =  await this.prisma.loaiCongViec.update({
        where:{
          id: typeId
        },
         data: {
          ten_loai_cong_viec
         }
       })
       return {
        check:true,
        message:"Xử lý thành công",
        content: loaiCongViec,
       }
      } catch (exception) {
        if(exception.status != 500)
        throw new HttpException("lỗi tè le... ", HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }


    async deleteType(typeId:number):Promise<ResponseDto> {
      let checkType = await this.prisma.loaiCongViec.findFirst({
        where: {
          id:typeId
        }
      })

      if(!checkType) {
        return {
          check:false,
          message:"Không tồn lại loại công việc",
          content:"",
        }
      } else {
        await this.prisma.loaiCongViec.delete({
          where:{
            id:typeId
          }
        })
        return {
          check:true,
          message:"Xử lý thành công",
          content:"",
        }
      }
    }

    

}
