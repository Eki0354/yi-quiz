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
      {
        path: '/css/dataTable',
        name: 'CSS-DataTable',
        component: () => import('../views/css/dataTable.vue')
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
