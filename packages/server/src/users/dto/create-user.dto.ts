import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { User } from '@nocode/core';

export class CreateUserDto implements Omit<User, '_id'> {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
