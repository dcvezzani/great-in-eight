import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GreatToEight from '../components/GreatToEight.vue'
import GreatToEight2 from '../components/GreatToEight2.vue'
import Login from '../components/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: GreatToEight2,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && store.getters.isLoggedIn) {
    // console.log(">>>redirecting to 'Home'")
    return next({ name: 'Home' })
  }
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(">>>to.name", to.name, store.getters.isLoggedIn)

    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
