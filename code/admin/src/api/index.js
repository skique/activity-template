/**
 * Created by ebi on 2017/5/11.
 */
import fetch from './fetch'
export default {
  login (params = {username: '', password: ''}) {
    return fetch('/api/login', params, 'post')
  },
  common: {
    getCities () {
      // 获取门店地区
      return fetch('/web/adm/area/shopAreaTree?parentCode=0')
    },
    upload (params) {
      // 图片上传
      return fetch('/web/adm/images/upload', params, 'post')
    },
    getMenu () {
      // 动态获取菜单
      return fetch('/web/adm/menu')
    }
  },
  pageManagement: {
    getCategories () {
      // 获取分类列表
      return fetch('/web/adm/homeLabel/homeLabelList')
    },
    addCategory (params) {
      // 添加分类
      return fetch('/web/adm/homeLabel/addHomeLabel', params, 'post')
    },
    editCategories (params) {
      // 分类编辑更新
      return fetch('/web/adm/homeLabel/updateHomeLabelList', params, 'post')
    },
    getAdsenses (params) {
      // 获取楼层广告位列表
      return fetch('/web/adm/adPositions', params)
    },
    getFloorAdList (params) {
      // 获取广告位广告列表
      return fetch('/web/adm/advertisements', params)
    },
    // 楼层接口
    fetchFloor (params, methods, id) {
      let url = '/web/adm/floors'
      if (id) {
        url += '/'
        url += id
      }
      return fetch(url, params, methods)
    },
    // 广告接口
    fetchAd (params, methods, id) {
      let url = '/web/adm/advertisements'
      if (id) {
        url += '/'
        url += id
      }
      return fetch(url, params, methods)
    },
    // 获取楼层内所有广告位信息
    fetchFloorAd (params, methods, id) {
      let url = '/web/adm/adPositions'
      if (id) {
        url += '/'
        url += id
      }
      return fetch(url, params, methods)
    },
    // 按分区查看广告位
    fetchAreaAd (params, methods, id) {
      let url = '/web/adm/advertisements'
      if (id) {
        url += '/'
        url += id
      }
      return fetch(url, params, methods)
    },
    saveAreaAdOrder (params) {
      // 保存按分区排序
      return fetch('/web/adm/areaSequences', params, 'post')
    },
    updateFloor (params) {
      // 更新楼层信息
      return fetch('/web/adm/floors/updateById', params, 'put')
    }
  },
  system: {
    // --------------------系统设置-------------------------------
    fetchMenuData (params, methods, id) {
      let url = '/web/adm/menuList'
      if (id) {
        url += '/'
        url += id
      }
      return fetch(url, params, methods)
    }
  },
  activity: {
    // --------------------活动管理-------------------------------
    fetchTopicListData (params, methods, id) {
      // 获取专题模板列表
      let url = '/web/adm/activity/topic/list'
      if (id) {
        url += '/'
        url += id
      }
      return fetch(url, params, methods)
    },
    unlock (params) {
      // 解锁专题模板
      let url = '/web/adm/activity/topic/unlock'
      return fetch(url, params, 'put')
    },
    templateClone (params) {
      // 克隆专题模板
      let url = '/web/adm/activity/topic/clone'
      return fetch(url, params, 'post')
    },
    templateInfo (params) {
      // 获取专题模板信息
      let url = '/web/adm/activity/topic/templateInfo'
      return fetch(url, params, 'get')
    },
    topicData (params = {id: ''}) {
      // 获取专题模板数据
      let url = '/web/adm/activity/topic/topicData'
      return fetch(url, params, 'get')
    },
    getField (params) {
      // 获取变量的值
      let url = '/web/adm/activity/topic/getField'
      return fetch(url, params, 'get')
    },
    getComponentData (params) {
      let url = '/web/adm/activity/topic/getComponentData'
      return fetch(url, params, 'get')
    },
    getWinnerList (params) {
      let url = '/web/adm/activity/topic/getWinnerList'
      return fetch(url, params, 'get')
    },
    saveTopic (params) {
      let url = '/web/adm/activity/topic/save'
      return fetch(url, params, 'post')
    },
    lockTopic (params) {
      let url = '/web/adm/activity/topic/lockTopic'
      return fetch(url, params, 'post')
    }
  }
}
