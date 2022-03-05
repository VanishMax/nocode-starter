import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Db, ObjectId, WithId } from 'mongodb';
import { AggregatedProject, Project } from './projects.types';
import { CreateProjectDto } from './dto/create-project.dto';
import { ModelService } from '../models/models.service';
import { Model } from '../models/models.types';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: Db,
    private modelService: ModelService,
  ) {}

  async findMy(): Promise<WithId<Project>[]> {
    return await this.db.collection<Project>('projects').find().toArray();
  }

  async findOne(id: string): Promise<WithId<AggregatedProject>> {
    if (!ObjectId.isValid(id)) throw new BadRequestException();

    const response = await this.db.collection<Project>('projects').findOne({
      _id: new ObjectId(id),
    });
    if (!response) throw new NotFoundException();

    const model = await this.db.collection<Model>('models').findOne({
      _id: new ObjectId(response.model),
    });
    if (!model) throw new NotFoundException();

    return {
      ...response,
      model: model,
    };
  }

  async create(body: CreateProjectDto): Promise<WithId<Project>> {
    const modelId = new ObjectId();
    const newProject: Project = {
      ...body,
      users: [],
      online: [],
      model: modelId,
    };

    await this.modelService.create({ model: {} }, modelId);
    const res = await this.db
      .collection<Project>('projects')
      .insertOne(newProject);
    return { ...newProject, _id: res.insertedId };
  }
}
