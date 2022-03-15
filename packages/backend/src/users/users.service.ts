import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, ObjectId } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { sign } from 'jsonwebtoken';
import constants from '../utils/constants';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
    private readonly configService: ConfigService,
  ) {}

  async find(): Promise<UserDto[]> {
    return await this.db.collection<UserDto>('users').find().toArray();
  }

  async findOne(id: string): Promise<UserDto> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const response = await this.db.collection<UserDto>('users').findOne({
      _id: new ObjectId(id) as unknown as string,
    });

    if (!response) throw new NotFoundException();
    return response;
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    if (
      !username ||
      typeof username !== 'string' ||
      /^[^a-zA-Z]/.test(username)
    ) {
      throw new BadRequestException();
    }

    const res = await this.db.collection<UserDto>('users').findOne({
      username: username,
    });

    if (!res) return null;
    return res;
  }

  async create(body: CreateUserDto): Promise<UserDto> {
    const res = await this.db
      .collection<CreateUserDto>('users')
      .insertOne(body);
    return { ...body, _id: res.insertedId.toString() };
  }

  async delete(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const response = await this.db.collection<UserDto>('users').deleteOne({
      _id: id,
    });

    if (response.deletedCount === 0) {
      throw new NotFoundException();
    }
  }

  public userWithJWT(user: UserDto): AuthResponseDto {
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
