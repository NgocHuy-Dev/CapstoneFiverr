import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto {
  @ApiProperty({
    description: 'id',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'ten_chi_tiet',
    type: String,
  })
  ten_chi_tiet: string;

  @ApiProperty({
    description: 'hinh_anh',
    type: String,
  })
  hinh_anh: string;

  @ApiProperty({
    description: 'ma_loai_cong_viec',
    type: Number,
  })
  ma_loai_cong_viec: number;
}

export class CreateJobDetail {
  @ApiProperty({
    description: 'id',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'ten_chi_tiet',
    type: String,
  })
  ten_chi_tiet: string;
}

export class ResponseJobDetailDto {
  content: JobDetailDto[];
}
