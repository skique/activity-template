<template>
  <div class="circlr-wrapper" ref="circlr">
    <img :src="imagesList[index]" v-for="(image, index) in imagesList" :key="index" v-show="index===showImgNow?true:false">
  </div>
</template>
<script>
  export default {
    name: 'circlr',
    props: {
      imagesList: {
        type: [Array],
        default () {
          return []
        }
      }
    },
    computed: {
      step () {
        let self = this
        let step = 0
        if (self.imagesList.length > 0) {
          let width = self.$refs.circlr.clientWidth
          step = parseInt(width / (self.imagesList.length * 2))
        }
        return step
      }
    },
    mounted () {
      this.bindEvent()
    },
    data () {
      return {
        showImgNow: 0
      }
    },
    methods: {
      bindEvent () {
        let self = this
        let el = self.$refs.circlr
        if (self.isPC()) {
          // PC
          let preX = 0
          let preY = 0
          el.addEventListener('mousemove', event => {
            event.preventDefault()
            event.stopPropagation()
            if (self.imagesList.length < 1) return
            if (preX === 0 && preY === 0) {
              preX = event.clientX
              preY = event.clientY
            } else {
              let moveX = event.clientX - preX
              let moveY = event.clientY - preY
              if ((Math.abs(moveX) > Math.abs(moveY)) && (Math.abs(moveX) >= self.step)) {
                // 左右滑动，并且滑动距离大于单位滑动距离
                if (moveX < 0) {
                  // 从右向左，图片倒序显示
                  if (self.showImgNow === 0) {
                    self.showImgNow = self.imagesList.length - 1
                  } else {
                    self.showImgNow -= 1
                  }
                } else {
                  // 从左向右，图片正序显示
                  if (self.showImgNow === self.imagesList.length - 1) {
                    self.showImgNow = 0
                  } else {
                    self.showImgNow += 1
                  }
                }
                preX = event.clientX
                preY = event.clientY
              }
            }
          })
        } else {
          // 移动
          let preX = 0
          let preY = 0
          // 记录起始touch位置
          el.addEventListener('touchstart', event => {
            preX = event.touches[0].clientX
            preY = event.touches[0].clientY
          })
          el.addEventListener('touchmove', event => {
            if (self.imagesList.length < 1) return
            let moveX = event.touches[0].clientX - preX
            let moveY = event.touches[0].clientY - preY
            if (Math.abs(moveX) > Math.abs(moveY)) {
              // 左右滑动，并且滑动距离大于单位滑动距离
              event.preventDefault()
              event.stopPropagation()
              if (moveX < 0) {
                // 从右向左，图片倒序显示
                if (self.showImgNow === 0) {
                  self.showImgNow = self.imagesList.length - 1
                } else {
                  self.showImgNow -= 1
                }
              } else {
                // 从左向右，图片正序显示
                if (self.showImgNow === self.imagesList.length - 1) {
                  self.showImgNow = 0
                } else {
                  self.showImgNow += 1
                }
              }
              preX = event.touches[0].clientX
              preY = event.touches[0].clientY
            }
          })
        }
      },
      isPC () {
        // 判断是PC还是移动
        let userAgentInfo = navigator.userAgent
        let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        let flag = true
        for (let i = 0; i < Agents.length; i++) {
          if (userAgentInfo.indexOf(Agents[i]) > 0) {
            flag = false
            break
          }
        }
        return flag
      }
    }
  }
</script>
<style lang="scss" scoped>
  .circlr-wrapper {
    text-align: center;
    img {
      height: 100%;
    }
  }
</style>
