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
  Participant as ParticipantsModel,
  User as UserModel,
} from '@prisma/client';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllCompetitions(): Promise<any> {
    let competitions = await this.prismaService.competition.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    for (let i = 0; i < competitions.length; i++) {
      const participants = await this.prismaService.participant.findMany({
        where: {
          competitionId: competitions[i].id,
        },
      });
      const participantCount = participants.length;
      Object.assign(competitions[i], {});
    }
    return competitions;
  }

  @Get(':id')
  async getCompetitionById(@Param('id') id: string): Promise<object> {
    const competition = await this.prismaService.competition.findUnique({
      where: { id: Number(id) },
    });
    const particpants = await this.prismaService.participant.findMany({
      where: {
        competitionId: Number(id),
      },
    });
    const participantCount = particpants.length;
    return Object.assign(competition, { participantCount });
  }

  @Get(':id/submissions')
  async getSubmissionsByCompetition(
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
        competitionId: Number(id),
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

  @Put(':id')
  async updateCompetition(
    @Param('id') id: string,
    @Body()
    competitionData: {
      title: string;
      description: string;
      rules: string;
      instructions: string;
      startDate: string;
      endDate: string;
    },
  ): Promise<CompetitionModel> {
    const { title, description, rules, instructions, startDate, endDate } =
      competitionData;
    return this.prismaService.competition.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        rules,
        instructions,
        startDate,
        endDate,
      },
    });
  }

  @Post()
  async createCompetition(
    @Body()
    competitionData: {
      title: string;
      type: string;
      description: string;
      rules: string;
      instructions: string;
      userId: number;
      startDate: string;
      endDate: string;
    },
  ): Promise<CompetitionModel | { message: string }> {
    const {
      title,
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

    if (user.judge) {
      return this.prismaService.competition.create({
        data: {
          title,
          type,
          description,
          rules,
          instructions,
          creator: {
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

  @Post(':id/participants')
  async addParticipants(
    @Param('id') id: string,
    @Body()
    participantData: {
      userId: number;
    },
  ): Promise<ParticipantsModel> {
    const { userId } = participantData;

    return await this.prismaService.participant.create({
      data: {
        userId,
        competitionId: Number(id),
      },
    });
  }

  @Delete(':id')
  async deleteCompetition(@Param('id') id: string): Promise<object> {
    const comp = await this.prismaService.competition.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Participant: true,
        Submission: {
          include: {
            Rating: true,
          },
        },
      },
    });

    const ratingCount =
      comp.Submission[comp.Submission.length - 1].Rating.length;
    const submissionCount = comp.Submission.length;
    const participantCount = comp.Participant.length;

    for (let i = 0; i < comp.Submission.length; i++) {
      for (let j = 0; j < comp.Submission[i].Rating.length; j++) {
        const ratings = this.prismaService.rating.deleteMany({
          where: {
            id: comp.Submission[i].Rating[j].id,
          },
        });
      }
      const deletedSubmissions = this.prismaService.submission.deleteMany({
        where: {
          id: comp.Submission[i].id,
        },
      });
    }
    for (let i = 0; i < comp.Participant.length; i++) {
      const participants = this.prismaService.participant.deleteMany({
        where: {
          id: comp.Participant[i].id,
        },
      });
    }
    const competition = this.prismaService.competition.delete({
      where: {
        id: Number(id),
      },
    });

    return Object.assign(
      {},
      {
        rating: { count: ratingCount },
      },
      {
        submission: { count: submissionCount },
      },
      { participant: { count: participantCount } },
      { competition },
    );
  }
}
