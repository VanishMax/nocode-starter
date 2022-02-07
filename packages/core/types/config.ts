export interface NocodeProject {
  name: string,
  path: string,
  logo?: string | File,
  accessedAt?: Date,
  createdAt?: Date,
}

export interface NocodeConfig {
  darkMode?: boolean,
  projects: NocodeProject[],
}
