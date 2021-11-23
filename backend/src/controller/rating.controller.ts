import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Rating as RatingModel } from '@prisma/client';

@Controller('ratings')
export class RatingController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllRatings(): Promise<RatingModel[]> {
    return this.prismaService.rating.findMany();
  }
}
    