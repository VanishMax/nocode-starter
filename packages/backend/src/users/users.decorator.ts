import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import constants from '../utils/constants';

/**
 * Decorator that extracts the user object from the Request object for
 * protected routes and from request headers for not protected routes
 */
export const UserBody = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const secret = process.env[constants.auth_secret_env];
    const req = ctx.switchToHttp().getRequest();

    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
      return !!data ? req.user[data] : req.user;
    }

    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization
      ? (req.headers.authorization as string).split(' ')?.[1] || null
      : null;

    if (token) {
      const decoded: any = verify(token, secret);
      return !!data ? decoded[data] : decoded.user;
    }
  },
);
