import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateProjectDto } from './dto/create-project.dto';
import { ModelService } from '../models/models.service';
import { UserDto } from '../users/dto/user.dto';
import { ProjectRole, ProjectUserDto } from './dto/project-user.dto';
import { ProjectDto } from './dto/project.dto';
import { ShortProjectDto } from './dto/short-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: Db,
    private modelService: ModelService,
  ) {}

  async findMy(id: string): Promise<ProjectDto[]> {
    return await this.db
      .collection<ShortProjectDto>('projects')
      .aggregate<ProjectDto>([
        {
          $match: {
            'users._id': id,
          },
        },
        {
          $lookup: {
            from: 'models',
            localField: 'model',
            foreignField: '_id',
            as: 'model',
          },
        },
      ])
      .toArray();
  }

  async findOne(id: string): Promise<ProjectDto> {
    if (!ObjectId.isValid(id)) throw new BadRequestException();

    const project = await this.db
      .collection<ShortProjectDto>('projects')
      .findOne({
        _id: new ObjectId(id) as unknown as string,
      });
    if (!project) throw new NotFoundException();

    const model = await this.modelService.findOne(project.model);
    if (!model) throw new NotFoundException();

    return {
      ...project,
      model,
    };
  }

  async create(body: CreateProjectDto, user: UserDto): Promise<ProjectDto> {
    const model = await this.modelService.create();

    const userData: ProjectUserDto = {
      _id: user._id,
      role: ProjectRole.owner,
    };

    const newProject: ShortProjectDto = {
      _id: new ObjectId() as unknown as string,
      ...body,
      users: [userData],
      online: [],
      model: model._id,
    };

    const res = await this.db
      .collection<ShortProjectDto>('projects')
      .insertOne(newProject);

    return {
      _id: res.insertedId.toString(),
      ...newProject,
      model,
    };
  }

  public async canAccess(
    roles: ProjectRole[],
    projectId: string,
    userId: ObjectId,
  ): Promise<boolean> {
    const res = await this.db.collection<ProjectDto>('projects').findOne({
      _id: new ObjectId(projectId) as unknown as string,
      'users._id': userId,
    });

    const role =
      res?.users.find(
        (user) =>
          (user._id as unknown as ObjectId).toString() === userId.toString(),
      )?.role || null;

    if (!role || !roles.includes(role)) {
      throw new ForbiddenException("You don't have enough permissions");
    }

    if (role) return true;
  }
}
