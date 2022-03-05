import type { ObjectId } from 'mongodb';
import type { Model } from '../models/models.types';

export interface Project {
  name: string;
  users: ObjectId[];
  online: ObjectId[];
  model: ObjectId;
}

export interface AggregatedProject {
  name: string;
  users: ObjectId[];
  online: ObjectId[];
  model: Model;
}
