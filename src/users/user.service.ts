import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { PrismaClient, NguoiDung } from '@prisma/client';

let prisma = new PrismaClient()

@Injectable()
export class UserService {
   prisma = new PrismaClient() 

   async findAll() {
    let data = await this.prisma.nguoiDung.findMany()
   }



}
// trời cíu em anh ơiiiii