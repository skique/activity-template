<template>
  <a :href="to" v-if="!inRouter"><slot></slot></a>
  <router-link :to="link" :replace="replace" v-else><slot></slot></router-link>
</template>
<script>
  import routes from '../router/routes'
  export default {
    props: {
      to: {
        type: [String],
        default: ''
      },
      replace: {
        type: [Boolean],
        default: false
      }
    },
    data () {
      return {
        inRouter: false,
        link: ''
      }
    },
    created () {
      const self = this
      const sameHost = self.to.indexOf(window.location.host) !== -1 || window.location.host.indexOf('localhost') !== -1
      if (self.to.indexOf('http') === -1 || !sameHost) { // 链接不包含http或者不同域名，都不处理
        return
      }
      let url = self.to.replace('https://', '').replace('http://', '')
      routes.forEach(item => {
        let routerPath = item.path.replace('/', '')
        if (routerPath.indexOf(url.split('/')[1]) === 0) {
          self.inRouter = true
          self.link = url.substr(url.indexOf('/'))
        }
      })
    }
  }
</script>
