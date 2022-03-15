import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateProjectDto } from './dto/create-project.dto';
import { ModelService } from '../models/models.service';
import { UserDto } from '../users/dto/user.dto';
import {
  ProjectRole,
  ProjectUserDto,
  ShortProjectUserDto,
} from './dto/project-user.dto';
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
      .aggregate<ProjectDto>([
        {
          $match: {
            _id: new ObjectId(id) as unknown as string,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'users._id',
            foreignField: '_id',
            as: 'users',
            let: { users: '$users' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$users._id'],
                  },
                },
              },
              {
                $addFields: {
                  docs: {
                    $filter: {
                      input: '$$users',
                      cond: {
                        $eq: ['$$this._id', '$_id'],
                      },
                    },
                  },
                },
              },
              { $unwind: '$docs' },
              {
                $replaceRoot: {
                  newRoot: {
                    $mergeObjects: [
                      '$docs',
                      {
                        users: {
                          $arrayToObject: {
                            $filter: {
                              input: { $objectToArray: '$$ROOT' },
                              cond: { $ne: ['$$this.k', 'docs'] },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      ])
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

  async create(body: CreateProjectDto, user: UserDto): Promise<ProjectDto> {
    const model = await this.modelService.create();

    const userData: ShortProjectUserDto = {
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

    return await this.findOne(res.insertedId);
  }

  async updateUsers(id: string, users: ProjectUserDto[]) {
    const res = await this.db.collection<ProjectDto>('projects').updateOne(
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
        newUsers.push(user);
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
