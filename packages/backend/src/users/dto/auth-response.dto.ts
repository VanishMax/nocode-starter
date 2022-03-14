import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class AuthResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserDto;
}
