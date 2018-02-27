<template>
  <div class="bullet-box" ref="bulletBox">
    <div class="bullet-row" v-for="(row, rowIndex) in rows" :key="rowIndex" ref="bulletRow" :style="{left: boxWidth + 'px',width: row.width + 'px',marginTop: top + 'px', transform: 'translateX('+ row.translateX +'px)'}">
      <div class="bullet-item" v-for="(item, index) in row.list" :key="index" :style="{marginLeft: distance + unit, backgroundColor: backgroundColor}">
        <img :src="item.avatar" v-if="showAvatar" :style="{width: itemHeight + unit, height: itemHeight + unit}"><span :style="{color: color, fontSize: fontSize + unit}">{{item.content}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'bullet',
    props: {
      bulletList: {
        type: [Array],
        default () {
          return []
        }
      },
      line: {
        type: [Number],
        default: 4
      },
      speed: {
        type: [Number],
        default: 1
      },
      top: {
        type: [Number],
        default: 20
      },
      distance: {
        type: [Number],
        default: 60
      },
      showAvatar: {
        type: [Boolean],
        default: true
      },
      color: {
        type: [String]
      },
      backgroundColor: {
        type: [String]
      },
      fontSize: {
        type: [Number],
        default: 14
      },
      unit: {
        type: [String],
        default: 'px'
      },
      itemHeight: {
        type: [Number],
        default: 24
      }
    },
    data () {
      return {
        rows: [],
        timer: null,
        boxWidth: 0
      }
    },
    watch: {
      bulletList: 'initBullet'
    },
    mounted () {
      let boxWidth = this.$refs.bulletBox.offsetWidth
      this.boxWidth = boxWidth
      this.initBullet()
    },
    methods: {
      initBullet () {
        let self = this
        if (self.bulletList.length < 1) return
        let bulletList = self.bulletList
        let rows = []
        for (let i = 0; i < self.line; i++) {
          let temp = {
            width: [],
            translateX: 0,
            list: []
          }
          rows.push(temp)
        }
        for (let index in bulletList) {
          let rowIndex = parseInt(index) % self.line
          rows[rowIndex].list.push(bulletList[index])
        }
        self.rows = rows
        self.$nextTick(() => {
          let elementRows = self.$refs.bulletRow
          for (let j = 0; j < elementRows.length; j++) {
            let items = elementRows[j].querySelectorAll('.bullet-item')
            let contentWidth = 0
            for (let k = 0; k < items.length; k++) {
              contentWidth += items[k].offsetWidth
            }
            contentWidth += self.distance * items.length
            self.rows[j].width = contentWidth
          }
          if (self.timer) {
            clearInterval(self.timer)
          }
          self.timer = setInterval(() => {
            self.rows.forEach(row => {
              if (Math.abs(row.translateX) >= (row.width + self.boxWidth)) {
                row.translateX = 0
              } else {
                row.translateX -= self.speed
              }
            })
          }, 15)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .bullet-box {
    overflow: hidden;
    .bullet-row {
      overflow: hidden;
      margin-top: 20px;
      position: relative;
    }
    .bullet-item {
      display: inline-block;
      // height: 24px;
      // line-height: 24px;
      padding: 2px 8px;
      border-radius: 60px;
      background-color: rgba(255, 255, 255, .2);
      color: #fff;
      margin-left: 60px;
      img {
        min-width: 22px;
        min-height: 22px;
        border-radius: 100%;
        vertical-align: sub;
      }
      span {
        margin-left: 5px;
      }
    }
  }
</style>
