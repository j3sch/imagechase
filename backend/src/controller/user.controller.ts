import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
    @Get()
    getUsers() {
        return 'all users'
    }

    @Get('/:userId')
    getUserById() {
        return 'get user by id'
    }

    @Get('/:userId/contributions')
    getContributionsFromUser() {
        return 'get contributios that belongs to a user'
    }

    @Post()
    createUser() {
        return 'create user'
    }


}
