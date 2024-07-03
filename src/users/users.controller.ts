import { Body, Controller, Post, Param, Get, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}
    // We are defining a route which will setup our request handler. Which will handle the request related to signup.
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id:string) {
        // Inside our database our id's are going to be stored as numbers. But whenever we receive a request. Every single part of the URL is string even if we think that it is a number. We need to take that string and parse that string into a number.
        return this.usersService.findOne(parseInt(id));
    }

    // Because we want to pull out some information from query string, we will make use of query decorator.
    @Get()
    findAllUsers(@Query('email') email:string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

}
