<style scoped>
  .app-guide{transition:all .2s ease;overflow:hidden;background:#000000}
  .app-guide-main{height:50px}
  .close{border:solid 1px #9c9c9c;width:18px;height:18px;border-radius:100%;margin:0 10px;line-height:16px;}
  .app-icon{width:40px;height:40px;border-radius:10px}
  .open-btn{display: block;width:90px;height:50px;text-align: center;line-height:50px;background:#ff6700;color:#fff}
</style>
<template>
  <div class="app-guide flex flex-justify-between" :style="{height:shown?'50px':0}">
    <div class="app-guide-main flex flex-align-center">
      <a href="javascript:;" @click="closeAppGuide" class="close font-16 text-center grey-9 block">×</a>
      <img class="app-icon" src="data:image/png;base64,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">
      <div class="margin-left">
        <p class="white">打开九机APP购物</p>
        <p class="grey-9 font-12" style="margin-top:5px">新人领469元红包</p>
      </div>
    </div>
    <!--<a href="javascript:;" class="open-btn" @click="openClient">立即打开</a>-->
    <router-link :to="'/download-app?url='+url" class="open-btn">立即打开</router-link>
  </div>
</template>
<script>
  export default {
    props: {
      url: {
        type: [String],
        default: 'jiuji://m.9ji.com/'
      }
    },
    data () {
      return {
        shown: true
      }
    },
    created () {
      const self = this
      const closed = !!self.$cookie.get('app_guide')
      if (closed) {
        self.shown = false
        return
      }
      window.addEventListener('scroll', (e) => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if (scrollTop <= 0) {
          self.shown = true
        } else {
          self.shown = false
        }
      })
    },
    watch: {
      shown: function () {
        this.$emit('change', this.shown)
      }
    },
    methods: {
      openClient () {
        const self = this
        const ua = navigator.userAgent.toLowerCase()
        const android = /android/.test(ua)
        // const iOS = /iphone/.test(ua) || /ipad/.test(ua)
        // const safari = /.*version\/([\w.]+).*(safari).*/.test(ua)
        const QQBrowser = /mqqbrowser/.test(ua)
        const wechat = /micromessenger/.test(ua)
        // const ucBrowser = /ucbrowser/.test(ua)
        const chrome = /.*(chrome)\/([\w.]+).*/.test(ua)

        const downloadUrl = 'http://www.9ji.com/topic/download.aspx'

        let timeArr = []
        let tDownload = null
        const goDownload = () => { // 打开下载链接
          let t1 = Date.now()
          tDownload = setTimeout(function () {
            let time = setTimeout(function () {
              let t2 = Date.now()
              if (t1 && (t2 - t1) < (1500 + 100)) {
                window.location.href = downloadUrl
              }
            }, 1500)
            timeArr.push(time)
          }, 50)
        }
        const stop = () => {
          clearTimeout(tDownload)
          for (let i = 0; i < timeArr.length; i++) {
            clearTimeout(timeArr[i])
          }
        }
        const openWithLocation = () => { // location打开
          window.location.href = self.url
          goDownload()
        }
        const openWithA = () => { // a标签打开
          const S = document.createElement('a')
          S.setAttribute('href', self.url)
          S.style.display = 'none'
          document.body.appendChild(S)
          let T = document.createEvent('HTMLEvents')
          T.initEvent('click', !1, !1)
          S.dispatchEvent(T)
          goDownload()
        }
        const openWithIframe = () => { // iframe打开
          let ifr = document.createElement('iframe')
          let id = 'download_iphone_chrome_' + Math.random().toFixed(5)
          ifr.id = id
          ifr.src = self.url
          document.body.appendChild(ifr)
          document.getElementById(id).style.display = 'none'
          document.getElementById(id).style.width = '0px'
          document.getElementById(id).style.height = '0px'
          goDownload()
        }

        // todo 测试所有的浏览器，并补全判断逻辑
        if (wechat) { // 微信直接跳应用宝
          window.location.href = downloadUrl
        } else if (android && QQBrowser) {
          openWithA()
        } else if (android && !chrome) {
          openWithIframe()
        } else {
          openWithLocation()
        }

        window.addEventListener('blur', stop)
        window.addEventListener('pagehide', stop)
        window.addEventListener('beforeunload', stop)
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            stop()
          }
        })
        window.addEventListener('error', () => {
          window.location.href = downloadUrl
        })
      },
      closeAppGuide () {
        this.shown = false
        this.$cookie.set('app_guide', 1, {expire: 3})
      }
    }
  }
</script>
