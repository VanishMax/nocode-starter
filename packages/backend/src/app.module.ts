import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ProjectsModule, ModelsModule],
})
export class AppModule {}
