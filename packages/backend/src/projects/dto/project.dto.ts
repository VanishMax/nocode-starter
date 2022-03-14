import { ApiProperty } from '@nestjs/swagger';
import { ModelDto } from '../../models/dto/model.dto';

export class ProjectDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  users: string[];

  @ApiProperty()
  online: string[];

  @ApiProperty()
  model: ModelDto;
}
