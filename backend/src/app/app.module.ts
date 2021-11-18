import { Module } from '@nestjs/common';
import { SubmissionController } from 'src/controller/submission.controller'
import { UserController } from 'src/controller/user.controller';

@Module({
  imports: [],
  controllers: [SubmissionController, UserController]
})
export class AppModule {}
