import { program } from 'commander';
import { start } from './commands/start';

const init = () => {
  program
    .name('no-code')
    .description('CLI to run a custom no-code app');

  program
    .command('start')
    .action(start);

  program.parse();
};

init();
