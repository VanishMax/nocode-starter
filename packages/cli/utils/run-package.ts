import { execa } from 'execa';

export const runPackage = (command: string, successMessage: string) => {
  return new Promise((resolve, reject) => {
    try {
      const stream = execa('pnpm', ['exec', command]).stdout;
      stream.on('data', (chunk: Buffer) => {
        const output  = chunk.toString();
        if (output.includes(successMessage)) {
          resolve(true);
        }
      });
      stream.on('end', () => reject());
      stream.on('error', () => reject());
    } catch (e) {
      reject(e);
    }
  });
};
