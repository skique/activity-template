<template>
  <div class="group-list product-m">
    <div class="group-item" v-for="(li, index) in layer.componentData" :key="index">
      <div class="group-product">
        <ul :style="{width: 300*li.product.length/75 + 'rem'}">
          <li v-for="pro in li.product" :key="pro.id">
            <a :href="'https://m.9ji.com/product/' + pro.ppid + '.html?from=event-' + topicId">
              <img :src="pro.imagePath" />
              <div class="name">{{pro.name}}</div>
              <div class="price">单卖价：￥{{pro.price}}</div>
            </a>
          </li>
        </ul>
      </div>
      <div class="group-info">
        <div class="group-info-content">
          <div class="group-price">
            <div class="name" style="color:rgb(255,255,255)">{{li.name}}</div>
            <p class="red" :style="{color:layer.product.btnBgColor}">￥<b class="price">{{li.price}}</b></p>
            <p class="desc">{{li.product.length}}件商品，省：{{li.originalprice-li.price}}元</p>
          </div>
          <a :href="'https://m.9ji.com/order/confirm.aspx?type=diygroup&id='+li.id" class="btn" :style="{background:layer.product.btnBgColor}">{{layer.product.btnText?layer.product.btnText:'购买套餐'}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['platform', 'layer', 'now', 'topicId'],
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  .group-list {
    height: 100%;
    width: 100%;
    overflow: hidden;
     &.product-m {
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0.107rem;
        li {
          box-sizing: border-box;
          width: 4rem;
          padding: 0.107rem;
          height: 5.467rem;
          a {
            display: block;
            color: #333;
            text-decoration: none;
            background: #fff;
            height: 100%;
            &:hover {
              color: #333;
            }
          }
          img {
            width: 100%;
          }
          .name, .desc {
            font-size: 0.373rem;
            font-weight: normal;
            padding: 0 0.133rem;
            height: 0.907rem;
            line-height: 0.427rem;
            overflow: hidden;
            text-align: center;
          }
          .price {
            padding: 0 0.133rem;
            font-size: 0.373rem;
            text-align: center;
          }
        }
      }
      .group-info {
        color: #fff;
        background: rgba(0,0,0,.7);
        font-size: 0.32rem;
        position: relative;
        margin: 0 0.213rem 0.213rem;
        .group-info-content {
          display: flex;
          padding: 0.267rem;
          .group-price {
            flex: 1;
            .name, .desc {
              font-weight: normal;
              font-size: 0.32rem;
              height: 0.48rem;
              line-height: 0.48rem;
              overflow: hidden;
            }
            .price {
              font-size: 0.427rem;
            }
          }
          .btn {
            flex: 0 0 2.667rem;
            display: block;
            height: 1.6rem;
            line-height: 1.6rem;
            color: #fff;
            text-decoration: none;
            border-radius: 2px;
            text-align: center;
            background: #e12e2e;
            font-size: 0.533rem;
            overflow: hidden;
          }
        }
      }
     }
     .group-product {
       width: 100%;
       overflow: auto;
     }
  }
</style>
