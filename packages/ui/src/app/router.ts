import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('~/features/home/index.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('~/features/auth/index.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('~/features/projects/index.vue'),
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('~/features/project/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/features/404/index.vue'),
    },
  ],
});

export default router;
