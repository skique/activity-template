<template>
  <div class="product-list product-m">
    <ul>
      <li v-for="(li, index) in layer.componentData" :key="index" :class="['col-'+layer.product.col,layer.product.productStyle]" :data-ppid="li.ppid?li.ppid:li.id">
        <a :href="li.ppid || li.id | urlFilter(layer.component, topicId)" rel="nofollow">
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
  // import {dateFormat} from '~/filters'
  export default {
    props: ['platform', 'layer', 'now', 'topicId'],
    filters: {
      timeFilter (val, now) {
        let timeStr = ''
        if (val) {
          let time = new Date().getTime() + val * 1000
          // timeStr = dateFormat(time, 'yyyy年MM月dd日 hh:mm', 'pretty', new Date(now))
        }
        return timeStr
      },
      urlFilter (val, type, topicId) {
        let url = ''
        switch (type) {
          case 'product':
            url = 'https://m.9ji.com/product/' + val + '.html?from=event-' + topicId
            break
          case 'rush':
            url = 'https://m.9ji.com/rush.aspx?qid=' + val + '&from=event-' + topicId
            break
          case 'team':
            url = 'https://m.9ji.com/team/' + val + '.html?from=event-' + topicId
            break
          case 'integral':
            url = 'https://m.9ji.com/vipclub/' + val + '.html?from=event-' + topicId
            break
        }
        return url
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
            padding: 0 0.267rem;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
          }
          .name {
            font-size: 0.373rem;
            height: 1.067rem;
            padding: 0 0.267rem;
            overflow: hidden;
            margin-top: 0.133rem;
          }
          .rush-time {
            padding: 0 0.267rem;
            color: #999;
            text-align: left;
            font-size: 0.32rem;
            white-space: nowrap;
            .rush-time-text {
              margin-right: 0.267rem;
            }
          }
          .team-people{
            background-color: #5dc800;
            padding: 0 0.067rem;
            color: #fff;
            font-size: 0.266rem;
            display: inline-block;
            margin-top: 0.01rem;
            margin-left: 0.06rem;
          }
          &.default {
            .team-people{
              margin-left: 0.16rem;
            }
            .btn-price-box {
              padding: 0 0.267rem;
              .price-box, .btn-box {
                text-align: center;
              }
              .price-box {
                height: 0.587rem;
                line-height: 0.587rem;
                white-space: nowrap;
                margin-bottom: 0.133rem;
                b {
                  color: #e12e2e;
                  font-size: 0.373rem;
                }
                del {
                  color: #9c9c9c;
                  margin-left: 0.16rem;
                  font-size: 0.267rem;
                }
              }
              .btn-box {
                padding-bottom: 0.213rem;
                .btn {
                  margin: 0 auto;
                  width: 3.2rem;
                  height: 0.907rem;
                  line-height: 0.907rem;
                  text-align: center;
                  border-radius: 0.133rem;
                  color: #fff;
                  font-size: 0.32rem;
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
              padding: 0 0.213rem 0.213rem 0.267rem;
              .price-box {
                margin-top: 0.15rem;
                b, del {
                  display: block;
                }
                b {
                  font-size: 0.4rem;
                  color: #e12e2e;
                }
                del {
                  color: #9c9c9c;
                  font-size: 0.267rem;
                }
              }
              .btn-box {
                width: 40%;
                .btn {
                  display: block;
                  width: 100%;
                  height: 0.733rem;
                  line-height: 0.733rem;
                  margin-top: 0.133rem;
                  font-size: 0.32rem;
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
            .name {
              line-height: 0.51rem;
            }
            .btn-box {
              .btn {
                &:before {
                  content: '';
                  display: none\9;
                  position: absolute;
                  left: -0.067rem;
                  margin-top: -0.067rem;
                  top: 50%;
                  width: 0.133rem;
                  height: 0.133rem;
                  border-radius: 100%;
                  background: #fff;
                }
              }
            }
          }
          &.style2 {
            .features {
              display: block;
              font-size: 0.373rem;
              font-weight: bold;
              height: 0.427rem;
              line-height: 0.427rem;
              margin: 0.267rem 0 0.133rem 0;
            }
            .btn-box {
              .btn {
                border-radius: 0.107rem;
              }
            }
          }
          &.style3 {
            .features {
              position: relative;
              background: rgba(0, 0, 0, 0.5);
              display: block;
              font-size: 0.373rem;
              height: 0.667rem;
              line-height: 0.667rem;
              color: #fff;
              margin-top: -0.72rem;
            }
            .btn-box {
              .btn {
                border-radius: 0.107rem;
              }
            }
          }
          &.style2, &.style3 {
            .name {
              font-size: 0.32rem;
              font-weight: normal;
              color: #807f80;
              height: 0.767rem;
              line-height: 0.42rem;
              margin-bottom: 0.133rem;
            }
          }
        }
      }      
    }
  }
</style>
