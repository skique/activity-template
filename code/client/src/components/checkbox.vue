<style scoped>
  .checkbox{display: inline-block;border:solid 1px #ccc;width:20px;height:20px;border-radius:100%;}
  .checkbox.disabled{border-color:#dfdfdf;}
  .checkbox.checked{background:#e02e2e;border-color:#e02e2e;position:relative;}
  .checkbox.checked:after{content:'';display: block;width:12px;height:6px;border-left:solid 2px #fff;border-bottom:solid 2px #fff;transform: rotate(-45deg);margin:4px auto}
</style>
<template>
  <span class="checkbox" :class="{'checked':checked,'disabled':disabled}" @click="toggle"></span>
</template>
<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: {
        type: [Boolean],
        default: false
      },
      disabled: {
        type: [Boolean],
        default: false
      }
    },
    methods: {
      toggle () {
        if (this.disabled) {
          return
        }
        this.$emit('change', !this.checked)
      }
    }
  }
</script>
