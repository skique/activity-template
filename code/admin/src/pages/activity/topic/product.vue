<template>
  <div class="product-list" :class="platform=='m'?'product-m':'product-pc'">
    <ul>
      <li v-for="(li, index) in layer.componentData" :key="index" :class="['col-'+layer.product.col,layer.product.productStyle]" :data-ppid="li.ppid">
        <a href="javascript:;">
          <img :src="li.imagePath" />
          <div class="features">{{li.sellingPoint}}</div>
          <div class="name">{{li.name}} {{li.description}}</div>
          <!-- 普通商品 -->
          <template v-if="layer.component=='product'">
            <div class="btn-price-box">
              <div class="price-box"><b>￥<span>{{li.price}}</span></b><del>￥{{li.originalprice}}</del></div>
              <div class="btn-box"><span class="btn" :style="{background:layer.product.btnBgColor}">{{layer.product.btnText?layer.product.btnText:'立即购买'}}</span></div>
            </div>
          </template>
          <!-- 抢购商品 -->
          <template v-if="layer.component=='rush'">
            <p class="rush-time">
              <span class="rush-time-text" v-if="li.startTime>0">{{li.startTime | timeFilter(now)}}开始</span>
              <span class="rush-time-text" v-if="li.startTime<0&&li.endTime>0">{{li.endTime | timeFilter(now)}}结束</span>
              <span class="rush-time-text" v-if="li.endTime<0">本场抢购已结束</span>
              <span v-if="li.startTime>0">限{{li.totalCount}}件</span>
              <span v-if="li.startTime<0&&li.endTime>0">剩{{li.surplus}}件</span>
            </p>
            <div class="btn-price-box">
              <div class="price-box"><b>￥<span>{{li.price}}</span></b><del>￥{{li.originalprice}}</del></div>
              <div class="btn-box">
                <span class="btn" v-if="li.endTime>0&&li.surplus>0" :style="{background:layer.product.btnBgColor}">{{li.appoint?"预约抢购":"去抢购"}}</span>
                <span class="btn" v-if="li.endTime>0&&li.surplus==0" style="background:#999">已抢完</span>
                <span class="btn" v-if="li.endTime<=0" style="background:#999">已结束</span>
              </div>
            </div>
          </template>
          <!-- 团购 -->
          <template v-if="layer.component=='team'">
            <div class="btn-price-box">
              <p class="price-box"><b>￥<span>{{li.price}}</span></b><span class="team-people">{{li.people}}人团</span></p>
              <p class="btn-box"><span class="btn" :style="{background:layer.product.btnBgColor}">去开团</span></p>
            </div>
          </template>
          <!-- 积分购 -->
          <template v-if="layer.component=='integral'">
            <div class="btn-price-box">
              <p class="price-box"><b v-if="li.price>0">￥<span>{{li.price}}</span></b><b v-if="li.integral"><template v-if="li.price>0&&li.integral>0">+</template>{{li.integral}}积分</b></p>
              <p class="btn-box"><span class="btn" :style="{background:layer.product.btnBgColor}">立即兑换</span></p>
            </div>
          </template>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  
  import {dateFormat} from '../../../filters.js'
  export default {
    props: ['platform', 'layer', 'now'],
    filters: {
      timeFilter (val, now) {
        let timeStr = ''
        if (val) {
          let time = new Date().getTime() + val * 1000
          timeStr = dateFormat(time, 'yyyy年MM月dd日 hh:mm', 'pretty', new Date(now))
        }
        return timeStr
      }
    },
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  .product-list {
    height: 100%;
    width: 100%;
    overflow: hidden;
    &.product-m {
      // M版商品类组件
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          box-sizing: border-box;
          width: 50%;
          padding: 1.5%;
          &.col-1 {
            width: 100%;
          }
          a {
            display: block;
            color: #333;
            text-decoration: none;
            background: #fff;
            &:hover {
              color: #333;
            }
          }
          img {
            width: 100%;
          }
          .features {
            display: none;
            padding: 0 20px;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
          }
          .name {
            font-size: 28px;
            height: 80px;
            padding: 0 20px;
            overflow: hidden;
            margin-top: 10px;
          }
          .rush-time {
            padding: 0 20px;
            color: #999;
            text-align: left;
            font-size: 20px;
            white-space: nowrap;
            .rush-time-text {
              margin-right: 20px;
            }
          }
          .team-people{
            background-color: #5dc800;
            padding: 2px 5px;
            color: #fff;
            font-size: 24px;
          }
          &.default {
            .team-people{
              margin-left: 12px;
            }
            .btn-price-box {
              padding: 0 20px;
              .price-box, .btn-box {
                text-align: center;
              }
              .price-box {
                height: 44px;
                white-space: nowrap;
                margin-bottom: 10px;
                b {
                  color: #e12e2e;
                  font-size: 28px;
                }
                del {
                  color: #9c9c9c;
                  margin-left: 12px;
                  font-size: 20px;
                }
              }
              .btn-box {
                padding-bottom: 16px;
                .btn {
                  margin: 0 auto;
                  width: 240px;
                  height: 68px;
                  line-height: 68px;
                  text-align: center;
                  border-radius: 10px;
                  color: #fff;
                  font-size: 24px;
                  display: inline-block;
                  background: #e12e2e;
                }
              }
            }
          }
          &.style1, &.style2, &.style3 {
            .btn-price-box {
              display: flex;
              justify-content:space-between;
              padding: 0 16px 16px 20px;
              .price-box {
                b, del {
                  display: block;
                }
                b {
                  font-size: 28px;
                  color: #e12e2e;
                }
                del {
                  color: #9c9c9c;
                  font-size: 20px;
                }
              }
              .btn-box {
                width: 40%;
                .btn {
                  display: block;
                  width: 100%;
                  height: 55px;
                  line-height: 55px;
                  margin-top: 10px;
                  font-size: 24px;
                  background: #e12e2e;
                  cursor: pointer;
                  color: #ffffff;
                  text-align: center;
                  position: relative;
                }
              }
            }
          }
          &.style1 {
            .btn-box {
              .btn {
                &:before {
                  content: '';
                  display: none\9;
                  position: absolute;
                  left: -5px;
                  margin-top: -5px;
                  top: 50%;
                  width: 10px;
                  height: 10px;
                  border-radius: 100%;
                  background: #fff;
                }
              }
            }
          }
          &.style2 {
            .features {
              display: block;
              font-size: 28px;
              font-weight: bold;
              height: 32px;
              line-height: 32px;
              margin: 20px 0 10px 0;
            }
            .btn-box {
              .btn {
                border-radius: 8px;
              }
            }
          }
          &.style3 {
            .features {
              position: relative;
              background: rgba(0, 0, 0, 0.5);
              display: block;
              font-size: 24px;
              height: 50px;
              line-height: 50px;
              color: #fff;
              margin-top: -54px;
            }
            .btn-box {
              .btn {
                border-radius: 8px;
              }
            }
          }
          &.style2, &.style3 {
            .name {
              font-size: 18px;
              font-weight: normal;
              color: #807f80;
              height: 50px;
              margin-bottom: 10px;
            }
          }
        }
      }      
    }
    &.product-pc {
      // PC版普通商品
      ul {
        overflow: hidden;
        li {
          box-sizing: border-box;
          width: 50%;
          padding: 0.5%;
          float: left;
          &.col-1 {
            width: 100%;
          }
          &.col-2 {
            width: 50%;
          }
          &.col-3 {
            width: 33.33%;
          }
          &.col-4 {
            width: 25%;
          }
          &.col-5 {
            width: 20%;
          }
          a {
            display: block;
            color: #333;
            text-decoration: none;
            background: #fff;
            &:hover {
              color: #333;
            }
          }
          img {
            width: 100%;
            height: auto;
          }
          .features {
            display: none;
            padding: 0 10px;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
          }
          .name {
            font-size: 14px;
            height: 40px;
            padding: 0 10px;
            overflow: hidden;
            margin-top: 5px;
          }
          .rush-time {
            padding: 0 10px;
            color: #999;
            text-align: left;
            font-size: 12px;
            white-space: nowrap;
            .rush-time-text {
              margin-right: 10px;
            }
          }
          .team-people{
            background-color: #5dc800;
            padding: 0px 5px;
            color: #fff;
            font-size: 12px;
          }
          &.default {
            .team-people{
              margin-left: 6px;
            }
            .btn-price-box {
              padding: 0 10px;
              .price-box, .btn-box {
                text-align: center;
              }
              .price-box {
                height: 22px;
                white-space: nowrap;
                margin-bottom: 5px;
                b {
                  color: #e12e2e;
                  font-size: 14px;
                }
                del {
                  color: #9c9c9c;
                  margin-left: 6px;
                  font-size: 12px;
                }
              }
              .btn-box {
                padding-bottom: 8px;
                .btn {
                  margin: 0 auto;
                  width: 120px;
                  height: 34px;
                  line-height: 34px;
                  text-align: center;
                  border-radius: 5px;
                  color: #fff;
                  font-size: 12px;
                  display: inline-block;
                  background: #e12e2e;
                }
              }
            }
          }
          &.style1, &.style2, &.style3 {
            .btn-price-box {
              height: 50px;
              padding: 8px 8px 12px 10px;
              .price-box {
                float: left;
                height: 44px;
                b, del {
                  display: block;
                }
                b {
                  font-size: 14px;
                  color: #e12e2e;
                }
                del {
                  color: #9c9c9c;
                  font-size: 12px;
                }
              }
              .btn-box {
                float: right;
                width: 40%;
                .btn {
                  display: block;
                  width: 100%;
                  height: 36px;
                  line-height: 36px;
                  font-size: 12px;
                  background: #e12e2e;
                  cursor: pointer;
                  color: #ffffff;
                  text-align: center;
                  position: relative;
                }
              }
            }
          }
          &.style1 {
            .btn-box {
              .btn {
                &:before {
                  content: '';
                  display: none\9;
                  position: absolute;
                  left: -5px;
                  margin-top: -5px;
                  top: 50%;
                  width: 10px;
                  height: 10px;
                  border-radius: 100%;
                  background: #fff;
                }
              }
            }
          }
          &.style2 {
            .features {
              display: block;
              font-size: 18px;
              font-weight: bold;
              height: 20px;
              line-height: 20px;
              margin: 10px 0 6px 0;
            }
            .name {
              font-size: 12px;
              font-weight: normal;
              color: #807f80;
              height: 15px;
            }
            .rush-time {
              margin-top: 5px;
            }
          }
          &.style3 {
            .features {
              position: relative;
              background: rgba(0, 0, 0, 0.5);
              display: block;
              font-size: 14px;
              height: 35px;
              line-height: 35px;
              color: #fff;
              margin-top: -39px;
              text-align: center;
            }
            .name {
              font-size: 16px;
              font-weight: normal;
              height: 52px;
              line-height: 26px;
              margin-top: 8px;
            }
          }
          &.style2, &.style3 {
            .btn-price-box {
              .price-box {
                b {
                  height: 22px;
                  line-height: 22px;
                  span {
                    font-size: 20px;
                  }
                }
              }
              .btn-box {
                margin-top: 5px;
                .btn {
                  border-radius: 36px;
                }
              }
            }
          }
        }
      }  
    }
  }
</style>
