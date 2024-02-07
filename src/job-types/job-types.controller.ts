import { Controller,Post, Body, Patch, Param, Delete, Get,Put, UseInterceptors, UploadedFile, Req, HttpException,HttpStatus } from '@nestjs/common';
import { JobTypesService } from './job-types.service';
import { ConfigService } from '@nestjs/config';
import { AddJobType, AllJobType, JobTypeDto } from './dto/job-types.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/dto/response.dto';
import { Request } from 'express';




@ApiTags("LoaiCongViec")
@Controller('loai-cong-viec')
export class JobTypesController {
  constructor(private readonly jobTypesService: JobTypesService, 
    private configService: ConfigService) {}


    @Get() 
    async findAll():Promise<AllJobType> {
      return this.jobTypesService.findAll()
    }

    @ApiBody({type:AddJobType})
    @Post()
    async addType(@Req() req: Request): Promise<ResponseDto> {
      const {ten_loai_cong_viec} = req.body;
      let checkJobType = await this.jobTypesService.addType(ten_loai_cong_viec,)
      throw new HttpException(
        {
          message: checkJobType.message,
          content: checkJobType.content,
        },
        HttpStatus.OK,
      );
    }

    
    @ApiQuery({ name: 'pageIndex', type: Number, required: false })
    @ApiQuery({ name: 'pageSize', type: Number, required: false })
    @ApiQuery({ name: 'keyword', type: String, required: false })

    @Get("/phan-trang-tim-kiem")
    async getTypePage(@Req() req: Request): Promise<ResponseDto> {
      const pageIndex = Number(req.query.pageIndex);
      const pageSize = Number(req.query.pageSize);
      const keyword = req.query.keyword?.toString() || "";
      let checkTypePage =
        await this.jobTypesService.getTypePage(
          pageIndex,
          pageSize,
          keyword,
        );
      throw new HttpException(
        {
          message: checkTypePage.message,
          content: checkTypePage.content,
        },
        HttpStatus.OK,
      );
    }

    @ApiParam({name: "typeId", type:Number})
    @Get("/:typeId")
    async getTypeById(
      @Req() req: Request
    ):Promise<ResponseDto> {
      const typeId = Number(req.params.typeId)
      let checkId =await this.jobTypesService.getTypeById(typeId)

      if(checkId.check) {
        throw new HttpException({
          message: checkId.message,
          content: checkId.content
        }, HttpStatus.OK)
      } else {
        throw new HttpException({
          message: checkId.message,
          content: checkId.content
        }, HttpStatus.BAD_REQUEST)
      }
    }
    

    @ApiBody({type: JobTypeDto})
    @ApiParam({name:"typeId", type:Number})
    @Put("/:typeId")
      async updateType(@Req() req:Request):Promise<ResponseDto> {
        const typeId = Number(req.params.typeId)
        const {ten_loai_cong_viec} = req.body

        let checkTypeById = await this.jobTypesService.updateType(typeId, ten_loai_cong_viec)
        
        throw new HttpException({
          message: checkTypeById.message,
          content: checkTypeById.content,
        },HttpStatus.OK)

        }
      
    @ApiParam({name:"typeId", type:Number})
    @Delete("/:typeId")
    async deleteType(@Req() req:Request):Promise<ResponseDto> {
      const typeId = Number(req.params.typeId)
      let checkType = await this.jobTypesService.deleteType(typeId)

      if(checkType.check) {
        throw new HttpException(
          {
            message: checkType.message,
            content: checkType.content,
          }, HttpStatus.OK
        )
      } else {
        throw new HttpException({
          message: checkType.message,
            content: checkType.content,
        }, HttpStatus.OK)
      }
    }

    


    
//================
}

    


    
