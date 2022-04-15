import type { TemplateArgs } from '../types';
import { packageJson } from './package.json';
import { envFile } from './.env';

interface TemplateFile {
  type: 'template',
  name: string,
  template: (args: TemplateArgs) => string,
}

interface CopyFile {
  type: 'copy',
  name: string,
}

export const contents: (TemplateFile | CopyFile)[] = [
  {
    type: 'copy',
    name: '.gitignore',
  },
  {
    type: 'copy',
    name: 'README.md',
  },
  {
    type: 'template',
    name: '.env',
    template: envFile,
  },
  {
    type: 'template',
    name: 'package.json',
    template: packageJson,
  },
];
