<template>
  <div class="tab-wrapper">
    <div class="tab-inner">
      <a href="javascript:;"
        :style="{height: height + unit, lineHeight: height + unit, width: width + unit, color: index==active?colorActive:color, backgroundColor: index==active?bgcolorActive:bgcolor, backgroundImage: index==active?'url('+item.imagePath2+')':'url('+item.imagePath1+')', marginLeft: interval + unit, fontSize: fontsize + unit}"
        v-for="(item, index) in list"
        :key="index"
        @click="changeTab(index,item.link,'click')"
        @mouseover="changeTab(index,item.link,'over')">
        {{item.text}}
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tab',
    props: {
      platform: {
        type: [String],
        default: 'pc'
      },
      list: {
        type: [Array],
        default () {
          return []
        }
      },
      bgcolor: {
        type: [String],
        default: ''
      },
      bgcolorActive: {
        type: [String],
        default: ''
      },
      color: {
        type: [String],
        default: ''
      },
      colorActive: {
        type: [String],
        default: ''
      },
      width: {
        type: [String],
        default: 'auto'
      },
      height: {
        type: [String],
        default: 'auto'
      },
      interval: {
        type: [String],
        default: ''
      },
      unit: {
        type: [String],
        default: 'px'
      },
      changeWay: {
        type: [String],
        default: 'click'
      },
      fontsize: {
        type: [String],
        default: '12'
      }
    },
    data () {
      return {
        active: 0
      }
    },
    methods: {
      changeTab (index, link, type) {
        // 切换选项卡
        const self = this
        if (type === self.changeWay) {
          self.active = index
          self.$emit('changetab', link)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.tab-wrapper {
  overflow-x: auto;
  .tab-inner {
    white-space: nowrap;
    display: inline-block;
    a {
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
      padding: 0 5px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      &:first-child {
        margin-left: 0 !important;
      }
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
