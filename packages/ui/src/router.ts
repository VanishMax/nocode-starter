import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { IS_APP_NATIVE } from './utils/constants';

const platformRoutes: RouteRecordRaw[] = IS_APP_NATIVE ? [{
  path: '/',
  component: () => import('./pages/HomePage.vue'),
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
      component: () => import('./pages/AppPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./pages/ErrorPage.vue'),
    },
  ],
});

export default router;
