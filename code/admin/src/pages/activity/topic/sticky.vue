<style scoped>
  .sticky{position:sticky;top: 0;}
  .box-fix{width:100% !important;max-width:100% !important;background-color:transparent !important;background-image:none !important;box-sizing: border-box !important;}
</style>
<template>
  <div :class="{'fixed':fixed&&!supportSticky,'box-fix':renderComplete,'sticky':supportSticky}" ref="box">
    <div v-if="!supportSticky" ref="wrap" class="sticky-style-clone">
      <slot></slot>
    </div>
    <slot v-if="supportSticky"></slot>
  </div>
</template>
<script>
  export default {
    props: {
      active: { // 是否激活
        type: [Boolean],
        default: true
      }
    },
    data () {
      return {
        supportSticky: false,
        renderComplete: false,
        offsetTop: 10000,
        fixed: false
      }
    },
    created () {
      const self = this
      if (window.sticky) {
        self.supportSticky = true
        return
      }
      const prefixTestList = ['', '-webkit-']
      let stickyText = ''
      for (let i = 0; i < prefixTestList.length; i++) {
        stickyText += 'position:' + prefixTestList[i] + 'sticky;'
      }
      let div = document.createElement('div')
      div.style.cssText = stickyText
      document.body.appendChild(div)
      self.supportSticky = window.sticky = /sticky/i.test(window.getComputedStyle(div).position)
      document.body.removeChild(div)
      div = null
    },
    mounted () {
      const self = this
      self.$nextTick(() => {
        if (!self.supportSticky) {
          const className = self.$refs.box.className
          const style = self.$refs.box.style.cssText
          const classNameArr = className.split(' ')
          let cssText = ''
          for (let i = 0; i < document.styleSheets.length; i++) {
            for (let j = 0; j < document.styleSheets[i].cssRules.length; j++) {
              let rule = document.styleSheets[i].cssRules[j]
              classNameArr.forEach(c => {
                if (rule.selectorText && (rule.selectorText.split('[')[0] === '.' + c || rule.selectorText.split(']')[1] === '.' + c)) {
                  cssText += rule.cssText.split('{')[1].replace('}', '')
                }
              })
            }
          }
          cssText += style
          self.$refs.wrap.style.cssText = cssText

          self.renderComplete = true
          self.offsetTop = self.$refs.box.offsetTop
          window.addEventListener('scroll', self.scrollHandler)
        }
      })
    },
    methods: {
      scrollHandler () {
        const self = this
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if (self.offsetTop <= scrollTop) {
          self.fixed = true
        } else {
          self.fixed = false
        }
      }
    }
  }
</script>
