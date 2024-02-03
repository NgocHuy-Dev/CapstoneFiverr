import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login() {
    try {
      // sai mật khẩu hoặc email

      throw new HttpException(
        'Sai email hoặc mật khẩu',
        HttpStatus.BAD_REQUEST,
      );
      throw new BadRequestException('Sai email hoặc mật khẩu');

      return this.authService.login();
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(
          'Lỗi tè le !!!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Post('signup')
  signup() {
    try {
      
      throw new HttpException("saa", HttpStatus.BAD_REQUEST)
    } catch (exception) {
      
    }
  }
}
