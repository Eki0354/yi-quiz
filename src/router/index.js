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
        path: '/css',
        name: 'CSS',
        children: [
          {
            path: '/dataTable',
            name: 'DataTable',
            component: import('../views/css/dataTable.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
