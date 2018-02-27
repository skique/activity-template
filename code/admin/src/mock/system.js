// 系统设置数据模拟

import Mock from 'mockjs'

// 菜单
const menuList = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data|10': [{
    'id': '@id',
    'name|+1': ['菜单1', '菜单2', '菜单3', '菜单4', '菜单5', '菜单6', '菜单7', '菜单8', '菜单9', '菜单10'],
    'link': 'http://www.baidu.com',
    'icon|1': ['apple', 'amazon', 'connectdevelop', 'envira', 'digg', 'html5', 'ravelry', 'skyatlas', 'twitter', 'yelp'],
    'hasChildren|1': [true, false]
  }]
})

// 动态获取后台管理菜单
const menu = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data': [
    {
      'id': '@id',
      'icon': 'file-code-o',
      'link': '',
      'name': '页面管理',
      'children': [
        {
          'id': '@id',
          'icon': 'home',
          'link': '/',
          'name': '首页',
          'children': []
        },
        {
          'id': '@id',
          'icon': 'file-code-o',
          'link': '',
          'name': '首页管理',
          'children': [
            {
              'id': '@id',
              'icon': 'user-o',
              'link': '/pageManagement/mAndApp',
              'name': 'APP&M版首页管理',
              'children': [
              ]
            }
          ]
        }
      ]
    },
    {
      'id': '@id',
      'icon': 'cog',
      'link': '',
      'name': '系统设置',
      'children': [
        {
          'id': '@id',
          'icon': 'list',
          'link': '',
          'name': '菜单管理',
          'children': [
            {
              'id': '@id',
              'icon': '',
              'link': '/system/menu',
              'name': '菜单管理',
              'children': [
              ]
            }
          ]
        },
        {
          'id': '@id',
          'icon': 'user-o',
          'link': '',
          'name': '权限管理',
          'children': [
            {
              'id': '@id',
              'icon': 'user-o',
              'link': '/order/shuihsou',
              'name': '角色管理',
              'children': [
              ]
            },
            {
              'id': '@id',
              'icon': 'user-o',
              'link': '/order/shuihsou',
              'name': '用户管理',
              'children': [
              ]
            },
            {
              'id': '@id',
              'icon': 'user-o',
              'link': '/order/shuihsou',
              'name': '用户权限管理',
              'children': [
              ]
            }
          ]
        }
      ]
    }
  ]
})

export default {
  menuList,
  menu
}
