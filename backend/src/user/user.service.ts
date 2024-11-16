import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Roles } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email: email } });
  }

  async findById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        emailVerification: false,
        refreshToken: null,
        role: Roles.User,
        createdDate: new Date(),
      },
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    try {
      const res = await this.prisma.user.update({
        data: { ...updateUserDto },
        where: { id: userId },
      });

      return res;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      } else if (error.code === 'P2002') {
        throw new BadRequestException('Unique constraint violation');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }
}
