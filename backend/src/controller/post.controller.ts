import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('posts')
export class PostController {
  @Get()
  getPost() {
    return 'all post';
  }

  @Get('/:postId')
  getPostById() {
    return 'get post by id';
  }

  @Post()
  createPost() {
    return 'create post';
  }

  @Put('/:postId')
  updatePost() {
    return 'update post by id';
  }
}
