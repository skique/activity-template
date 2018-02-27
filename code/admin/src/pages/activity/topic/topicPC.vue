<template>
  <div class="page-topicPC">
    <div class="floor">
      <vue-draggable-resizable
              class="layer"
              :w="100"
              :h="100"
              :minw="10"
              :minh="10"
              :x="550"
              :y="10"
              @dragging="onDrag"
              @resizing="onResize"
              :parent="true"
      >
        {{width+'-'+height+'-'+x+'-'+y}}
      </vue-draggable-resizable>
    </div>
  </div>
</template>
<script>
  import VueDraggableResizable from 'components/vue-draggable-resizable'
  export default {
    components: {VueDraggableResizable},
    data () {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }
    },
    methods: {
      onResize: function (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
      },
      onDrag: function (x, y) {
        this.x = x
        this.y = y
      }
    }
  }
</script>
<style lang="scss" scoped>
  .floor{
    width:1200px;
    height:400px;
    margin:0 auto;
    position:relative;
    .layer {
      width:100px;
      height:100px;
      background:#f0f0f0;
      position:absolute;
      .handle{
        border:1px solid #000;
        background:#fff;
        opacity:.9
      }
     }
  }
</style>
<style lang="scss">
  .layer .handle-tl{
    top:-5px;
    left:-5px;
  }
  .layer .handle-tm{
    top:-5px;
  }
  .layer .handle-tr{
    top:-5px;
    right:-5px;
  }
  .layer .handle-mr{
    right:-5px;
  }
  .layer .handle-br{
    bottom:-5px;
    right:-5px;
  }
  .layer .handle-bm{
    bottom:-5px;
  }
  .layer .handle-bl{
    bottom:-5px;
    left:-5px;
  }
  .layer .handle-ml{
    left:-5px;
  }
</style>
