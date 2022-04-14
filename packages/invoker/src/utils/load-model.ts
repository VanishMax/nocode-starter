import { ref } from 'vue';
import type { Model } from 'nocode-starter-core';
import { MODEL_FILE_PATH } from './constants';

export const loadModel = async () => {
  let model: Model | null = null;
  let error = '';

  try {
    if (!MODEL_FILE_PATH) {
      error = 'Model file path is not specified!';
    } else {
      const modelRes = await import(/* @vite-ignore */ MODEL_FILE_PATH);
      model = JSON.parse(modelRes);
    }
  } catch (e) {
    error = 'Couldn\'t load the model';
  }

  return {
    model: ref(model),
    error: ref(error),
  };
};
