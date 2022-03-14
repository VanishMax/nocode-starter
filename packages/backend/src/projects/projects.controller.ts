import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './projects.service';
import type { AggregatedProject, Project } from './projects.types';
import type { WithId } from 'mongodb';
import { UserBody } from '../users/users.decorator';
import { User } from '../users/users.types';
import { ShortProjectDto } from './dto/short-project.dto';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
@ApiTags('Project')
@ApiBearerAuth()
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @ApiOkResponse({ type: ShortProjectDto, isArray: true })
  async findMy(@UserBody() user: WithId<User>): Promise<WithId<Project>[]> {
    return await this.projectService.findMy(user._id);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProjectDto })
  async findOne(@Param('id') id: string): Promise<WithId<AggregatedProject>> {
    return await this.projectService.findOne(id);
  }

  @Post()
  @ApiOkResponse({ type: ShortProjectDto })
  async create(
    @Body() body: CreateProjectDto,
    @UserBody() user: WithId<User>,
  ): Promise<WithId<Project>> {
    return await this.projectService.create(body, user);
  }
}
