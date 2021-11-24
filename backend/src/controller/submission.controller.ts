import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Submission as SubmissionModel } from '@prisma/client';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllSubmissions(): Promise<SubmissionModel[]> {
    return this.prismaService.submission.findMany();
  }

  @Get('byId/:id')
  async getSubmissionById(@Param('id') id: string): Promise<SubmissionModel> {
    return this.prismaService.submission.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Get('byCompetition/:competitionId')
  async getSubmissionsByCompetition(
    @Param('competitionId') competitionId: string,
  ): Promise<SubmissionModel[]> {
    return this.prismaService.submission.findMany({
      where: {
        competitionId: Number(competitionId),
      },
    });
  }

  @Get('fromUser/:userId')
  getSubmissionsFromUser(
    @Param('userId') userId: string,
  ): Promise<SubmissionModel[]> {
    return this.prismaService.submission.findMany({
      where: {
        userId: Number(userId),
      },
    });
  }

  @Put('byId/:id')
  async updateSubmission(
    @Param('id') id: string,
    @Body()
    submissionData: {
      content: string;
      description: string;
    },
  ): Promise<SubmissionModel> {
    const { content, description } = submissionData;
    return this.prismaService.submission.update({
      where: { id: Number(id) },
      data: {
        content,
        description,
      },
    });
  }

  @Post('createSubmission')
  async createSubmission(
    @Body()
    submissionData: {
      content: string;
      description: string;
      userId: number;
      competitionId: number;
    },
  ): Promise<SubmissionModel> {
    const { content, description, userId, competitionId } = submissionData;
    return this.prismaService.submission.create({
      data: {
        content,
        description,
        user: {
          connect: { id: userId },
        },
        competition: {
          connect: { id: competitionId },
        },
      },
    });
  }

  @Delete('/:submissionId')
  async deleteSubmission(@Param('id') id: string): Promise<SubmissionModel> {
    return this.prismaService.submission.delete({ where: { id: Number(id) } });
  }
}
