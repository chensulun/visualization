import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () => import('@/views/index/index.vue'),
      meta: { title: '首页' }
    }]
  },
  {
    path: '/production',
    component: Layout,
    redirect: '/production/index',
    children: [{
      path: 'index',
      name: '生产管理',
      component: () => import('@/views/production/index.vue'),
      meta: { title: '生产管理' }
    }]
  }, {
    path: '/materiel',
    component: Layout,
    redirect: '/materiel/index',
    children: [{
      path: 'index',
      name: '物料管理',
      component: () => import('@/views/materiel/index.vue'),
      meta: { title: '物料管理' }
    }]
  }, {
    path: '/quality',
    component: Layout,
    redirect: '/quality/index',
    children: [{
      path: 'index',
      name: '质量管理',
      component: () => import('@/views/quality/index.vue'),
      meta: { title: '质量管理' }
    }]
  }, {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/index',
    children: [{
      path: 'index',
      name: '设备管理',
      component: () => import('@/views/equipment/index.vue'),
      meta: { title: '设备管理' }
    }]
  }, {
    path: '/energy',
    component: Layout,
    redirect: '/energy/index',
    children: [{
      path: 'index',
      name: '能源管理',
      component: () => import('@/views/energy/index.vue'),
      meta: { title: '能源管理' }
    }]
  },
  {
    path: '/EnvironmentalScience',
    component: Layout,
    redirect: '/EnvironmentalScience/index',
    children: [{
      path: 'index',
      name: '环境管理',
      component: () => import('@/views/EnvironmentalScience/index.vue'),
      meta: { title: '环境管理' }
    }]
  }, {
    path: '/security',
    component: Layout,
    redirect: '/security/index',
    children: [{
      path: 'index',
      name: '安全管理',
      component: () => import('@/views/security/index.vue'),
      meta: { title: '安全管理' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
