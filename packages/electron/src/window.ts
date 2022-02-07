import { BrowserWindow } from 'electron';

async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false,
      // preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  // const pageUrl = import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
  //   ? import.meta.env.VITE_DEV_SERVER_URL as string
  //   : new URL('../ui/dist/index.html', 'file://' + __dirname).toString();
  // await browserWindow.loadURL(pageUrl);
  await browserWindow.loadFile('../ui/dist/index.html');

  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export const restoreOrCreateWindow = async () => {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
};
