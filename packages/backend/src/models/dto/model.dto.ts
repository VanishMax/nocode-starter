import { ApiProperty } from '@nestjs/swagger';
import { ModelDataDto } from './model-data.dto';

export class ModelDto extends ModelDataDto {
  @ApiProperty()
  _id: string;
}
