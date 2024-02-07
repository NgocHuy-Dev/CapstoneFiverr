import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
  HttpCode,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ResponseAuthDto, SigninDto, SignupDto } from './dto/auth.dto';
import e, { Request } from 'express';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiBody({type: SigninDto})
  @Post("/sign-in") 
  async signin(@Req() req:Request):Promise<ResponseAuthDto> {
    const {
      email,
      pass_word
    } = req.body
    let checkSignin = await this.authService.signin(
      email,
      pass_word
    )

    if(checkSignin.check) {
      throw new HttpException({
        message: checkSignin.message,
        content: checkSignin.content,
      },
        HttpStatus.OK)
    } else {
      throw new HttpException({
        message: checkSignin.message,
        content: checkSignin.content,
      },
        HttpStatus.BAD_REQUEST)
    }
  }


  @ApiBody({type:SignupDto})
  @Post("/sign-up")
  async signup(@Req() req:Request):Promise<ResponseAuthDto> {
    const {
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
    } = req.body

    let checkSignup = await this.authService.signup(
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender.toString(),
      role,
      skill.toString(),
      certification.toString()
    )
    if(checkSignup.check) {
      throw new HttpException({
        message: checkSignup.message,
        content: checkSignup.content,
      },
        HttpStatus.OK)
    } else {
      throw new HttpException({
        message: checkSignup.message,
        content: checkSignup.content,
      },
        HttpStatus.BAD_REQUEST)
    }
  }
}
