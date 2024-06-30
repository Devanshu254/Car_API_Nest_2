# Persisting Data With TypeORM.
> Persisting data with TypeORM refers to the process of saving data to the database using the TypeORM library in Node.js application. TypeORM is an object-relational Mapping (ORM) tool that allows developers to interact with a database using TypeScript or JavaScript object insted of writing raw SQL queries.
![alt text](images/4th.png)
![alt text](images/5th.png)
```
npm install @nestjs/typeorm typeorm sqlite3
```
> @nestjs/typeorm: Library that works typeorm and nest work together very nicely.
> typeorm: typeorm library itself.
> sqlite3: Database implementation.
![alt text](images/6th.png)
>After doing all this we will get db.sqlite file. Sqlite is a file based database: it is going to store all the information related to a database inside of one single file.
![alt text](images/7th.png)

> We will make user entity.
> We will make reports entity.
> Making both the entities required some steps.
> Let us look at making reports repository.
> Go to reports folder -> create a file (reports.entity.ts).
```
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
}
```
> Now within reports.module folder.
> import typeOrmModule and also import Report entity.
```
@Module({
  imports: [TypeOrmModule.forFeature([Report])], // Here we will add our actual entity of reports.
  controllers: [ReportsController],
  providers: [ReportsService]
})
```
> Now inside app.module.ts file we will import report and add it as entity.
