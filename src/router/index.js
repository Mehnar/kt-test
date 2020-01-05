import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/page/1',
    children: [
      {
        path: 'page/:page(\\d+)',
        name: 'page',
        component: () => import(/* webpackChunkName: "Desk" */ '@/components/Desk.vue')
      },
      {
        path:':id/edit',
        name: 'edit',
        component: () => import(/* webpackChunkName: "TaskEdit" */ '@/components/TaskEdit.vue'),
      },
      {
        path: '*',
        redirect: '/page/1',
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
