import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  
  prisma = new PrismaClient()

  async findAll() {
    let data = await this.prisma.nguoiDung.findMany()
    return data
  }


  // =======================
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


// ===========================
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
// ========================
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
