import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  User as UserModel,
  Submission as SubmissionModel,
  Competition as CompetitionModel,
} from '@prisma/client';
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

  @Get(':id/submissions')
  async getSubmissionsFromUser(
    @Param('id') id: string,
    @Body()
    settings: {
      skip: number;
      take: number;
      order: string;
    },
  ): Promise<SubmissionModel[]> {
    const { skip, take, order } = settings;
    return await this.prismaService.submission.findMany({
      skip,
      take,
      where: {
        userId: Number(id),
      },
      orderBy: [
        order === 'votes'
          ? {
              rating: 'desc',
            }
          : {
              createdAt: 'desc',
            },
      ],
    });
  }

  @Get(':id/competitions')
  async getCompetitionsFromUser(
    @Param('id') id: string,
  ): Promise<CompetitionModel[]> {
    const competitions = await this.prismaService.competition.findMany({
      where: {
        userId: Number(id),
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    for (let i = 0; i < competitions.length; i++) {
      const particpants = await this.prismaService.participant.findMany({
        where: {
          competitionId: competitions[i].id,
        },
      });
      const participantCount = particpants.length;
      Object.assign(competitions[i], { participantCount });
    }
    return competitions;
  }

  @Post()
  async createUser(
    @Body()
    userData: {
      id: string;
      name: string;
      email: string;
      judge: string;
      bio: string;
      sub: string;
    },
  ): Promise<UserModel | ErrorMessage> {
    const { id, name, email, judge, bio, sub } = userData;
    const userId: { id: number } = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
    if (userId === null) {
      return this.prismaService.user.create({
        data: {
          name,
          email,
          judge: judge === 'true',
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
