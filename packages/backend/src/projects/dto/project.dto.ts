import { ApiProperty } from '@nestjs/swagger';
import { ModelDto } from '../../models/dto/model.dto';
import { ProjectUserDto } from './project-user.dto';

export class ProjectDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  users: ProjectUserDto[];

  @ApiProperty()
  online: string[];

  @ApiProperty()
  model: ModelDto;
}
