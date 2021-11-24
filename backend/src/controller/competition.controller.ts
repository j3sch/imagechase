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
import { Competition as CompetitionModel } from '@prisma/client';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllCompetitions(): Promise<CompetitionModel[]> {
    return this.prismaService.competition.findMany();
  }

  @Get('/:competitionId')
  async getCompetitionById(@Param('id') id: string): Promise<CompetitionModel> {
    return this.prismaService.competition.findUnique({
      where: { id: Number(id) },
    });
  }

  @Put('/:competitionId')
  async updateCompetition(
    @Param('id') id: string,
    @Body()
    competitionData: {
      title: string;
      description: string;
      startDate: number[];
      endDate: number[];
    },
  ): Promise<CompetitionModel> {
    const { title, description, startDate, endDate } = competitionData;
    return this.prismaService.competition.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        startDate: new Date(startDate[0], startDate[1], startDate[2]),
        endDate: new Date(endDate[0], endDate[1], endDate[2]),
      },
    });
  }

  @Post()
  async createCompetition(
    @Body()
    competitionData: {
      title: string;
      description: string;
      userId: number;
      startDate: number[];
      endDate: number[];
    },
  ): Promise<CompetitionModel | object> {
    const { title, description, userId, startDate, endDate } = competitionData;

    const isSuperUser: { superuser: boolean } =
      await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          superuser: true,
        },
      });

    if (isSuperUser.superuser) {
      return this.prismaService.competition.create({
        data: {
          title,
          description,
          creator: {
            connect: { id: userId },
          },
          startDate: new Date(startDate[0], startDate[1], startDate[2]),
          endDate: new Date(endDate[0], endDate[1], endDate[2]),
        },
      });
    } else {
      return {
        errorCode: '',
        info: 'This user is not authorised to create a new competition.',
      };
    }
  }

  @Delete('/:competitionId')
  async deleteCompetition(@Param('id') id: string): Promise<CompetitionModel> {
    return this.prismaService.competition.delete({ where: { id: Number(id) } });
  }
}
