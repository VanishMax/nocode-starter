import { defineStore } from 'pinia';
import { User, AuthResponse } from '@nocode/core';
import { LS_TOKEN_NAME } from '~/constants';
import userApi from './api';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem(LS_TOKEN_NAME) || '',
  }),
  getters: {
    isAuth (): boolean {
      return !!this.user;
    },
  },
  actions: {
    setToken (token: string) {
      if (!token) {
        localStorage.removeItem(LS_TOKEN_NAME);
      } else {
        localStorage.setItem(LS_TOKEN_NAME, token);
      }
      this.token = token;
    },
    setAuth (authData: AuthResponse) {
      this.user = authData.user;
      this.setToken(authData.token);
    },
    async checkAuth () {
      if (!this.token || this.user) return;

      const res = await userApi.profile();
      if (res.error) this.setToken('');
      if (res.data) {
        this.setAuth(res.data);
      }
    },
  },
});
