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
import {
  Submission as SubmissionModel,
  Rating as RatingModel,
} from '@prisma/client';
import { getSubmissionRating } from 'src/submissionRating';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  async getSubmissionById(@Param('id') id: string): Promise<object> {
    return await this.prismaService.submission.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Put(':id')
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

  @Post()
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

  @Post(':id/rating')
  async createRating(
    @Param('id') submissionId: string,

    @Body()
    ratingData: {
      description: string;
      userId: number;
      rating: number;
    },
  ): Promise<[RatingModel, SubmissionModel]> {
    const { description, userId, rating } = ratingData;

    const createRating = this.prismaService.rating.create({
      data: {
        description,
        userId,
        submissionId: Number(submissionId),
        rating,
      },
    });

    const updateSubmissionRating = this.prismaService.submission.update({
      where: { id: Number(submissionId) },
      data: {
        rating: await getSubmissionRating(submissionId, rating),
      },
    });

    return await this.prismaService.$transaction([
      createRating,
      updateSubmissionRating,
    ]);
  }

  @Delete(':id')
  async deleteSubmission(@Param('id') id: string): Promise<SubmissionModel> {
    return this.prismaService.submission.delete({ where: { id: Number(id) } });
  }
}
