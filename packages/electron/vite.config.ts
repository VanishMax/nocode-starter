import { defineConfig } from 'vite';

export default defineConfig({
  mode: process.env.MODE,
  build: {
    sourcemap: 'inline',
    outDir: 'dist',
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        'electron',
        'electron-devtools-installer',
      ],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
});
