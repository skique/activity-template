/**
 * Created by ebi on 2017/5/11.
 */
import Vue from 'vue'
import ElementUI from 'element-ui'

import router from './router'
import store from './store'
import api from './api'
import App from './App.vue'
import './mock'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

import './assets/style/main.css'

Vue.use(ElementUI)
Vue.prototype.$api = api

function getCookie (key) {
  let result = ''
  let arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
  if (arr != null) {
    try {
      result = decodeURIComponent(arr[2])
    } catch (err) {
      result = unescape(arr[2])
    }
  }
  return result
}

if (!store.state.token) {
  const authorization = window.sessionStorage.getItem('authorization')
  // const authorization = getCookie('token')
  store.commit('setToken', authorization)
}

/* 下面这句注释不能删，不然通不过eslint */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
