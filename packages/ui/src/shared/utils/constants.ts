const isNative = import.meta.env.VITE_APP_NATIVE as 'true' | 'false';
export const IS_APP_NATIVE = typeof isNative === 'undefined' ? false : isNative === 'true';

export const LS_MODEL_NAME = 'nocode-starter-model';
export const LS_CONFIG_NAME = 'nocode-starter-config';
