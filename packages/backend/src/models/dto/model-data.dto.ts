import { ApiProperty } from '@nestjs/swagger';
import type { Model, Slide } from 'nocode-starter-core';

export class ModelDataDto implements Omit<Model, '_id'> {
  @ApiProperty()
  slides: Slide[];
}
