import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import type { User, AuthResponse } from './users.types';
import type { ObjectId, WithId } from 'mongodb';
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
  @ApiOkResponse({
    description: 'Auth data: token and user object',
    type: AuthResponseDto,
  })
  async findMe(@UserBody() user: WithId<User>): Promise<AuthResponse> {
    const res = await this.usersService.findOne(user._id);
    return this.usersService.userWithJWT(res);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User data',
    type: UserDto,
  })
  async findOne(@Param('id') id: ObjectId): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Post('auth')
  @ApiOkResponse({
    description: 'Auth data: token and user object',
    type: AuthResponseDto,
  })
  async login(@Body() body: CreateUserDto): Promise<AuthResponse> {
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
