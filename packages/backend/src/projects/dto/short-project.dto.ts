import { ApiProperty } from '@nestjs/swagger';
import { ProjectUserDto } from './project-user.dto';

export class ShortProjectDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  users: ProjectUserDto[];

  @ApiProperty()
  online: string[];

  @ApiProperty()
  model: string;
}
