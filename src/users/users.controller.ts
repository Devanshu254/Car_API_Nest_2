import { Body, Controller, Post } from '@nestjs/common';
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
}
