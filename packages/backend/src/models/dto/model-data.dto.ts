import { ApiProperty } from '@nestjs/swagger';
import type { Model } from 'nocode-starter-core';

export class ModelDataDto implements Omit<Model, '_id'> {
  @ApiProperty()
  project_name?: string;

  @ApiProperty()
  color?: string;
}
