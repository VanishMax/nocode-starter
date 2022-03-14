declare namespace Express {
  import type { WithId } from 'mongodb';
  import type { User } from './users/users.types';

  export interface Request {
    user: WithId<User>;
  }
}
