import { defineStore } from 'pinia';
import { User, AuthResponse } from 'nocode-starter-core';
import { LS_CONFIG_NAME } from '~/constants';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
    token: '',
  }),
  actions: {
    setToken (token: string) {
      localStorage.setItem(LS_CONFIG_NAME, token);
      this.token = token;
    },
    setAuth (authData: AuthResponse) {
      this.user = authData.user;
    },
  },
});
