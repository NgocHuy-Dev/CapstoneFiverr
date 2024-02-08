import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { JobTypesModule } from './job-types/job-types.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { CommentsModule } from './comments/comments.module';
import { JobsDetailModule } from './jobs-detail/jobs-detail.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    CommentsModule,
    JobsDetailModule,
    JobsModule,
    JobTypesModule,
    UsersModule,
    HireJobModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
