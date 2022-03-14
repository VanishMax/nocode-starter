import { ApiProperty } from '@nestjs/swagger';
import { ModelDataDto } from './model-data.dto';

export class ModelDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  model: ModelDataDto;
}
