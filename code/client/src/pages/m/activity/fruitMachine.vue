<template>
  <!-- 后台设置奖品时，需要将没有图片的（如：谢谢参与）设置在最后 -->
  <div class="fruitMachine">
    <div class="machine-box" :style="{height: 'calc(100% - ' + (btnHeight + btnMarginTop) + 'px )'}">
      <div class="machine-item">
        <div class="machine-item-viewer" :style="{height: viewerWidth + 'px'}" ref="machineItem">
          <div class="machine-container" :style="{transform: 'translateY(-'+ translateY[0] +'px)'}">
            <div class="prize" :style="{height: viewerWidth + 'px'}" v-for="(prize, index) in prizeList" :key="index">
              <img :src="prize.imagePath">
            </div>
          </div>
        </div>
      </div>
      <div class="machine-item">
        <div class="machine-item-viewer" :style="{height: viewerWidth + 'px'}">
          <div class="machine-container" :style="{transform: 'translateY(-'+ translateY[1] +'px)'}">
            <div class="prize" :style="{height: viewerWidth + 'px'}" v-for="(prize, index) in prizeList" :key="index">
              <img :src="prize.imagePath">
            </div>
          </div>
        </div>
      </div>
      <div class="machine-item">
        <div class="machine-item-viewer" :style="{height: viewerWidth + 'px'}">
          <div class="machine-container" :style="{transform: 'translateY(-'+ translateY[2] +'px)'}">
            <div class="prize" :style="{height: viewerWidth + 'px'}" v-for="(prize, index) in prizeList" :key="index">
              <img :src="prize.imagePath">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box" :style="{marginTop: btnMarginTop + unit}">
      <a href="javascript:;" class="btn-start" @click="start" :style="{width: btnWidth + unit, height: btnHeight + unit}">开始抽奖</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'fruitMachine',
    props: {
      prizeAllList: {
        type: [Array],
        default () {
          return []
        }
      },
      speed: {
        type: [Number],
        default: 50
      },
      step: {
        type: [Number],
        default: 0.1
      },
      time: {
        type: [Number],
        default: 3000
      },
      btnWidth: {
        type: [Number],
        default: 150
      },
      btnHeight: {
        type: [Number],
        default: 40
      },
      btnMarginTop: {
        type: [Number],
        default: 10
      },
      unit: {
        type: [String],
        default: 'px'
      },
      callbackData: {}
    },
    data () {
      return {
        viewerWidth: 0,
        translateY: [],
        prizeList: [],
        isRunning: false
      }
    },
    mounted () {
      let viewerWidth = this.$refs.machineItem.offsetWidth
      this.viewerWidth = parseInt(viewerWidth)
      this.createPrizeList()
    },
    methods: {
      createPrizeList () {
        let self = this
        if (self.prizeAllList.length < 1) return
        let prizeAllList = self.prizeAllList
        let newPrizeAllList = []
        prizeAllList.forEach(item => {
          if (/\.jpg$|\.jpeg$|\.png$|\.gif$/gi.test(item.imagePath)) {
            newPrizeAllList.push(item)
          }
        })
        let prizeList = [...newPrizeAllList, newPrizeAllList[0]]
        self.prizeList = prizeList
        let translateYStart = [0, self.viewerWidth, self.viewerWidth * 2]
        if (prizeAllList.length === 1) {
          // 只有一个奖品时
          translateYStart = [0, 0, 0]
        }
        this.translateY = translateYStart
      },
      start () {
        this.$emit('start', this.callbackData)
      },
      run (random, callbackData) {
        let self = this
        if (self.isRunning) return
        self.createPrizeList()
        self.isRunning = true
        let timeNow = 0
        let speedNow = 0
        let stopPosition = []
        // let translateY = self.translateY
        if (random === self.prizeList.length) {
          // 没有中奖，三个元素应不同
          let randomNumArr = self.getRandomStop(self.translateY.length)
          randomNumArr.forEach(num => {
            stopPosition.push(num * self.viewerWidth)
          })
        } else {
          // 停止在指定位置
          for (let k = 0; k < self.translateY.length; k++) {
            let num = random - 1 < 0 ? 0 : random - 1
            stopPosition.push(num * self.viewerWidth)
          }
        }
        let stopNum = []
        let timer = setInterval(() => {
          if (timeNow >= self.time) {
            // 寻找停止点
            for (let j = 0; j < self.translateY.length; j++) {
              if (Math.abs(self.translateY[j]) > stopPosition[j] || Math.abs(self.translateY[j]) + self.viewerWidth < stopPosition[j]) {
                // 转过了or还没到，接着转
                if (self.translateY[j] >= (self.prizeList.length - 1) * self.viewerWidth) {
                  self.$set(self.translateY, j, 0)
                } else {
                  self.$set(self.translateY, j, Math.abs(self.translateY[j]) + speedNow)
                }
              } else {
                // 到了，或者加上speedNow就超过了，那就停下来
                let stopSpeed = 1
                if (Math.abs(self.translateY[j]) + stopSpeed < stopPosition[j]) {
                  // 减速
                  self.$set(self.translateY, j, Math.abs(self.translateY[j]) + stopSpeed)
                } else {
                  self.$set(self.translateY, j, stopPosition[j])
                  if (stopNum.indexOf(j) === -1) {
                    stopNum.push(j)
                  }
                }
              }
            }
            if (stopNum.length === self.translateY.length) {
              // 都停了
              clearInterval(timer)
              self.isRunning = false
              self.$emit('end', callbackData)
            }
          } else {
            // 逐渐加速至设定速度，就转呗
            if (speedNow < self.speed) {
              speedNow += self.step
            }
            for (let i = 0; i < self.translateY.length; i++) {
              if (self.translateY[i] >= (self.prizeList.length - 1) * self.viewerWidth) {
                self.$set(self.translateY, i, 0)
              } else {
                self.$set(self.translateY, i, Math.abs(self.translateY[i]) + speedNow)
              }
            }
          }
          timeNow += 10
        }, 10)
      },
      getRandomStop (total) {
        let self = this
        let max = self.prizeList.length
        let randomNum = [6, 6]
        while (randomNum.length < total) {
          let num = parseInt(Math.random() * max)
          let existCount = 0
          for (let j = 0; j < randomNum.length; j++) {
            if (randomNum[j] === num) {
              existCount++
            }
          }
          if (existCount < total - 1) {
            randomNum.push(num)
          }
        }
        return randomNum
      }
    },
    watch: {
      prizeAllList: 'createPrizeList'
    }
  }
</script>
<style lang="scss" scoped>
  .fruitMachine {
    width: 100%;
    height: 100%;
    .machine-box {
      height: calc(100% - 50px);
    }
    .machine-item {
      position: relative;
      float: left;
      overflow: hidden;
      width: 30%;
      height: 100%;
      & + .machine-item {
        margin-left: 5%;
      }
      .machine-item-viewer {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        overflow: hidden;
        .prize {
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .btn-box {
      margin-top: 10px;
      text-align: center;
      .btn-start {
        display: inline-block;
        height: 40px;
        width: 150px;
        line-height: 40px;
      }
    }
    .btn-start{
      text-indent: -999999px;
    }
  }
</style>
