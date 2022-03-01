import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.interface';
import { Db, ObjectId, WithId } from 'mongodb';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async find(): Promise<WithId<User>[]> {
    return await this.db.collection<User>('users').find().toArray();
  }

  async findOne(id: string): Promise<WithId<User>> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const response = await this.db.collection<User>('users').findOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      throw new NotFoundException();
    }

    return response;
  }

  async create(body: CreateUserDto): Promise<void> {
    await this.db.collection<User>('users').insertOne(body);
  }

  async delete(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const response = await this.db.collection<User>('users').deleteOne({
      _id: new ObjectId(id),
    });

    if (response.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
