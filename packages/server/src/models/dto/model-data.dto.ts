import { ApiProperty } from '@nestjs/swagger';
import type { Model, Slide } from '@nocode/core';

export class ModelDataDto implements Omit<Model, '_id'> {
  @ApiProperty()
  slides: Record<string, Slide>;
}
