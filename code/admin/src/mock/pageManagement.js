// 页面管理数据模拟

import Mock from 'mockjs'

// 分类
const categories = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data|4': [{
    'id|+1': ['1', '2', '3', '4'],
    'title|+1': ['首页', '手机', '配件', '优品'],
    'sequence|+1': 1,
    'areaCode': '5301,5308',
    'areaName': '昆明市,普洱市'
  }]
})
// 新增分类
const addCategory = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '添加成功',
  data: {
    'id|1-10': 'c',
    'title': '新增分类名称',
    'areaCode': '5301',
    'areaName': '全区',
    'sequence|+1': 5
  }
})
// 楼层列表
const floorsList = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data|4': [{
    'id|+1': ['floorId1', 'floorId2', 'floorId3', 'floorId4'],
    'type|1': ['1', '2', '3', '4'],
    'title': '楼层标题',
    'floorStyleId|1': ['0', '1', '2', '3', '4'],
    'areaName': '全区',
    'areaCode': '5301',
    'categoryId': '2,112',
    'sequence|+1': 1
  }]
})
// 新建楼层
const floor = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data': {
    'id|1': ['floorId4', 'floorId5', 'floorId6', 'floorId7'],
    'type|1': ['1', '2', '3', '4'],
    'title': '楼层标题新',
    'floorStyleId|1': ['1', '2', '3', '4'],
    'areaName': '云南',
    'areaCode': '5301',
    'categoryId': '2,112',
    'sequence|+1': 5
  }
})

// post成功返回
const postSuccess = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '操作成功',
  data: {}
})

// 编辑分类
const editCategories = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '编辑分类成功',
  'data': {}
})

