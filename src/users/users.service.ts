import { Injectable, NotFoundException } from '@nestjs/common';
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

    findOne(id: number) {
        return this.repo.findOneBy({id}); // We already have this method within our repository.
    }
    find(email: string) {
        return this.repo.find({where: {email}});
    } 
    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id); // Finding a user with a given id is an asynchronous operation that is why we are using await keyword here.
        // If we do not find the user then we will use below.
        if(! user) {
            throw new NotFoundException('user not found');
        }
        // If we do find the user then we will use a built in function. Object.assign().
        Object.assign(user, attrs); // We are going to take all the properties of attrs and copying them directly to the user overwritting any properties that are already there. 
        return this.repo.save(user);

    }
    // Remove is worked to work with Entity. Delete is there to work with a plain id.
    // Means we need to go within our database. We need to fetch that entity and remove on it.
    // Two round trips: one to get a user and another to remove it.
    async remove(id: number) {
        const user = await this.findOne(id); // Finding a user with given id.
        if(! user) {
            throw new NotFoundException('User not found');
        }
        return this.repo.remove(user);
    }
}
// Private -> Just to abbriviate that property definition and assignment.
// repo: Repository<User> -> Type annotation is Repository and generic type is user, means that repo is an instance of typeorm repository that deals with instances of user.
// @InjectRepository(User) -> This part is an aid to dependency injection system this is what is going to tell the dependency injection system that we need the user repository.Dependency injection system uses this type annotation right here to figure out what instance it needs to inject in this class at run time. Unfortunately the dependency injection system does not play nicely with generics so this decorator is required simply because we have to use a generic type right here.
// We are going to define a method inside this class called create.


// Now let us go and hookup this service back to our controller we are going to use the service to create a new user, then we will test it with our thunder client. Once again for hookup we are going to use dependency injection.