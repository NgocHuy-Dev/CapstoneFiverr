import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class JobsService {
  prisma = new PrismaClient();

  async getAllJob() {
    let data = await this.prisma.congViec.findMany();
    return {
      message: 'Xử lý thành công',
      content: data,
    };
  }

  async createJob(
    ten_cong_viec: string,
    danh_gia: number,
    gia_tien: number,
    hinh_anh: string,
    mo_ta: string,
    mo_ta_ngan: string,
    sao_cong_viec: number,
    ma_chi_tiet_loai: number,
    nguoi_tao: number,
  ): Promise<ResponseDto> {
    const checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        id: nguoi_tao,
      },
    });
    const checkJobType = await this.prisma.chiTietLoaiCongViec.findFirst({
      where: {
        id: ma_chi_tiet_loai,
      },
    });
    if (!checkJobType || !checkUser) {
      return {
        check: false,
        message: 'Người dùng hoặc loại công việc không tồn tại',
        content: '',
      };
    } else {
      let data = await this.prisma.congViec.create({
        data: {
          ten_cong_viec,
          danh_gia,
          gia_tien,
          hinh_anh,
          mo_ta,
          mo_ta_ngan,
          sao_cong_viec,
          ma_chi_tiet_loai,
          nguoi_tao,
        },
      });
      return {
        check: true,
        message: 'Tạo mới thành công',
        content: {
          data,
        },
      };
    }
  }

  async getJobPanigation(
    pageIndex: number,
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
    let data = await this.prisma.congViec.findMany({
      skip: pageIndex || 0,
      take: pageSize || 10,
      where: {
        ten_cong_viec: {
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

  async getJobById(id: number): Promise<ResponseDto> {
    let data = await this.prisma.congViec.findFirst({
      where: {id: id},
    });
    if(data) {
      return {
        check: true,
        message: 'Xử lý thành công',
        content: data,
      };
    } else {
      return {
        check:false,
        message:"Không timt thấy công việc",
        content:""
      }
    }
  }

  async updateJob(
    id:number,
    ten_cong_viec:string,
    danh_gia:number,
    gia_tien:number,
    nguoi_tao:number,
    hinh_anh:string,
    mo_ta: string,
    ma_chi_tiet_loai:number,
    mo_ta_ngan:string,
    sao_cong_viec:number
    ): Promise<ResponseDto> {
      let checkJobDetail = await this.prisma.chiTietLoaiCongViec.findFirst({
        where: {
          id: ma_chi_tiet_loai
        }
      })
      let checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          id: nguoi_tao
        }
      })
      if(!checkJobDetail) {
        return {
          check: false,
      message: "Không tồn tại loại công việc",
      content: "Thêm loại công việc và thử lại nhé",
        }
      } if(!checkUser) {
        return  {
          check: false,
          message: "Người dùng không tồn tại",
          content: '',
        };
      } else {
        let data = await this.prisma.congViec.update({
          where: {
            id:id
          }, 
          data: {
            ten_cong_viec,
            danh_gia,
            gia_tien,
            nguoi_tao,
            hinh_anh,
            mo_ta,
            ma_chi_tiet_loai,
            mo_ta_ngan,
            sao_cong_viec
          }
        })
        return {
          check: true,
          message: "Xử lý thành công",
          content: data,
        };
      }
    
  }

  async deleteJob(id:number): Promise<ResponseDto> {
    let checkJob = await this.prisma.congViec.findFirst({
      where: {id}
    })
    if(!checkJob) {
      return {
        check: false,
        message: "Công việc không tồn tại",
        content: "",
      };
    } else {
      await this.prisma.congViec.delete({
        where: {id}
      })
      return {
        check: true,
        message: "Xử lý thành công",
        content: "",
      };
    }
    
  }


  async uploadJobImage(id:number,filename:string): Promise<ResponseDto> {

    let data = await this.prisma.congViec.findFirst({
      where: {id}
    })
    if(data) {
      let uploadImage = await this.prisma.congViec.update({
        where: {id},
        data: {
          hinh_anh: filename
        }
      })
      return {
        check: true,
        message:"Xử lý thành công",
        content: {
          uploadImage
        }
      }
    } else {
      return {
        check:false,
        message:"Thêm hình ảnh không thành công",
        content:""
      }
    }

    
  }


  async getJobDetailMenu(): Promise<ResponseDto> {
    let data = await this.prisma.loaiCongViec.findMany({
      include: {
        ChiTietLoaiCongViec:true
      }
    })
    return {
      check: true,
      message: "Xử lý thành công",
      content: data,
    };
  }

  async getJobDetailById(ma_loai_cong_viec:number):Promise<ResponseDto> {
    let checkId = await this.prisma.loaiCongViec.findFirst({
      where: {
        id: ma_loai_cong_viec
      }
    })
    if(checkId) {
      let data = await this.prisma.loaiCongViec.findUnique({
        where:{
          id:ma_loai_cong_viec
        },
        include: {
          ChiTietLoaiCongViec:true
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
        message:"Không tìm thấy tài nguyên",
        content:""
      }
    }
  }

  async getJobByJobTypeId(ma_chi_tiet_loai: number): Promise<ResponseDto> {
    let checkId = await this.prisma.loaiCongViec.findFirst({
      where: {
        id: ma_chi_tiet_loai,
      },
    });
    if (checkId) {
      let listId = await this.prisma.congViec.findMany({
        where: {
          ma_chi_tiet_loai,
        },
        include: {
          ChiTietLoaiCongViec: {
            include: {
              LoaiCongViec: true,
            },
          },
          NguoiDung: {
            select: { name: true },
          },
        },
      });
      const listJobByIdJobType = listId.map((val) => ({
        id: val.id,
        congViec: {
          id: val.id,
          ten_cong_viec: val.ten_cong_viec,
          danh_gia: val.danh_gia,
          gia_tien: val.gia_tien,
          hinh_anh: val.hinh_anh,
          mo_ta: val.mo_ta,
          mo_ta_ngan: val.mo_ta_ngan,
          sao_cong_viec: val.sao_cong_viec,
          ma_chi_tiet_loai: val.ma_chi_tiet_loai,
          nguoi_tao: val.nguoi_tao,
        },
        ten_chi_tiet: val.ChiTietLoaiCongViec.ten_chi_tiet_cv,
        ten_loai_cong_viec:
          val.ChiTietLoaiCongViec.LoaiCongViec.ten_loai_cong_viec,
        name: val.NguoiDung.name,
      }));
      return {
        check: true,
        message: "Xử lý thành công",
        content: listJobByIdJobType,
      };
    } else {
      return {
        check: false,
        message: "Không tìm thấy tài nguyên",
        content: "",
      };
    }
  }


  async getJobByJobId(ma_cong_viec: number): Promise<ResponseDto> {
    let checkId = await this.prisma.congViec.findFirst({
      where: {
        id: ma_cong_viec,
      },
    });
    if (checkId) {
      let listId = await this.prisma.congViec.findMany({
        where: {
          id: ma_cong_viec,
        },
        include: {
          ChiTietLoaiCongViec: {
            include: {
              LoaiCongViec: true,
            },
          },
          NguoiDung: {
            select: { name: true },
          },
        },
      });
      const listJobByIdJobType = listId.map((val) => ({
        id: val.id,
        congViec: {
          id: val.id,
          ten_cong_viec: val.ten_cong_viec,
          danh_gia: val.danh_gia,
          gia_tien: val.gia_tien,
          hinh_anh: val.hinh_anh,
          mo_ta: val.mo_ta,
          mo_ta_ngan: val.mo_ta_ngan,
          sao_cong_viec: val.sao_cong_viec,
          ma_chi_tiet_loai: val.ma_chi_tiet_loai,
          nguoi_tao: val.nguoi_tao,
        },
        ten_chi_tiet: val.ChiTietLoaiCongViec.ten_chi_tiet_cv,
        ten_loai_cong_viec:
          val.ChiTietLoaiCongViec.LoaiCongViec.ten_loai_cong_viec,
        name: val.NguoiDung.name,
      }));
      return {
        check: true,
        message: "Xử lý thành công",
        content: listJobByIdJobType,
      };
    } else {
      return {
        check: false,
        message: "Không tìm thấy tài nguyên",
        content: "",
      };
    }
  }


  async getJobByName(ten_cong_viec: string): Promise<ResponseDto> {
    let listId = await this.prisma.congViec.findMany({
      where: {
        ten_cong_viec: {
          contains: ten_cong_viec,
        },
      },
      include: {
        ChiTietLoaiCongViec: {
          include: {
            LoaiCongViec: true,
          },
        },
        NguoiDung: {
          select: { name: true },
        },
      },
    });
    if(listId){
      const listJobByName = listId.map((val) => ({
        id: val.id,
        congViec: {
          id: val.id,
          ten_cong_viec: val.ten_cong_viec,
          danh_gia: val.danh_gia,
          gia_tien: val.gia_tien,
          hinh_anh: val.hinh_anh,
          mo_ta: val.mo_ta,
          mo_ta_ngan: val.mo_ta_ngan,
          sao_cong_viec: val.sao_cong_viec,
          ma_chi_tiet_loai: val.ma_chi_tiet_loai,
          nguoi_tao: val.nguoi_tao,
        },
        ten_chi_tiet: val.ChiTietLoaiCongViec.ten_chi_tiet_cv,
        ten_loai_cong_viec:
          val.ChiTietLoaiCongViec.LoaiCongViec.ten_loai_cong_viec,
        name: val.NguoiDung.name,
      }));
      return {
        check: true,
        message: "Xử lý thành công",
        content: listJobByName,
      };
    } else {
      return {
        check:false,
        message:"Không tìm thấy tài nguyên",
        content:""
      }
    }
    
  }
}
