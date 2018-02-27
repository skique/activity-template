/**
 * Created by ebi on 2017/5/11.
 */
import axios from 'axios'
import store from '../store'
import router from '../router'
import { MessageBox } from 'element-ui'

axios.defaults.timeout = 15000
axios.defaults.baseURL = ''
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/form-data'

axios.interceptors.request.use(config => {
  config.headers.token = store.state.token
  return config
}, err => {
  return Promise.reject(err)
})

function fetch (url = '', params = {}, method = 'get') {
  if (method.toLowerCase() === 'get') {
    let paramFlag = false
    for (let i in params) {
      if (url.indexOf('?') < 0 && !paramFlag) {
        url += '?' + i + '=' + params[i]
        paramFlag = true
      } else {
        url += '&' + i + '=' + params[i]
      }
    }
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: params
    }).then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        if (response.data.code === 1000) { // 未登录
          router.push('/login')
          return
        }
        if (response.data.code === 1002) { // 无权限
          MessageBox.alert('你没有权限进行此操作，如需开权限，请联系管理员', '没有权限')
          return
        }
        resolve(response.data)
      } else {
        MessageBox.alert(response.statusText, response.status)
      }
    }).catch(function (err) {
      reject(err)
    })
  })
}

export default fetch
