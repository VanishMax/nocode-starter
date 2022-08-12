import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/db.module';
import { ModelService } from './models.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ModelService],
})
export class ModelsModule {}
