import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectService } from './projects.service';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { ProjectRole } from './dto/project-user.dto';
import { Auth } from '../users/auth.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
class ProjectRolesGuard implements CanActivate {
  constructor(
    private projectService: ProjectService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<ProjectRole[]>(
      'roles',
      context.getHandler(),
    );

    const req: Request = context.switchToHttp().getRequest();
    const projectId = req.params.id;
    const user = req.user;

    return this.projectService.canAccess(roles, projectId, user._id);
  }
}

export const ProjectRoles = (...roles: ProjectRole[]) => {
  return applyDecorators(
    Auth(),
    SetMetadata('roles', roles),
    UseGuards(ProjectRolesGuard),
    ApiForbiddenResponse({ description: 'Not enough permissions' }),
  );
};
