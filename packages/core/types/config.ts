import { Model } from './model';

export interface NocodeProject {
  _id?: string,
  name: string,
  logo?: string | File,
  accessedAt?: Date,
  createdAt?: Date,
  model: {
    _id?: string,
    model: Model,
  },
}

export interface NocodeConfig {
  darkMode?: boolean,
}
