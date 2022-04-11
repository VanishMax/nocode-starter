import { bootstrap as bootstrapBackend } from 'nocode-starter-backend';

const run = () => {
  console.info('\x1b[32m%s\x1b[0m', 'Starting the app!');
  bootstrapBackend();
};

run();
