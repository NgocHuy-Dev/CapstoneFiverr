import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/users.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { equal } from 'assert';
import e from 'express';




@Injectable()
export class UsersService {
   prisma = new PrismaClient() 
   
async getAllUsers() {
    try {
      let data = await this.prisma.nguoiDung.findMany()
      return data
    } catch (error) {
      throw error
    }
   }


async createUser(
   name: string,
   email: string,
   pass_word: string,
   phone: string,
   birth_day: string,
   gender: string,
   role: string,
   skill: string,
   certification: string,
):Promise<ResponseDto> {
   let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {email},
   });
   

   if(checkEmail) {
      return {
         check:true,
         message:"Không thể khởi tạo người dùng mới",
         content:"Email đã tồn tại"
      }
   } else {
      await this.prisma.nguoiDung.create({
         data: {
            name,
            email,
            pass_word,
            phone,
            birth_day,
            gender,
            role: 'USER',
            skill,
            certification,
         }
      })
      return {
         check:true,
         message:"Xử lý thành công",
         content: {
            name,
            email,
            pass_word,
            phone,
            birth_day,
            gender,
            role: 'USER',
            skill,
            certification,
         }
      }
   }
}


// async deleteUser(userId:number):Promise<ResponseDto> {
//    let checkUser = await this.prisma.nguoiDung.findFirst({
//       where: {
//          id: {
//             equals: userId,
//           },
//       }
//    })

//    if(!checkUser) {
//       return {
//          check:false,
//          message:"Người dùng không tồn tại",
//          content:"",
//       }
//    } else {
//       await this.prisma.nguoiDung.delete({
//          where:{
//             id: userId
//          }
//       })
//       return {
//          check:true, 
//          message: "Xử lý thành công",
//          content:"Đã Xóa"
//       }
//    }
// }


async deleteUser(userId: number): Promise<ResponseDto> {
   let checkUser = await this.prisma.nguoiDung.findFirst({
     where: {
       id: userId,
     },
   });
 
   if (!checkUser) {
     return {
       check: false,
       message: "Người dùng không tồn tại",
       content: "",
     };
   } else {
     await this.prisma.nguoiDung.delete({
       where: {
         id: userId,
       },
     });
     return {
       check: true,
       message: "Xử lý thành công",
       content: "Đã Xóa",
     };
   }
}


async panigationUser(
   pageIndex:number,
   pageSize:number,
   keyword:string):Promise<ResponseDto>
   {  
      let stringToSearch = {}
      if(keyword) {
         stringToSearch = {
            name: {
               contains: keyword
            }
         }
      }
      let data = await this.prisma.nguoiDung.findMany({
         skip: pageIndex || 0,
         take: pageSize || 10,
         where: {
         name: {
            contains: keyword || "",
         },
         },
      });
      return {
         check: true,
         message: "Xử lý thành công",
         content: data,
      };
} 

async getUserById(userId:number):Promise<ResponseDto> {
   let data = await this.prisma.nguoiDung.findFirst({
      where: {
         id: userId
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
         check:false,
         message:"Người dùng không tồn tại",
         content:""
      }
   }
}

async updateUserById(
   userId:number,
   name:string,
   pass_word:string,
   phone:string,
   birth_day:string,
   gender:string,
   role:string,
   skill:string,
   certification:string):Promise<ResponseDto> {
      let checkUser = await this.prisma.nguoiDung.findFirst({
         where:{
            id:userId
         }
      })
      
      if(!checkUser) {
         return {
            check:false,
            message:"Người dùng không tồn tại",
            content:""
         }
      } else {
         let dataUpdate = await this.prisma.nguoiDung.update({
            where: {
               id:userId
            },
            data:{
               name,
               pass_word,
               phone,
               birth_day,
               gender,
               role,
               skill,
               certification,
            }
         })
         return {
            check:true,
            message:"Xử lý thành công",
            content:dataUpdate
         }
      }
}


async getUserByName(uName:string):Promise<ResponseDto> {
   let data = await this.prisma.nguoiDung.findMany({
      where : {
         name: {
            contains:uName
         }
      }
   })
   if(data) {
      return {
         check:true,
         message:"Xử lý thành công", 
         content:data
      }
   } else {
      return {
         check:false,
         message:"Không tồn tại người dùng",
         content:""
      }
   }
}


}
