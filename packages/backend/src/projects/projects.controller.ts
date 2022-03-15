import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './projects.service';
import { UserBody } from '../users/users.decorator';
import { ProjectDto } from './dto/project.dto';
import { UserDto } from '../users/dto/user.dto';
import { Auth } from '../users/auth.decorator';

@Controller('projects')
@ApiTags('Project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @Auth()
  async findMy(@UserBody() user: UserDto): Promise<ProjectDto[]> {
    return await this.projectService.findMy(user._id);
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string): Promise<ProjectDto> {
    return await this.projectService.findOne(id);
  }

  @Post()
  @Auth()
  async create(
    @Body() body: CreateProjectDto,
    @UserBody() user: UserDto,
  ): Promise<ProjectDto> {
    return await this.projectService.create(body, user);
  }
}
