import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
  }),
  actions: {
    setUsername (name: string) {
      this.username = name;
    },
  },
});
