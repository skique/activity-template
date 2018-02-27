/**
 * Created by ebi on 2017/5/11.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import {commonApi} from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    UUID: '',
    userInfo: null,
    wechatConfig: null
  },
  getters: {

  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUUID (state, UUID) {
      state.UUID = UUID
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setWechatConfig (state, config) {
      state.wechatConfig = config
    }
  },
  actions: {
    getUserInfo ({commit}) {
      // commonApi.getUserInfo().then(res => {
      //   commit('setUserInfo', res.data)
      // })
    }
  }
})