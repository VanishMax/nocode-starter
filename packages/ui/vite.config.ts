// @ts-ignore
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  base: '',
  build: {
    outDir: '../dist',
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
