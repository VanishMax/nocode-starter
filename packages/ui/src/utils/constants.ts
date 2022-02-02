const isNative = import.meta.env.VITE_APP_NATIVE as 'true' | 'false';
export const IS_APP_NATIVE = typeof isNative === 'undefined' ? false : isNative === 'true';
