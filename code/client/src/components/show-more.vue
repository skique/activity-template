<template>
  <!-- 点击显示更多 -->
  <div class="showmore-wrapper" :class="{'is-active': isActive}">
    <div class="showmore-title" v-if="!hideTitle">
      <slot name="title">{{title}}</slot>
      <a href="javascript:;" class="right" @click="toggleShow">{{isActive?'收起':'全部'}}<i class="fa fa-angle-down" aria-hidden="true"></i></a>
    </div>
    <div class="showmore-content" :style="{height: isActive?'auto':height + 'px'}">
      <slot></slot>
    </div>
    <a href="javascript:;" class="btn-showmore-bottom" @click="toggleShow" v-if="hideTitle">{{isActive?'收起':'显示更多'}}</a>
  </div>
</template>
<script>
  export default {
    props: {
      title: String,
      hideTitle: Boolean,
      minHeight: {
        type: String,
        default: '30'
      },
      open: Boolean
    },
    data () {
      return {
        isActive: false,
        height: '30'
      }
    },
    created () {
      this.height = this.minHeight
      this.isActive = this.open
    },
    methods: {
      toggleShow () {
        this.isActive = !this.isActive
      }
    }
  }
</script>
<style lang="scss" scoped>
  .showmore-wrapper {
    .showmore-title {
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      padding: 0 10px;
      .fa {
        margin-left: 5px;
      }
    }
    .btn-showmore-bottom {
      display: block;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .showmore-content {
      overflow: hidden;
    }
  }
</style>
