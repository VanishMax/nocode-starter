import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('~/features/projects/index.vue'),
    },
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
