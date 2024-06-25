import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/index',
      component: Layout,
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/layouts/components/Index/index.vue'),
          meta: {
            title: "主页",
            icon: 'home',
          }
        },

      ],
    },
    {
      path: '/about',
      name: 'about',
      component: Layout,
      children: [
        {
          path: '/about/about1',
          name: 'about1',
          component: () => import('@/layouts/components/About/index.vue'),
          meta: {
            title: "个人中心1",
            icon: 'lauch',
          }
        },
        {
          path: '/about/about2',
          name: 'about2',
          component: () => import('@/layouts/components/About/index2.vue'),
          meta: {
            title: "个人中心2",
            icon: 'face',
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    }
  ]
})

export default router
