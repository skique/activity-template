<template>
  <div class="group-list" :class="platform=='m'?'product-m':'product-pc'">
    <div class="group-item" v-for="(li, index) in layer.componentData" :key="index">
      <div class="group-product">
        <ul :style="{width: 290*li.product.length + 'px'}" :class="platform==='pc'?'clearfix':''">
          <li v-for="pro in li.product" :key="pro.id">
            <a href="javascript:;">
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
          <a href="javascript:;" class="btn" :style="{background:layer.product.btnBgColor}">{{layer.product.btnText?layer.product.btnText:'购买套餐'}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['platform', 'layer', 'now'],
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
        padding: 8px;
        li {
          box-sizing: border-box;
          width: 300px;
          padding: 8px;
          height: 410px;
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
            font-size: 20px;
            font-weight: normal;
            padding: 0 10px;
            height: 68px;
            line-height: 32px;
            overflow: hidden;
            text-align: center;
          }
          .price {
            padding: 0 10px;
            font-size: 20px;
            text-align: center;
          }
        }
      }
      .group-info {
        color: #fff;
        background: rgba(0,0,0,.7);
        font-size: 24px;
        position: relative;
        margin: 0 16px 16px;
        .group-info-content {
          display: flex;
          padding: 20px;
          .group-price {
            flex: 1;
            .name {
              font-weight: normal;
              font-size: 24px;
              height: 36px;
              line-height: 36px;
              overflow: hidden;
            }
            .price {
              font-size: 32px;
            }
          }
          .btn {
            flex: 0 0 200px;
            display: block;
            height: 120px;
            line-height: 120px;
            color: #fff;
            text-decoration: none;
            border-radius: 2px;
            text-align: center;
            background: #e12e2e;
            font-size: 40px;
            overflow: hidden;
          }
        }
      }
     }
     &.product-pc {
      .group-item {
        background: rgba(255,255,255,.4);
        overflow: hidden;
        position: relative;
        margin-bottom: 10px;
      }
      .group-product {
        width: 75%;
        overflow: auto;
      }
      ul {
        padding: 8px;
        li {
          float: left;
          box-sizing: border-box;
          width: 290px;
          padding: 8px;
          height: 370px;
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
          .name {
            font-weight: normal;
            font-size: 12px;
            padding: 0 10px;
            height: 36px;
            overflow: hidden;
            text-align: center;
          }
          .price {
            padding: 0 10px;
            font-size: 12px;
            text-align: center;
          }
        }
      }
      .group-info {
        width: 25%;
        height: 100%;
        position: absolute;
        color: #fff;
        background: rgba(0,0,0,.7);
        top: 0;
        right: 0;
        .group-info-content {
          padding: 20px;
          .group-price {
            .name {
              font-weight: normal;
              font-size: 24px;
              height: 36px;
              line-height: 36px;
              overflow: hidden;
            }
            .desc {
              margin-bottom: 30px;
            }
            .price {
              font-size: 36px;
            }
            .red {
              margin: 30px 0;
            }
          }
          .btn {
            display: block;
            height: 60px;
            line-height: 60px;
            color: #fff;
            text-decoration: none;
            border-radius: 2px;
            text-align: center;
            background: #e12e2e;
            font-size: 24px;
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
  .clearfix:after { content: ""; display: block; height: 0; clear: both; visibility: hidden; }
</style>
