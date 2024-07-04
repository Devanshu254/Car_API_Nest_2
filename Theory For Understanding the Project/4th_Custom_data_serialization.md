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