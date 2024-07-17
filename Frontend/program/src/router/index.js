import { watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/index',
      component: Layout,
      meta: {
        title: "仪表盘",
        icon: 'face',
      },
      role: ['admin', 'user'],
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
      path: '/manage',
      name: 'manage',
      component: Layout,
      meta: {
        title: "管理",
        icon: 'face',
      },
      role: ['admin', 'user'],
      children: [
        {
          path: 'user',
          name: 'manageUser',
          component: () => import('@/views/manage/index.vue'),
          meta: {
            title: "用户管理",
            icon: 'face',
          }
        },
        {
          path: 'text2',
          name: 'text2',
          component: () => import('@/views/manage/text2.vue'),
          meta: {
            title: "测试",
            icon: 'face',
          }
        },
        {
          path: '/about2',
          name: 'about2',
          component: () => import('@/layouts/components/About/index2.vue'),
          meta: {
            title: "剪贴板管理",
            icon: 'face',
          }
        },
        {
          path: '/about2',
          name: 'about2',
          component: () => import('@/layouts/components/About/index2.vue'),
          meta: {
            title: "文件管理",
            icon: 'face',
          }
        },
      ]
    },
    {
      path: '/violation',
      name: 'violation',
      component: Layout,
      meta: {
        title: "异常处理",
        icon: 'face',
      },
      role: ['admin', 'user'],
      children: [
        {
          path: '/about1',
          name: 'about1',
          component: () => import('@/layouts/components/About/index.vue'),
          meta: {
            title: "异常审核",
            icon: 'face',
          }
        },
        {
          path: '/about1',
          name: 'about1',
          component: () => import('@/layouts/components/About/index.vue'),
          meta: {
            title: "举报中心",
            icon: 'face',
          }
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: Layout,
      meta: {
        title: "我的",
        icon: 'face',
      },
      role: ['admin', 'user'],
      children: [
        {
          path: '/about1',
          name: 'about1',
          component: () => import('@/layouts/components/About/index.vue'),
          meta: {
            title: "个人中心",
            icon: 'face',
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: "登录",
        icon: '',
      },
      role: [],
      component: () => import('../views/login/index.vue'),
    }
  ]
});

// 定义一个函数来格式化标题
function formatTitle(title) {
  return `${title} | 斑马在线剪贴板`; // 替换为你想要的默认标题
}

// 监听路由变化
function updateTitle(newTitle) {
  document.title = formatTitle(newTitle);
}

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    updateTitle(to.meta.title);
  }
  next();
});

// 响应式地监听标题变化
watch(
  () => router.currentRoute.value.meta.title,
  (newTitle) => {
    if (newTitle) {
      updateTitle(newTitle);
    }
  }
);

export default router;
