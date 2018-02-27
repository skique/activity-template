<template>
  <div class="wrapper" :class="{'fullpage-container': isFullpage}">
    <!-- 加载动画 -->
    <div class="flex flex-center" style="height:300px" v-if="loading">
      <spinner type="double-bounce" color="#ff6700" :size="48"></spinner>
    </div>
    <!-- 楼层 -->
    <div class="topic-wrapper" :class="{'fullpage-wp': isFullpage}" v-fullpage="isFullpage ? opts : {noInit: true}" v-show="!loading">
      <template v-for="(fl, index) in floors">
        <!-- sticky楼层 -->
        <sticky v-if="fl.type=='sticky'" class="topic-floor" :key="fl.id" :id="fl.id" v-show="fl.show">
          <div :style="{height: fl.height/75 + 'rem',backgroundColor: fl.bgcolor,backgroundImage:'url('+fl.bgimg+')',backgroundPosition:fl.bgposition,backgroundRepeat:'no-repeat',backgroundSize: 'cover'}" style="z-index: 20;">
            <div class="floor-wrapper" :class="{'fullpage': isFullpage}">
              <div class="layer" v-for="(layer, index) in fl.layer" :key="index"
            :style="{height: layer.height?layer.height/75+'rem':'', width: layer.width?layer.width/75+'rem':'', top: layer.top?layer.top/75+'rem':'', left: layer.left?layer.left/75+'rem':''}"
            >
              <div class="layer-inner"
              :data-floorId="fl.id"
              :data-layerId="layer.id"
              :class="[(fl.appearAni && layer.effect.length > 0) ? layer.effect : '']"
              :style="{color: layer.color, borderRadius: layer.layerRadius/75 + 'rem', borderWidth: layer.borderWidth/75 + 'rem', borderColor: layer.borderColor, borderStyle: layer.borderStyle, opacity: layer.layerOpacity, 
              backgroundColor: layer.bgcolor, backgroundImage: 'url('+layer.bgimg+')', backgroundRepeat: 'no-repeat', fontSize: layer.fontsize?layer.fontsize/75 + 'rem':'', textAlign: layer.align, lineHeight: layer.lineheight?layer.lineheight/75 + 'rem':'',
              letterSpacing: layer.letterSpacing?layer.letterSpacing/75 + 'rem':'', fontWeight: layer.fontWeight, animationDuration: (layer.effect.length > 0 && layer.duration > 0) ? layer.duration+'s' : '',animationDelay:(layer.effect.length > 0 && layer.delay > 0) ? layer.delay+'s':'',animationIterationCount:layer.effect.length > 0 ? layer.iteration:''}">
                <!-- text图层 -->
                <template v-if="layer.type=='text'">
                  {{layer.content}}
                </template>
                <!-- html图层 -->
                <template v-if="layer.type=='html'">
                  <div v-html="layer.content"></div>
                </template>
                <!-- 变量图层 -->
                <template v-if="layer.type=='field'">{{layer.content}}</template>
                <!-- 图片图层 -->
                <template v-if="layer.type=='img'">
                  <img :src="layer.content" draggable="false" class="layer-image" />
                </template>
                <!-- 事件处理 -->
                <template v-if="layer.type!='component'&&layer.linkType">
                  <a :href="layer.linkType=='link'?((layer.link.indexOf('http')==0||layer.link.indexOf('//')==0)?layer.link:'javascript:;'):'javascript:;'"
                    :onclick="layer.linkType=='fun'?layer.link:'javascript:;'"
                    class="layer-link" @click="handleLinkClick(layer.linkType, layer.link, layer.ruleContent)"></a>
                </template>
                <!-- 组件图层 -->
                <template v-if="layer.type=='component'">
                  <!-- 选项卡 -->
                  <tab v-if="layer.component=='tab'"
                    :list="layer.tabConfig.btnList"
                    :bgcolor="layer.tabConfig.bgcolor"
                    :bgcolor-active="layer.tabConfig.bgcolorActive"
                    :color="layer.tabConfig.color"
                    :color-active="layer.tabConfig.colorActive"
                    :width="layer.tabConfig.btnWidth?layer.tabConfig.btnWidth/75:undefined"
                    :height="layer.tabConfig.btnHeight?layer.tabConfig.btnHeight/75:undefined"
                    :interval="layer.tabConfig.interval?layer.tabConfig.interval/75:undefined"
                    :unit='rem'
                    :change-way="layer.tabConfig.changeWay"
                    :fontsize="layer.tabConfig.fontsize?layer.tabConfig.fontsize/75:undefined"
                    @changetab="changeTab">
                  </tab>
                </template>
              </div>
            </div>
            </div>
          </div>
        </sticky>
        <!-- 其他楼层 -->
        <div :id="fl.id" :key="fl.id" v-else class="topic-floor" :class="{'float-floor':fl.type=='float', 'appear': fl.hasAnimate&&!isFullpage, 'page': isFullpage}" v-show="fl.show"
          :style="{height: fl.height/75 + 'rem',backgroundColor: fl.bgcolor,backgroundImage:'url('+fl.bgimg+')',backgroundPosition:fl.bgposition,backgroundRepeat:'no-repeat',backgroundSize: 'cover', position: isFullpage?'relative':''}"
          @appear="handleAppear(fl.id)"
          @disappear="handleDisappear(fl.id)"
          >
          <div class="floor-wrapper" :class="{'fullpage': isFullpage}">
            <div class="layer" v-for="(layer, index) in fl.layer" :key="index"
            :style="{height: layer.height?layer.height/75+'rem':'', width: layer.width?layer.width/75+'rem':'', top: layer.top?layer.top/75+'rem':'', left: layer.left?layer.left/75+'rem':''}"
            >
              <div class="layer-inner"
              :data-floorId="fl.id"
              :data-layerId="layer.id"
              :class="[(fl.appearAni && layer.effect.length > 0) && !isFullpage ? layer.effect : '']"
              :style="{color: layer.color, borderRadius: layer.layerRadius/75 + 'rem', borderWidth: layer.borderWidth/75 + 'rem', borderColor: layer.borderColor, borderStyle: layer.borderStyle, opacity: layer.layerOpacity, 
              backgroundColor: layer.bgcolor, backgroundImage: 'url('+layer.bgimg+')', backgroundRepeat: 'no-repeat', fontSize: layer.fontsize?layer.fontsize/75 + 'rem':'', textAlign: layer.align, lineHeight: layer.lineheight?layer.lineheight/75 + 'rem':'',
              letterSpacing: layer.letterSpacing?layer.letterSpacing/75 + 'rem':'', fontWeight: layer.fontWeight, animationDuration: (layer.effect.length > 0 && layer.duration > 0) ? layer.duration+'s' : '',animationDelay:(layer.effect.length > 0 && layer.delay > 0) ? layer.delay+'s':'',animationIterationCount:layer.effect.length > 0 ? layer.iteration:''}"
              v-animate="{value: layer.effect}"
              >
                <!-- text图层 -->
                <template v-if="layer.type=='text'">
                  {{layer.content}}
                </template>
                <!-- html图层 -->
                <template v-if="layer.type=='html'">
                  <div v-html="layer.content"></div>
                </template>
                <!-- 变量图层 -->
                <template v-if="layer.type=='field'">{{layer.content}}</template>
                <!-- 图片图层 -->
                <template v-if="layer.type=='img'">
                  <img :src="layer.content" draggable="false" class="layer-image" />
                </template>
                <!-- 事件处理 -->
                <template v-if="layer.type!='component'&&layer.linkType">
                  <a :href="layer.linkType=='link'?((layer.link.indexOf('http')==0||layer.link.indexOf('//')==0)?layer.link:'javascript:;'):'javascript:;'"
                    :onclick="layer.linkType=='fun'?layer.link:'javascript:;'"
                    class="layer-link" @click="handleLinkClick(layer.linkType, layer.link, layer.ruleContent)"></a>
                </template>
                <!-- 组件图层 -->
                <template v-if="layer.type=='component'">
                  <!-- 普通商品、抢购商品、团购商品、积分购 -->
                  <product :layer="layer" :platform="platform" :now="now" :topicId="topicId" v-if="layer.component=='product' || layer.component=='rush' || layer.component=='team' || layer.component=='integral'"></product>
                  <!-- 组合购 -->
                  <group :layer="layer" :platform="platform" :now="now" :topicId="topicId" v-if="layer.component=='group'"></group>
                  <!-- 弹幕 -->
                  <bullet v-if="layer.component=='bullet'" :bulletList="layer.componentData" :line="layer.bulletConfig.line?parseInt(layer.bulletConfig.line):undefined" :top="layer.bulletConfig.top?parseInt(layer.bulletConfig.top)/2:undefined" :distance="layer.bulletConfig.distance?parseInt(layer.bulletConfig.distance)/2:undefined" :showAvatar="layer.bulletConfig.showAvatar" :color="layer.bulletConfig.color" :backgroundColor="layer.bulletConfig.backgroundColor" :fontSize="layer.bulletConfig.fontSize?parseInt(layer.bulletConfig.fontSize)/2:14" :itemHeight="layer.bulletConfig.fontSize?parseInt(layer.bulletConfig.fontSize)/2:14"></bullet>
                  <!-- 3D图 -->
                  <circlr v-if="layer.component=='circlr'" :imagesList="layer.componentData"></circlr>
                  <!-- 倒计时 -->
                  <time-play v-if="layer.component=='timePlay'" :times="layer.componentDataStr?layer.componentDataStr:undefined" :format="'<em>{{d}}</em>天<em>{{h}}</em>时<em>{{m}}</em>分<em>{{s}}</em>秒'"></time-play>
                  <!-- 中奖用户名单 -->
                  <marquee style="height: 100%;" v-if="layer.component=='winnerList'" :changed="layer.componentData.length">
                    <div class="marquee-item" v-for="(user, uIndex) in layer.componentData" :key="uIndex">恭喜&nbsp;{{user.username}}&nbsp;获得&nbsp;<span class="prize">{{user.prize}}</span></div>
                  </marquee>
                  <!-- 水果机 -->
                  <fruit-machine v-if="layer.component=='fruitMachine'" :prizeAllList="layer.componentData"
                    :speed="layer.fruitMachineConfig.speed?parseInt(layer.fruitMachineConfig.speed):50"
                    :time="layer.fruitMachineConfig.time?parseInt(layer.fruitMachineConfig.time):3000"
                    :btnWidth="layer.fruitMachineConfig.btnWidth?parseInt(layer.fruitMachineConfig.btnWidth)/2:150"
                    :btnHeight="layer.fruitMachineConfig.btnHeight?parseInt(layer.fruitMachineConfig.btnHeight)/2:40"
                    :btnMarginTop="layer.fruitMachineConfig.btnMarginTop?parseInt(layer.fruitMachineConfig.btnMarginTop)/2:5" 
                    @start="doLottery"
                    @end="endLottery" :ref="'fruitMachine' + layer.id" :callbackData="{layerId:layer.id, type: 'fruitMachine', batch: layer.content}">
                  </fruit-machine>
                  <!-- 大转盘 -->
                  <turntable v-if="layer.component=='turntable'" :ref="'turntable' + layer.id" 
                    :turntable="layer.turntableConfig.turntable?layer.turntableConfig.turntable:undefined"
                    :button="layer.turntableConfig.button?layer.turntableConfig.button:undefined"
                    :count="layer.turntableConfig.count?parseInt(layer.turntableConfig.count):undefined"
                    :callbackData="{layerId:layer.id, type: 'turntable', batch: layer.content}"
                    @start="doLottery" @end="endLottery"></turntable>
                  <!-- 跑马灯 -->
                  <revolving-lantern v-if="layer.component=='lantern'"
                    :bg="layer.lanternConfig.lantern?layer.lanternConfig.lantern:undefined"
                    :showBoundary="layer.lanternConfig.showBoundary"
                    :ref="'lantern'+layer.id" @start="doLottery" @end="endLottery"
                    :callbackData="{layerId:layer.id, type: 'lantern', batch: layer.content}"></revolving-lantern>
                  <!-- 视频播放 -->
                  <video-player v-if="layer.component=='video'" :src="layer.videoConfig.video?layer.videoConfig.video:undefined" :poster="layer.videoConfig.poster?layer.videoConfig.poster:undefined"></video-player>
                  <!-- 选项卡 -->
                  <tab v-if="layer.component=='tab'"
                    :list="layer.tabConfig.btnList"
                    :bgcolor="layer.tabConfig.bgcolor"
                    :bgcolor-active="layer.tabConfig.bgcolorActive"
                    :color="layer.tabConfig.color"
                    :color-active="layer.tabConfig.colorActive"
                    :width="layer.tabConfig.btnWidth?layer.tabConfig.btnWidth/75+'':undefined"
                    :height="layer.tabConfig.btnHeight?layer.tabConfig.btnHeight/75+'':undefined"
                    :interval="layer.tabConfig.interval?layer.tabConfig.interval/75+'':undefined"
                    unit='rem'
                    :change-way="layer.tabConfig.changeWay"
                    :fontsize="layer.tabConfig.fontsize?layer.tabConfig.fontsize/75:undefined"
                    @changetab="changeTab">
                  </tab>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 显示图片 -->
    <transition name="fade">
      <div class="show-img" v-show="showImg" @click="showImg=false">
        <div class="img-wrapper">
          <img :src="imgUrl" v-show="!isQRCode">
          <div id="qrcode" v-show="isQRCode"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import 'assets/plugin/appear.js'
  import Vue from 'vue'
  import {Spinner, Toast, MessageBox, Indicator} from 'mint-ui'
  import {activityApi} from 'src/api'
  import { mapState } from 'vuex'
  import sticky from 'components/sticky'
  import product from './product'
  import group from './group'
  import bullet from 'components/bullet'
  import circlr from 'components/circlr'
  import timePlay from 'components/time-play'
  import marquee from 'components/marquee'
  import videoPlayer from 'components/video-player'
  import turntable from './turntable'
  import fruitMachine from './fruitMachine'
  import revolvingLantern from './revolving-lantern'
  import tab from './tab'
  import 'assets/style/animate.min.css'
  import 'assets/plugin/fullpage/vue-fullpage.css'
  import VueFullpage from 'assets/plugin/fullpage'
  Vue.use(VueFullpage)
  window.floorappear = null
  export default {
    components: {spinner: Spinner, sticky, product, group, bullet, circlr, timePlay, marquee, videoPlayer, turntable, fruitMachine, revolvingLantern, tab},
    data () {
      return {
        loading: true,
        topicId: '', // 模板id
        platform: 'm',
        now: 0,
        share: {},
        customCode: '',
        isFullpage: false,
        imgUrl: '',
        showImg: false,
        isQRCode: false,
        floors: [],
        opts: {
          start: 0,
          dir: 'v',
          loop: false,
          duration: 250
        }
      }
    },
    computed: {
      ...mapState({
        isLogin: state => !!state.token
      })
    },
    created () {
      let topicId = this.$route.params.id
      if (!topicId) {
        this.$router.replace('/')
        return
      }
      this.topicId = topicId
      this.fetchData()
    },
    methods: {
      fetchData () {
        // 获取模板数据
        const self = this
        activityApi.getTopicData({id: self.topicId, platform: 'm'}).then(res => {
          if (res.code === 0) {
            let data = res.data
            let topicData = data.topicData
            if (typeof topicData === 'string') {
              if (topicData.length === 0) return
              topicData = JSON.parse(topicData)
              self.share = topicData.share // 分享信息
              self.isFullpage = topicData.isFullpage // 是否是全屏切换
              // 回填数据
              if (topicData.floor.length > 0) {
                topicData.floor.forEach(floor => {
                  floor.layer.forEach(lay => {
                    if (lay.type === 'html') {
                      lay.content = self.htmlDecode(lay.content)
                    }
                    if (lay.type === 'component') {
                      lay.componentData = []
                    }
                    if (lay.type === 'field') {
                      lay.content = ''
                    }
                    if (lay.linkType === 'rule') {
                      lay.ruleContent = self.htmlDecode(lay.ruleContent)
                    }
                  })
                  // 楼层显示时间处理
                  if (floor.startTime) {
                    // 设置了开始时间的情况
                    let start = new Date(floor.startTime).getTime()
                    if (start <= data.now) {
                      // 设置了开始时间，并且当前时间大于开始时间
                      if (floor.endTime) {
                        let end = new Date(floor.endTime).getTime()
                        if (end > data.now) {
                          // 同时设置了开始时间和结束时间的情况下，当前时间正好在时间段内，楼层显示
                          floor.show = true
                        } else {
                          // 同时设置了开始时间和结束时间，当前时间已超过了结束时间，楼层隐藏
                          floor.show = false
                        }
                      } else {
                        // 设置了开始时间而没有设置结束时间，并且当前时间大于开始时间，楼层显示
                        floor.show = true
                      }
                    } else {
                      // 设置了开始时间，但当前时间还没有到开始时间，楼层隐藏
                      floor.show = false
                    }
                  } else {
                    // 没有设置开始时间的情况，需要检测是否设置了结束时间
                    if (floor.endTime) {
                      let end = new Date(floor.endTime).getTime()
                      if (end > data.now) {
                        // 只设置了结束时间，并且当前时间还未达到结束时间，楼层显示
                        floor.show = true
                      } else {
                        // 只设置了结束时间，当前时间已超过了结束时间，楼层隐藏
                        floor.show = false
                      }
                    }
                  }
                })
                self.floors = topicData.floor
                self.loading = false
                self.randerField()
                self.renderComponentData()
                self.getWinnerList()
                if (!self.isFullpage) {
                  // 非全屏切换，初始化普通动画
                  self.$nextTick(function () {
                    self._initAppearEvent()
                  })
                }
              }
            }
            if (data.customCode.length !== 0) {
              self.customCode = data.customCode // 自定义代码
              /* eslint-disable no-eval */
              eval(self.customCode)
            }
          } else {
            Toast(res.userMsg)
          }
        }, () => {
          Toast('模板数据加载失败...')
        })
      },
      htmlEncode (str) {
        let s = ''
        if (str.length === 0) return ''
        s = str.replace(/</g, '&lt;')
        s = s.replace(/>/g, '&gt;')
        s = s.replace(/ /g, '&nbsp;')
        s = s.replace(/'/g, '&#39;')
        s = s.replace(/"/g, '&quot;')
        s = s.replace(/(&lt;)br(&gt;)/gi, function () {
          if (arguments.length > 1) {
            return '<br>'
          }
        })
        return s
      },
      htmlDecode (str) {
        let s = ''
        if (str.length === 0) return ''
        s = str.replace(/&amp;/g, '&')
        s = s.replace(/&lt;/g, '<')
        s = s.replace(/&gt;/g, '>')
        s = s.replace(/&nbsp;/g, ' ')
        s = s.replace(/&#39;/g, '\'')
        s = s.replace(/&quot;/g, '"')
        return s
      },
      handleLinkClick (linkType, link, ruleContent) {
        // 处理图层事件点击
        const self = this
        if (linkType === 'link' || linkType === 'fun') return
        switch (linkType) {
          case 'anchor':
            // 锚点，跳转楼层，Vue-router无法使用锚点跳转，使用js飘过去
            self.goAnchor(link)
            break
          case 'img':
            // 弹出图片
            self.imgUrl = link
            self.isQRCode = false
            self.showImg = true
            break
          case 'rule':
            // 规则
            MessageBox('', '<div style="font-size: 14px;color: #333;line-height: 1.5;text-align: left;">' + ruleContent + '</div>')
            break
          case 'tabs':
            // 选项卡切换
            self.tabs(link)
            break
          // case 'qrcode':
          //   // 二维码
          //   self.showQRCode(link)
          //   break
          case 'coupon':
            // 优惠码
            self.getCoupon(link)
            break
        }
      },
      goAnchor (link) {
        // 跳转到楼层
        let targetEl = document.getElementById(link)
        let targetTop = targetEl.offsetTop
        document.documentElement.scrollTop = document.body.scrollTop = targetTop
      },
      getCoupon (link) {
        // 领取优惠码
        const self = this
        if (!self.isLogin) {
          MessageBox({
            title: '提示',
            message: '请先登录才可以领取优惠码哦~',
            confirmButtonText: '去登录',
            cancelButtonText: '算了',
            showCancelButton: true
          }).then((action) => {
            if (action === 'confirm') {
              // 跳转登录，带redirect参数
              self.$router.push(`/login?redirect=${self.$route.fullPath}`)
            }
          })
          return
        }
        Indicator.open()
        activityApi.getCoupon({id: self.topicId, batch: link}).then(res => {
          Indicator.close()
          if (res.code === 0) {
            MessageBox({
              title: '',
              message: '领取成功！优惠码已经发送到您个账户啦~',
              confirmButtonText: '查看优惠码',
              cancelButtonText: '知道了',
              showCancelButton: true
            }).then(action => {
              if (action === 'confirm') {
                window.location.href = 'https://m.9ji.com/user/redpaper.aspx'
              }
            })
          } else {
            Toast(res.userMsg)
          }
        }, () => {
          Indicator.close()
          Toast('获取优惠码失败...')
        })
      },
      tabs (link) {
        // 切换选项卡
        const self = this
        let tabIds = link.split('-')
        if (tabIds.length !== 2) return
        let [groupId, floorId] = tabIds
        let floors = self.floors
        floors.forEach(floor => {
          if (floor.group === parseInt(groupId)) {
            if (floor.id === parseInt(floorId)) {
              floor.show = true
            } else {
              floor.show = false
            }
          }
        })
      },
      renderComponentData (type) {
        // 渲染组件
        const self = this
        let temp = {
          product: [],
          rush: [],
          team: [],
          integral: [],
          group: [],
          bullet: [],
          circlr: [],
          fruitMachine: []
        }
        let floors = self.floors
        floors.forEach(floor => {
          floor.layer.forEach(lay => {
            if (lay.type === 'component') {
              // 组件图层
              let ids = lay.content.split(',')
              lay.component === 'product' && (temp.product = temp.product.concat(ids))
              lay.component === 'rush' && (temp.rush = temp.rush.concat(ids))
              lay.component === 'team' && (temp.team = temp.team.concat(ids))
              lay.component === 'integral' && (temp.integral = temp.integral.concat(ids))
              lay.component === 'group' && (temp.group = temp.group.concat(ids))
              lay.component === 'bullet' && (temp.bullet = temp.bullet.concat(ids))
              lay.component === 'circlr' && (temp.circlr = temp.circlr.concat(ids))
              lay.component === 'fruitMachine' && (temp.fruitMachine = temp.fruitMachine.concat(ids))
            }
          })
        })
        // 请求参数
        let params = {
          topicId: self.topicId,
          ppids: temp.product.join(','),
          qids: temp.rush.join(','),
          teamIds: temp.team.join(','),
          integralIds: temp.integral.join(','),
          groupIds: temp.group.join(','),
          nids: temp.bullet.join(','),
          circlr: temp.circlr.join(','),
          batch: temp.fruitMachine.join(',')
        }
        // 获取组件数据
        activityApi.getComponentData(params).then(res => {
          if (res.code === 0) {
            let data = res.data
            self.now = data.now // 当前服务器时间，倒计时组件需要
            floors.forEach(floor => { // 依次处理每一个楼层的每一个图层，回填数据
              floor.layer.forEach(lay => {
                if (lay.type === 'component') {
                  if (lay.component === 'timePlay') {
                    // 倒计时
                    lay.componentDataStr = (new Date(lay.content).getTime() / 1000) - self.now / 1000
                  } else {
                    // 其他组件
                    lay.componentData = []
                    // 普通商品
                    if (lay.component === 'product') {
                      let ppids = lay.content.split(',')
                      ppids.forEach(ppid => {
                        data.product.forEach(item => {
                          if (ppid === item.ppid + '') {
                            // 多个层的处理
                            lay.componentData.push(item)
                          }
                        })
                      })
                    }
                    // 抢购商品
                    if (lay.component === 'rush') {
                      let ids = lay.content.split(',')
                      ids.forEach(id => {
                        data.rush.forEach(item => {
                          if (id === item.id + '') {
                            // 多个层的处理
                            lay.componentData.push(item)
                          }
                        })
                      })
                    }
                    // 积分购
                    if (lay.component === 'integral') {
                      let ids = lay.content.split(',')
                      ids.forEach(id => {
                        data.integral.forEach(item => {
                          if (id === item.id + '') {
                            // 多个层的处理
                            lay.componentData.push(item)
                          }
                        })
                      })
                    }
                    // 团购
                    if (lay.component === 'team') {
                      let ids = lay.content.split(',')
                      ids.forEach(id => {
                        data.team.forEach(item => {
                          if (id === item.ppid + '') {
                            // 多个层的处理
                            lay.componentData.push(item)
                          }
                        })
                      })
                    }
                    // 组合购
                    if (lay.component === 'group') {
                      let ids = lay.content.split(',')
                      ids.forEach(id => {
                        data.group.forEach(item => {
                          if (id === item.id + '') {
                            // 多个层的处理
                            lay.componentData.push(item)
                          }
                        })
                      })
                    }
                    // 弹幕
                    if (lay.component === 'bullet') {
                      let ids = lay.content.split(',')
                      ids.forEach(id => {
                        data.bullet.forEach(item => {
                          if (id === item.nid + '') {
                            lay.componentData = item.list
                          }
                        })
                      })
                    }
                    // 3D图
                    if (lay.component === 'circlr') {
                      let ids = lay.content.split(',')
                      ids.forEach(id => {
                        data.circlr.forEach(item => {
                          if (id === item.ppid + '') {
                            lay.componentData = item.images
                          }
                        })
                      })
                    }
                    // 水果机 所有奖品
                    if (lay.component === 'fruitMachine') {
                      let ids = lay.content.split(',')
                      ids.forEach(id => {
                        data.prize.forEach(item => {
                          if (id === item.batch + '') {
                            lay.componentData = item.list
                          }
                        })
                      })
                    }
                    // end
                  }
                }
              })
            })
          } else {
            Toast(res.userMsg)
          }
        }, err => {
          Toast('获取组件数据失败，请稍后再试...' + err)
        })
      },
      getWinnerList () {
        // 获取中奖用户名单
        const self = this
        let temp = {
          winnerList: []
        }
        let floors = self.floors
        floors.forEach(floor => {
          floor.layer.forEach(lay => {
            if (lay.type === 'component') {
              // 组件图层
              let ids = lay.content.split(',')
              lay.component === 'winnerList' && (temp.winnerList = temp.winnerList.concat(ids))
            }
          })
        })
        if (temp.winnerList.length === 0) return
        // 请求参数
        let params = {
          batch: temp.winnerList.join(',')
        }
        // 获取组件数据
        activityApi.getWinnerList(params).then(res => {
          if (res.code === 0) {
            let data = res.data
            floors.forEach(floor => { // 依次处理每一个楼层的每一个图层，回填数据
              floor.layer.forEach(lay => {
                if (lay.type === 'component') {
                  lay.componentData = []
                    // 普通商品
                  if (lay.component === 'winnerList') {
                    let ids = lay.content.split(',')
                    ids.forEach(id => {
                      data.forEach(item => {
                        if (id === item.batch + '') {
                          lay.componentData = item.list
                        }
                      })
                    })
                  }
                }
              })
            })
          } else {
            Toast(res.userMsg)
          }
        }, err => {
          Toast('获取获奖名单失败，请稍后再试...' + err)
        })
      },
      randerField () {
        // 渲染变量
        const self = this
        let fields = [] // 所有变量
        let temp = [] // 暂存变量图层的楼层id，图层id，变量值
        let floors = self.floors
        floors.forEach(floor => {
          floor.layer.forEach(layer => {
            if (layer.type === 'field') {
              // 找到变量图层
              let field = layer.field.trim()
              if (field.length > 0) {
                temp.push({floorId: floor.id, layerId: layer.id, field: field, content: ''})
                fields.push(field)
              }
            }
          })
        })
        if (fields.length === 0) return
        activityApi.getField(fields.join(',')).then(res => {
          if (res.code === 0) {
            let data = res.data
            // 回填数据
            temp.forEach(t => {
              for (let key in data) {
                if (t.field === key) {
                  t.content = data[key]
                }
              }
            })
            floors.forEach(floor => {
              floor.layer.forEach(layer => {
                temp.forEach(t => {
                  if (t.floorId === floor.id && t.layerId === layer.id) {
                    layer.content = t.content
                  }
                })
              })
            })
          } else {
            Toast(res.userMsg)
          }
        }, err => {
          Toast('获取模板数据失败，请稍后再试...' + err)
        })
      },
      endLottery (callbackObj) {
        // 公用抽奖结束处理方法
        if (callbackObj.btns && callbackObj.btns.length > 0) {
          // 后端返回数据定义了弹窗按钮
          if (callbackObj.btns.length > 1) {
            // 自定义了两个按钮
            MessageBox({
              title: '',
              message: callbackObj.msg,
              showCancelButton: true,
              confirmButtonText: callbackObj.btns[0].text,
              cancelButtonText: callbackObj.btns[1].text
            }).then(action => {
              if (action === 'confirm' && callbackObj.btns[0].path) {
                window.location.href = callbackObj.btns[0].path
              }
              if (action === 'cancel' && callbackObj.btns[1].path) {
                window.location.href = callbackObj.btns[1].path
              }
            })
          } else {
            // 自定义了一个按钮
            MessageBox({
              title: '',
              message: callbackObj.msg,
              showCancelButton: true,
              confirmButtonText: callbackObj.btns[0].text
            }).then(action => {
              if (callbackObj.btns[0].path) {
                window.location.href = callbackObj.btns[0].path
              }
            })
          }
        } else {
          // 使用默认按钮
          MessageBox({
            title: '',
            message: callbackObj.msg,
            confirmButtonText: '好的'
          })
        }
      },
      doLottery (callbackData) {
        // 公用抽奖开始处理方法
        const self = this
        if (!self.isLogin) {
          MessageBox({
            title: '提示',
            message: '请先登录才可以参加抽奖哦~',
            confirmButtonText: '去登录',
            cancelButtonText: '算了',
            showCancelButton: true
          }).then((action) => {
            if (action === 'confirm') {
              // 跳转登录，带redirect参数
              self.$router.push(`/login?redirect=${self.$route.fullPath}`)
            }
          })
          return
        }
        let params = {
          id: self.topicId,
          batch: callbackData.batch
        }
        Indicator.open()
        activityApi.doLottery(params).then(res => {
          Indicator.close()
          if (res.code === 0) {
            let data = res.data
            switch (callbackData.type) {
              case 'fruitMachine':
                self.$refs['fruitMachine' + callbackData.layerId][0].run(data.random, data)
                break
              case 'turntable':
                self.$refs['turntable' + callbackData.layerId][0].run(data.random, data)
                break
              case 'lantern':
                self.$refs['lantern' + callbackData.layerId][0].run(data.random, data)
                break
            }
            self.getWinnerList()
          } else {
            Toast(res.userMsg)
          }
        }, () => {
          Indicator.close()
          Toast('出错啦，请稍后再试...')
        })
      },
      handleAppear (floorId) {
        // 楼层出现
        const self = this
        let floors = self.floors
        for (let i = 0; i < floors.length; i++) {
          if (floors[i].id === floorId) {
            self.$set(floors[i], 'appearAni', true)
            break
          }
        }
      },
      handleDisappear (floorId) {
        // 楼层消失
        const self = this
        let floors = self.floors
        for (let i = 0; i < floors.length; i++) {
          if (floors[i].id === floorId) {
            self.$set(floors[i], 'appearAni', false)
            break
          }
        }
      },
      changeTab (link) {
        // 选项卡组件切换选项卡
        this.tabs(link)
      },
      // 初始化非全屏时，appear，disappear监听事件
      _initAppearEvent () {
        /* eslint-disable no-undef */
        window.floorappear = appearEvent.appear('appear')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fullpage-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .topic-floor {
    // 浮动楼层
    &.float-floor {
      position: fixed;
      right: 0.133rem;
      bottom: 0.267rem;
      width: 2.133rem;
      overflow: hidden;
      border: 0;
      .floor-wrapper {
        width: 100%;
      }
    }
    .floor-wrapper {
      position: relative;
      height: 100%;
      font-size: 0.373rem;
      &.fullpage {
        position: absolute;
        width: 100%;
        height: 13.33rem;
        top: 50%;
        margin-top: -6.67rem;
      }
      // 图层
      .layer {
        position:absolute;
        .layer-inner {
          height: 100%;
          width: 100%;
          overflow: hidden;
          .layer-image {
            width: 100%;
          }
          .marquee-item {
            font-size: 0.375rem;
            color: #fff;
            text-align: center;
            .prize {
              color: #ff6700;
            }
          }
        }
      }
    }
    .layer-link {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
  .show-img {
    position: fixed;
    display: table;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba( #000, 0.5);
    transition: opacity 0.5s;
    z-index: 2017;
    &.fade-enter, &.fade-leave-active {
      opacity: 0
    }
    .img-wrapper {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      max-height: 100%;
      overflow: hidden;
      img {
        max-width: 100%;
      }
    }
  }
  #qrcode {
    height: 290px;
    width: 290px;
    margin: 0 auto;
    border: 5px solid #fff;
    background-position: center;
  }
</style>
