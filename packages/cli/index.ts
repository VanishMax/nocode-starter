import { program } from 'commander';
import { start } from './commands/start';
import { create } from './create';

const init = () => {
  program
    .name('no-code')
    .description('CLI to run a custom no-code app');

  program
    .command('start')
    .description('Production start of No-code UI, server and invoker')
    .action(start);

  program
    .command('create')
    .description('Create a No-code application')
    .action(create);

  program.parse();
};

init();
