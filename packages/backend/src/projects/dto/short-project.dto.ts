import { ApiProperty } from '@nestjs/swagger';
import { ShortProjectUserDto } from './project-user.dto';
import type { BackendProject } from 'nocode-starter-core';

export class ShortProjectDto implements BackendProject {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  users: ShortProjectUserDto[];

  @ApiProperty()
  online: string[];

  @ApiProperty()
  model: string;
}