// 投放区域
const cities = Mock.mock({
  'code': 0,
  'msg': 'SuccessMsg',
  'userMsg': '查询成功',
  'data': [
    {
      'id': 53,
      'name': '云南省',
      'children': [
        {
          'id': 5301,
          'name': '昆明市',
          'children': [
            {
              'id': 530102,
              'name': '昆明市区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530181,
              'name': '安宁市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530114,
              'name': '呈贡区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530127,
              'name': '嵩明县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530129,
              'name': '寻甸县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530122,
              'name': '晋宁区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530113,
              'name': '东川区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530124,
              'name': '富民县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530125,
              'name': '宜良县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530128,
              'name': '禄劝县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530126,
              'name': '石林县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5329,
          'name': '大理州',
          'children': [
            {
              'id': 532901,
              'name': '大理市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532923,
              'name': '祥云县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532924,
              'name': '宾川县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532925,
              'name': '弥渡县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532926,
              'name': '南涧县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532927,
              'name': '巍山县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532931,
              'name': '剑川县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532932,
              'name': '鹤庆县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532930,
              'name': '洱源县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5303,
          'name': '曲靖市',
          'children': [
            {
              'id': 530302,
              'name': '麒麟区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530381,
              'name': '宣威市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530322,
              'name': '陆良县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530324,
              'name': '罗平县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530326,
              'name': '会泽县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530325,
              'name': '富源县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530328,
              'name': '沾益县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530323,
              'name': '师宗县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5304,
          'name': '玉溪市',
          'children': [
            {
              'id': 530402,
              'name': '红塔区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530423,
              'name': '通海县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530421,
              'name': '江川县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530422,
              'name': '澄江县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530427,
              'name': '新平县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5308,
          'name': '普洱市',
          'children': [
            {
              'id': 530802,
              'name': '思茅区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530824,
              'name': '景谷县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530822,
              'name': '墨江县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530823,
              'name': '景东县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530828,
              'name': '澜沧县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5328,
          'name': '西双版纳',
          'children': [
            {
              'id': 532801,
              'name': '景洪市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532823,
              'name': '勐腊县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532822,
              'name': '勐海县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5323,
          'name': '楚雄州',
          'children': [
            {
              'id': 532301,
              'name': '楚雄市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532331,
              'name': '禄丰县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532329,
              'name': '武定县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532324,
              'name': '南华县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5307,
          'name': '丽江市',
          'children': [
            {
              'id': 530702,
              'name': '古城区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530723,
              'name': '华坪县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5325,
          'name': '红河州',
          'children': [
            {
              'id': 532503,
              'name': '蒙自市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532502,
              'name': '开远市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532504,
              'name': '弥勒市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532501,
              'name': '个旧市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532524,
              'name': '建水县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532527,
              'name': '泸西县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532530,
              'name': '金平县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5331,
          'name': '德宏州',
          'children': [
            {
              'id': 533103,
              'name': '芒市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 533102,
              'name': '瑞丽市',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5326,
          'name': '文山州',
          'children': [
            {
              'id': 532601,
              'name': '文山市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532626,
              'name': '丘北县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 532627,
              'name': '广南县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5306,
          'name': '昭通市',
          'children': [
            {
              'id': 530602,
              'name': '昭阳区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530621,
              'name': '鲁甸县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530627,
              'name': '镇雄县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5305,
          'name': '保山市',
          'children': [
            {
              'id': 530502,
              'name': '隆阳区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530522,
              'name': '腾冲市',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530523,
              'name': '龙陵县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5309,
          'name': '临沧市',
          'children': [
            {
              'id': 530902,
              'name': '临翔区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530922,
              'name': '云县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 530921,
              'name': '凤庆县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5334,
          'name': '迪庆州',
          'children': [
            {
              'id': 533421,
              'name': '香格里拉县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        }
      ],
      'ischecked': false,
      'checknumber': 0
    },
    {
      'id': 52,
      'name': '贵州省',
      'children': [
        {
          'id': 5201,
          'name': '贵阳市',
          'children': [
            {
              'id': 520102,
              'name': '贵阳市区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5202,
          'name': '六盘水市',
          'children': [
            {
              'id': 520201,
              'name': '六盘水市区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5203,
          'name': '遵义市',
          'children': [
            {
              'id': 520303,
              'name': '遵义市',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5204,
          'name': '安顺市',
          'children': [
            {
              'id': 520402,
              'name': '西秀区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5205,
          'name': '毕节市',
          'children': [
            {
              'id': 520502,
              'name': '毕节市区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 520522,
              'name': '黔西县',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 520526,
              'name': '威宁县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5227,
          'name': '黔南州',
          'children': [
            {
              'id': 522729,
              'name': '长顺县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        }
      ],
      'ischecked': false,
      'checknumber': 0
    },
    {
      'id': 51,
      'name': '四川省',
      'children': [
        {
          'id': 5101,
          'name': '成都市',
          'children': [
            {
              'id': 510104,
              'name': '成都市区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 510105,
              'name': '青羊区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 510106,
              'name': '金牛区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5107,
          'name': '绵阳市',
          'children': [
            {
              'id': 510703,
              'name': '绵阳市区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 510781,
              'name': '江油市',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5110,
          'name': '内江市',
          'children': [
            {
              'id': 511024,
              'name': '威远县',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5111,
          'name': '乐山市',
          'children': [
            {
              'id': 511102,
              'name': '乐山市区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 5114,
          'name': '眉山市',
          'children': [
            {
              'id': 511402,
              'name': '东坡区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        }
      ],
      'ischecked': false,
      'checknumber': 0
    },
    {
      'id': 50,
      'name': '重庆市',
      'children': [
        {
          'id': 5001,
          'name': '市辖区',
          'children': [
            {
              'id': 500103,
              'name': '重庆市区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        }
      ],
      'ischecked': false,
      'checknumber': 0
    },
    {
      'id': 21,
      'name': '辽宁省',
      'children': [
        {
          'id': 2101,
          'name': '沈阳市',
          'children': [
            {
              'id': 210102,
              'name': '沈阳市区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        }
      ],
      'ischecked': false,
      'checknumber': 0
    },
    {
      'id': 36,
      'name': '江西省',
      'children': [
        {
          'id': 3606,
          'name': '鹰潭市',
          'children': [
            {
              'id': 360602,
              'name': '鹰潭市区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        }
      ],
      'ischecked': false,
      'checknumber': 0
    },
    {
      'id': 43,
      'name': '湖南省',
      'children': [
        {
          'id': 4301,
          'name': '长沙市',
          'children': [
            {
              'id': 430101,
              'name': '长沙市区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 4307,
          'name': '常德市',
          'children': [
            {
              'id': 430702,
              'name': '武陵区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        }
      ],
      'ischecked': false,
      'checknumber': 0
    },
    {
      'id': 44,
      'name': '广东省',
      'children': [
        {
          'id': 4403,
          'name': '深圳市',
          'children': [
            {
              'id': 440304,
              'name': '深圳市区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 440309,
              'name': '龙华新区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        },
        {
          'id': 4406,
          'name': '佛山市',
          'children': [
            {
              'id': 440601,
              'name': '佛山市区',
              'ischecked': false,
              'checknumber': 0
            },
            {
              'id': 440605,
              'name': '南海区',
              'ischecked': false,
              'checknumber': 0
            }
          ],
          'ischecked': false,
          'checknumber': 0
        }
      ],
      'ischecked': false,
      'checknumber': 0
    }
  ]
})

// 获取广告位
const adsenses = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '获取广告位成功',
  'data|4': [{
    'id|1': ['adsenseId', 'adsenseId', 'adsenseId', 'adsenseId'],
    'adType': '3'
  }]
})

// 获取楼层编辑某个广告位时的广告位列表
const floorAdList = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '获取成功',
  'data|4': [{
    'id|1': '@id',
    'images': [{
      'imageId': '@id',
      'imageName': '图片名称1.jpg',
      'imagePath': 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=8a829b242c9759ee5e5d6888da922963/2934349b033b5bb54b92dfd73cd3d539b600bc56.jpg'
    }, {
      'imageId': '@id',
      'imageName': '图片名称2.jpg',
      'imagePath': 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=8a829b242c9759ee5e5d6888da922963/2934349b033b5bb54b92dfd73cd3d539b600bc56.jpg'
    }],
    'title': '广告标题',
    'link': 'http://www.baidu.com',
    'ppid': '123',
    'soldoutTime': '2017-07-19 14:35:05',
    'areaName': '全区',
    'areaCode': '0'
  }]
})

// 上传广告图片
const upload = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '上传成功',
  'data': {
    'imageId': '123',
    'imageName': '图片名称111.jpg',
    'imagePath': '//img2.ch999img.com/pic/product/440x440/20170421142545617.jpg'
  }
})

// 保存广告编辑
const adItem = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '保存成功',
  'data': {
    'id': '333',
    'images': [{
      'imageId': '@id',
      'imageName': '图片名称11.jpg',
      'imagePath': 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=8a829b242c9759ee5e5d6888da922963/2934349b033b5bb54b92dfd73cd3d539b600bc56.jpg'
    }, {
      'imageId': '@id',
      'imageName': '图片名称22.jpg',
      'imagePath': 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=8a829b242c9759ee5e5d6888da922963/2934349b033b5bb54b92dfd73cd3d539b600bc56.jpg'
    }],
    'title': '广告标题',
    'link': 'http://www.baidu.com',
    'ppid': '12333',
    'soldoutTime': '2017-07-20 14:35:05',
    'areaName': '全区',
    'areaCode': '0'
  }
})

// 获取楼层广告位及广告位的所有广告
const floorAds = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '获取成功',
  'data': {
    'floor': {
      'type': 1,
      'floorStyleId': '0'
    },
    'adsenses|6': [{
      'id': '@id',
      'adType': 4,
      'adList|4': [{
        'id|1': '@id',
        'images': [{
          'imageId': '@id',
          'imageName': '图片名称1.jpg',
          'imagePath': 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=8a829b242c9759ee5e5d6888da922963/2934349b033b5bb54b92dfd73cd3d539b600bc56.jpg'
        }, {
          'imageId': '@id',
          'imageName': '图片名称2.jpg',
          'imagePath': 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=8a829b242c9759ee5e5d6888da922963/2934349b033b5bb54b92dfd73cd3d539b600bc56.jpg'
        }],
        'title': '广告标题',
        'link': 'http://www.baidu.com',
        'ppid': '123',
        'soldoutTime': '2017-07-19 14:35:05',
        'areaName': '全区',
        'areaCode': '0'
      }]
    }]
  }
})

// 获取某个区域下的广告位设置
const areaAdList = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '获取成功',
  'data|5': [{
    'id': '@id',
    'adsenseId': '@id',
    'adType': 4,
    'images': [{
      'imageId': '@id',
      'imageName': '图片名称1.jpg',
      'imagePath': 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=8a829b242c9759ee5e5d6888da922963/2934349b033b5bb54b92dfd73cd3d539b600bc56.jpg'
    }, {
      'imageId': '@id',
      'imageName': '图片名称2.jpg',
      'imagePath': 'http://imgsrc.baidu.com/image/c0%3Dshijue%2C0%2C0%2C245%2C40/sign=8a829b242c9759ee5e5d6888da922963/2934349b033b5bb54b92dfd73cd3d539b600bc56.jpg'
    }],
    'title': '广告标题',
    'link': 'http://www.baidu.com',
    'ppid': '123',
    'soldoutTime': '2017-07-19 14:35:05',
    'areaName': '全区',
    'areaCode': '0',
    'sequence|+1': 1
  }]
})

export default {
  categories,
  addCategory,
  floorsList,
  floor,
  postSuccess,
  editCategories,
  cities,
  adsenses,
  floorAdList,
  upload,
  adItem,
  floorAds,
  areaAdList
}
