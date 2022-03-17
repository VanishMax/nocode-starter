import type { NavigationGuard } from 'vue-router';
import { useUserStore } from '~/entities/user';

const authGuard: NavigationGuard = async (to, from) => {
  const userStore = useUserStore();
  await userStore.checkAuth();

  const routeAuth = to.meta.auth as boolean | undefined ;
  if (typeof routeAuth !== 'undefined') {
    if (!userStore.user && routeAuth) {
      return { name: 'auth' };
    }
    if (userStore.user && !routeAuth) {
      return { name: 'projects' };
    }
  }

  return true;
};

export default authGuard;
