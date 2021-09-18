import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import { ifNotAuthenticated, ifAuthenticated } from '../plugins/authenticate'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: ifAuthenticated
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  }
]

const router = new VueRouter({
  routes
})

export default router
