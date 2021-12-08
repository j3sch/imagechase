import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  Competition as CompetitionModel,
  Submission as SubmissionModel,
  Judge as JudgeModel,
  User as UserModel,
} from '@prisma/client';
import { ErrorMessage } from 'src/types';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllCompetitions(): Promise<object[]> {
    return await this.prismaService.competition.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  @Get(':id')
  async getCompetitionById(@Param('id') id: string): Promise<CompetitionModel> {
    return await this.prismaService.competition.findUnique({
      where: { id: Number(id) },
      // include: {
      //   Submission: {
      //     select: {
      //       User: {
      //         select: {
      //           sub: true,
      //         },
      //       },
      //     },
      //   },
      // },
    });
  }

  @Get(':id/participants')
  async getCompetitionParticipantLength(@Param('id') id: string): Promise<any> {
    const userIds = await this.prismaService.competition.findUnique({
      where: { id: Number(id) },
      select: {
        Submission: {
          select: {
            userId: true,
          },
        },
      },
    });
    return userIds.Submission.length;
  }

  @Get(':id/submissions')
  async getSubmissionsByCompetition(
    @Param('id') id: string,
    @Param('skip') skip: number,
    @Body()
    settings: {
      take: number;
      order: string;
    },
  ): Promise<SubmissionModel[]> {
    const { take, order } = settings;
    return await this.prismaService.submission.findMany({
      skip,
      take,
      where: {
        competitionId: Number(id),
      },
      include: {
        User: {
          select: {
            name: true,
          },
        },
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

  @Post()
  async createCompetition(
    @Body()
    competitionData: {
      title: string;
      content: string;
      type: string;
      description: string;
      rules: string;
      instructions: string;
      userId: number;
      startDate: string;
      endDate: string;
    },
  ): Promise<CompetitionModel | ErrorMessage> {
    const {
      title,
      content,
      type,
      description,
      rules,
      instructions,
      userId,
      startDate,
      endDate,
    } = competitionData;

    const user: UserModel = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user === null) {
      return {
        message: 'user does not exits.',
      };
    }

    if (user.admin) {
      return this.prismaService.competition.create({
        data: {
          title,
          content,
          type,
          description,
          rules,
          instructions,
          Creator: {
            connect: { id: userId },
          },
          startDate,
          endDate,
        },
      });
    } else {
      return {
        message: 'This user is not authorised to create a new competition.',
      };
    }
  }

  @Post(':id/judge')
  async addJudg(
    @Param('id') id: string,
    @Body()
    participantData: {
      userId: number;
    },
  ): Promise<JudgeModel> {
    const { userId } = participantData;

    return await this.prismaService.judge.create({
      data: {
        userId,
        competitionId: Number(id),
      },
    });
  }
}
