/**
 * Created by ebi on 2017/5/11.
 */
import Vue from 'vue'
import cookie from 'js-cookie'
import router from './router'
import store from './store'
import {commonApi} from './api'
import App from './App.vue'
import uuidv4 from 'uuid/v4'
import 'font-awesome/css/font-awesome.min.css'
import './assets/style/main.css'
import './mock'
import platform from './util/platform'
Vue.prototype.$platform = platform

window.Promise.prototype.always = function (callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}
// 把cookie的token存到store
if (!store.state.token) {
  const authorization = cookie.get('Authorization') || cookie.get('signTicket') || '' // todo iOS APP版本更新后把signTicket去掉
  store.commit('setToken', authorization)
}
// 把cookie的uuid存到store
if (!store.state.UUID) {
  let UUID = cookie.get('uuid') || cookie.get('ukey')
  if (!UUID) {
    UUID = uuidv4()
    const domain = window.location.host.indexOf('9ji.com') > -1 ? '9ji.com' : ''
    cookie.set('uuid', UUID, {expire: 365, domain})
    // 兼容老版本 todo 改完后去掉老版本兼容
    cookie.set('ukey', UUID, {expire: 365, domain})
  }
  store.commit('setUUID', UUID)
}
// 请求当前用户信息
store.dispatch('getUserInfo')

if (platform.wechat) {
  let searchArr = window.location.search.replace('?', '').split('&')
  let code = ''
  let testAuthorize = false
  searchArr.forEach(item => {
    if (item.indexOf('code') === 0) {
      code = item.split('=')[1]
    }
    if (item.indexOf('test') === 0) {
      testAuthorize = true
    }
  })
  // 拿code去请求微信服务器做授权，并返回是否授过权
  commonApi.getWechatAuthorize(code).then(res => {
    if (res.code === 0) {
      if (testAuthorize) { // 测试用，稳定后删除
        window.alert(`code:${code} --- authorized:${res.data.authorized}`)
      }
      if (!res.data.authorized) { // 如果没有授权，跳转授权页面
        window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.data.appId + '&redirect_uri=' + encodeURIComponent(window.location.href) + '&response_type=code&scope=snsapi_userinfo&state=' + res.data.state + '#wechat_redirect')
      } else {
        if (res.data.token) {
          store.commit('setToken', res.data.token)
          store.dispatch('getUserInfo')
          cookie.set('Authorization', res.data.token, {expire: 30})
        }
      }
    }
  }, err => {
    console.log(err)
  })
}

/* eslint-disable no-undef */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})