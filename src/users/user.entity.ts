import { AfterInsert, AfterRemove, AfterUpdate , Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
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
