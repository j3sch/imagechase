import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Submission as SubmissionModel } from '@prisma/client';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getSubmission() {
    return 'all submissions';
  }

  @Get('/:submissionId')
  getSubmissionById() {
    return 'get submission by id';
  }

  @Put('/:submissionId')
  updateSubmission() {
    return 'update submission by id';
  }

  @Post('createSubmission')
  async createSubmission(
    @Body()
    submissionData: {
      content?: string;
      description?: string;
      userId?: number;
      competitionId?: number;
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
}
