import { ApiProperty } from '@nestjs/swagger';

export class CreateHireJobDto {

  @ApiProperty({
    description: 'ma_cong_viec',
    type: Number,
  })
  ma_cong_viec: number;

  @ApiProperty({
    description: 'ma_nguoi_thue',
    type: Number,
  })
  ma_nguoi_thue: number;

  @ApiProperty({
    description: 'ngay_thue',
    type: Date,
  })
  ngay_thue: Date;

  @ApiProperty({
    description: 'hoan_thanh',
    type: Boolean,
  })
  hoan_thanh: boolean;
}

export class HireJobDto extends CreateHireJobDto{
    @ApiProperty({
      description: 'id',
      type: Number,
    })
    id: number;
  }

export class ResponseHireJobDto {
  content: HireJobDto[];
}
