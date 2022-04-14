import { execa } from 'execa';
import path from 'path';

const runInvoker = async () => {
  await execa('pnpm', ['start'], {
    cwd: path.join(__dirname, '..'),
  }).stdout.pipe(process.stdout);
};

export const bootstrap = () => {
  runInvoker();
};

bootstrap();
