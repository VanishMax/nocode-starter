import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { ProjectService } from './service';
import type { AggregatedProject, Project } from './types';
import type { WithId } from 'mongodb';

@Controller('projects')
@ApiTags('Project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findMy(): Promise<WithId<Project>[]> {
    return await this.projectService.findMy();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WithId<AggregatedProject>> {
    return await this.projectService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateProjectDto): Promise<WithId<Project>> {
    return await this.projectService.create(body);
  }
}
