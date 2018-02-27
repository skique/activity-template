<template>
  <div class="adPosition-wrapper" v-loading="loading">
    <!-- 按详细地区查看投放的广告 -->
    <div class="area-wrapper">
      <div class="tool-box flex flex-justify-between">
        <div class="tool-box-left">
          <span>详细地区查看：</span><el-cascader :options="citiesList" :props="props" v-model="selectCity" change-on-select clearable></el-cascader><el-button class="btn-check-area" @click="fetchAreaListData">查询</el-button>
        </div>
        <div class="tool-box-right">
          <el-button @click="saveFloorOrder" v-show="showSaveOrder">保存排序</el-button>
          <div class="img-wrapper">
            <el-button>查看示意图</el-button>
            <div class="img-box">
              <img :src="imgSrc">
            </div>
          </div>
        </div>
      </div>
      <el-table
        :data="areaList"
        style="width: 100%"
        class="pageManagement-table"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="images[0].imageName"
          label="广告图片1"
          width="230"
          v-if="adType === 3 || adType === 4">
          <template slot-scope="scope">
            <template v-if="areaList[scope.$index].adType !== 1 && areaList[scope.$index].adType !== 2">
              <a class="pic-name ellipsis" :href="scope.row.images[0].imagePath" target="_blank">{{scope.row.images[0].imageName}}</a><a href="javascript:;" class="btn-upload" :class="errId === scope.row.id && errType === 'image1' && isSavingArea? 'err' : ''" @click="triggerArea(scope.row.id, 0, scope.row.adsenseId)">点击上传</a>
            </template>
            <template v-else>-</template>            
          </template>
        </el-table-column>
        <el-table-column
          prop="images[1].imageName"
          label="广告图片2"
          width="230"
          v-if="adType === 4">
          <template slot-scope="scope">
            <a class="pic-name ellipsis" :href="scope.row.images[1].imagePath" target="_blank">{{scope.row.images[1].imageName}}</a><a href="javascript:;" class="btn-upload" :class="errId === scope.row.id && errType === 'image2' && isSavingArea ? 'err' : ''" @click="triggerArea(scope.row.id, 1, scope.row.adsenseId)">点击上传</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="150"
          v-if="adType === 3 || adType === 4">
          <template slot-scope="scope">
            <template v-if="areaList[scope.$index].adType !== 1 && areaList[scope.$index].adType !== 2">
              <input type="text" v-model="areaList[scope.$index].title" placeholder="请输入广告标题" class="table-input" :class="errId === scope.row.id && errType === 'title' && isSavingArea ? 'err' : ''">
            </template>
            <template v-else>-</template>
          </template>
        </el-table-column>
        <el-table-column
          prop="link"
          label="广告链接"
          width="200"
          v-if="adType === 3 || adType === 4">
          <template slot-scope="scope">
            <template v-if="areaList[scope.$index].adType !== 1 && areaList[scope.$index].adType !== 2">
              <input type="text" v-model="areaList[scope.$index].link" placeholder="请输入广告链接" class="table-input" :class="errId === scope.row.id && errType === 'link' && isSavingArea ? 'err' : ''" v-if="areaList[scope.$index].adType !== 1 || areaList[scope.$index].adType !== 2">
            </template>
            <template v-else>-</template>
          </template>
        </el-table-column>
        <el-table-column
          prop="ppid"
          label="ppid/qid"
          v-if="adType === -1">
          <template slot-scope="scope">
            <template v-if="areaList[scope.$index].adType === 1 || areaList[scope.$index].adType === 2">
              <input type="text" v-model="areaList[scope.$index].ppid" placeholder="请输入ppid/qid" class="table-input"
              :class="errId === scope.row.id && errType === 'ppid' && isSavingArea ? 'err' : ''" style="width: 75%;"><span v-if="areaList[scope.$index].adType === 1">(普通商品)</span><span v-if="areaList[scope.$index].adType === 2">(抢购商品)</span>
            </template>
            <template v-else>-</template>
          </template>
        </el-table-column>
        <el-table-column
          prop="soldoutTime"
          label="下架时间">
          <template slot-scope="scope">
            <el-date-picker
              v-model="areaList[scope.$index].soldoutTime"
              type="datetime"
              :clearable="false"
              :editable="false"
              placeholder="选择日期时间">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="投放地区"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;" @click="openAreaChoseCity(scope.row.id, scope.row.areaCode, scope.$index, scope.row.adsenseId)">{{scope.row.areaName}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="orders"
          label="排序"
          width="80"
          v-if="floor.type === 1">
          <template slot-scope="scope">
            <a href="javascript:;" class="fa fa-arrow-up" @click.stop="orderUp(scope.$index)"></a>
            <a href="javascript:;" class="fa fa-arrow-down" @click.stop="orderDown(scope.$index)"></a>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click.native.prevent="save(scope.row.id, scope.$index, scope.row.adsenseId, true)" type="text">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 广告位列表 -->
    <el-collapse v-model="activeNames" v-if="adsenses.length > 0">
      <el-collapse-item v-for="(ad, index) in adsenses" :key="index" :title="'广告位' + (index + 1)" :name="index + 1">
        <el-table
          :data="ad.adList"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="images[0].imageName"
            label="广告图片1"
            width="230"
            v-if="ad.adType === 3 || ad.adType === 4">
            <template slot-scope="scope">
              <a class="pic-name ellipsis" :href="scope.row.images[0].imagePath" target="_blank">{{scope.row.images[0].imageName}}</a><a href="javascript:;" class="btn-upload" :class="errId === scope.row.id && errParentId === ad.id && !isSavingArea && errType === 'image1' && !isSavingArea ? 'err' : ''" @click="trigger(scope.row.id, 0, ad.id)">点击上传</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="images[1].imageName"
            label="广告图片2"
            width="230"
            v-if="ad.adType === 4">
            <template slot-scope="scope">
              <a class="pic-name ellipsis" :href="scope.row.images[1].imagePath" target="_blank">{{scope.row.images[1].imageName}}</a><a href="javascript:;" class="btn-upload" :class="errId === scope.row.id && errParentId === ad.id && !isSavingArea && errType === 'image2' && !isSavingArea ? 'err' : ''" @click="trigger(scope.row.id, 1, ad.id)">点击上传</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="150"
            v-if="ad.adType === 3 || ad.adType === 4">
            <template slot-scope="scope">
              <input type="text" v-model="ad.adList[scope.$index].title" placeholder="请输入广告标题" class="table-input" :class="errId === scope.row.id && errParentId === ad.id && !isSavingArea && errType === 'title' && !isSavingArea ? 'err' : ''">
            </template>
          </el-table-column>
          <el-table-column
            prop="link"
            label="广告链接"
            v-if="ad.adType === 3 || ad.adType === 4">
            <template slot-scope="scope">
              <input type="text" v-model="ad.adList[scope.$index].link" placeholder="请输入广告链接" class="table-input" :class="errId === scope.row.id && errParentId === ad.id && !isSavingArea && errType === 'link' && !isSavingArea ? 'err' : ''">
            </template>
          </el-table-column>
          <el-table-column
            prop="ppid"
            label="ppid/qid"
            v-if="ad.adType === 1 || ad.adType === 2">
            <template slot-scope="scope">
              <input type="text" v-model="ad.adList[scope.$index].ppid" placeholder="请输入ppid" class="table-input"
              :class="errId === scope.row.id && errParentId === ad.id && !isSavingArea && errType === 'ppid' && !isSavingArea ? 'err' : ''" style="width: 75%;">
              <span v-if="ad.adType === 1">(普通商品)</span>
              <span v-if="ad.adType === 2">(抢购商品)</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="soldoutTime"
            label="下架时间">
            <template slot-scope="scope">
              <el-date-picker
                v-model="ad.adList[scope.$index].soldoutTime"
                type="datetime"
                :clearable="false"
                :editable="false"
                placeholder="选择日期时间">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="投放地区"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <a href="javascript:;" class="bnt-choseCities" :class="errId === scope.row.id && errParentId === ad.id && !isSavingArea && errType === 'cities' && !isSavingArea ? 'err' : ''" @click="openChoseCity(scope.row.id, scope.row.areaCode, scope.$index, ad.id)">{{scope.row.areaName}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click.native.prevent="save(scope.row.id, scope.$index, ad.id, false)" type="text">保存</el-button>
              <el-button @click.native.prevent="changeArea(ad.id)" type="text" v-if="scope.$index === 0">增加分区</el-button>
              <el-button @click.native.prevent="deleteAd(scope.row.id, scope.$index, ad.id)" type="text" v-if="scope.$index !== 0">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <cities ref="showCities" @chosedCities="handleChosedCities"></cities>
    <form ref="fileForm">
      <input class="hide" type="file" ref="file" @change="upload" accept="image/*" v-if="hasUpload">
    </form>
  </div>
</template>
<script>
  import cities from 'components/choseCities'
  const regImg = /(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/
  export default {
    data () {
      return {
        floorId: '',
        adPositionId: '',
        loading: false,
        errId: '',
        errParentId: '',
        errType: '',
        choseCitiesId: '',
        choseCitiesAdId: '',
        uploadingId: '',
        uploadingAdId: '',
        imageIndex: 0,
        hasUpload: true,
        activeNames: [],
        typeList: [
          {
            id: '1',
            name: '首焦',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: 'assets/focus1.jpg',
              adCount: 6
            }]
          }, {
            id: '2',
            name: '首页楼层',
            hasStyle: true,
            disabled: false,
            styleList: [{
              id: '1',
              name: '样式一',
              pic: 'assets/homeFloor1.jpg',
              adCount: 2
            }, {
              id: '2',
              name: '样式二',
              pic: 'assets/homeFloor2.jpg',
              adCount: 4
            }, {
              id: '3',
              name: '样式三',
              pic: 'assets/homeFloor3.jpg',
              adCount: 1
            }, {
              id: '4',
              name: '样式四',
              pic: 'assets/homeFloor4.jpg',
              adCount: 2
            }, {
              id: '5',
              name: '样式五',
              pic: 'assets/homeFloor5.jpg',
              adCount: 3
            }, {
              id: '6',
              name: '样式六',
              pic: 'assets/homeFloor6.jpg',
              adCount: 3
            }, {
              id: '7',
              name: '样式七',
              pic: 'assets/homeFloor7.jpg',
              adCount: 5
            }]
          }, {
            id: '3',
            name: '瀑布流商品',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: 'assets/goodsList1.jpg',
              adCount: 0
            }]
          }, {
            id: '4',
            name: '底部图标',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: 'assets/bottom1.jpg',
              adCount: 5
            }]
          }, {
            id: '5',
            name: '抢购',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: '',
              adCount: 0
            }]
          }, {
            id: '6',
            name: '资讯轮播图',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: '',
              adCount: 0
            }]
          }, {
            id: '7',
            name: '资讯列表',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: '',
              adCount: 0
            }]
          }, {
            id: '8',
            name: '弹出层',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: 'assets/popup1.jpg',
              adCount: 1
            }]
          }, {
            id: '9',
            name: '浮动层',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: 'assets/fixed1.jpg',
              adCount: 1
            }]
          }, {
            id: '10',
            name: '猜你喜欢',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: '',
              adCount: 0
            }]
          }, {
            id: '11',
            name: '为你优选',
            hasStyle: false,
            disabled: false,
            styleList: [{
              id: '0',
              name: '默认样式',
              pic: '',
              adCount: 0
            }]
          }
        ],
        floor: {}, // 楼层信息
        adsenses: [], // 广告位list
        imgSrc: '',
        areaList: [],
        adType: 0,
        props: {
          value: 'id',
          label: 'name'
        },
        citiesList: [],
        selectCity: ['-1'],
        isChoseAreaCities: false,
        isUploadingAreaImg: false,
        isSavingArea: false,
        showSaveOrder: false,
        showImg: false,
        orderId: '' // 正常排序的行id，用于样式标识
      }
    },
    components: {
      cities
    },
    created () {
      this.floorId = this.$route.params.id
      this.fetchData()
      this.fetchCitites()
    },
    mounted () {
      this.fetchAreaListData()
    },
    methods: {
      fetchData () {
        let self = this
        let params = {
          floorId: self.$route.params.id
        }
        self.loading = true
        self.$api.pageManagement.fetchFloorAd(params, 'get').then(res => {
          if (res.code === 0) {
            let data = res.data
            self.floor = data.floor || {}
            self.adsenses = data.adsenses || []
            // 处理还没有添加过广告的广告位
            for (let i = 0; i < self.adsenses.length; i++) {
              if (self.adsenses[i].adList && self.adsenses[i].adList.length === 0) {
                self.changeArea(self.adsenses[i].id)
              }
            }
            if (self.floor.type && self.floor.type === 3) {
              // 瀑布流商品
              self.adType = -1
            } else {
              if (self.adsenses[0]) {
                self.adType = self.adsenses[0].adType
              }
            }
            // 设置示意图
            let floorType = self.floor.type + ''
            let floorStyleId = self.floor.floorStyleId
            let typeList = self.typeList
            for (let i = 0; i < typeList.length; i++) {
              if (typeList[i].id === floorType) {
                let styleList = typeList[i].styleList
                for (let j = 0; j < styleList.length; j++) {
                  if (styleList[j].id === floorStyleId) {
                    self.imgSrc = styleList[j].pic
                    break
                  }
                }
              }
            }
            self.loading = false
          } else {
            self.loading = false
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          self.$message.error('获取楼层广告位信息失败' + err)
        })
      },
      openChoseCity (id, areaCode, index, adsenseId) {
        let self = this
        if (index === 0) {
          this.$alert('此广告不能修改投放地区', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
          return
        }
        self.choseCitiesId = id || ''
        self.choseCitiesAdId = adsenseId || ''
        self.isChoseAreaCities = false
        self.$refs.showCities.open(areaCode)
      },
      openAreaChoseCity (id, areaCode, index, adsenseId) {
        let self = this
        if (areaCode === '0') {
          this.$alert('此广告不能修改投放地区', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
          return
        }
        self.choseCitiesId = id || ''
        self.choseCitiesAdId = adsenseId || ''
        self.isChoseAreaCities = true
        self.$refs.showCities.open(areaCode)
      },
      handleChosedCities (cities) {
        // 更改投放城市
        let self = this
        if (self.isChoseAreaCities) {
          // 上方按详细分区查看更改投放城市回填
          let adsenses = self.adsenses
          // 全区检测
          let flag = false
          for (let i = 0; i < adsenses.length; i++) {
            if (adsenses[i].id === self.choseCitiesAdId) {
              let adList = adsenses[i].adList
              if (cities.areaCode === '0') {
                for (let j = 0; j < adList.length; j++) {
                  if (adList[j].areaCode === '0') {
                    flag = true
                    break
                  }
                }
              }
              if (flag) {
                // 目前已有全区，又添加的全区
                this.$alert('此广告位已有投放地方地区为全区的设置，请勿重复设置！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {}
                })
                return
              }
            }
          }
          let areaList = self.areaList
          for (let i = 0; i < areaList.length; i++) {
            if (areaList[i].id === self.choseCitiesId) {
              areaList[i].areaCode = cities.areaCode
              areaList[i].areaName = cities.areaName
              break
            }
          }
        } else {
          // 下方广告位更改回填
          let adsenses = self.adsenses
          for (let i = 0; i < adsenses.length; i++) {
            if (adsenses[i].id === self.choseCitiesAdId) {
              let adList = adsenses[i].adList
              // 全区检测
              let flag = false
              if (cities.areaCode === '0') {
                for (let j = 0; j < adList.length; j++) {
                  if (adList[j].areaCode === '0') {
                    flag = true
                    break
                  }
                }
              }
              if (flag) {
                // 目前已有全区，又添加的全区
                this.$alert('此广告位已有投放地方地区为全区的设置，请勿重复设置！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {}
                })
                return
              } else {
                for (let k = 0; k < adList.length; k++) {
                  if (adList[k].id === self.choseCitiesId) {
                    adList[k].areaCode = cities.areaCode
                    adList[k].areaName = cities.areaName
                    break
                  }
                }
              }
            }
          }
        }
      },
      changeArea (adsenseId) {
        // 增加分区
        let self = this
        let areaItem = {
          id: '',
          images: [{
            imageId: '',
            imageName: '',
            imagePath: ''
          }],
          title: '',
          link: '',
          ppid: '',
          soldoutTime: '',
          areaName: '全区',
          areaCode: '0'
        }
        let now = new Date()
        now.setMonth(now.getMonth() + 1)
        areaItem.soldoutTime = self.formartDate(now)
        let adsenses = self.adsenses
        for (let i = 0; i < adsenses.length; i++) {
          if (adsenses[i].id === adsenseId) {
            if (adsenses[i].adType === 4) {
              areaItem.images.push({
                imageId: '',
                imageName: '',
                imagePath: ''
              })
            }
            if (adsenses[i].adList.length > 0) {
              areaItem.areaName = '请选择分区'
              areaItem.areaCode = ''
            }
            if (adsenses[i].adList.length > 0 && adsenses[i].adList[0].id.length === 0) {
              self.$alert('请先设置投放区域为全区的广告', '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              })
              break
            }
            adsenses[i].adList.push(areaItem)
            break
          }
        }
      },
      formartDate (date) {
        let str = ''
        if (typeof date === 'string') {
          str = date
          return str
        }
        let month = this.handleLessTen(date.getMonth() + 1)
        let hours = this.handleLessTen(date.getHours())

        let minutes = this.handleLessTen(date.getMinutes())
        let seconds = this.handleLessTen(date.getSeconds())

        str = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + hours + ':' + minutes + ':' + seconds
        return str
      },
      handleLessTen (num) {
        let str = num
        if (num < 10) {
          str = '0' + num
        }
        return str + ''
      },
      deleteAd (id, index, adsenseId) {
        // 删除广告
        let self = this
        this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id.length === 0) {
            let adsenses = self.adsenses
            for (let i = 0; i < adsenses.length; i++) {
              if (adsenses[i].id === adsenseId) {
                let adList = adsenses[i].adList
                adList.splice(index, 1)
                self.loading = false
                self.$message({
                  message: '删除成功',
                  type: 'success'
                })
                break
              }
            }
            self.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            self.loading = true
            self.$api.pageManagement.fetchAd({}, 'delete', id).then(res => {
              if (res.code === 0) {
                let adsenses = self.adsenses
                for (let i = 0; i < adsenses.length; i++) {
                  if (adsenses[i].id === adsenseId) {
                    let adList = adsenses[i].adList
                    adList.splice(index, 1)
                    self.loading = false
                    self.$message({
                      message: '删除成功',
                      type: 'success'
                    })
                    break
                  }
                }
              } else {
                self.loading = false
                self.$message.error(res.userMsg)
              }
            }, err => {
              self.loading = false
              self.$message.error('删除广告失败' + err)
            })
          }
        }).catch(() => {})
      },
      trigger (id, imageIndex, adsenseId) {
        let self = this
        self.uploadingId = id
        self.uploadingAdId = adsenseId
        self.imageIndex = imageIndex
        self.isUploadingAreaImg = false
        self.$refs.file.click()
      },
      triggerArea (id, imageIndex, adsenseId) {
        let self = this
        self.uploadingId = id
        self.uploadingAdId = adsenseId
        self.imageIndex = imageIndex
        self.isUploadingAreaImg = true
        self.$refs.file.click()
      },
      save (id, index, adsenseId, isSavingArea) {
        // 保存广告编辑
        let self = this
        self.isSavingArea = isSavingArea
        let adList = []
        let adsenses = self.adsenses
        let adsense = {}

        if (!isSavingArea) {
          // 保存下方广告位中的广告，先遍历广告位，再找对应操作的数据
          for (let i = 0; i < adsenses.length; i++) {
            if (adsenses[i].id === adsenseId) {
              adList = adsenses[i].adList
              adsense = adsenses[i]
              break
            }
          }
          if (index > 0) {
            // 保存的是第一个之后的广告，先判断是否增加过默认的全区广告，没有怎要先新增全区广告
            if (!adList[0].id) {
              self.$alert('请先设置投放区域为全区的广告', '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              })
              return
            }
          }
        } else {
          // 保存上方按地区查看的广告
          adList = self.areaList
        }
        let adItem = adList[index]
        let params = Object.assign({}, adItem)
        params.soldoutTime = self.formartDate(adItem.soldoutTime)
        if (!isSavingArea) {
          params.adType = adsense.adType // 广告类型
        }
        params.adPositionId = adsenseId // 广告位id
        params.floorId = self.floorId // 楼层id
        // 输入验证
        self.errId = id
        self.errParentId = adsenseId
        if (params.adType === 3 || params.adType === 4) {
          // 类型为广告，adType === 3 or 4时
          if (params.images[0].imagePath.length === 0) {
            // 未传图片1
            self.errType = 'image1'
            return
          }
          if (params.adType === 4) {
            // 广告类型为 4时，对图片2判空
            if (params.images[1].imagePath.length === 0) {
              // 未传图片2
              self.errType = 'image2'
              return
            }
          }
          // if (params.title.length === 0) {
          //   // 未填写广告标题
          //   self.errType = 'title'
          //   return
          // }
          if (params.link.length === 0) {
            // 未填写链接
            self.errType = 'link'
            return
          } else {
            let strRegex = '^((https|http|ftp|rtsp|mms)?://)' +
             '?(([0-9a-zA-Z_!~*\'().&=+$%-]+: )?[0-9a-zA-Z_!~*\'().&=+$%-]+@)?' +
             '(([0-9]{1,3}.){3}[0-9]{1,3}' +
             '|' +
             '([0-9a-zA-Z_!~*\'()-]+.)*' +
             '([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].' +
             '[a-zA-Z]{2,6})' +
             '(:[0-9]{1,4})?' +
             '((/?)|' +
             '(/[0-9a-zA-Z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
            let re = new RegExp(strRegex)
            if (!re.test(params.link)) {
              self.errType = 'link'
              return
            }
          }
          if (params.areaCode.length === 0) {
            // 未选择分区
            self.errType = 'cities'
            return
          }
          self.errType = ''
          self.errId = ''
          self.errParentId = ''
        } else {
          // 类型为普通商品，adType === '1'，以及抢购商品，adType === '2'时
          if (params.ppid.length === 0) {
            self.errType = 'ppid'
            return
          }
          if (params.areaCode.length === 0) {
            // 未选择分区
            self.errType = 'cities'
            return
          }
          self.errType = ''
          self.errId = ''
          self.errParentId = ''
        }
        // 与服务端交互
        self.loading = true
        self.$api.pageManagement.fetchAd(params, 'post').then(res => {
          if (res.code === 0) {
            let data = res.data
            // 回填数据
            self.$set(adList, index, data)
            self.loading = false
            self.$message({
              message: '保存广告编辑成功',
              type: 'success'
            })
            if (isSavingArea) {
              // 保存上方广告，重新获取下方广告
              self.fetchData()
              self.fetchAreaListData()
            } else {
              self.fetchAreaListData()
            }
          } else {
            self.loading = false
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          self.$message.error('保存广告编辑失败' + err)
        })
      },
      upload (e) {
        let self = this
        let file = e.target.files[0]
        if (file && file.length === 0) return
        let fileName = file.name
        let suffix = fileName.split('.')[1]
        if (!regImg.test(suffix)) {
          self.$alert('请选择图片上传', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
          return
        }
        /* eslint-disable */
        let form = new FormData()
        form.append('image', file)
        self.loading = true
        self.$api.common.upload(form).then(res => {
          if (res.code === 0) {
            let data = res.data
            // 回填数据
            if (self.isUploadingAreaImg) {
              // 上方按地区查看回填数据
              let areaList = self.areaList
              for (let i = 0; i < areaList.length; i++) {
                if (areaList[i].id === self.uploadingId) {
                  areaList[i].images[self.imageIndex].imageId = data.imageId
                  areaList[i].images[self.imageIndex].imageName = data.imageName
                  areaList[i].images[self.imageIndex].imagePath = data.imagePath
                  break
                } 
              }
            } else {
              // 下方广告位回填数据
              let adsenses = self.adsenses
              for (let j = 0; j < adsenses.length; j++) {
                if (adsenses[j].id === self.uploadingAdId) {
                  let adList = adsenses[j].adList
                  for (let k = 0; k < adList.length; k++) {
                    if (adList[k].id === self.uploadingId) {
                      adList[k].images[self.imageIndex].imageId = data.imageId
                      adList[k].images[self.imageIndex].imageName = data.imageName
                      adList[k].images[self.imageIndex].imagePath = data.imagePath
                      break
                    } 
                  }
                }
              }
            }
            if (self.errType === 'image1' || self.errType === 'image2') {
              self.errType = ''
            }
            self.loading = false
          } else {
            self.loading = false
            self.$message.error(res.userMsg)
          }
          self.$refs.fileForm.reset()
        }, err => {
          self.loading = false
          self.$refs.fileForm.reset()
          self.$message.error('上传图片失败' + err)
        })
      },
      fetchAreaListData () {
        let self = this
        let areaCode = '0'
        if (self.selectCity.length > 0) {
          areaCode = self.selectCity[self.selectCity.length - 1]
          if (areaCode === '-1') {
            areaCode = '0'
          }
        }
        let params = {
          floorId: self.floorId,
          areaCode: areaCode
        }
        self.loading = true
        self.$api.pageManagement.fetchAreaAd(params, 'get').then(res => {
          if (res.code === 0) {
            let data = res.data
            self.areaList = data
            self.loading = false
          } else {
            self.loading = false
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          self.$message.error('按分区获取广告信息失败' + err)
        })
      },
      fetchCitites () {
        let self = this
        self.$api.common.getCities().then(res => {
          if (res.code === 0) {
            let data = res.data
            data.forEach(function (city) {
              if (city.children) {
                city.children.unshift({id: city.id, name: '全区', children: []})
              } else {
                city.children = [{id: city.id, name: '全区', children: []}]
              }
              city.children.forEach(function (child) {
                if (child.id !== city.id) {
                  if (child.children) {
                    child.children.unshift({id: child.id, name: '全区'})
                  } else {
                    child.children = [{id: child.id, name: '全区'}]
                  }
                  child.children.forEach(function (thirdLevel) {
                    if (thirdLevel.children && thirdLevel.children.length === 0) {
                      delete thirdLevel.children
                    }
                  })
                } else {
                  delete child.children
                }
              })
            })
            let newData = [{
              id: '-1',
              name: '全区'
            }]
            self.citiesList = newData.concat(data)
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('获取城市失败' + err)
        })
      },
      orderUp (index) {
        // 提升排序
        let self = this
        if (index === 0) return
        let floor = self.areaList[index]
        self.orderId = floor.id
        let floorBefore = self.areaList[index - 1]
        floor.sequence -= 1
        floorBefore.sequence += 1
        self.$set(self.areaList, index - 1, floor)
        self.$set(self.areaList, index, floorBefore)
        self.showSaveOrder = true
      },
      orderDown (index) {
        // 降低排序
        let self = this
        if (index === self.areaList.length - 1) return
        let floor = self.areaList[index]
        self.orderId = floor.id
        let floorAfter = self.areaList[index + 1]
        floor.sequence += 1
        floorAfter.sequence -= 1
        self.$set(self.areaList, index + 1, floor)
        self.$set(self.areaList, index, floorAfter)
        self.showSaveOrder = true
      },
      tableRowClassName (row, index) {
        if (row.id === this.orderId) {
          return 'operation-row'
        }
        return ''
      },
      saveFloorOrder () {
        // 保存区域广告排序
        let self = this
        let params = []
        let areaCode = '0'
        if (self.selectCity.length > 0) {
          areaCode = self.selectCity[self.selectCity.length - 1]
        }
        for (let i = 0; i < self.areaList.length; i++) {
          let temp = {
            adPositionId: self.areaList[i].adsenseId,
            sequence: self.areaList[i].sequence,
            areaCode: areaCode
          }
          params.push(temp)
        }
        self.$api.pageManagement.saveAreaAdOrder(params).then(res => {
          if (res.code === 0) {
            self.$message({
              message: '保存成功',
              type: 'success'
            })
            self.showSaveOrder = false
            self.orderId = ''
            self.fetchAreaListData()
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('保存楼层排序失败' + err)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .table-input {
    border: 1px solid #ccc;
    height: 24px;
    line-height: 22px;
    padding: 0 5px;
    width: 100%;
    &:focus {
      outline: none;
    }
    &.err {
      border: 1px solid #FF4949;
    }
  }
  .pic-name {
    display: inline-block;
    width: 65%;
    vertical-align: bottom;
  }
  .btn-upload.err{
    color: #FF4949;
    border: 1px solid #FF4949;
  }
  .btn-upload {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    border: 1px solid #c4c4c4;
    border-radius: 3px;
    font-size: 13px;
    &:hover {
      border: 1px solid #20a0ff;
    }
  }
  .tool-box {
    margin-bottom: 12px;
  }
  .tool-box-left > span{
    line-height: 36px;
  }
  .btn-check-area {
    margin-left: 10px;
  }
  .img-wrapper{
    position: relative;
    display: inline-block;
    &:hover {
      .img-box {
        display: block;
      }
    }
  }
  .img-box {
    width: 500px;
    position: absolute;
    top: 35px;
    right: 0;
    background-color: #FFF;
    border: 1px solid #dfe6ec;
    min-height: 100px;
    display: none;
    z-index: 10;
    text-align: center;
    img {
      width: 100%;
    }
  }
  .area-wrapper {
    margin-bottom: 30px;
  }
  .pageManagement-table {
    table {
      tbody {
        tr:first-child {
          .fa-arrow-up {
            visibility: hidden;
            cursor: default;
          }
        }
        tr:last-child {
          .fa-arrow-down {
            visibility: hidden;
            cursor: default;
          }
        }
      }
    }
  }
  .bnt-choseCities.err{color: #FF4949;}
  .adPosition-wrapper {padding-bottom: 30px;}
</style>
