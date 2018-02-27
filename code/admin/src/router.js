/**
 * Created by ebi on 2017/5/11.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import layout from './pages/layout.vue'
import index from './pages/index.vue'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`./pages/${component}.vue`)
}

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: layout,
      meta: {requireAuth: true},
      children: [
        {path: '', component: index}
      ]
    },
    {
      path: '/login',
      component: load('login'),
      meta: {requireAuth: false}
    },
    {
      path: '*',
      component: layout,
      meta: {requireAuth: false}
    },
    {
      path: '/table',
      component: layout,
      meta: {requireAuth: false},
      children: [
        {path: ':path', component: load('supper-table')}
      ]
    },
    {
      path: '/authority',
      component: layout,
      meta: {requireAuth: true},
      children: [
        {path: 'menu', component: load('authority/menu')}
      ]
    },
    {
      path: '/pageManagement/mAndApp',
      component: layout,
      meta: {requireAuth: true},
      children: [
        {path: '', component: load('pageManagement/appAndM')}
      ]
    },
    {
      path: '/pageManagement/mAndApp/floor/:id',
      component: layout,
      meta: {requireAuth: true},
      children: [
        {path: '', component: load('pageManagement/floorEdit')}
      ]
    },
    {
      path: '/system/menu',
      component: layout,
      meta: {requireAuth: true},
      children: [
        {path: '', component: load('system/menu')}
      ]
    },
    {
      path: '/system/menu/:level1',
      component: layout,
      meta: {requireAuth: true},
      children: [
        {path: '', component: load('system/menu')}
      ]
    },
    {
      path: '/system/menu/:level1/:level2',
      component: layout,
      meta: {requireAuth: true},
      children: [
        {path: '', component: load('system/menu')}
      ]
    },
    {
      path: '/activity/topic/list',
      component: layout,
      meta: {requireAuth: true},
      children: [
        {path: '', component: load('activity/topic/list')}
      ]
    },
    {
      path: '/activity/topic/topic',
      meta: {requireAuth: true},
      component: load('activity/topic/topic')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
