<style scoped>
  .tabs-item-box{transition:transform .2s linear;min-width:10rem}
</style>
<template>
  <div class="overflow-hide"
       @touchstart="tabsTouchStart"
       @touchmove="tabsTouchMove"
       @touchend="tabsTouchEnd">
    <div class="tabs-item-box flex flex-align-start" :style="{width:count*10+'rem',transform:'translateX('+parseFloat(-active*10+moveX/winWidth*10)+'rem)'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      active: {
        type: [Number],
        default: 0
      },
      count: {
        type: [Number],
        default: 1
      }
    },
    data () {
      return {
        winWidth: window.innerWidth > 640 ? 640 : window.innerWidth,
        startX: 0,
        moveX: 0,
        scrolling: false
      }
    },
    created () {
      const self = this
      window.addEventListener('resize', () => {
        self.winWidth = window.innerWidth > 640 ? 640 : window.innerWidth
      })
      let scrollingTimer = null
      window.addEventListener('scroll', () => {
        clearTimeout(scrollingTimer)
        self.scrolling = true
        scrollingTimer = setTimeout(() => {
          self.scrolling = false
        }, 200)
      })
    },
    methods: {
      tabsTouchStart (e) {
        this.startX = e.touches[0].pageX
      },
      tabsTouchMove (e) {
        if (this.count < 2) {
          return
        }
        if (Math.abs(e.touches[0].pageX - this.startX) > 15 && !this.scrolling) {
          this.moveX = e.touches[0].pageX - this.startX
        } else {
          this.moveX = 0
        }
      },
      tabsTouchEnd () {
        const self = this
        let index = self.active
        if (Math.abs(self.moveX) > self.winWidth / 4) {
          if (self.moveX < 0 && self.active < self.count - 1) { // 左滑
            index++
          }
          if (self.moveX > 0 && self.active !== 0) { // 右滑
            index--
          }
          self.moveX = 0 // 以防emit函数出现错误，moveX不归零
          self.$emit('change', index)
        }
        self.moveX = 0
      }
    }
  }
</script>
