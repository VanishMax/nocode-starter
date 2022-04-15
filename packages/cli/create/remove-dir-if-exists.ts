import * as fs from 'fs';
import { prompt } from 'enquirer';
import { removeDir } from '../utils';

/**
 * If {name} directory exists in {target}, ask to remove it; otherwise quit
 */
export const removeDirIfExists = async (target: string, name: string) => {
  if (fs.existsSync(target) && fs.readdirSync(target)) {
    const { overwrite } = await prompt<{ overwrite: boolean }>({
      type: 'confirm',
      name: 'overwrite',
      message: `Directory ${name} is not empty. Would you like to overwrite it?`,
    });

    if (!overwrite) {
      process.exit();
    } else {
      removeDir(target);
    }
  }
};
