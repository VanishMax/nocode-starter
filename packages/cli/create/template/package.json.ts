import type { TemplateArgs } from '../types';

export const packageJson = ({ name }: TemplateArgs) => {
  return {
    name,
    version: '0.1.0',
    scripts: {
      start: 'nocode start',
    },
    dependencies: {
      '@nocode/backend': 'latest',
      '@nocode/cli': 'latest',
      '@nocode/ui': 'latest',
      '@nocode/invoker': 'latest'
    }
  };
};
