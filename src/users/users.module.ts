import { Module, Get } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

