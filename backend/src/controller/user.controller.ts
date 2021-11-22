import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getUsers() {
    return 'all users';
  }

  @Get('/:userId')
  getUserById() {
    return 'get user by id';
  }

  @Get('/:userId/contributions')
  getContributionsFromUser() {
    return 'get contributios that belongs to a user';
  }


  @Post('createUser')
  async createUser(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    const { name, email, password } = userData;
    return this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
