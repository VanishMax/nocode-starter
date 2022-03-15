import type { Model } from './model';
import type { User } from './user';

export enum ProjectRole {
  owner = 'owner',
  editor = 'editor',
  reader = 'reader',
}

export interface BackendProjectUser {
  _id: string,
  role: ProjectRole,
}

export interface BackendProject {
  _id: string;
  name: string;
  users: BackendProjectUser[];
  online: string[];
  model: string;
}

export interface ProjectUser extends User {
  role: ProjectRole,
}

export interface Project {
  _id: string;
  name: string;
  users: ProjectUser[];
  online: string[];
  model: Model;
}
