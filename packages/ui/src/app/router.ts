import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { IS_APP_NATIVE } from '~/shared/utils/constants';

const platformRoutes: RouteRecordRaw[] = IS_APP_NATIVE ? [{
  path: '/',
  component: () => import('~/features/projects/index.vue'),
}] : [{
  path: '/',
  redirect: '/app',
}];

const router = createRouter({
  history: createWebHistory(),
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
