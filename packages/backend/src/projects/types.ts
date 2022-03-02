import type { ObjectId } from 'mongodb';

export interface Project {
  name: string;
  users: ObjectId[];
  online: ObjectId[];
  model: ObjectId;
}
