import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/db.module';
import { ProjectService } from './projects.service';
import { ProjectController } from './projects.controller';
import { ModelService } from '../models/models.service';
import { UserService } from '../users/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [ProjectController],
  providers: [ProjectService, ModelService, UserService],
})
export class ProjectsModule {}
