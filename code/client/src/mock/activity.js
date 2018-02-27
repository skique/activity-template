// 专题模板数据模拟
import Mock from 'mockjs'

// 模板数据
const topicData = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data': {
    'topicData': '{"share":{"title":"1","desc":"1","img":"1","link":"1","fun":""},"floor":[{"id":1,"sort":1,"type":"normal","group":"","name":"楼层1","editName":true,"height":450,"bgcolor":"#fff","bgimg":"","bgposition":"top center","tile":false,"show":true,"layer":[{"id":1,"name":"图层1","type":"text","active":false,"show":true,"content":"2017/12/5-2017/12/8","field":"","color":"","bgcolor":"","bgimg":"","lineheight":"","fontsize":28,"align":"left","width":317,"height":82,"top":152,"left":194,"linkType":"","link":"","ruleContent":"","component":"","componentData":[],"componentDataStr":"","product":{"col":2,"btnText":"","productStyle":"default","btnBgColor":""},"bulletConfig":{"line":4,"top":20,"distance":60,"showAvatar":true,"color":"","backgroundColor":"","fontSize":28},"fruitMachineConfig":{"speed":"","time":"","btnWidth":"","btnHeight":"","btnMarginTop":""},"turntableConfig":{"turntable":"","button":"","count":""},"lanternConfig":{"lantern":"","showBoundary":true},"videoConfig":{"video":"","poster":""},"tabConfig":{"bgcolor":"","bgcolorActive":"","color":"","colorActive":"","fontsize":"28","btnWidth":"","btnHeight":"60","interval":"","changeWay":"click","btnList":[]},"effect":"","duration":1,"delay":0,"iteration":1,"letterSpacing":"","fontWeight":"normal","layerRadius":0,"borderWidth":0,"borderColor":"#fff","borderStyle":"solid","layerOpacity":1}],"appearAni":false,"hasAnimate":false,"startTime":"2017/12/5","endTime":"2017/12/8"},{"id":2,"sort":2,"type":"normal","group":"","name":"楼层2","editName":true,"height":450,"bgcolor":"#fff","bgimg":"","bgposition":"top center","tile":false,"show":true,"layer":[{"id":1,"name":"图层1","type":"text","active":false,"show":true,"content":"2017/12/9","field":"","color":"","bgcolor":"","bgimg":"","lineheight":"","fontsize":28,"align":"left","width":309,"height":85,"top":84,"left":219,"linkType":"","link":"","ruleContent":"","component":"","componentData":[],"componentDataStr":"","product":{"col":2,"btnText":"","productStyle":"default","btnBgColor":""},"bulletConfig":{"line":4,"top":20,"distance":60,"showAvatar":true,"color":"","backgroundColor":"","fontSize":28},"fruitMachineConfig":{"speed":"","time":"","btnWidth":"","btnHeight":"","btnMarginTop":""},"turntableConfig":{"turntable":"","button":"","count":""},"lanternConfig":{"lantern":"","showBoundary":true},"videoConfig":{"video":"","poster":""},"tabConfig":{"bgcolor":"","bgcolorActive":"","color":"","colorActive":"","fontsize":"28","btnWidth":"","btnHeight":"60","interval":"","changeWay":"click","btnList":[]},"effect":"","duration":1,"delay":0,"iteration":1,"letterSpacing":"","fontWeight":"normal","layerRadius":0,"borderWidth":0,"borderColor":"#fff","borderStyle":"solid","layerOpacity":1}],"appearAni":false,"hasAnimate":false,"startTime":"2017/12/9","endTime":""}],"isFullpage":false}',
    'customCode': 'window.test = function () {\n\tconsole.log(\'test\')\n}\ntest()',
    'now': 1512541036000
  }
})

// 获取优惠码
const getCoupon = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  data: 'FADCFFC04'
})
// 获取变量值
const getField = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data': {
    'aaa': 'aaa已赋值',
    'appointCount': '找程序赋值'
  }
})

