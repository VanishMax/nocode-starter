import { execa } from 'execa';

export const bootstrap = async () => {
  console.log('Warming the backend up');
  execa('pnpm', ['dev']).stdout.pipe(process.stdout);
};

// bootstrap();
