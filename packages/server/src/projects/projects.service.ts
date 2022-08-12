import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { ModelService } from '../models/models.service';
import { UserDto } from '../users/dto/user.dto';
import {
  ProjectRole,
  ProjectUserDto,
  ShortProjectUserDto,
} from './dto/project-user.dto';
import { ProjectDto } from './dto/project.dto';
import { ShortProjectDto } from './dto/short-project.dto';
import joinWithData from '../utils/join-with-data';

const PROJECTS_COLLECTION = 'projects';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: Db,
    private modelService: ModelService,
  ) {}

  async findOne(id?: string): Promise<ProjectDto> {
    if (typeof id !== 'undefined' && !ObjectId.isValid(id)) {
      throw new BadRequestException();
    }
    const matcher = {
      $match:
        typeof id === 'undefined'
          ? {}
          : {
              _id: new ObjectId(id) as unknown as string,
            },
    };

    const project = await this.db
      .collection<ShortProjectDto>(PROJECTS_COLLECTION)
      .aggregate<ProjectDto>([matcher, ...joinWithData('users', 'users')])
      .next();
    if (!project) throw new NotFoundException();

    const model = await this.modelService.findOne(
      project.model as unknown as string,
    );
    if (!model) throw new NotFoundException();

    return {
      ...project,
      model,
    };
  }

  async create(user: UserDto): Promise<ProjectDto> {
    const model = await this.modelService.create();

    const userData: ShortProjectUserDto = {
      _id: new ObjectId(user._id) as unknown as string,
      role: ProjectRole.owner,
    };

    const newProject: ShortProjectDto = {
      _id: new ObjectId() as unknown as string,
      users: [userData],
      online: [],
      model: model._id,
    };

    const res = await this.db
      .collection<ShortProjectDto>(PROJECTS_COLLECTION)
      .insertOne(newProject);

    return await this.findOne(res.insertedId);
  }

  private async updateUsers(id: string, users: ProjectUserDto[]) {
    const res = await this.db
      .collection<ProjectDto>(PROJECTS_COLLECTION)
      .updateOne(
        {
          _id: new ObjectId(id) as unknown as string,
        },
        {
          $set: {
            users: users,
          },
        },
      );
    if (!res) throw new InternalServerErrorException();
  }

  async invite(
    id: string,
    users: ProjectUserDto[],
    selfId: ObjectId,
  ): Promise<ProjectUserDto[]> {
    const project = await this.findOne(id);
    const newUsers: ProjectUserDto[] = project.users;
    users.forEach((user) => {
      const existing = newUsers.find((ex) => ex._id === user._id);
      if (existing) {
        if ((existing._id as unknown as ObjectId) === selfId) {
          throw new BadRequestException('Cannot change your own role');
        }
        if (!ProjectRole[user.role]) {
          throw new BadRequestException(`No such role "${user.role}"`);
        }

        existing.role = user.role;
      } else {
        newUsers.push({
          ...user,
          _id: new ObjectId(user._id) as unknown as string,
        });
      }
    });

    await this.updateUsers(id, newUsers);
    return newUsers;
  }

  async removeInvite(
    id: string,
    users: ProjectUserDto[],
  ): Promise<ProjectUserDto[]> {
    const project = await this.findOne(id);
    const newUsers: ProjectUserDto[] = project.users.filter(
      (user) => !users.some((ex) => ex._id === user._id),
    );
    await this.updateUsers(id, newUsers);
    return newUsers;
  }

  async delete(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const response = await this.db
      .collection<ProjectDto>(PROJECTS_COLLECTION)
      .deleteOne({
        _id: new ObjectId(id) as unknown as string,
      });

    if (response.deletedCount === 0) {
      throw new NotFoundException();
    }
  }

  public async canAccess(
    roles: ProjectRole[],
    projectId: string,
    userId: ObjectId,
  ): Promise<boolean> {
    const res = await this.db
      .collection<ProjectDto>(PROJECTS_COLLECTION)
      .findOne({
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
