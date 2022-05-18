import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Manage Users'
    }
  },
  {
    path: '/user/:id',
    name: 'singleUser',
    meta: {
      title: 'User'
    },
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/create/',
    name: 'createUser',
    meta: {
      title: 'Create User'
    },
    component: () => import('../views/CreateView.vue')
  },
  {
    path: '*',
    name: 'pageNotFound',
    meta: {
      title: '404 - Page not found'
    },
    component: () => import('../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
