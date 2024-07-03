# Creating and saving user.
> We have setup our repositories by using Typeorm and now we are going to Create and Save user data within our application.
> We are going to create Service methods. Which are then used to access Users Repository. We are going to do that hookup using Dependency Injection.

> First We have created users.services.ts file and then we have imported it within users.controller.ts.

### What is going on inside our project.
![alt text](images/14th.png)

### Difference between create and save method.
![alt text](images/15th.png)

## More On Create VS Save. Video 53.
> Suppose that we wants to add a function that is going to log out ever operation that we do on user. In another words if we try to create a new user and save it to the database if we try to update a user or remove a user. I wants to do a console log that says we are updating, saving or whatever. 
> One way we can easily do this by using a feature within Typeorm called Hooks. Hooks allows us to define a function within an entity that will be called automatically at points on time.
> Within our user.entity.ts let us define a function logInsert() {} and after that we import AfterInsert decorator and mark logInsert() {} as AfterInsert() {}. Whenever we create a new user within our database, this function should get executed.
```
@AfterInsert() 
    logInsert() {
        console.log('Inserted User With ID', this.id); // Here this is a reference to the entity that we just inserted.
    }
```
> We are going to do the same process whenever we update a user, or remove a user. To handle them we are going to create two other decorators. 
> Import AfterRemove, AfterUpdate.
```
@AfterUpdate() 
logUpdate() {
    console.log('Updated user with id', this.id);
}

@AfterRemove() 
logRemove() {
    console.log('Removing user with id', this.id);
}
```
> We can call save either with a user entity instance or just a plain object either way our data will be saved. The difference however if we save an entity instance all the hooks which are tied to that instance will be executed but if we pass an object and we try to save it no hooks will get executed.
![alt text](images/16th.png)

## Querying for Data - Video 55.
> We have got our first route handler put together now we are going to work with other one's.
> Different route handlers which we need to put together are very similar to the route handlers which we have already seen in messaging application.
> Let us first focus on creating all the different methods for our service. Like: create, findOne, find, update, remove. Then we will focus on TyprOrm working and how we can interact with users repository in efficient way. After service methods putting together, we will put all the route handlers for controller.
> Go to users.service.ts and then start creating these methods.
```
findOne(id: number) {
    return this.repo.findOneBy({id}); // We already have this method within our repository.
}
find(email: string) {
    return this.repo.find({where: {email}});
} 
update() {}
remove() {}
```
> The difference between findOne and find is that findOne is always going to return one record for null if no user is found with that given criteria. Find on the other hand is going to return an array of all the different records that match that search criteria. If no records are found with that given criteria then we will get an empty array.

## Video 56 - Update Data.
> Let us try to work upon update method. 
![alt text](images/17th.png)
```
// Let us think about the parameters. If we pass it like below.
update(id: number, newEmail: string, newPassword: string) {}
// If we will pass it like above then suppose if a person only wants to update password but at the same time he also will have to update the password. So, this is not a good approach.
```
> Instead of above we will use below.
```
async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id); // Finding a user with a given id is an asynchronous operation that is why we are using await keyword here.
    // If we do not find the user then we will use below.
    if(! user) {
        throw new Error('user not found');
    }
    // If we do find the user then we will use a built in function. Object.assign().
    Object.assign(user, attrs); // We are going to take all the properties of attrs and copying them directly to the user overwritting any properties that are already there. 
    return this.repo.save(user);
} 
```
> attrs: Attributes.
> Users: Reference to our user entity.
> Partial: Type Helper defined in typescript itself. This partial type Helper tells us that attrs can be any object that has atleast or none some of the properties of user class. So if we provide any object that has no properties, or some properties or has atleast one properties of user that will be considered as a valid argument.

## Video 57: Remove operation.
> This is going to be similar to the update.
```
// Remove is worked to work with Entity. Delete is there to work with a plain id.
// Means we need to go within our database. We need to fetch that entity and remove on it.
// Two round trips: one to get a user and another to remove it.
async remove(id: number) {
    const user = await this.findOne(id); // Finding a user with given id.
    if(! user) {
        throw new Error('User not found');
    }
    return this.repo.remove(user);
}
```
> Now our service is in a good spot. Now all we have to do is to go back to our controller and we have to define couple of route handlers inside of here and call the associated methods. And then we will do manual route handling.

