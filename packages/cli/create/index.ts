import * as path from 'path';
import chalk from 'chalk';
import Listr from 'listr';
import { execa } from 'execa';
import { prompt } from 'enquirer';
import type { TemplateArgs } from './types';
import { removeDirIfExists } from './remove-dir-if-exists';
import { copyContents } from './copy-contents';

/**
 * Initialize no-code application by copying the contents from the `./template`
 * directory to user's location and installing dependencies with selected package manager
 */
export const create = async () => {
  const { name } = await prompt<{ name: string }>({
    type: 'input',
    name: 'name',
    message: 'Enter the application name',
    initial: 'nocode-app'
  });

  const target = path.join(process.cwd(), name, '/');
  await removeDirIfExists(target, name);

  const { manager } = await prompt<{ manager: TemplateArgs['manager'] }>({
    type: 'select',
    name: 'manager',
    message: 'Choose your package manager',
    choices: ['npm', 'yarn', 'pnpm'],
  });

  const templateArgs: TemplateArgs = { name, manager };
  try {
    copyContents(templateArgs, target);

    const install = new Listr([{
      title: 'Installing dependencies',
      task: async () => execa(manager, ['install'], {
        cwd: target,
      }),
    }]);
    await install.run();
  } catch (e) {
    console.error(chalk.red(e));
    process.exit();
  }

  console.info();
  console.info(chalk.magenta('Application successfully created! Now you can run:'));
  console.info(chalk.cyan(`cd ${name}`));
  console.info(chalk.cyan(`${manager} start`));
};
