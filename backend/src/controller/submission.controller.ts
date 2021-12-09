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
import { ErrorMessage } from 'src/types';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  async getSubmissionById(@Param('id') id: string): Promise<SubmissionModel> {
    return await this.prismaService.submission.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Post()
  async createSubmission(
    @Body()
    submissionData: {
      imageUrl: string;
      imageAlt: string;
      description: string;
      userId: number;
      competitionId: number;
    },
  ): Promise<SubmissionModel | ErrorMessage> {
    const { imageUrl, imageAlt, description, userId, competitionId } =
      submissionData;
    return await this.prismaService.submission.create({
      data: {
        imageUrl,
        imageAlt,
        description,
        User: {
          connect: { id: userId },
        },
        Competition: {
          connect: { id: competitionId },
        },
      },
    });
  }

  @Post(':id/rating')
  async createRating(
    @Param('id') id: string,

    @Body()
    ratingData: {
      feedback: string;
      userId: number;
      rating: number;
    },
  ): Promise<[RatingModel, SubmissionModel]> {
    const { feedback, userId, rating } = ratingData;
    const createRating = this.prismaService.rating.create({
      data: {
        feedback,
        userId,
        submissionId: Number(id),
        rating,
      },
    });

    const updateSubmissionRating = this.prismaService.submission.update({
      where: { id: Number(id) },
      data: {
        rating: await getSubmissionRating(id, rating),
      },
    });

    return await this.prismaService.$transaction([
      createRating,
      updateSubmissionRating,
    ]);
  }
}
