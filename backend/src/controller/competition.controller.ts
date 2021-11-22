import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Competition as CompetitionModel } from '@prisma/client';

@Controller('competitions')
export class CompetitionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('')
  async createCompetition(
    @Body()
    competitionData: {
      title: string;
      description: string;
      userId: number;
      startDate: number[];
      endDate: number[];
    },
  ): Promise<CompetitionModel | string> {
    const { title, description, userId, startDate, endDate } = competitionData;

    const isSuperUser: object | null = await this.prismaService.user.findUnique(
      {
        where: {
          id: userId,
        },
        select: {
          superuser: true,
        },
      },
    );

    console.log(isSuperUser);

    if (isSuperUser) {
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
      return 'This user is not authorised to create a new competition.';
    }
  }
}
