/**
 * Created by ebi on 2017/5/11.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import {commonApi} from '../api/index'
import platform from '../util/platform'
import {setShareInfo} from '../util/common'
import routes from './routes'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // 仅点击浏览器前进后退按钮时.
    return savedPosition
  }
  const position = {}
  if (to.hash) {
    position.selector = to.hash
  }
  position.x = 0
  position.y = 0
  return position
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath},
        replace: true
      })
    }
  } else {
    next()
  }
  if (to.matched.some(r => r.meta.title)) {
    document.title = to.meta.title
    next()
  }

  const title = (to.meta.title === '九机网' ? '首页' : to.meta.title) + ' - 九机网'
  const link = window.location.origin + (router.options.base ? router.options.base : '') + to.fullPath
})

export default router
