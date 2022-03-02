import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/db.module';
import { UserService } from './service';
import { UserController } from './controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
