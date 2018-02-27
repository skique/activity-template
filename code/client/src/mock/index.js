import Mock from 'mockjs'
import activity from './activity'

// 专题活动
Mock.mock(/\/web\/api\/activity\/topic\/topicData\/v1/, 'get', activity.topicData)
Mock.mock(/\/web\/api\/activity\/topic\/getCoupon\/v1/, 'post', activity.getCoupon)
Mock.mock(/\/web\/api\/activity\/topic\/getField\/v1/, 'get', activity.getField)
Mock.mock(/\/web\/api\/activity\/topic\/getComponentData\/v1/, 'get', activity.getComponentData)
Mock.mock(/\/web\/api\/activity\/topic\/getWinnerList\/v1/, 'get', activity.getWinnerList)
Mock.mock(/\/web\/api\/activity\/topic\/lottery\/v1/, 'post', activity.lottery)