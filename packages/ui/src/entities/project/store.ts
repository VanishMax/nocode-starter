import { defineStore } from 'pinia';
import type { Project } from 'nocode-starter-core';

const useProjectStore = defineStore('canvas', {
  state: () => ({
    project: null as Project | null,
  }),
  actions: {
    setProject (project: Project | null) {
      this.project = project;
    },
  },
});

export default useProjectStore;
