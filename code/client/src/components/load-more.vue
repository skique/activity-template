<template>
  <div class="flex flex-center" :style="{height:height+'px'}">
    <spinner type="snake" color="#ff6700" :size="14"></spinner>
    <span class="margin-left">{{text}}</span>
  </div>
</template>
<script>
  import { Spinner } from 'mint-ui'
  export default {
    components: {Spinner},
    props: {
      distance: {
        type: [Number],
        default: 50
      },
      text: {
        type: [String],
        default: '正在加载...'
      },
      height: {
        type: [Number],
        default: 50
      }
    },
    data () {
      return {
        scrollTop: 0,
        scrollDirection: '',
        firstTrigger: false // 载入时的触发
      }
    },
    created () {
      window.addEventListener('scroll', this.scrollEvent)
    },
    mounted () {
      const self = this
      self.$watch('scrollTop', function () {
        if (self.firstTrigger) {
          return
        }
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        const documentHeight = document.body.clientHeight || document.documentElement.clientHeight
        const windowHeight = window.innerHeight
        if (documentHeight - scrollTop - windowHeight <= self.distance) {
          self.firstTrigger = true
          self.$emit('load')
        }
      })
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.scrollEvent)
    },
    activated () {
      window.addEventListener('scroll', this.scrollEvent)
    },
    deactivated () {
      window.removeEventListener('scroll', this.scrollEvent)
    },
    methods: {
      scrollEvent () {
        const self = this
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        const documentHeight = document.body.clientHeight || document.documentElement.clientHeight
        const windowHeight = window.innerHeight
        if (scrollTop > self.scrollTop) { // 向下滚
          self.scrollDirection = 'down'
          // load more
          if (documentHeight - scrollTop - windowHeight <= self.distance) {
            self.$emit('load')
          }
        } else {
          self.scrollDirection = 'up'
        }
        self.scrollTop = scrollTop
      }
    }
  }
</script>
