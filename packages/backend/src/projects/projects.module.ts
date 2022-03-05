import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/db.module';
import { ProjectService } from './projects.service';
import { ProjectController } from './projects.controller';
import { ModelService } from '../models/models.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [ProjectService, ModelService],
})
export class ProjectsModule {}
