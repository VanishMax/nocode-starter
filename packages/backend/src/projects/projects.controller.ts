import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './projects.service';
import type { AggregatedProject, Project } from './projects.types';
import type { WithId } from 'mongodb';
import { UserBody } from '../users/users.decorator';
import { User } from '../users/users.types';

@Controller('projects')
@ApiTags('Project')
@ApiBearerAuth()
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findMy(@UserBody() user: WithId<User>): Promise<WithId<Project>[]> {
    return await this.projectService.findMy(user._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WithId<AggregatedProject>> {
    return await this.projectService.findOne(id);
  }

  @Post()
  async create(
    @Body() body: CreateProjectDto,
    @UserBody() user: WithId<User>,
  ): Promise<WithId<Project>> {
    return await this.projectService.create(body, user);
  }
}
