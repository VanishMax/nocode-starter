declare namespace Express {
  import type { UserDto } from './users/dto/user.dto';

  export interface Request {
    user: UserDto;
  }
}
