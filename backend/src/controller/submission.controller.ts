import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('submissions')
export class SubmissionController {
  @Get()
  getSubmission() {
    return 'all submissions';
  }

  @Get('/:submissionId')
  getSubmissionById() {
    return 'get submission by id';
  }

  @Post()
  createSubmission(@Req() request: Request) {
    return request.body.description;
  }

  @Put('/:submissionId')
  updateSubmission() {
    return 'update submission by id';
  }
}
