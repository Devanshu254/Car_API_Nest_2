import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // This step here is what creates repository for us.
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
