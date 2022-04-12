import { execa } from 'execa';
import path from 'path';

export const bootstrap = async () => {
  console.log('Warming the backend up');
  await execa('pnpm', ['start'], {
    cwd: path.join(__dirname, '..'),
  }).stdout.pipe(process.stdout);
};

bootstrap();
