import { Module } from '@nestjs/common';
import { CompetitionController } from 'src/controller/competition.controller';
import { RatingController } from 'src/controller/rating.controller';
import { SubmissionController } from 'src/controller/submission.controller';
import { UserController } from 'src/controller/user.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [
    SubmissionController,
    UserController,
    CompetitionController,
    RatingController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
