import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/db.module';
import { ProjectService } from './service';
import { ProjectController } from './controller';
import { ModelService } from '../models/service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [ProjectService, ModelService],
})
export class ProjectsModule {}
