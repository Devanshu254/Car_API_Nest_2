import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
@Controller('auth')
export class UsersController {
    // We are defining a route which will setup our request handler. Which will handle the request related to signup.
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
    }
}
