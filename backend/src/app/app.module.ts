import { Module } from '@nestjs/common';
import { ContributionController } from '../contribution/contribution.controller'
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [],
  controllers: [ContributionController, UserController]
})
export class AppModule {}
