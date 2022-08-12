import type { TemplateArgs } from '../types';

export const packageJson = ({ name }: TemplateArgs): string => {
  return JSON.stringify({
    name,
    version: '0.1.0',
    scripts: {
      start: 'nocode start',
    },
    dependencies: {
      '@nocode/server': 'latest',
      '@nocode/cli': 'latest',
      '@nocode/ui': 'latest',
      '@nocode/invoker': 'latest'
    }
  }, null, 2);
};
