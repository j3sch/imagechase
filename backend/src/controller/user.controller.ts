import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @Get('/:userId')
  getUserById() {
    return 'get user by id';
  }

  @Get('/:userId/contributions')
  getContributionsFromUser() {
    return 'get contributios that belongs to a user';
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
}
