import * as path from 'path';
import * as fs from 'fs';
import type { TemplateArgs } from './types';
import { copy, removeDir } from '../utils';
import { contents } from './template';

/**
 * Compile the files from the `template` directory into an abstract `out` folder
 * which is then copied into the destination folder
 */
export const copyContents = (args: TemplateArgs, target: string) => {
  const interim = path.join(__dirname, '..', 'out');
  if (fs.existsSync(interim) && fs.readdirSync(interim)) removeDir(interim);
  if (!fs.existsSync(interim)) fs.mkdirSync(interim);

  const template = path.join(__dirname, '..', 'create', 'template');
  const writeOptions = { encoding: 'utf-8' as 'utf-8' };

  contents.forEach((file) => {
    const content = file.type === 'copy'
      ? fs.readFileSync(path.join(template, file.name), { encoding: 'utf-8' })
      : file.template(args);
    fs.writeFileSync(path.join(interim, file.name), content, writeOptions);
  });

  copy(interim, target);
};
