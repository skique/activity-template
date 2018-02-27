<style scoped>
  .turntable-turn-bg{width:100%;height:100%;background-size:cover;background-repeat:no-repeat;transition:all 8s cubic-bezier(0.165, 0.84, 0.44, 1);}
  .turntable-start-btn{background-size:cover;background-repeat:no-repeat;position:absolute;left:50%;transform: translateX(-50%);}
</style>
<template>
  <div class="relative" ref="box" style="height: 100%;">
    <div class="turntable-turn-bg" :style="{backgroundImage:'url('+turntable+')',transform:'rotate3d(0,0,1,'+rotate+'deg)'}"></div>
    <a href="javascript:;"
       @click="start"
       class="turntable-start-btn"
       :style="{backgroundImage:'url('+button+')',width:width*0.217+'px',height:height*0.267+'px',top:height*0.3417+'px'}"
    ></a>
  </div>
</template>
<script>
  export default {
    props: {
      turntable: {
        type: [String],
        default: 'http://img2.ch999img.com/pic/topic/2016111411070346.png' // 1:1,建议尺寸900*900（适应plus3倍dpr）
      },
      button: {
        type: [String],
        default: 'http://img2.ch999img.com/pic/topic/2016111411070406.png' // 13:16,建议尺寸195*240（适应plus3倍dpr）
      },
      count: {
        type: [Number],
        default: 8
      },
      callbackData: {}
    },
    data () {
      return {
        rotate: 0,
        running: false,
        width: 0,
        height: 0
      }
    },
    mounted () {
      const self = this
      const box = self.$refs.box.getBoundingClientRect()
      self.width = box.width
      self.height = box.height
    },
    methods: {
      start () {
        this.$emit('start', this.callbackData)
      },
      run (random, callbackData) {
        const self = this
        if (self.running) {
          return
        }
        self.running = true
        self.rotate = 360 * Math.floor(self.rotate / 360) + 7200 + 360 / self.count * (random - 1)
        let timer = null
        timer = setTimeout(() => {
          self.$emit('end', callbackData)
          self.running = false
          clearTimeout(timer)
        }, 8000)
      }
    }
  }
</script>
