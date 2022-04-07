import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './projects.service';
import { UserBody } from '../users/users.decorator';
import { ProjectDto } from './dto/project.dto';
import { UserDto } from '../users/dto/user.dto';
import { Auth } from '../users/auth.decorator';
import { ProjectRoles } from './project-roles.decorator';
import { ProjectRole, ProjectUserDto } from './dto/project-user.dto';
import { ObjectId } from 'mongodb';
import { ModelEditDto } from '../models/dto/edit-model.dto';
import { ModelService } from '../models/models.service';

@Controller('projects')
@ApiTags('Project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private modelService: ModelService,
  ) {}

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

  @Post(':id/invite')
  @ProjectRoles(ProjectRole.owner)
  async invite(
    @Param('id') id: string,
    @Body() body: ProjectUserDto[],
    @UserBody() user: UserDto,
  ) {
    return await this.projectService.invite(
      id,
      body,
      user._id as unknown as ObjectId,
    );
  }

  @Delete(':id/invite')
  @ProjectRoles(ProjectRole.owner)
  async removeInvite(@Param('id') id: string, @Body() body: ProjectUserDto[]) {
    return await this.projectService.removeInvite(id, body);
  }

  @Put(':id')
  @ProjectRoles(ProjectRole.owner, ProjectRole.editor)
  @ApiOperation({
    description:
      'Main function for editing the model. It accept the object of type `{ [path]: value }`, where `path` is a path to the model property that needs to be changed, and `value` is any value suitable for this property. For example, `{ color: "black", "slides.[0].name": "one"}`',
  })
  async changeModelField(@Param('id') id: string, @Body() body: ModelEditDto) {
    const project = await this.projectService.findOne(id);
    return await this.modelService.edit(project, body);
  }

  @Delete(':id')
  @ProjectRoles(ProjectRole.owner)
  async delete(@Param('id') id: string): Promise<void> {
    await this.projectService.delete(id);
  }
}
