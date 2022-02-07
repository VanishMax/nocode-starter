import type { NocodeModel } from 'nocode-starter-core';
import { IS_APP_NATIVE, LS_MODEL_NAME } from '~/shared/utils/constants';

const initialModel: NocodeModel = {
  project_name: '',
};

// const loadModelNative = async (): Promise<NocodeModel> => {
//   try {
//     const textModel = await fs.readTextFile('./model/model.json', { dir: BaseDirectory.Desktop });
//     return JSON.parse(textModel) as NocodeModel;
//   } catch (_) {
//     return initialModel;
//   }
// };

const loadModelBrowser = async (): Promise<NocodeModel> => {
  try {
    const textModel = localStorage.getItem(LS_MODEL_NAME) || '';
    return JSON.parse(textModel) as NocodeModel;
  } catch (_) {
    return initialModel;
  }
};

// const saveModelNative = async (model: NocodeModel) => {
//   const dirs = await fs.readDir('.', { dir: BaseDirectory.Desktop });
//   if (!dirs.some((dir) => dir.name === 'model')) {
//     await fs.createDir('model', { dir: BaseDirectory.Desktop });
//   }
//   await fs.writeFile({
//     path: './model/model.json',
//     contents: JSON.stringify(model, null, 2),
//   }, { dir: BaseDirectory.Desktop });
// };

const saveModelBrowser = async (model: NocodeModel) => {
  localStorage.setItem(LS_MODEL_NAME, JSON.stringify(model));
};

const nocodeModel = {
  // load: () => (IS_APP_NATIVE ? loadModelNative() : loadModelBrowser()),
  // save: (model: NocodeModel) => (IS_APP_NATIVE ? saveModelNative(model) : saveModelBrowser(model)),
  load: loadModelBrowser,
  save: saveModelBrowser,
};

export default nocodeModel;
