import { ApiProperty } from "@nestjs/swagger";

export class JobTypeDto {
  
    @ApiProperty({
      description: 'id',
      type: Number,
    })
    id: number;
  
    @ApiProperty({
      description: 'ten_loai_cong_viec',
      type: String,
    })
    ten_loai_cong_viec: string;
  
  }

  export class AddJobType {
    @ApiProperty({
      description: 'ten_loai_cong_viec',
      type: String,
    })
    ten_loai_cong_viec: string;
  }

  export class AllJobType {
    content: JobTypeDto[];
  }