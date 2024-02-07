import { Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Req } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateHireJobDto, HireJobDto, ResponseHireJobDto } from './dto/hire-jobs.dto';
import { Request } from 'express';
import { ResponseDto } from 'src/dto/response.dto';


@ApiTags("ThueCongViec")
@Controller('thue-cong-viec')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  @Get()
  async getHireJob():Promise<ResponseHireJobDto> {
    return this.hireJobService.getHireJob()
  }


  @ApiBody({type: CreateHireJobDto})
  @Post()
  async createHireJob(@Req() req:Request):Promise<ResponseDto> {
    try {
      const {
        ma_cong_viec,
        ma_nguoi_thue,
        ngay_thue,
        hoan_thanh
      } = req.body;
  
      let checkHire = await this.hireJobService.createHireJob(
        ma_cong_viec,
        ma_nguoi_thue,
        ngay_thue,
        hoan_thanh
      );
      if(checkHire) {
        throw new HttpException({
          message: checkHire.message,
          content: checkHire.content,
        },
          HttpStatus.OK)
      } else {
        throw new HttpException({
          message: checkHire.message,
          content: checkHire.content,
        },
          HttpStatus.BAD_REQUEST)
      }
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status);
      throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @ApiParam({name:"id", type:Number})
  @Get("/:id")
  async getHireJobById(@Req() req:Request):Promise<ResponseDto>  {
    
    try {
      const id  = Number(req.params.id)
    let checkHireJobById = await this.hireJobService.getHireJobById(id)

    if (checkHireJobById.check) {
      throw new HttpException(
        {
          message: checkHireJobById.message,
          content: checkHireJobById.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkHireJobById.message,
          content: checkHireJobById.content,
        },
        HttpStatus.BAD_REQUEST
      );
    }
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status);
      throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @ApiParam({name:"id", type:Number})
  @ApiBody({type: CreateHireJobDto})
  @Put("/:id")
  async updateHireJob(@Req() req:Request):Promise<ResponseDto> {
    try {
      const id  = Number(req.params.id)
    const {
      ma_cong_viec,
      ma_nguoi_thue,
      ngay_thue,
      hoan_thanh
    } = req.body
    let checkHireJob = await this.hireJobService.updateHireJob(
      id,
      ma_nguoi_thue,
      ma_cong_viec,
      ngay_thue,
      hoan_thanh
      )

      if (checkHireJob.check) {
        throw new HttpException(
          {
            message: checkHireJob.message,
            content: checkHireJob.content,
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            message: checkHireJob.message,
            content: checkHireJob.content,
          },
          HttpStatus.BAD_REQUEST
        );
      }
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status);
      throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiParam({name:"id", type:Number})
  @Delete("/:id")
  async deleteHireJob(@Req() req:Request):Promise<ResponseDto> {
      try {
        const id  = Number(req.params.id)
      let checkHireJob = await this.hireJobService.deleteHireJob(id)

      if (checkHireJob.check) {
        throw new HttpException(
          {
            message: checkHireJob.message,
            content: checkHireJob.content,
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            message: checkHireJob.message,
            content: checkHireJob.content,
          },
          HttpStatus.BAD_REQUEST
        );
      }
      } catch (exception) {
        if (exception.status != 500)
          throw new HttpException(exception.response, exception.status);
        throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @ApiConsumes()
  @Get("/lay-danh-sach-da-thue")
  async getHiredJob():Promise<ResponseDto> {
    let checkHiredJob = await this.hireJobService.getHiredJob();
    throw new HttpException(
      {
        message: checkHiredJob.message,
        content: checkHiredJob.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({name:"id", type:Number})
  @Post("/hoan-thanh-cong-viec/:id")  
  async compeleteJob(@Req() req:Request):Promise<ResponseDto> {

    try {
      const id = Number(req.params.id)
    const checkCompelete = await this.hireJobService.compeleteJob(id)

    if (checkCompelete.check) {
      throw new HttpException(
        {
          message: checkCompelete.message,
          content: checkCompelete.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkCompelete.message,
          content: checkCompelete.content,
        },
        HttpStatus.BAD_REQUEST
      );
    }
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status);
      throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
  }



}
