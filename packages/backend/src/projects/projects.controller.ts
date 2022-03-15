import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './projects.service';
import { UserBody } from '../users/users.decorator';
import { ProjectDto } from './dto/project.dto';
import { UserDto } from '../users/dto/user.dto';

@Controller('projects')
@ApiTags('Project')
@ApiBearerAuth()
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findMy(@UserBody() user: UserDto): Promise<ProjectDto[]> {
    console.log('here?');
    return await this.projectService.findMy(user._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectDto> {
    return await this.projectService.findOne(id);
  }

  @Post()
  async create(
    @Body() body: CreateProjectDto,
    @UserBody() user: UserDto,
  ): Promise<ProjectDto> {
    return await this.projectService.create(body, user);
  }
}
