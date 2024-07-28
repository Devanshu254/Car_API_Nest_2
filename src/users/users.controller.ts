import { Body, Controller, Post, Param, Get, Query, Delete, Patch, NotFoundException, UseInterceptors, ClassSerializerInterceptor, Session} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto) 
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    // @Get('/whoami')
    // whoAmI(@Session() session: any) {
    //     return this.usersService.findOne(session.userId);
    // }

    @Get('/whoami')
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout') 
    signOut(@Session() session: any) {
        session.userId = null;
    }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
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
