import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GreatToEight from '../components/GreatToEight.vue'
import GreatToEight2 from '../components/GreatToEight2.vue'
import Login from '../components/Login.vue'
import DeleteMyData from '../components/DeleteMyData.vue'
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
    path: '/deleteMyData',
    name: 'DeleteMyData',
    component: DeleteMyData,
    meta: {
      requiresAuth: true,
    },
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

const beforeEachHandler = (to, from, next) => {
  if (!window.FB) return setTimeout(() => beforeEachHandler(to, from, next), 1000)

  const isLoggedIn = (window.FB.getAccessToken() != null)
  
  // console.log(">>>to.name", to.name, store.getters.isLoggedIn)
  // if (to.name === 'Login' && isLoggedIn) {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   // console.log(">>>searchParams", searchParams)

  //   if (searchParams.has("redirect")) {
  //     // console.log('searchParams.get("redirect")', searchParams.get("redirect"))
  //     return next({ path: `${searchParams.get("redirect")}` })
  //   }
    
  //   console.log(">>>redirecting to 'Home'")
  //   return next({ name: 'Home' })
  // }
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    if ( !isLoggedIn ) {
      // console.log(">>>going to login", { redirect: to.fullPath })
      next({ name: 'Login', 
        query: { redirect: to.fullPath }
      })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
}

router.beforeEach(beforeEachHandler)

export default router
