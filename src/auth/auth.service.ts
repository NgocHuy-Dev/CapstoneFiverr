import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/client';
import { SigninDto, SignupDto } from './dto/auth.dto';

let prisma = new PrismaClient()

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login() {
    let token = this.jwtService.signAsync(
      {
        data: {
          id: 1,
        },
      },
      { expiresIn: '10m', secret: 'BI MAT' },
    );
    return token;
  }

  async signup({name, email, pass_word, phone, gender, role, skill}: SignupDto) {
    try {
      let checkEmail = await prisma.nguoiDung.findFirst({
        where: {
          email:email
        }
      })
      if(!checkEmail) {
        throw new BadRequestException("Email đã tồn tại")
        return
      }
      const newData = {

      }

    } catch (error) {
      
    }
  }
}
