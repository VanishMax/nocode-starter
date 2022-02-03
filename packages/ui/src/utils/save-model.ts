import { fs } from '@tauri-apps/api';
import { BaseDirectory } from '@tauri-apps/api/fs';
import type { Model } from 'nocode-starter-core';
import { IS_APP_NATIVE, LS_MODEL_NAME } from '~/utils/constants';

const saveModel = async (model: Model) => {
  if (IS_APP_NATIVE) {
    const dirs = await fs.readDir('.', { dir: BaseDirectory.Desktop });
    if (!dirs.some((dir) => dir.name === 'model')) {
      await fs.createDir('model', { dir: BaseDirectory.Desktop });
    }
    await fs.writeFile({
      path: './model/model.json',
      contents: JSON.stringify(model, null, 2),
    }, { dir: BaseDirectory.Desktop });
    return;
  }

  localStorage.setItem(LS_MODEL_NAME, JSON.stringify(model));
};

export default saveModel;
