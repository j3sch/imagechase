import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  User as UserModel,
  Submission as SubmissionModel,
  Competition as CompetitionModel,
} from '@prisma/client';
import { getSubmissionRating } from 'src/submissionRating';

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

  @Get(':id/submissions')
  async getSubmissionsFromUser(
    @Param('id') id: string,
  ): Promise<SubmissionModel[]> {
    const submissions = await this.prismaService.submission.findMany({
      where: {
        userId: Number(id),
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    for (let i = 0; i < submissions.length; i++) {
      if (submissions[i].rating !== 0) {
        const rating = await getSubmissionRating(submissions[i].id.toString());
        Object.assign(submissions[i], { rating: rating });
      }
    }

    return submissions;
  }

  @Get(':id/competitions')
  getCompetitionsFromUser(
    @Param('id') id: string,
  ): Promise<CompetitionModel[]> {
    return this.prismaService.competition.findMany({
      where: {
        userId: Number(id),
      },
    });
  }

  @Post()
  async createUser(
    @Body()
    userData: {
      name: string;
      email: string;
      password: string;
      superuser: string;
    },
  ): Promise<UserModel | object> {
    const { name, email, password, superuser } = userData;
    const emailExist: { email: string } =
      await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
    if (emailExist === null) {
      return this.prismaService.user.create({
        data: {
          name,
          email,
          password,
          superuser: superuser === 'true',
        },
      });
    } else {
      return {
        errorCode: '',
        info: 'This email already exists. If you have forgotten your password, please reset it.',
      };
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.prismaService.user.delete({ where: { id: Number(id) } });
  }
}
