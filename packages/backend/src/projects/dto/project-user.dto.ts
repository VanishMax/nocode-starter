import { ApiProperty } from '@nestjs/swagger';
// import { UserDto } from '../../users/dto/user.dto';

export enum ProjectRole {
  owner = 'owner',
  editor = 'editor',
  reader = 'reader',
}

export class ProjectUserDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  role: ProjectRole;
}
