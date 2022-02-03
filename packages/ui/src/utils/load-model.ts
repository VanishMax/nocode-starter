import { fs } from '@tauri-apps/api';
import { BaseDirectory } from '@tauri-apps/api/fs';
import type { Model } from 'nocode-starter-core';
import { IS_APP_NATIVE, LS_MODEL_NAME } from '~/utils/constants';

const loadModel = async (): Promise<Model | null> => {
  if (IS_APP_NATIVE) {
    try {
      const textModel = await fs.readTextFile('./model/model.json', { dir: BaseDirectory.Desktop });
      return JSON.parse(textModel) as Model;
    } catch (_) {
      return null;
    }
  }

  try {
    const textModel = localStorage.getItem(LS_MODEL_NAME) || '';
    return JSON.parse(textModel) as Model;
  } catch (_) {
    return null;
  }
};

export default loadModel;
