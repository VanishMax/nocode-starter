import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './projects.service';
import { UserBody } from '../users/users.decorator';
import { ProjectDto } from './dto/project.dto';
import { UserDto } from '../users/dto/user.dto';
import { Auth } from '../users/auth.decorator';
import { ProjectRoles } from './project-roles.decorator';
import { ProjectRole } from './dto/project-user.dto';
import { ModelDataDto } from '../models/dto/model-data.dto';

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

  @Put(':id')
  @ProjectRoles(ProjectRole.owner, ProjectRole.editor)
  async changeModelField(@Param('id') id: string, @Body() body: ModelDataDto) {
    console.log('here, changing', id, body);
  }
}
