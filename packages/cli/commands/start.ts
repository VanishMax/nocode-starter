import { execa } from 'execa';
import chalk from 'chalk';
import Listr from 'listr';

const runPackage = (command: string, successMessage: string) => {
  return new Promise((resolve, reject) => {
    try {
      const stream = execa('pnpm', ['exec', command]).stdout;
      stream.on('data', (chunk: Buffer) => {
        const output  = chunk.toString();
        if (output.includes(successMessage)) {
          resolve(true);
        }
      });
      stream.on('end', () => reject());
      stream.on('error', () => reject());
    } catch (e) {
      reject(e);
    }
  });
};

export const start = async () => {
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
