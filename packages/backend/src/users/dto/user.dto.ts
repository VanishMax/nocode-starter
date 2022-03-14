import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  username: string;
}