// 组件数据
const getComponentData = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data': {
    'product': [ // 普通商品
      {
        'ppid': 43920, // 普通商品id
        'name': 'iPhone 7（A1660）国行版 黑色 128GB ', // 商品名称
        'description': '【火热销售】IP67防水防尘；后置1200万镜头，光学防抖，全新A10处理器！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170421142609609.jpg', // 商品图片
        'price': '5560.00', // 商品价格
        'originalprice': '6188.00', // 商品原价
        'sellingPoint': '防水防尘 光学防抖' // 卖点
      },
      {
        'ppid': 43921, // 普通商品id
        'name': 'iPhone 7（A1660）国行版 黑色 128GB ', // 商品名称
        'description': '【火热销售】IP67防水防尘；后置1200万镜头，光学防抖，全新A10处理器！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170421142609609.jpg', // 商品图片
        'price': '5560.00', // 商品价格
        'originalprice': '6188.00', // 商品原价
        'sellingPoint': '防水防尘 光学防抖' // 卖点
      },
      {
        'ppid': 43922, // 普通商品id
        'name': 'iPhone 7（A1660）国行版 黑色 128GB ', // 商品名称
        'description': '【火热销售】IP67防水防尘；后置1200万镜头，光学防抖，全新A10处理器！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170421142609609.jpg', // 商品图片
        'price': '5560.00', // 商品价格
        'originalprice': '6188.00', // 商品原价
        'sellingPoint': '防水防尘 光学防抖' // 卖点
      },
      {
        'ppid': 43923, // 普通商品id
        'name': 'iPhone 7（A1660）国行版 黑色 128GB ', // 商品名称
        'description': '【火热销售】IP67防水防尘；后置1200万镜头，光学防抖，全新A10处理器！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170421142609609.jpg', // 商品图片
        'price': '5560.00', // 商品价格
        'originalprice': '6188.00', // 商品原价
        'sellingPoint': '防水防尘 光学防抖' // 卖点
      },
      {
        'ppid': 43924, // 普通商品id
        'name': 'iPhone 7（A1660）国行版 黑色 128GB ', // 商品名称
        'description': '【火热销售】IP67防水防尘；后置1200万镜头，光学防抖，全新A10处理器！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170421142609609.jpg', // 商品图片
        'price': '5560.00', // 商品价格
        'originalprice': '6188.00', // 商品原价
        'sellingPoint': '防水防尘 光学防抖' // 卖点
      }
    ],
    'rush': [ // 抢购商品
      {
        'id': 16630, // 抢购商品id
        'startTime': -786625.0, // 开始时间
        'endTime': 629090.0, // 结束时间
        'name': '锐思 速腾系列 Lightning接口 iPhone快充数据线 苹果5s/6s/7  线长1.2米 红色 ', // 商品名称
        'imagePath': '//img2.ch999img.com//pic/product/440x440/20170828132727857.jpg', // 商品图片
        'price': '19.00', // 商品价格
        'originalprice': '29.00', // 原价
        'totalCount': 25, // 总数
        'surplus': 9, // 剩余件数
        'appoint': 0, // 1-预约抢购 0-去抢购
        'sellingPoint': '超粗线身 结实耐用' // 卖点
      },
      {
        'id': 16631, // 抢购商品id
        'startTime': -786625.0, // 开始时间
        'endTime': 629090.0, // 结束时间
        'name': '锐思 速腾系列 Lightning接口 iPhone快充数据线 苹果5s/6s/7  线长1.2米 红色 ', // 商品名称
        'imagePath': '//img2.ch999img.com//pic/product/440x440/20170828132727857.jpg', // 商品图片
        'price': '19.00', // 商品价格
        'originalprice': '29.00', // 原价
        'totalCount': 25, // 总数
        'surplus': 9, // 剩余件数
        'appoint': 0, // 1-预约抢购 0-去抢购
        'sellingPoint': '超粗线身 结实耐用' // 卖点
      },
      {
        'id': 16632, // 抢购商品id
        'startTime': -786625.0, // 开始时间
        'endTime': 629090.0, // 结束时间
        'name': '锐思 速腾系列 Lightning接口 iPhone快充数据线 苹果5s/6s/7  线长1.2米 红色 ', // 商品名称
        'imagePath': '//img2.ch999img.com//pic/product/440x440/20170828132727857.jpg', // 商品图片
        'price': '19.00', // 商品价格
        'originalprice': '29.00', // 原价
        'totalCount': 25, // 总数
        'surplus': 9, // 剩余件数
        'appoint': 0, // 1-预约抢购 0-去抢购
        'sellingPoint': '超粗线身 结实耐用' // 卖点
      },
      {
        'id': 16633, // 抢购商品id
        'startTime': -786625.0, // 开始时间
        'endTime': 629090.0, // 结束时间
        'name': '锐思 速腾系列 Lightning接口 iPhone快充数据线 苹果5s/6s/7  线长1.2米 红色 ', // 商品名称
        'imagePath': '//img2.ch999img.com//pic/product/440x440/20170828132727857.jpg', // 商品图片
        'price': '19.00', // 商品价格
        'originalprice': '29.00', // 原价
        'totalCount': 25, // 总数
        'surplus': 9, // 剩余件数
        'appoint': 0, // 1-预约抢购 0-去抢购
        'sellingPoint': '超粗线身 结实耐用' // 卖点
      },
      {
        'id': 16634, // 抢购商品id
        'startTime': -786625.0, // 开始时间
        'endTime': 629090.0, // 结束时间
        'name': '锐思 速腾系列 Lightning接口 iPhone快充数据线 苹果5s/6s/7  线长1.2米 红色 ', // 商品名称
        'imagePath': '//img2.ch999img.com//pic/product/440x440/20170828132727857.jpg', // 商品图片
        'price': '19.00', // 商品价格
        'originalprice': '29.00', // 原价
        'totalCount': 25, // 总数
        'surplus': 9, // 剩余件数
        'appoint': 0, // 1-预约抢购 0-去抢购
        'sellingPoint': '超粗线身 结实耐用' // 卖点
      }
    ],
    'integral': [ // 积分购
      {
        'id': 2552, // 积分商品id
        'name': '珂玛 iPhone 6/6s 复合材质 皮质保护壳', // 商品名称
        'description': '', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/216x216/20170831164953293.jpg', // 商品图片
        'price': 5.00, // 价格
        'integral': 4900, // 所需积分
        'sellingPoint': '拼接设计 全包防摔' // 商品卖点
      }, {
        'id': 2553, // 积分商品id
        'name': '珂玛 iPhone 6/6s 复合材质 皮质保护壳', // 商品名称
        'description': '', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/216x216/20170831164953293.jpg', // 商品图片
        'price': 0.00, // 价格
        'integral': 4900, // 所需积分
        'sellingPoint': '拼接设计 全包防摔' // 商品卖点
      }, {
        'id': 2554, // 积分商品id
        'name': '珂玛 iPhone 6/6s 复合材质 皮质保护壳', // 商品名称
        'description': '', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/216x216/20170831164953293.jpg', // 商品图片
        'price': 0.00, // 价格
        'integral': 4900, // 所需积分
        'sellingPoint': '拼接设计 全包防摔' // 商品卖点
      }, {
        'id': 2555, // 积分商品id
        'name': '珂玛 iPhone 6/6s 复合材质 皮质保护壳', // 商品名称
        'description': '', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/216x216/20170831164953293.jpg', // 商品图片
        'price': 0.00, // 价格
        'integral': 4900, // 所需积分
        'sellingPoint': '拼接设计 全包防摔' // 商品卖点
      }, {
        'id': 2556, // 积分商品id
        'name': '珂玛 iPhone 6/6s 复合材质 皮质保护壳', // 商品名称
        'description': '', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/216x216/20170831164953293.jpg', // 商品图片
        'price': 0.00, // 价格
        'integral': 4900, // 所需积分
        'sellingPoint': '拼接设计 全包防摔' // 商品卖点
      }, {
        'id': 2557, // 积分商品id
        'name': '珂玛 iPhone 6/6s 复合材质 皮质保护壳', // 商品名称
        'description': '', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/216x216/20170831164953293.jpg', // 商品图片
        'price': 0.00, // 价格
        'integral': 4900, // 所需积分
        'sellingPoint': '拼接设计 全包防摔' // 商品卖点
      }
    ],
    'team': [ // 团购
      {
        'ppid': 47211, // ppid
        'name': '', // 商品名称
        'description': '九机独家定制；1年无忧免费换新，坚固耐用！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170908133749843.jpg', // 商品图片
        'price': '27.00', // 价格
        'originalprice': '45.00', // 原价
        'people': 2, // 成团人数
        'sellingPoint': '九机定制 无忧换新' // 卖点
      }, {
        'ppid': 47212, // ppid
        'name': '', // 商品名称
        'description': '九机独家定制；1年无忧免费换新，坚固耐用！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170908133749843.jpg', // 商品图片
        'price': '27.00', // 价格
        'originalprice': '45.00', // 原价
        'people': 2, // 成团人数
        'sellingPoint': '九机定制 无忧换新' // 卖点
      }, {
        'ppid': 47213, // ppid
        'name': '', // 商品名称
        'description': '九机独家定制；1年无忧免费换新，坚固耐用！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170908133749843.jpg', // 商品图片
        'price': '27.00', // 价格
        'originalprice': '45.00', // 原价
        'people': 2, // 成团人数
        'sellingPoint': '九机定制 无忧换新' // 卖点
      }, {
        'ppid': 47214, // ppid
        'name': '', // 商品名称
        'description': '九机独家定制；1年无忧免费换新，坚固耐用！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170908133749843.jpg', // 商品图片
        'price': '27.00', // 价格
        'originalprice': '45.00', // 原价
        'people': 2, // 成团人数
        'sellingPoint': '九机定制 无忧换新' // 卖点
      }, {
        'ppid': 47215, // ppid
        'name': '', // 商品名称
        'description': '九机独家定制；1年无忧免费换新，坚固耐用！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170908133749843.jpg', // 商品图片
        'price': '27.00', // 价格
        'originalprice': '45.00', // 原价
        'people': 2, // 成团人数
        'sellingPoint': '九机定制 无忧换新' // 卖点
      }, {
        'ppid': 47216, // ppid
        'name': '', // 商品名称
        'description': '九机独家定制；1年无忧免费换新，坚固耐用！', // 商品描述
        'imagePath': '//img2.ch999img.com/pic/product/440x440/20170908133749843.jpg', // 商品图片
        'price': '27.00', // 价格
        'originalprice': '45.00', // 原价
        'people': 2, // 成团人数
        'sellingPoint': '九机定制 无忧换新' // 卖点
      }
    ],
    'group': [ // 组合购
      {
        'id': 1154,
        'name': '华为畅享5S全网通', // 组合购名称
        'price': '100.00', // 组合购价格
        'originalprice': '113.00', // 原价
        'product': [ // 组合商品
          {
            'ppid': 36843, // ppid
            'price': '35.00', // 价格
            'name': '飞尚（ Freeson）华为 畅享5s TPU软壳 透明壳 ', // 商品名称
            'imagePath': '//img2.ch999img.com/pic/product/440x440/20170905160005315.jpg' // 商品图片
          }, {
            'ppid': 38560,
            'price': '35.00',
            'name': '摩可（Mocoll） 华为 畅享5s 半屏钢化膜 ',
            'imagePath': '//img2.ch999img.com/pic/product/440x440/20170907165322365.jpg'
          }, {
            'ppid': 27214,
            'price': '30.00',
            'name': '华为（HUAWEI）荣耀 耳塞式 线控耳机 白色 ',
            'imagePath': '//img2.ch999img.com/pic/product/440x440/201709081501453.jpg'
          }
        ]
      }
    ],
    'bullet': [{
      'nid': 123,
      'list': [{
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '贫穷使我冷静。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '我的天'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '贫穷使我冷静。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '我的天'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '贫穷使我冷静。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '我的天'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '贫穷使我冷静。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '我去。什么情况。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }]
    }, {
      'nid': 234,
      'list': [{
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '贫穷使我冷静。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '这是什么鬼。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '贫穷使我冷静。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '我的天'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '贫穷使我冷静。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '我的天'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '贫穷使我冷静。。。'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '我的天'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: '手机不错，太贵买不起！！！'
      }, {
        userName: '137haha1231',
        avatar: '//img2.ch999img.com/images/usericon.png',
        content: 'iPhoneX居然有刘海，太丑了。'
      }]
    }],
    'circlr': [{
      'ppid': 123,
      'images': [
        '//img2.ch999img.com/pic/product/opic/170508143711825/1.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/2.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/3.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/4.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/5.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/6.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/7.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/8.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/9.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/10.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/11.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/12.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/13.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/14.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/15.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/16.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/17.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/18.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/19.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/20.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/21.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/22.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/23.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/24.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/25.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/26.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/27.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/28.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/29.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/30.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/31.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/32.jpg'
      ]
    }, {
      'ppid': 234,
      'images': [
        '//img2.ch999img.com/pic/product/opic/170508143711825/1.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/2.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/3.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/4.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/5.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/6.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/7.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/8.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/9.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/10.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/11.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/12.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/13.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/14.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/15.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/16.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/17.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/18.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/19.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/20.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/21.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/22.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/23.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/24.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/25.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/26.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/27.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/28.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/29.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/30.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/31.jpg',
        '//img2.ch999img.com/pic/product/opic/170508143711825/32.jpg'
      ]
    }],
    'prize': [{
      'batch': 123,
      'list': [{
        id: 3232,
        prize: '首发准点达',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708300110470.png'
      }, {
        id: 3233,
        prize: '一年延保',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708300426190.png'
      }, {
        id: 3234,
        prize: '一年电池保',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708300217470.png'
      }, {
        id: 3259,
        prize: '随机积分',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708280536220.png'
      }, {
        id: 3260,
        prize: 'iPhone7Plus保护壳',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201709011139520.png'
      }, {
        id: 3261,
        prize: 'iPhone7Plus保护壳',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201709011140040.png'
      }, {
        id: 3262,
        prize: 'iPhone7保护壳',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201709011140170.png'
      }, {
        id: 3263,
        prize: 'iPhone7保护壳',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201709011140250.png'
      }, {
        id: 3264,
        prize: 'iPhone同步首发购买权',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708280538040.png'
      }, {
        id: 3265,
        prize: 'iPhone价低官网购买权',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708280539200.png'
      }, {
        id: 3235,
        prize: '谢谢参与',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/无'
      }]
    }, {
      'batch': 234,
      'list': [{
        id: 3232,
        prize: '首发准点达',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708300110470.png'
      }, {
        id: 3233,
        prize: '一年延保',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708300426190.png'
      }, {
        id: 3234,
        prize: '一年电池保',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708300217470.png'
      }, {
        id: 3259,
        prize: '随机积分',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708280536220.png'
      }, {
        id: 3260,
        prize: 'iPhone7Plus保护壳',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201709011139520.png'
      }, {
        id: 3261,
        prize: 'iPhone7Plus保护壳',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201709011140040.png'
      }, {
        id: 3262,
        prize: 'iPhone7保护壳',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201709011140170.png'
      }, {
        id: 3263,
        prize: 'iPhone7保护壳',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201709011140250.png'
      }, {
        id: 3264,
        prize: 'iPhone同步首发购买权',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708280538040.png'
      }, {
        id: 3265,
        prize: 'iPhone价低官网购买权',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/201708280539200.png'
      }, {
        id: 3235,
        prize: '谢谢参与',
        type: 1,
        imagePath: 'https://img2.ch999img.com/pic/zt/无'
      }]
    }],
    'now': 1510629937000
  }
})

