import { defineStore } from 'pinia';
import type { NocodeConfig } from '@nocode/core';
import { NocodeLanguage } from '@nocode/core';
import { LS_CONFIG_NAME } from '~/constants';
import darkMode from './dark-mode';

const initialConfig: NocodeConfig = {
  language: NocodeLanguage.EN,
};

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: null as unknown as NocodeConfig,
  }),
  actions: {
    /** Set updated config to local storage */
    save (config: NocodeConfig) {
      localStorage.setItem(LS_CONFIG_NAME, JSON.stringify(config));
    },
    /** Load project configuration from LocalStorage */
    load (): NocodeConfig {
      try {
        const config = localStorage.getItem(LS_CONFIG_NAME) || '';
        return JSON.parse(config) as NocodeConfig;
      } catch (_) {
        return initialConfig;
      }
    },
    change (config: NocodeConfig) {
      this.config = config;
      this.save(config);
    },

    /** Initial configuration setup */
    async setup () {
      const config = await this.load();

      if (typeof config.darkMode === 'undefined') config.darkMode = darkMode.isSystemDark();
      darkMode.setHtmlClass(config.darkMode);

      this.change(config);
    },

    toggleDarkMode () {
      const newMode = !this.config.darkMode;
      darkMode.setHtmlClass(newMode);
      this.config.darkMode = newMode;
      this.save(this.config);
    },
  },
});
