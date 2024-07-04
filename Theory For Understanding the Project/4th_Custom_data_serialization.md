## Video 62 - Excluding Response Properties.
> Whenver we are sending reponse the password is showing. But we do not want it. We want to encrypt the password. There are some recommendations based upon nest that how to do it.
> Below is NestJS Documentation way of how to do that.
![alt text](images/23.png)
> Below is what is going on in our project right now.
![alt text](images/24th.png)
> Below is what we are going to do.
![alt text](images/25th.png)
> Go to user.entity file.
```
import { Exclude } from 'class-transformer'; // This will describe how to take an instance of user and turn it into a plain object. We are going to apply this exclude decorator to password property.
@Column()
@Exclude()
password: string;
```
> After that we will go to our users.controller.
```
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
@UseInterceptors(ClassSerializerInterceptor)
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
```
> Now our password gets encrypted and we can not see it.
![alt text](images/26th.png)
> Even though it solved the issue, there are some downsides of this approach.

## Video 63 - Here we will see what are the downsides to the above approach to encrypt the password.
![alt text](images/27th.png)
> At some point of time, we decide to store some more values of the user like their age, their mail, name etc.. and after that may be we want to add some admin functionality inside our application. So administrator should be able to look at lot of details about the user. To service that we might decide to add a new route handler to our application if user makes request from that we need to make sure that the request is coming from valid administrator. We will then setup a custom route handler just for that route that thing will reach out to the user service find a particular user and send tons of related information about that person. Their id, email, age, name and so on.
> We still might want to have another route where we want a person to look at id and email of our user and not the age and the name. This route handler will also reach out to the exact service and try to find one particular problem. 
> The problem here is that we wanna say that we will take the same kind of user entity and in both cases we want to send back that same user entity but between these two different route handlers we want to send back very different sets of information around that user. So we will have to apply different things for this but this is not possible with the approach recommended by the nest.
> That is the reason we will look at different method which will look at this issue very very easily.
> Below is what we are going to do.
![alt text](images/28th.png)
> Inside this custom interceptor, we are going to serialize or turn our user entity instance into plain object and then into plain json by using some serialization rules setup inside DTO.
> Till this point of time, we have seen DTO's in incoming requests but the turn DTO's are not only used for handling incoming data but also for formating for outgoing data.

> One User DTO for admin controller. Second DTO for Second public Route. We are going to apply this custom interceptors inside each of our different route handlers.