// 获取中奖名单
const getWinnerList = Mock.mock({
  code: 0,
  msg: 'success',
  userMsg: '请求成功',
  'data': [{ // 中奖用户
    'batch': '2017082147720001', // 奖池编号
    'list': [{
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分1' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分2' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分3' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分4' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分5' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分6' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分7' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分8' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分9' // 奖品
    }]
  }, { // 中奖用户
    'batch': '2017082147720002', // 奖池编号
    'list': [{
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }, {
      'username': 'wx_3296273', // 用户姓名
      'prize': '随机积分' // 奖品
    }]
  }]
})

// 抽奖接口
const lottery = Mock.mock({
  'code': 0,
  'msg': 'SuccessMsg',
  'userMsg': '请求成功',
  'data': {
    'id': 2489,
    'random': 2,
    'type': 1,
    'code': 'TWRCQ',
    'prize': '手机指环架',
    'imagePath': '//img2.ch999img.com/pic/product/440x440/20170928154149140.jpg',
    'msg': '恭喜您抽中手机指环架',
    'btns': [{ // 抽奖结果弹窗按钮，btns为[]空数组时，弹窗显示默认按钮，文字为“好的”，点击关闭弹窗
      'text': '确定',
      'path': '/user/redpaper.aspx#coupons' // 点击确定跳转地址
    }, {
      'text': '取消',
      'path': ''
    }]
  }
})

export default {
  topicData,
  getCoupon,
  getField,
  getComponentData,
  getWinnerList,
  lottery
}
