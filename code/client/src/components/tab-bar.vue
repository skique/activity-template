<style scoped>
  .tab-bar-box{position:fixed;left:0;bottom:0;width:100%;}
  .tab-bar{height:50px;background:rgba(250,250,250,.98);box-shadow: 0 -1px 2px #ccc;}
  .tab-bar-item{width:20%;height:100%;}
  .tab-bar-item.cur{color:#e02e2e}
  .img-text{height:24px;}
  .only-img{height:50px;}
  .text{margin-top:5px;}
  .badge{position:absolute;right:15px;top:2px;padding:0 4px;border-radius:100%;background:#e02e2e;color:#fff;font-size:12px;height:14px;line-height:14px;}
</style>
<template>
  <div>
    <div style="height:50px;" v-if="items"></div>
    <div class="tab-bar-box" v-if="items">
      <div class="tab-bar wrapper flex flex-align-center border-top">
        <template v-for="(item,i) in items">
          <super-link :to="item.link" class="tab-bar-item flex flex-col flex-center relative" :class="{'cur':i==selected}" v-if="i!=2">
            <img :src="i==selected?item.selectImg:item.img" class="img-text" v-if="item.text">
            <img :src="i==selected?item.selectImg:item.img" class="only-img" v-if="!item.text">
            <span class="text font-10 block" v-if="item.text">{{item.text}}</span>
            <span class="badge block" v-if="i === 3">{{cartCount||0}}</span>
          </super-link>
          <router-link to="/local" class="tab-bar-item flex flex-col flex-center relative" :class="{'cur':i==selected}" v-if="i==2">
            <img :src="i==selected?item.selectImg:item.img" class="img-text">
            <span class="text font-10 block">{{city?city.countyName:'定位中...'}}</span>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      selected: {
        type: [Number],
        default: 0
      }
    },
    computed: {
      ...mapState({
        items: state => state.tabBar,
        cartCount: state => state.userInfo ? state.userInfo.cartCount : 0,
        city: state => state.city
      })
    }
  }
</script>
