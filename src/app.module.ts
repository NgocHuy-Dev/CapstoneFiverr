import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { JobTypesModule } from './job-types/job-types.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [UsersModule,ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, JobsModule, JobTypesModule, HireJobModule, SkillModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// kết nối service và controler của đối tượng


