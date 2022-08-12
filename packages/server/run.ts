import { execa } from 'execa';
import path from 'path';

export const bootstrap = async () => {
  await execa('pnpm', ['start'], {
    cwd: path.join(__dirname, '..'),
  }).stdout.pipe(process.stdout);
};

bootstrap();
