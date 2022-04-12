import { preview } from 'vite';
import path from 'path';

const runUI = async () => {
  const previewServer = await preview({
    configFile: path.join(__dirname, '..', 'vite.config.ts'),
    root: path.join(__dirname),
    preview: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
    },
  });

  previewServer.printUrls();
};

export const bootstrap = () => {
  console.log('Warming the UI up');
  runUI();
};

bootstrap();
