import { ApiProperty } from '@nestjs/swagger';
import type { User } from 'nocode-starter-core';

export class UserDto implements User {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  username: string;
}
