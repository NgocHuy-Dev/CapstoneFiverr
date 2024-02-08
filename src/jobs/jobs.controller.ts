import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,

  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateJobDto, JobDto } from './dto/jobs.dto';
import { Request } from 'express';
import { ResponseDto } from 'src/dto/response.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto, UploadDataDto } from 'src/dto/upload.dto';
import * as fs from "fs"



@ApiTags('CongViec')
@Controller('cong-viec')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async getAllJob() {
    return await this.jobsService.getAllJob();
  }

  @ApiBody({ type: CreateJobDto })
  @Post()
  async createJob(@Req() req: Request): Promise<ResponseDto> {
    const {
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      ma_chi_tiet_loai,
      nguoi_tao,
    } = req.body;

    let checkJob = await this.jobsService.createJob(
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      ma_chi_tiet_loai,
      nguoi_tao,
    );

    if (checkJob.check) {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  @Get('/phan-trang-tim-kiem')
  async getJobPanigation(@Req() req: Request): Promise<JobDto> {
    const pageIndex = Number(req.query.pageIndex);
    const pageSize = Number(req.query.pageSize);
    const keyword = req.query.keyword?.toString() || '';
    let checkPage = await this.jobsService.getJobPanigation(
      pageIndex,
      pageSize,
      keyword,
    );
    if (checkPage.check) {
      throw new HttpException(
        {
          message: checkPage.message,
          content: checkPage.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkPage.message,
          content: checkPage.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: "id", type: Number })
  @Get("/:id")
  async getJobById(@Req() req: Request): Promise<ResponseDto> {
    const id = Number(req.params.id);
    let checkJob = await this.jobsService.getJobById(id);

    if (checkJob.check) {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({type:CreateJobDto})
  @ApiParam({name:"id", type:Number})
  @Put("/update/:id")
  async updateJob(@Req() req:Request) {
    const id =Number(req.params.id)
    const {
      ten_cong_viec,
      danh_gia,
      gia_tien,
      nguoi_tao,
      hinh_anh,
      mo_ta,
      ma_chi_tiet_loai,
      mo_ta_ngan,
      sao_cong_viec,
    } = req.body
    let checkJob = await this.jobsService.updateJob(
      id,
      ten_cong_viec,
      danh_gia,
      gia_tien,
      nguoi_tao,
      hinh_anh,
      mo_ta,
      ma_chi_tiet_loai,
      mo_ta_ngan,
      sao_cong_viec
    )
    if (checkJob.check) {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({name:"id", type:Number})
  @Delete("/:id")
  async deleteJob(@Req() req:Request):Promise<ResponseDto> {
    const id = Number(req.params.id)
    let checkJob = await this.jobsService.deleteJob(id)
    if (checkJob.check) {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }



  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: 'file',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public",
      filename: (req, file, callback) => callback(null, new Date().getTime()+ "_" + file.originalname)
    }) 
  })) 
  
  @Post("upload-hinh-cong-viec/:id")
  @ApiParam({name:"id", type:Number})
  async uploadJobImage(
    @Req() req:Request,
    @UploadedFiles() file: UploadDataDto):Promise<ResponseDto> {
      try {
      const id  = Number(req.params.id)
      let checkUpload = await this.jobsService.uploadJobImage(
        id,
        file.filename
      )
      if (checkUpload) {
        throw new HttpException(
          {
            message: checkUpload.message,
            content: checkUpload.content,
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          {
            message: checkUpload.message,
            content: checkUpload.content,
          },
          HttpStatus.BAD_REQUEST,
        );
      } } catch (exception) {
        if (exception.status != 500)
          throw new HttpException(exception.response, exception.status);
        throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
      }

  }

  @Get("/lay-menu-loai-cong-viec")
  async getJobDetailMenu():Promise<ResponseDto> {
    try {
      let checkMenu = await this.jobsService.getJobDetailMenu()
    throw new HttpException(
      {
        message: checkMenu.message,
        content: checkMenu.content,
      },
      HttpStatus.OK,
    );
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status);
      throw new HttpException("Lỗi ....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiParam({name:"ma_loai_cong_viec", type:Number})
@Get("/lay-chi-tiet-loai-cong-viec/:ma_loai_cong_viec")
async getJobDetailById(@Req() req:Request):Promise<ResponseDto> {
  try {
    const ma_loai_cong_viec = Number(req.params.ma_loai_cong_viec)

  ma_loai_cong_viec
  let checkType = await this.jobsService.getJobDetailById(
    ma_loai_cong_viec,
  );
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


  @ApiParam({ name: 'ma_chi_tiet_loai', type: Number })
  @Get('lay-cong-viec-theo-chi-tiet-loai/:ma_chi_tiet_loai')
  async getJobByJobTypeId(@Req() req: Request): Promise<ResponseDto> {
    try {
      let ma_chi_tiet_loai = Number(req.params.ma_chi_tiet_loai);
    let checkJob = await this.jobsService.getJobByJobTypeId(
      ma_chi_tiet_loai,
    );
    if (checkJob.check) {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
          datetime: new Date(),
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
          datetime: new Date(),
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


  @ApiParam({ name: 'ma_cong_viec', type: Number })
  @Get('lay-cong-viec-chi-tiet/:ma_cong_viec')
  async getJobByJobId(@Req() req: Request): Promise<ResponseDto> {
    try {
      let ma_cong_viec = Number(req.params.ma_cong_viec);
    let checkJob = await this.jobsService.getJobByJobId(ma_cong_viec);
    if (checkJob.check) {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
          datetime: new Date(),
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkJob.message,
          content: checkJob.content,
          datetime: new Date(),
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

  @ApiParam({ name: 'ten_cong_viec', type: String })
  @Get('lay-danh-sach-cong-viec-theo-ten/:ten_cong_viec')
  async getJobByName(@Req() req: Request): Promise<ResponseDto> {
    let ten_cong_viec = req.params.ten_cong_viec;
    let checkGetJobByName = await this.jobsService.getJobByName(
      ten_cong_viec,
    );
    throw new HttpException(
      {
        message: checkGetJobByName.message,
        content: checkGetJobByName.content,
        datetime: new Date(),
      },
      HttpStatus.OK,
    );
  }
}




