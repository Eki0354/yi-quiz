import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../Layouts/MainLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      // dataTable
      {
        path: '/css/dataTable',
        name: 'CSS-DataTable',
        component: () => import('../views/css/dataTable/index.vue')
      },
      {
        path: '/css/dataTable/answers/csc',
        name: 'CSS-DataTable-CSC',
        component: () => import('../views/css/dataTable/answers/csc.vue')
      },
      {
        path: '/css/dataTable/answers/eki',
        name: 'CSS-DataTable-Eki',
        component: () => import('../views/css/dataTable/answers/eki.vue')
      },

      // rectScale
      {
        path: '/css/rectScale',
        name: 'CSS-RectScale',
        component: () => import('../views/css/rectScale/index.vue')
      },
      {
        path: '/css/rectScale',
        name: 'CSS-RectScale-Eki',
        component: () => import('../views/css/rectScale/answers/eki.vue')
      }
    ]
  }
]

// 屏蔽同一路由多次跳转报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(() => {})
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
