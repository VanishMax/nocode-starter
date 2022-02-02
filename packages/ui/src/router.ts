import { createRouter, createWebHistory } from 'vue-router';
import { IS_APP_NATIVE } from './utils/constants';

const nativeAppRoute = IS_APP_NATIVE ? [{
  path: '/',
  component: () => import('./pages/HelloWorld.vue'),
}] : [{
  path: '/',
  redirect: '/app',
}];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/app',
      name: 'app',
      component: () => import('./pages/AppPage.vue'),
    },
    ...nativeAppRoute,
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./pages/ErrorPage.vue'),
    },
  ],
});

export default router;
