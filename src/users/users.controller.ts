import { Controller, Post, Body, Patch, Param, Delete, Query, Get,Put, UseInterceptors, UploadedFile, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/users.dto';
import { Request } from 'express';
import { ResponseDto } from 'src/dto/response.dto';


@ApiTags("NguoiDung")
@Controller('nguoi-dung')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private configService: ConfigService)
    {}


    @Get()
    getAllUsers() {
      return this.usersService.getAllUsers()
    }
    
    @ApiBody({type:CreateUserDto})
    @Post()
    async createUser(@Req() req:Request):Promise<CreateUserDto> {
      const {
        name,
        email,
        pass_word,
        phone,
        birth_day,
        gender,
        role,
        skill,
        certification,
      } = req.body

      let checkUser = await this.usersService.createUser(
        name,
        email,
        pass_word,
        phone,
        birth_day,
        gender.toString(),
        role,
        skill.toString(),
        certification.toString(),
      )

      if(checkUser.check) {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          },
          HttpStatus.OK
        )
      } else {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          },
          HttpStatus.BAD_REQUEST
        )
      }
    }

    @ApiQuery({name:"userId", type:Number})
    @Delete()
    async deleteUser(@Req() req:Request):Promise<ResponseDto> {
      const userId = Number(req.params.userId) 
      let checkUser = await this.usersService.deleteUser(+userId)
      if(checkUser.check) {
        throw new HttpException({
          message: checkUser.message,
          content: checkUser.content,
        },HttpStatus.OK)
      } else {
        throw new HttpException({
          message: checkUser.message,
          content: checkUser.content,
        },HttpStatus.BAD_REQUEST)
      }
    }

    // phân trang tìm kiếm
    @ApiQuery({ name: 'pageIndex', type: Number, required: false })
    @ApiQuery({ name: 'pageSize', type: Number, required: false })
    @ApiQuery({ name: 'keyword', type: String, required: false })
    @Get("/page")
    async panigationUser(@Req() req:Request):Promise<ResponseDto> {
      const pageIndex = Number(req.query.pageIndex);
      const pageSize = Number(req.query.pageSize);
      const keyword = req.query.keyword.toString() ||"";

      let checkUser = await this.usersService.panigationUser(pageIndex, pageSize, keyword)

      if(checkUser.check) {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          }, HttpStatus.OK
        )
      } else {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          }, HttpStatus.BAD_REQUEST
        )
      }
    }

    @ApiParam({name:"userId", type:Number})
    @Get(":userId")
    async getUserById(@Req() req:Request):Promise<ResponseDto> {
      const userId = Number(req.params.userId)
      let checkUser = await this.usersService.getUserById(userId)

      if(checkUser.check) {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          }, HttpStatus.OK
        )
      } else {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          }, HttpStatus.BAD_REQUEST
        )
      }
    }


    @ApiParam({name:"userId", type:Number})
    @ApiBody({type:CreateUserDto})
    @Put(":userId")
    async updateUserById(@Req() req:Request):Promise<ResponseDto> {
      const userId = Number(req.params.userId)
      const {
        name,
        pass_word,
        phone,
        birth_day,
        gender,
        role,
        skill,
        certification,
      } = req.body

      let checkUser = await this.usersService.updateUserById(
        userId,
        name,
        pass_word,
        phone,
        birth_day,
        gender,
        role,
        skill,
        certification,
      )
      if(checkUser.check) {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          }, HttpStatus.OK
        )
      } else {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          }, HttpStatus.BAD_REQUEST
        )
      }
    }

    @ApiParam({name:"uName", type:String})
    @Get("/ /:uName")
    async getUserByName(@Req() req:Request):Promise<ResponseDto> {
      const uName = req.params.uName
      let checkUser =  await this.usersService.getUserByName(uName)
      if(checkUser.check) {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          }, HttpStatus.OK
        )
      } else {
        throw new HttpException(
          {
            message: checkUser.message,
            content: checkUser.content,
          }, HttpStatus.BAD_REQUEST
        )
      }

    }





    }


 