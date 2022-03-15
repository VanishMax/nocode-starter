import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { ModelDto } from './dto/model.dto';
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
        _id: id,
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
}
