import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserService } from './users.service';
import { UserBody } from './users.decorator';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('profile')
  @ApiBearerAuth()
  async findMe(@UserBody() user: UserDto): Promise<AuthResponseDto> {
    const res = await this.usersService.findOne(user._id);
    return this.usersService.userWithJWT(res);
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  @Post('auth')
  async login(@Body() body: CreateUserDto): Promise<AuthResponseDto> {
    let user = await this.usersService.findByUsername(body.username);
    if (!user) user = await this.usersService.create(body);
    return this.usersService.userWithJWT(user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
