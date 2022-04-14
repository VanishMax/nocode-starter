import * as fs from 'fs';
import * as path from 'path';

/**
 * Copy file or directory from {src} location to {dest}
 */
export const copy = (src: string, dest: string) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((file) => {
      const srcFile = path.resolve(src, file);
      const destFile = path.resolve(dest, file);
      copy(srcFile, destFile);
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};
