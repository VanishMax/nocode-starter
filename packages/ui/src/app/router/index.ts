import { createRouter, createWebHistory } from 'vue-router';
import authGuard from '~/app/router/auth.guard';

const index = createRouter({
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
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('~/pages/projects.vue'),
      beforeEnter: [authGuard],
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('~/pages/project/index.vue'),
      beforeEnter: [authGuard],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('~/pages/404.vue'),
    },
  ],
});

export default index;
