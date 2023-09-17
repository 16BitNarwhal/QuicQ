export const constantRoute = [
    {
      path: '/',
      component: () => import('@/views/home/index.vue'),
      name: 'home',
    },
    {
        path: '/dashboard',
        component: () => import('@/views/stats/index.vue'),
        name: 'dashboard'
    },
    {
      path: '/dashboard/adv',
      component: () => import('@/views/dashboard/index.vue'),
      name: 'dashboard-adv'
  },
    {
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      name: '404',
    },
    {
      path: '/test',
      component: () => import('@/components/current-people.vue'),
      name: 'test',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'Any',
    },
  ]