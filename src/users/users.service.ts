import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    // Theory of code is writtern below for better understanding.
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    // We are going to define a class create. We need to take these email and password and use them along with our repository to create and save a new user in our repository.
    create(email: string, password: string) {
        const user = this.repo.create({email, password});
        return this.repo.save(user); 
    }
}
// Private -> Just to abbriviate that property definition and assignment.
// repo: Repository<User> -> Type annotation is Repository and generic type is user, means that repo is an instance of typeorm repository that deals with instances of user.
// @InjectRepository(User) -> This part is an aid to dependency injection system this is what is going to tell the dependency injection system that we need the user repository.Dependency injection system uses this type annotation right here to figure out what instance it needs to inject in this class at run time. Unfortunately the dependency injection system does not play nicely with generics so this decorator is required simply because we have to use a generic type right here.
// We are going to define a method inside this class called create.


// Now let us go and hookup this service back to our controller we are going to use the service to create a new user, then we will test it with our thunder client. Once again for hookup we are going to use dependency injection.