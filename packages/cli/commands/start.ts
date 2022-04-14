import { execa } from 'execa';
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
      task: runPackage.bind(null, 'nocode-starter-ui', 'localhost:3000'),
    },
    {
      title: 'Backend',
      task: runPackage.bind(null, 'nocode-starter-backend', 'Nest application successfully started'),
    },
    {
      title: 'Invoker',
      task: runPackage.bind(null, 'nocode-starter-invoker', 'localhost:3002'),
    },
  ], {
    concurrent: true,
  });

  try {
    const ctx = await tasks.run();
    console.info('\x1b[32m%s\x1b[0m', 'The apps are running!');
  } catch (err) {
    console.error(err);
  }
};
