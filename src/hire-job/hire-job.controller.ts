import { Controller } from '@nestjs/common';
import { HireJobService } from './hire-job.service';

@Controller('hire-job')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}
}
