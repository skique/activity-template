<style scoped>
  .box-boundary{background-color:#f5f5f5;}
  /* .item-boundary{background: rgba(255,255,255,.8)} */
  .lantern-item{border-radius:5px;transition:transform .8s ease;overflow:hidden}
  .lantern-item.cur{box-shadow: 0 0 30px rgba(255,0,54,1);}
  .lantern-item.cur:after{content:'';display: block;width:100%;height:100%;box-shadow:inset 0 0 30px rgba(255,0,54,1)}
  .lantern-item.go-right.cur{transform: translateX(10px)}
  .lantern-item.go-down.cur{transform: translateY(10px)}
  .lantern-item.go-left.cur{transform: translateX(-10px)}
  .lantern-item.go-up.cur{transform: translateY(-10px)}
  .lantern-item.get{animation: flash .8s infinite}
  .lantern-item.get.cur{transform:translateX(0) translateY(0)}
  .lantern-bg {background-size:cover;background-repeat:no-repeat;}
  @keyframes flash {
    0%{box-shadow: 0 0 30px rgba(255,0,54,0)}
    50%{box-shadow: 0 0 30px rgba(255,0,54,1)}
    100%{box-shadow: 0 0 30px rgba(255,0,54,0)}
  }
  .start-btn{display: block;width:100%;height:100%;text-indent: -999999px;}
</style>
<template>
  <div ref="box" class="flex flex-wrap flex-justify-around flex-content-around lantern-bg" :style="{backgroundImage:'url('+bg+')'}" :class="{'box-boundary':showBoundary}" style="height:100%;">
    <div class="lantern-item go-right" :style="{width:width*0.3+'px',height:height*0.3+'px'}" :class="{'cur':current%8==1,'get':result==1,'item-boundary':showBoundary}"></div>
    <div class="lantern-item go-right" :style="{width:width*0.3+'px',height:height*0.3+'px'}" :class="{'cur':current%8==2,'get':result==2,'item-boundary':showBoundary}"></div>
    <div class="lantern-item go-down" :style="{width:width*0.3+'px',height:height*0.3+'px'}" :class="{'cur':current%8==3,'get':result==3,'item-boundary':showBoundary}"></div>
    <div class="lantern-item go-up" :style="{width:width*0.3+'px',height:height*0.3+'px'}" :class="{'cur':current%8==0&&current!=0,'get':result==8,'item-boundary':showBoundary}"></div>
    <div class="lantern-item" :style="{width:width*0.3+'px',height:height*0.3+'px'}"><a href="javascript:;" class="start-btn" @click="start">开始</a></div>
    <div class="lantern-item go-down" :style="{width:width*0.3+'px',height:height*0.3+'px'}" :class="{'cur':current%8==4,'get':result==4,'item-boundary':showBoundary}"></div>
    <div class="lantern-item go-up" :style="{width:width*0.3+'px',height:height*0.3+'px'}" :class="{'cur':current%8==7,'get':result==7,'item-boundary':showBoundary}"></div>
    <div class="lantern-item go-left" :style="{width:width*0.3+'px',height:height*0.3+'px'}" :class="{'cur':current%8==6,'get':result==6,'item-boundary':showBoundary}"></div>
    <div class="lantern-item go-left" :style="{width:width*0.3+'px',height:height*0.3+'px'}" :class="{'cur':current%8==5,'get':result==5,'item-boundary':showBoundary}"></div>
  </div>
</template>
<script>
  /* 走马灯抽奖 */
  export default {
    props: {
      bg: {
        type: [String],
        default: 'http://img2.ch999img.com/pic/topic/2016111411070346.png' // 1:1,建议尺寸900*900（适应plus3倍dpr）
      },
      showBoundary: {
        type: [Boolean],
        default: true
      },
      callbackData: {}
    },
    data () {
      return {
        current: 0,
        running: false,
        width: 0,
        height: 0,
        animation: {
          t: 1,
          b: 1, // 初始值
          c: 39, // 变化值
          d: 90
        },
        result: 0
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
      quad (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
      },
      run (random, callbackData, bySelf) {
        const self = this
        if (self.running && !bySelf) {
          return
        }
        if (!bySelf) {
          self.animation.t = 1
          self.result = 0
        }
        self.running = true
        let b = self.animation.b
        let c = 31 + random
        let d = self.animation.d
        let t = self.animation.t
        self.current = Math.floor(self.quad(t, b, c, d))
        if (t < d) {
          self.animation.t++
          setTimeout(() => {
            self.run(random, callbackData, true)
          }, 80)
        } else {
          self.result = random
          setTimeout(() => {
            self.running = false
            self.$emit('end', callbackData)
          }, 2000)
        }
      }
    }
  }
</script>
