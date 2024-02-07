import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { JobsDetailService } from './jobs-detail.service';
import { ConfigService } from '@nestjs/config';
import { get } from 'http';
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
    const { ten_chi_tiet_cv } = req.body;
    let checkDetail =
      await this.jobsDetailService.createJobDetail(ten_chi_tiet_cv);

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
  }
}
