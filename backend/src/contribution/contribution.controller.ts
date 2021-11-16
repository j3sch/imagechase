import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('contributions')
export class ContributionController {
  @Get()
  getContributions() {
    return 'all contributions';
  }

  @Get('/:contributionId')
  getContributionById() {
    return 'get contribution by id';
  }

  @Post()
  createContribution() {
    return 'create contribution';
  }

  @Put('/:contributionId')
  updateContribution() {
    return 'update contribution by id';
  }
}
