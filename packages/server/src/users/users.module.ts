import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/db.module';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
