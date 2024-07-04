import { AfterInsert, AfterRemove, AfterUpdate , Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer'; // This will describe how to take an instance of user and turn it into a plain object. We are going to apply this exclude decorator to password property.
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @AfterInsert() 
    logInsert() {
        console.log('Inserted User With ID', this.id); // Here this is a reference to the entity that we just inserted.
    }

    @AfterUpdate() 
    logUpdate() {
        console.log('Updated user with id', this.id);
    }

    @AfterRemove() 
    logRemove() {
        console.log('Removing user with id', this.id);
    }
}
