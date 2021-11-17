import { Module } from '@nestjs/common';
import { PostController } from 'src/controller/post.controller'
import { UserController } from 'src/controller/user.controller';

@Module({
  imports: [],
  controllers: [PostController, UserController]
})
export class AppModule {}
