import type { WithId } from 'mongodb';

export interface User {
  username: string;
}

export interface AuthResponse {
  token: string;
  user: WithId<User>;
}
