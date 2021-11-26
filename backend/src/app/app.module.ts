import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { CompetitionController } from 'src/controller/competition.controller';
import { SubmissionController } from 'src/controller/submission.controller';
import { UserController } from 'src/controller/user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [],
  controllers: [SubmissionController, UserController, CompetitionController],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        // { method: RequestMethod.POST, path: '/users' },
        // { method: RequestMethod.PUT, path: '/submissions' },
        // { method: RequestMethod.DELETE, path: '/competition' },
      );
  }
}
