import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel } from '@prisma/client';
import { ErrorMessage } from 'src/types';

@Controller('users')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @Get(':sub')
  getUserById(@Param('sub') sub: string): Promise<UserModel> {
    return this.prismaService.user.findUnique({
      where: { sub },
    });
  }

  @Put(':id/toggleAdmin')
  async toggleAdmin(@Param('id') id: string): Promise<UserModel> {
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(id) },
      select: {
        admin: true,
      },
    });

    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: {
        admin: !user.admin,
      },
    });
  }

  @Post()
  async createUser(
    @Body()
    userData: {
      name: string;
      bio: string;
      sub: string;
    },
  ): Promise<any | ErrorMessage> {
    const { name, bio, sub } = userData;
    const userSub: { sub: string } = await this.prismaService.user.findUnique({
      where: {
        sub: sub,
      },
      select: {
        sub: true,
      },
    });
    if (userSub === null) {
      return await this.prismaService.user.create({
        data: {
          name,
          bio,
          sub,
        },
      });
    } else {
      return {
        message: 'User exits',
      };
    }
  }
}
