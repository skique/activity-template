<style scoped>
  .slide-tabs-scroller{overflow-x:auto;height:100%;}
  .slide-tabs-mask{top:0;bottom:0;width:25px;pointer-events:none}
  .slide-tabs-mask-left{left:0;background: linear-gradient(to right, rgba(255,255,255,1) , rgba(255,255,255,0))}
  .slide-tabs-mask-right{right:0;background: linear-gradient(to right, rgba(255,255,255,0) , rgba(255,255,255,1))}
</style>
<template>
  <div class="relative">
    <div class="slide-tabs-scroller" ref="tabsScroller" :active="active">
      <slot></slot>
    </div>
    <div class="slide-tabs-mask slide-tabs-mask-left absolute" v-if="mask"></div>
    <div class="slide-tabs-mask slide-tabs-mask-right absolute" v-if="mask"></div>
  </div>
</template>
<script>
  export default {
    props: {
      active: {
        type: [Number],
        default: 0
      },
      itemWidth: {
        type: [Number],
        default: 60
      },
      count: {
        type: [Number],
        default: 1
      },
      mask: {
        type: [Boolean],
        default: true
      }
    },
    data () {
      return {

      }
    },
    watch: {
      active () {
        const self = this
        let from = self.$refs.tabsScroller.scrollLeft
        let to = (self.active - 1) * (self.itemWidth - 10)
        let time = 15
        let v = Math.abs(from - to) / time
        const timer = setInterval(() => {
          if (from > to) {
            from -= v
            self.$refs.tabsScroller.scrollLeft = from
            if (from <= to) {
              clearInterval(timer)
            }
          }
          if (to > from) {
            from += v
            self.$refs.tabsScroller.scrollLeft = from
            if (from >= to) {
              clearInterval(timer)
            }
          }
        }, time)
      }
    }
  }
</script>
