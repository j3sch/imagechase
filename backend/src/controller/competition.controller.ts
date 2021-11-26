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
import { CompetitionParticipantModel, ErrorMessage } from 'src/types';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllCompetitions(): Promise<object[]> {
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
      Object.assign(competitions[i], { participantCount });
    }
    return competitions;
  }

  @Get(':id')
  async getCompetitionById(
    @Param('id') id: string,
  ): Promise<CompetitionParticipantModel> {
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
  ): Promise<CompetitionModel | ErrorMessage> {
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
  async deleteCompetition(@Param('id') id: string): Promise<CompetitionModel> {
    return await this.prismaService.competition.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
