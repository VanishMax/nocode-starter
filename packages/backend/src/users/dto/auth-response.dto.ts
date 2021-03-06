import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import type { AuthResponse } from '@nocode/core';

export class AuthResponseDto implements AuthResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserDto;
}
