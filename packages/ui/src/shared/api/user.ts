import request from './helpers/request';
import { useUserStore } from '~/shared/store/user';

const userApi = {
  login: async (data: { username: string }) => {
    const res = await request<{ username: string }>('/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
      }),
    });

    if (res.data) {
      const userStore = useUserStore();
      userStore.setUsername(data.username);
    }

    return res;
  },
  logout: () => {},
};

export default userApi;
