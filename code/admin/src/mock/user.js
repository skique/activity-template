/**
 * Created by ebi on 2017/6/19.
 */
import Mock from 'mockjs'
const login = Mock.mock({
  code: 0,
  msg: '',
  userMsg: '',
  data: {
    token: '@guid'
  }
})
const baseInfo = Mock.mock({
  code: 0,
  msg: '',
  userMsg: '',
  data: {
    id: '@id',
    phone: '186871203090',
    address: '@area'
  }
})
export default {
  login,
  baseInfo
}
