import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Db, ObjectId, WithId } from 'mongodb';
import { Model } from './models.types';
import { CreateModelDto } from './dto/create-model.dto';

const MODEL_COLLECTION = 'models';

@Injectable()
export class ModelService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async findOne(id: string): Promise<WithId<Model>> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const response = await this.db.collection<Model>(MODEL_COLLECTION).findOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      throw new NotFoundException();
    }

    return response;
  }

  async create(
    { model }: CreateModelDto,
    id?: ObjectId,
  ): Promise<WithId<Model>> {
    if (!model) {
      throw new BadRequestException();
    }

    const data: { model: CreateModelDto['model']; _id?: ObjectId } = { model };
    if (id) data._id = id;

    const res = await this.db
      .collection<Model>(MODEL_COLLECTION)
      .insertOne(data);
    return { model, _id: res.insertedId };
  }
}
