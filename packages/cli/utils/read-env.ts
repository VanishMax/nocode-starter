import * as path from 'path';
import { config } from 'dotenv';
import chalk from 'chalk';

const envKeys = ['BACKEND_DATABASE_CONNECTION', 'BACKEND_AUTH_SECRET'];

/**
 * Read the `.env` file from the application directory and check if all variables are filled.
 */
export const readEnv = () => {
  const cwd = process.cwd();
  const envs = config({ path: path.join(cwd, '.env') });

  if (envs.error) {
    console.error(chalk.redBright('Please, configure the .env file!'));
    process.exit();
  }

  const notEnough = envKeys.filter((key) => !envs.parsed[key]);
  if (notEnough.length) {
    console.error(chalk.redBright('Please, fill the .env file!'));
    console.error(chalk.redBright('Unfilled fields:', notEnough.join(', ')));
    process.exit();
  }
};
