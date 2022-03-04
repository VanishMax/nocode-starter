import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './service';
import type { User } from './types';
import type { WithId } from 'mongodb';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Post('auth')
  async login(@Body() body: CreateUserDto): Promise<WithId<User>> {
    const user = await this.usersService.findByUsername(body.username);
    if (user) {
      return user;
    }

    return this.usersService.create(body);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() body: UpdateUserDto,
  // ): Promise<void> {
  //   await this.usersService.update(id, body);
  // }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
