<style scoped>
  .lazy-img{
    background-position: center;
    background-repeat: no-repeat
  }
  .lazy-img[loaded]{
    filter:blur(15px);
    animation:fadeIn .3s ease 0s 1 alternate forwards
  }
  @keyframes fadeIn {
    0%{filter:blur(15px);}
    100%{filter:blur(0px);}
  }
</style>
<template>
  <img
          class="lazy-img"
          ref="img" :src="path"
          :style="{backgroundImage:loading?'url('+loadingImg+')':''}"
          :loading="loading"
          :loaded="loaded"
          :error="error"
          @load="loadHandle"
          @error="errorHandle"
  >
</template>
<script>
  export default {
    props: {
      src: {
        type: [String],
        default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      },
      loadingImg: {
        type: [String],
        default: '//img2.ch999img.com/m/images/loading.gif'
      },
      distance: {
        type: [Number],
        default: 50
      }
    },
    data () {
      return {
        path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        top: 0,
        rendered: false, // 是否已渲染图片
        loading: false,
        loaded: false,
        error: false
      }
    },
    mounted () {
      const self = this
      self.top = self.$refs.img.offsetTop
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      if (self.top - (scrollTop + windowHeight) <= self.distance) {
        self.render()
      }
      if (!self.rendered) {
        window.addEventListener('scroll', self.scrollHandler)
      }
    },
    methods: {
      scrollHandler () {
        const self = this
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        if (self.top - (scrollTop + windowHeight) <= self.distance) {
          self.render()
          window.removeEventListener('scroll', self.scrollHandler)
        }
      },
      render () {
        const self = this
        self.rendered = true
        self.loading = true
        self.loaded = false
        self.error = false
        /* eslint-disable */
        let img = new Image()
        img.src = self.src
        img.onload = () => {
          self.path = self.src
          img = null
        }
      },
      loadHandle () {
        this.loading = false
        if (this.$platform.ios && this.$platform.osVersion > '9') {
          this.loaded = true
        }
      },
      errorHandle () {
        this.loading = false
        this.error = true
      }
    }
  }
</script>
