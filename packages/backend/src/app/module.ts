import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller';
import { AppService } from './service';
import { UsersModule } from '../users/module';
import { ProjectsModule } from '../projects/module';
import { ModelsModule } from '../models/module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ProjectsModule, ModelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
