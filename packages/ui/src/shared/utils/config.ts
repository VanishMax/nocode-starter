import type { NocodeConfig } from 'nocode-starter-core';
import { LS_CONFIG_NAME } from '~/shared/utils/constants';
import { useConfigStore } from '~/shared/store/config';
import darkMode from '~/shared/utils/dark-mode';

const initialConfig: NocodeConfig = {
  projects: [],
};

const loadConfig = (): NocodeConfig => {
  try {
    const config = localStorage.getItem(LS_CONFIG_NAME) || '';
    return JSON.parse(config) as NocodeConfig;
  } catch (_) {
    return initialConfig;
  }
};

const setupConfig = async () => {
  const configStore = useConfigStore();

  const config = await loadConfig();

  if (typeof config.darkMode === 'undefined') config.darkMode = darkMode.isSystemDark();
  darkMode.setHtmlClass(config.darkMode);

  configStore.setConfig(config);
};

const saveConfig = (config: NocodeConfig) => {
  localStorage.setItem(LS_CONFIG_NAME, JSON.stringify(config));
};

const nocodeConfig = {
  load: loadConfig,
  setup: setupConfig,
  save: saveConfig,
};

export default nocodeConfig;
