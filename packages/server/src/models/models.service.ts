import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import set from 'lodash.set';
import { ModelDto } from './dto/model.dto';
import { ModelEditDto } from './dto/edit-model.dto';
import { ProjectDto } from '../projects/dto/project.dto';
import { modelData } from './model.data';

const MODEL_COLLECTION = 'models';

@Injectable()
export class ModelService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async findOne(id: string): Promise<ModelDto> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const response = await this.db
      .collection<ModelDto>(MODEL_COLLECTION)
      .findOne({
        _id: new ObjectId(id) as unknown as string,
      });

    if (!response) throw new NotFoundException();
    return response;
  }

  async create(): Promise<ModelDto> {
    const res = await this.db.collection<ModelDto>(MODEL_COLLECTION).insertOne({
      _id: new ObjectId() as unknown as string,
      ...modelData,
    });
    return { _id: res.insertedId, ...modelData };
  }

  async edit(project: ProjectDto, data: ModelEditDto): Promise<ModelDto> {
    const model = project.model;
    const filter = { _id: new ObjectId(model._id) as unknown as string };
    await this.db.collection<ModelDto>(MODEL_COLLECTION).updateOne(filter, {
      $set: data,
    });

    Object.entries(data).forEach(([key, val]) => set(model, key, val));
    return model;
  }
}
