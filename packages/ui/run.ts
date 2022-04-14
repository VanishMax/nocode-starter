import path from 'path';
import { execa } from 'execa';

const runUI = async () => {
  await execa('pnpm', ['start'], {
    cwd: path.join(__dirname, '..'),
  }).stdout.pipe(process.stdout);
};

export const bootstrap = () => {
  runUI();
};

bootstrap();
