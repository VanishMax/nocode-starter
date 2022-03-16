import type { NavigationGuard } from 'vue-router';
import { useUserStore } from '~/entities/user';

const authGuard: NavigationGuard = async (to, from) => {
  const userStore = useUserStore();

  await userStore.checkAuth();
  if (!userStore.user) {
    return { name: 'auth' };
  }

  return true;
};

export default authGuard;
