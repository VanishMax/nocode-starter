import { execa } from 'execa';

const run = () => {
  console.info('\x1b[32m%s\x1b[0m', 'Starting the app!');
  execa('pnpm', ['exec', 'nocode-starter-ui']).stdout.pipe(process.stdout);
  execa('pnpm', ['exec', 'nocode-starter-backend']).stdout.pipe(process.stdout);
};

run();
