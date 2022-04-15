import { ApiProperty } from '@nestjs/swagger';
import type { User } from '@nocode/core';

export class UserDto implements User {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  username: string;
}
