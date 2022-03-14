import { ApiProperty } from '@nestjs/swagger';

export class ModelDataDto {
  @ApiProperty()
  project_name?: string;

  @ApiProperty()
  color?: string;
}
