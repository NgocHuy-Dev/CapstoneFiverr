import { Module } from '@nestjs/common';
import { JobsDetailService } from './jobs-detail.service';
import { JobsDetailController } from './jobs-detail.controller';

@Module({
  controllers: [JobsDetailController],
  providers: [JobsDetailService],
})
export class JobsDetailModule {}
