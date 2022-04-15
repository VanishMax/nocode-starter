import chalk from 'chalk';
import Listr from 'listr';
import { runPackage, readEnv } from '../utils';

export const start = async () => {
  readEnv();

  const tasks = new Listr([
    {
      title: 'UI',
      task: runPackage.bind(null, 'nocode-ui', 'localhost:3000'),
    },
    {
      title: 'Backend',
      task: runPackage.bind(null, 'nocode-backend', 'Nest application successfully started'),
    },
    {
      title: 'Invoker',
      task: runPackage.bind(null, 'nocode-invoker', 'localhost:3002'),
    },
  ], {
    concurrent: true,
  });

  try {
    const ctx = await tasks.run();

    console.info();
    console.info(chalk.magenta('The apps are running!'));
    console.info(chalk.cyan('No-code app'), 'http://localhost:3000');
    console.info(chalk.cyan('Swagger API'), 'http://localhost:3001/api/docs');
    console.info(chalk.cyan('Invoker    '), 'http://localhost:3002');
  } catch (err) {
    console.error(err);
  }
};
