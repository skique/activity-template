<style scoped>
  .header{position:relative;}
  .header.fixed{position: fixed;left:0;top:0;width:100%;z-index:9}
  .main{height:44px;background-repeat: no-repeat;background-position: center;background-size:cover}
  .main.bb:after {content: ""; position: absolute; -webkit-transform: scaleY(.5); transform: scaleY(.5); -webkit-transform-origin: 0 0; transform-origin: 0 0; bottom: 0; left: 0; right: 0; border-bottom: 1px solid #ccc; }
  .left-side{height:44px;}
  .back-button{height:44px;min-width:44px;box-sizing: border-box;}
  .back-text{margin-left:5px;}
  .title{position: absolute;top:0;bottom:0;}
  .right-side{height:44px;}
  .menu-btn{width:44px;height:44px;}
  .menu-box{height:60px;background:#000;transition: all 0.3s ease-in-out;overflow:hidden;}
  .menu-box a i{font-size:24px;color:#9c9c9c;}
  .menu-box a{width:25%;font-size:12px;color:#9c9c9c}
</style>
<template>
  <div>
    <div :style="{height:showAppBanner&&showAppGuide?'94px':'44px',transition:'height .2s ease'}" v-if="fixed&&(!inJiujiApp||!hideInApp)"></div>
    <header class="header" :class="{fixed:fixed}" v-if="!inJiujiApp||!hideInApp">
      <div class="wrapper">
        <open-app :url="appUrl" v-if="showAppBanner" @change="appGuideChange"></open-app>
        <div class="main flex flex-justify-between relative" :class="{'bb':showBorder}" :style="{backgroundColor:bgColor,backgroundImage:'url('+bgImg+')'}">
          <div class="left-side">
            <a href="javascript:;" class="back-button flex flex-center" :style="{color:textColor,paddingLeft:backText?'10px':0}" v-if="showBack" @click="back">
              <i class="fa fa-angle-left font-30"></i>
              <span class="back-text font-16">{{backText}}</span>
            </a>
            <slot name="left"></slot>
          </div>
          <div class="title flex flex-center" :style="{left:titleMargin+'px',right:titleMargin+'px'}">
            <h1 class="lines-1 font-18 normal" :style="{color:textColor}" v-if="showTitle">{{title||$route.meta.title}}</h1>
            <slot name="title"></slot>
          </div>
          <div class="right-side flex flex-center">
            <slot name="right"></slot>
            <a href="javascript:;" class="menu-btn flex flex-center" :style="{color:textColor}" v-if="showRight" @click="showMenu=!showMenu">
              <i class="fa fa-ellipsis-h font-24 grey-6"></i>
            </a>
          </div>
        </div>
        <div class="menu-box flex" :style="{height:showMenu?'55px':'0'}">
          <router-link to="/" class="flex flex-col flex-center">
            <i class="fa fa-home"></i>
            <span>首页</span>
          </router-link>
          <a href="https://m.9ji.com/goods/category.aspx" class="flex flex-col flex-center">
            <i class="fa fa-reorder"></i>
            <span>分类</span>
          </a>
          <a href="https://m.9ji.com/order/cart.aspx" class="flex flex-col flex-center">
            <i class="fa fa-shopping-cart"></i>
            <span>购物车</span>
          </a>
          <router-link to="/member" class="flex flex-col flex-center">
            <i class="fa fa-user"></i>
            <span>我的</span>
          </router-link>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
  import openApp from '../components/open-app.vue'
  import platform from 'util/platform'
  export default {
    components: {openApp},
    props: {
      showBack: {
        type: [Boolean],
        default: true
      },
      backText: {
        type: [String],
        default: ''
      },
      replaceBackEvent: {// 如果为true，则点击返回不执行返回，而是回调父组件back函数
        type: [Boolean], // 这个貌似没什么卵用，用户可能点的是浏览器的返回，监听不到。。。
        default: false
      },
      title: {
        type: [String],
        default: ''
      },
      showTitle: {
        type: [Boolean],
        default: true
      },
      showRight: {
        type: [Boolean],
        default: true
      },
      titleMargin: {// 如果左右过宽，这里给左右的宽度
        type: [Number],
        default: 44
      },
      fixed: {
        type: [Boolean],
        default: false
      },
      showAppBanner: {
        type: [Boolean],
        default: false
      },
      appUrl: {
        type: [String],
        default: 'jiuji://m.9ji.com/'
      },
      hideInApp: {
        type: [Boolean],
        default: true
      },
      bgColor: {
        type: [String],
        default: 'rgba(250,250,250,.98)'
      },
      textColor: {
        type: [String],
        default: '#333'
      },
      bgImg: {
        type: [String],
        default: ''
      },
      showBorder: {
        type: [Boolean],
        default: true
      }
    },
    data () {
      return {
        showMenu: false,
        showAppGuide: true,
        inJiujiApp: platform.app
      }
    },
    activated () {
      if (this.title) {
        document.title = this.title
      }
    },
    created () {
      if (this.title) {
        document.title = this.title
      }
    },
    watch: {
      'title': function () {
        if (this.title) {
          document.title = this.title
        }
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      appGuideChange (status) {
        this.showAppGuide = !!status
      }
    }
  }
</script>
