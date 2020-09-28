import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../Layouts/MainLayout.vue'
import menus from './menus'

function toRouter (menus) {
  const res = []
  if (!menus || !menus.length) return res
  for (const category of menus) {
    // if (category.id.length < 3 || !category.data || !category.data.length) continue
    for (const subCategory of category.data) {
      for (const quiz of subCategory.data) {
        res.push({
          name: `${category.title}-${quiz.title}`,
          path: quiz.path,
          component: () => import('../views' + quiz.path + '/index.vue')
        })
        if (!quiz.answers || !quiz.answers.length) break
        quiz.answers.forEach(a => {
          res.push({
            name: `${category.title}-${quiz.title}-${a.title}`,
            path: a.path,
            component: () => import('../views' + a.path + '/index.vue')
          })
        })
      }
    }
  }
  return res
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: toRouter(menus)
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
