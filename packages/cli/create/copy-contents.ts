import * as path from 'path';
import * as fs from 'fs';
import type { TemplateArgs } from './types';
import { copy } from '../utils/copy';
import { removeDir } from '../utils/remove-dir';
import { gitignore } from './template/.gitignore';
import { packageJson } from './template/package.json';

/**
 * Compile the files from the `template` directory into an abstract `out` folder
 * which is then copied into the destination folder
 */
export const copyContents = (args: TemplateArgs, target: string) => {
  const template = path.join(__dirname, '..', 'out');
  if (fs.existsSync(template) && fs.readdirSync(template)) removeDir(template);
  if (!fs.existsSync(template)) fs.mkdirSync(template);

  const writeOptions = { encoding: 'utf-8' as 'utf-8' };
  fs.writeFileSync(path.join(template, '.gitignore'), gitignore(), writeOptions);
  fs.writeFileSync(path.join(template, 'package.json'), JSON.stringify(packageJson(args), null, 2), writeOptions);

  copy(template, target);
};
