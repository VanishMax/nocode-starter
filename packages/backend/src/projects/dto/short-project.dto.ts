import { ApiProperty } from '@nestjs/swagger';

export class ShortProjectDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  users: string[];

  @ApiProperty()
  online: string[];

  @ApiProperty()
  model: string;
}
