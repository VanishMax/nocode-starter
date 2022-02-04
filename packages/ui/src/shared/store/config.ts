import { defineStore } from 'pinia';
import type { NocodeConfig } from 'nocode-starter-core';
import nocodeConfig from '~/shared/utils/config';
import darkMode from '~/shared/utils/dark-mode';

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: null as unknown as NocodeConfig,
  }),
  actions: {
    setConfig (config: NocodeConfig) {
      this.config = config;
      nocodeConfig.save(config);
    },
    toggleDarkMode () {
      const newMode = !this.config.darkMode;
      darkMode.setHtmlClass(newMode);
      this.config.darkMode = newMode;
      nocodeConfig.save(this.config);
    },
  },
});
