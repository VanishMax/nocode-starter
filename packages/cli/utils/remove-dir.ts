import * as fs from 'fs';
import * as path from 'path';

/**
 * Remove directory recursively
 */
export const removeDir = (dir: string) => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((file) => {
    const abs = path.resolve(dir, file);
    if (fs.lstatSync(abs).isDirectory()) {
      removeDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  });
};
