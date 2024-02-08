import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { JobsDetailService } from './jobs-detail.service';
import { ConfigService } from '@nestjs/config';
import { get } from 'http';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateJobDetail } from './dto/jobs-detail.dto';
import { Request } from 'express';
import { ResponseDto } from 'src/dto/response.dto';

@ApiTags('ChiTietLoaiCongViec')
@Controller('chi-tiet-loai-cong-viec')
export class JobsDetailController {
  constructor(
    private readonly jobsDetailService: JobsDetailService,
    private configService: ConfigService,
  ) {}

  @Get()
  getAllJobDetail() {
    return this.jobsDetailService.getAllJobDetail();
  }

  @ApiBody({ type: CreateJobDetail })
  @Post()
  async createJobDetail(@Req() req: Request): Promise<ResponseDto> {
    try {
      const { ten_chi_tiet_cv, ma_loai_cong_viec } = req.body;
    let checkDetail =
      await this.jobsDetailService.createJobDetail(ten_chi_tiet_cv, ma_loai_cong_viec);

    if (checkDetail.check) {
      throw new HttpException(
        {
          message: checkDetail.message,
          content: checkDetail.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkDetail.message,
          content: checkDetail.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status);
      throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })

  @Get("/phan-trang-tim-kiem")
  async getDetailPage(@Req() req: Request): Promise<ResponseDto> {
    try {
      const pageIndex = Number(req.query.pageIndex);
    const pageSize = Number(req.query.pageSize);
    const keyword = req.query.keyword?.toString() || "";
    let checkTypePage =
      await this.jobsDetailService.getDetailPage(
        pageIndex,
        pageSize,
        keyword,
      );
      if(checkTypePage ) {
        throw new HttpException(
          {
            message: checkTypePage.message,
            content: checkTypePage.content,
          },
          HttpStatus.OK,
        )
      } else {
        throw new HttpException(
          {
            message: checkTypePage.message,
            content: checkTypePage.content,
          },
          HttpStatus.BAD_REQUEST,
        )
      }
      } catch (exception) {
        if (exception.status != 500)
          throw new HttpException(exception.response, exception.status);
        throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }


  @ApiParam({name: "id", type:Number})
    @Get("/:id")
    async getDetailById(
      @Req() req: Request
    ):Promise<ResponseDto> {
      try {
        const id = Number(req.params.id)
      let checkId =await this.jobsDetailService.getDetailById(id)

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
      } catch (exception) {
        if (exception.status != 500)
          throw new HttpException(exception.response, exception.status);
        throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  @ApiBody({type: CreateJobDetail})
  @ApiParam({name:"id", type:Number})
  @Put("/:id")
    async updateDetail(@Req() req:Request):Promise<ResponseDto> {
      try {
        const id = Number(req.params.id)
        const {ten_chi_tiet_cv, ma_loai_cong_viec} = req.body

        let checkTypeById = await this.jobsDetailService.updateDetail(id, ten_chi_tiet_cv, ma_loai_cong_viec)
        
        if(checkTypeById.check) {
          throw new HttpException({
            message: checkTypeById.message,
            content: checkTypeById.content,
          },HttpStatus.OK)
        } else {
          throw new HttpException({
            message: checkTypeById.message,
            content: checkTypeById.content,
          },HttpStatus.BAD_REQUEST)
        }
      } catch (exception) {
        if (exception.status != 500)
          throw new HttpException(exception.response, exception.status);
        throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
  @ApiParam({name:"id", type:Number})
  @Delete("/:id")
  async deleteDetail(@Req() req:Request):Promise<ResponseDto> {
    try {
      const id = Number(req.params.id)
    let checkType = await this.jobsDetailService.deleteDetail(id)

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
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status);
      throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
