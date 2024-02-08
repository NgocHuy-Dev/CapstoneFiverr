import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  CheckSigninDto,
  CheckSignupDto,
  SigninDto,
  SignupDto,
} from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import e from 'express';
import * as bcrypt from 'bcrypt';

let prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();

  async signin(email: string, pass_word: string): Promise<CheckSigninDto> {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      const isPasswordValid = await bcrypt.compare(
        pass_word,
        checkEmail.pass_word,
      );
      if (isPasswordValid) {
        let token = this.jwtService.signAsync(
          {
            data: {
              id: checkEmail.id,
            },
          },
          { expiresIn: '1y', secret: 'BI_MAT' },
        );
        return {
          check: true,
          message: 'Đăng nhập thành công',
          content: {
            user: checkEmail,
            token,
          },
        };
      } else {
        return {
          check: false,
          message: 'Yêu cầu không hợp lệ',
          content: 'Email hoặc mật khẩu không đúng',
        };
      }
    } else {
      return {
        check: false,
        message: 'Yêu cầu không hợp lệ',
        content: 'Email không tồn tại',
      };
    }
  }

  async signup(
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
    skill: string,
    certification: string,
  ): Promise<CheckSignupDto> {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return {
        check: false,
        message: 'Email đã tồn tại',
        content: 'Thử đăng ký lại với gmail khác nhé!!',
      };
    } else {
      const hashedPassword = await bcrypt.hash(pass_word, 10);
      let data = await this.prisma.nguoiDung.create({
        data: {
          name,
          email,
          pass_word: hashedPassword,
          phone,
          birth_day,
          gender,
          role: 'USER',
          skill,
          certification,
        },
      });
      return {
        check: true,
        message: 'Đăng ký thành công',
        content: data,
      };
    }
  }
}
