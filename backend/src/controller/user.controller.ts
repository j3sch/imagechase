import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });
  }

  //TODO error message if email is not unique
  @Post()
  async createUser(
    @Body()
    userData: {
      name: string;
      email: string;
      password: string;
      superuser: string;
    },
  ): Promise<UserModel> {
    const { name, email, password, superuser } = userData;
    return this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        superuser: superuser === 'true',
      },
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.prismaService.user.delete({ where: { id: Number(id) } });
  }
}
