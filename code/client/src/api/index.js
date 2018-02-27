import fetch from './fetch'

export const commonApi = {
  getUserInfo () {
    return fetch('/web/api/user/userInfo/v1')
  },
  getWechatAuthorize (code = '') {
    return fetch('/web/api/jiuji/weixin/isAuthority/v1', {code})
  },
  getWechatConfig (url = '') {
    return fetch('/web/api/jiuji/weixin/getShareSignInfo/v1', {url})
  }
}
export const activityApi = {
  getTopicData (params = {}) {
    // 获取模板数据
    return fetch('/web/api/activity/topic/topicData/v1', params, 'get')
  },
  getCoupon (params = {}) {
    // 获取优惠码
    return fetch('/web/api/activity/topic/getCoupon/v1', params, 'post')
  },
  getComponentData (params = {}) {
    // 获取组件数据
    return fetch('/web/api/activity/topic/getComponentData/v1', params, 'get')
  },
  getWinnerList (params = {}) {
    // 获取中奖名单
    return fetch('/web/api/activity/topic/getWinnerList/v1', params, 'get')
  },
  getField (params = {}) {
    // 获取变量值
    return fetch('/web/api/activity/topic/getField/v1', params, 'get')
  },
  doLottery (params = {}) {
    // 获取变量值
    return fetch('/web/api/activity/topic/lottery/v1', params, 'post')
  }
}