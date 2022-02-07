import type { NocodeModel } from 'nocode-starter-core';
import { LS_MODEL_NAME } from '~/shared/utils/constants';

const initialModel: NocodeModel = {
  project_name: '',
};

const loadModel = async (): Promise<NocodeModel> => {
  try {
    const textModel = localStorage.getItem(LS_MODEL_NAME) || '';
    return JSON.parse(textModel) as NocodeModel;
  } catch (_) {
    return initialModel;
  }
};

const saveModel = async (model: NocodeModel) => {
  localStorage.setItem(LS_MODEL_NAME, JSON.stringify(model));
};

const nocodeModel = {
  load: loadModel,
  save: saveModel,
};

export default nocodeModel;
