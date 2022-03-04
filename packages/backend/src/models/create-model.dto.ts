import type { NocodeModel } from 'nocode-starter-core';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiProperty()
  model: NocodeModel;
}
