import type { AuthResponse } from '@nocode/core';
import request from '../../shared/api/request';
import { useUserStore } from '~/entities/user/store';

const userApi = {
  login: async (data: { username: string }) => {
    const res = await request<AuthResponse>('/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (typeof res.data !== 'undefined') {
      const userStore = useUserStore();
      userStore.setAuth(res.data);
    }

    return res;
  },
  profile: () => {
    const store = useUserStore();
    return request<AuthResponse>('/users/profile', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${store.token}`,
      },
    });
  },
};

export default userApi;
