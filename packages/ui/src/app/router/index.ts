import { createRouter, createWebHistory } from 'vue-router';
import authGuard from '~/app/router/auth.guard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('~/pages/auth.vue'),
      meta: { auth: false },
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('~/pages/app/index.vue'),
      meta: { auth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/pages/404.vue'),
    },
  ],
});

router.beforeEach(authGuard);

export default router;
