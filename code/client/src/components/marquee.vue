<template>
  <div class="overflow-hide" ref="component">
    <div class="roll" ref="container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      interval: {
        type: Number,
        default: 3000 // ms
      },
      duration: {
        type: Number,
        default: 600 // ms
      },
      direction: {
        validator (val) {
          return val === 'up' || val === 'down'
        },
        default: 'up'
      },
      changed: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        height: '',
        timer: null,
        timer2: null
      }
    },
    mounted () {
      this.initStart()
    },
    methods: {
      fixList () {
        const self = this
        const container = self.$refs.container
        let cloneNode = null
        let firstItem = container.firstElementChild
        if (self.direction === 'up') {
          cloneNode = firstItem.cloneNode(true)
          container.appendChild(cloneNode)
          container.removeChild(firstItem)
        } else {
          let lastItem = container.lastElementChild
          cloneNode = lastItem.cloneNode(true)
          container.insertBefore(cloneNode, firstItem)
          container.removeChild(lastItem)
        }
      },
      start () {
        const self = this
        const container = self.$refs.container
        let currentTransitionTime,
          currentTranslateY
        self.timer = setInterval(() => {
          currentTransitionTime = 'transform ' + self.duration + 'ms ease-in-out'
          this.setTransition(container, currentTransitionTime)
          if (self.direction === 'up') {
            currentTranslateY = -self.height + 'px'
          } else {
            currentTranslateY = self.height + 'px'
          }
          self.setTransform(container, 'translate3d(0,' + currentTranslateY + ',0)')
          self.timer2 = setTimeout(() => {
            self.fixList()
            self.setTransform(container, 'translate3d(0,0,0)')
            self.setTransition(container, 'transform 0ms ease-in-out')
          }, self.duration)
        }, self.interval + self.duration)
      },
      setTransition (ele, val) {
        ele.style.transition = val
        ele.style.WebkitTransition = '-webkit-' + val
        ele.style.MozTransition = '-moz-' + val
        ele.style.OTransition = '-o-' + val
      },
      setTransform (ele, val) {
        ele.style.transform = val
        ele.style.WebkitTransform = val
        ele.style.MozTransform = val
        ele.style.OTransform = val
      },
      initStart () {
        const self = this
        if (self.timer) {
          clearInterval(self.timer)
        }
        if (self.timer2) {
          clearTimeout(self.timer2)
        }
        const container = self.$refs.container
        self.$nextTick(() => {
          const length = container.children.length
          if (length === 0) return
          self.height = container.offsetHeight / length
          const componentH = self.$refs.component.offsetHeight
          if (container.offsetHeight <= componentH) {
            return
          }
          self.start()
        })
      }
    },
    watch: {
      'changed': 'initStart'
    }
  }
</script>
<style scoped>
  .roll{
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto
  }
</style>
