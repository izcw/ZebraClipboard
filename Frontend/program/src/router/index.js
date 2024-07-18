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
      menuStatus:true,
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
      menuStatus:true,
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
          path: 'clipboard',
          name: 'manageClipboard',
          component: () => import('@/views/manage/clipboard.vue'),
          meta: {
            title: "剪贴板管理",
            icon: 'clipboard',
          }
        },
        {
          path: 'annexfile',
          name: 'manageAnnexfile',
          component: () => import('@/views/manage/annexFile.vue'),
          meta: {
            title: "附件管理",
            icon: 'file',
          },
        },
        {
          path: 'planspricing',
          name: 'managePlanspricing',
          component: () => import('@/views/manage/PlansPricing.vue'),
          meta: {
            title: "套餐管理",
            icon: 'money',
          }
        }
      ]
    },
    {
      path: '/chat',
      name: 'chat',
      component: Layout,
      meta: {
        title: "信息管理",
        icon: 'face',
      },
      menuStatus:true,
      role: ['admin', 'user'],
      children: [
        {
          path: 'realinfo',
          name: 'chatRealinfo',
          component: () => import('@/views/chat/index.vue'),
          meta: {
            title: "实时信息",
            icon: 'message-dots',
          }
        }
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
      menuStatus:true,
      role: ['admin', 'user'],
      children: [
        {
          path: 'examine',
          name: 'violationExamine',
          component: () => import('@/views/errorCenter/index.vue'),
          meta: {
            title: "异常审核",
            icon: 'shield-minus',
          }
        },
        {
          path: 'report',
          name: 'violationReport',
          component: () => import('@/views/errorCenter/report.vue'),
          meta: {
            title: "举报中心",
            icon: 'user-voice',
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
      menuStatus:true,
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
      menuStatus:false,
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
