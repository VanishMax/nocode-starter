import {
  createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw,
} from 'vue-router';
import { IS_APP_NATIVE } from '~/shared/utils/constants';

const platformRoutes: RouteRecordRaw[] = IS_APP_NATIVE ? [{
  path: '/',
  name: 'home',
  component: () => import('~/features/projects/index.vue'),
}] : [{
  path: '/',
  name: 'home',
  redirect: '/app',
}];

const router = createRouter({
  history: IS_APP_NATIVE ? createWebHashHistory() : createWebHistory(),
  routes: [
    ...platformRoutes,
    {
      path: '/app',
      name: 'app',
      component: () => import('~/features/app/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/features/404/index.vue'),
    },
  ],
});

export default router;
