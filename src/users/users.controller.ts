import { Body, Controller, Post, Param, Get, Query, Delete, Patch, NotFoundException, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
@Serialize(UserDto) 
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signup(body.email, body.password);
    }
    @Get('/:id')
    async findUser(@Param('id') id:string) {
        // Inside our database our id's are going to be stored as numbers. But whenever we receive a request. Every single part of the URL is string even if we think that it is a number. We need to take that string and parse that string into a number.
        const user =  await this.usersService.findOne(parseInt(id));
        if(! user) {
            throw new NotFoundException('user not found');
        }
        else {
            return user;
        }
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

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }


}
