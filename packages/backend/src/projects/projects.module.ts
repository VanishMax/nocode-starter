import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../utils/db.module';
import { ProjectService } from './projects.service';
import { ProjectController } from './projects.controller';
import { ModelService } from '../models/models.service';
import { AuthMiddleware } from '../users/auth.middleware';
import { UserService } from '../users/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [ProjectController],
  providers: [ProjectService, ModelService, UserService],
})
export class ProjectsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'users/auth',
        method: RequestMethod.POST,
      })
      .forRoutes(ProjectController);
  }
}
