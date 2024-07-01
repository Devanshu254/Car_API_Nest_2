// We are going to create a class that list all the different properties that an incoming request for user should have.
import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}