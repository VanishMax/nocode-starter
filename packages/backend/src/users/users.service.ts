import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { User } from './users.types';
import { Db, ObjectId, WithId } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { sign } from 'jsonwebtoken';
import constants from '../utils/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
    private readonly configService: ConfigService,
  ) {}

  async find(): Promise<WithId<User>[]> {
    return await this.db.collection<User>('users').find().toArray();
  }

  async findOne(id: ObjectId): Promise<WithId<User>> {
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

  async findByUsername(username: string): Promise<WithId<User> | null> {
    if (
      !username ||
      typeof username !== 'string' ||
      /^[^a-zA-Z]/.test(username)
    ) {
      throw new BadRequestException();
    }

    const res = await this.db.collection<User>('users').findOne({
      username: username,
    });

    if (!res) {
      return null;
    }

    return res;
  }

  async create(body: CreateUserDto): Promise<WithId<User>> {
    const res = await this.db.collection<User>('users').insertOne(body);
    return { ...body, _id: res.insertedId };
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

  public userWithJWT(user: WithId<User>) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const token = sign(
      {
        id: user._id,
        username: user.username,
        exp: exp.getTime() / 1000,
      },
      this.configService.get(constants.auth_secret_env),
    );

    return {
      token,
      user,
    };
  }
}
