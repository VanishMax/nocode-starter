import { ApiProperty } from '@nestjs/swagger';
import { BackendProjectUser, ProjectUser } from '@nocode/core';
import { UserDto } from '../../users/dto/user.dto';

export enum ProjectRole {
  owner = 'owner',
  editor = 'editor',
  reader = 'reader',
}

export class ShortProjectUserDto implements BackendProjectUser {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  role: ProjectRole;
}

export class ProjectUserDto extends UserDto implements ProjectUser {
  @ApiProperty()
  role: ProjectRole;
}
