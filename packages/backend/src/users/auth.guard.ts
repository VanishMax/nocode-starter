import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from './users.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import constants from '../utils/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const alwaysAllow = this.reflector.get<string[]>(
      'alwaysAllow',
      context.getHandler(),
    );
    if (alwaysAllow) return true;

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')?.[1] || '';
    if (!token) {
      throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    }

    const decoded: any = jwt.verify(
      token,
      this.configService.get(constants.auth_secret_env),
    );

    const res = await this.userService.findOne(decoded.id);
    if (!res) {
      throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    }

    req.user = res;
    return true;
  }
}
