import { createRouter, createWebHistory } from 'vue-router';
import authGuard from '~/app/router/auth.guard';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('~/pages/home/index.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('~/pages/auth.vue'),
      meta: { auth: false },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('~/pages/projects.vue'),
      meta: { auth: true },
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('~/pages/project/index.vue'),
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
