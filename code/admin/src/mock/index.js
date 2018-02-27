/**
 * Created by ebi on 2017/6/19.
 */
import Mock from 'mockjs'
import user from './user'
import pageManagement from './pageManagement'
import system from './system'
import topic from './topic'

// 登录
Mock.mock(/\/web\/login/, 'post', user.login)

// 页面管理
// 获取类型
Mock.mock(/\/web\/adm\/homeLabel\/homeLabelList/, 'get', pageManagement.categories)
// 新增类型
Mock.mock(/\/web\/adm\/homeLabel\/addHomeLabel/, 'post', pageManagement.addCategory)
// 楼层列表
Mock.mock(/\/web\/adm\/floors/, 'get', pageManagement.floorsList)
// 添加楼层
Mock.mock(/\/web\/adm\/floors/, 'post', pageManagement.floor)
// 删除楼层
Mock.mock(/\/web\/adm\/deleteFloor/, 'post', pageManagement.postSuccess)
// 保存楼层排序
Mock.mock(/\/web\/adm\/saveFloorOrder/, 'post', pageManagement.postSuccess)
// 保存分类编辑
Mock.mock(/\/web\/adm\/editCategories/, 'post', pageManagement.editCategories)
// 投放城市
Mock.mock(/\/web\/adm\/area\/shopAreaTree/, 'get', pageManagement.cities)
// 楼层广告位
Mock.mock(/\/web\/adm\/getAdsenses/, 'get', pageManagement.adsenses)
// 广告位广告列表
Mock.mock(/\/web\/adm\/getFloorAdList/, 'get', pageManagement.floorAdList)
// 删除广告
Mock.mock(/\/web\/adm\/advertisements/, 'delete', pageManagement.postSuccess)
// 上传图片
Mock.mock(/\/web\/adm\/images\/upload/, 'post', pageManagement.upload)
// 保存广告编辑
Mock.mock(/\/web\/adm\/advertisements/, 'post', pageManagement.adItem)

// 获取楼层下所有广告位及广告为下所有分区数据
Mock.mock(/\/web\/adm\/adPositions/, 'get', pageManagement.floorAds)
// 按分区查看广告位设置
Mock.mock(/\/web\/adm\/advertisements/, 'get', pageManagement.areaAdList)
Mock.mock(/\/web\/adm\/areaSequences/, 'put', pageManagement.postSuccess)

// ---------------------------系统设置数据模拟------------------------------------
// 对菜单的操作
Mock.mock(/\/web\/adm\/menuList/, 'get', system.menuList)
Mock.mock(/\/web\/adm\/menuList/, 'put', pageManagement.postSuccess)
Mock.mock(/\/web\/adm\/menuList/, 'post', pageManagement.postSuccess)
Mock.mock(/\/web\/adm\/menuList/, 'delete', pageManagement.postSuccess)

// --------------------------页面通用----------------------------------------------
// 获取菜单
Mock.mock(/\/web\/adm\/menu/, 'get', system.menu)

// --------------------------专题活动模板------------------------------------------
// 获取专题活动列表
Mock.mock(/\/web\/adm\/activity\/topic\/list/, 'get', topic.list)
Mock.mock(/\/web\/adm\/activity\/topic\/list/, 'delete', pageManagement.postSuccess)
Mock.mock(/\/web\/adm\/activity\/topic\/list/, 'post', pageManagement.postSuccess)
Mock.mock(/\/web\/adm\/activity\/topic\/list/, 'put', pageManagement.postSuccess)
Mock.mock(/\/web\/adm\/activity\/topic\/unlock/, 'put', pageManagement.postSuccess)
Mock.mock(/\/web\/adm\/activity\/topic\/clone/, 'post', pageManagement.postSuccess)
// 模板信息
Mock.mock(/\/web\/adm\/activity\/topic\/templateInfo/, 'get', topic.templateInfo)
// 模板数据
Mock.mock(/\/web\/adm\/activity\/topic\/topicData/, 'get', topic.topicData)
Mock.mock(/\/web\/adm\/activity\/topic\/getField/, 'get', topic.getField)
Mock.mock(/\/web\/adm\/activity\/topic\/getComponentData/, 'get', topic.getComponentData)
Mock.mock(/\/web\/adm\/activity\/topic\/getWinnerList/, 'get', topic.getWinnerList)
Mock.mock(/\/web\/adm\/activity\/topic\/save/, 'post', pageManagement.postSuccess)
Mock.mock(/\/web\/adm\/activity\/topic\/lockTopic/, 'post', topic.lockTopic)

export default Mock
