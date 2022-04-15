import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  preview: {
    port: process.env.PORT || 3002,
  },
  server: {
    port: process.env.PORT || 3002,
    host: '0.0.0.0',
  },
});
