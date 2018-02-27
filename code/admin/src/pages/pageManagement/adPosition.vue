<template>
  <div class="adPosition-wrapper">
    <el-dialog title="编辑广告" :visible.sync="dlgShow" size="large">
      <el-table
        :data="adList"
        v-loading.body="loading"
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
          v-if="adType === '3' || adType === '4'">
          <template slot-scope="scope">
            <a class="pic-name ellipsis" :href="scope.row.images[0].imagePath" target="_blank">{{scope.row.images[0].imageName}}</a><a href="javascript:;" class="btn-upload" :class="errId === scope.row.id && errType === 'image1' ? 'err' : ''" @click="trigger(scope.row.id, 0)">点击上传</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="images[1].imageName"
          label="广告图片2"
          width="230"
          v-if="adType === '4'">
          <template slot-scope="scope">
            <a class="pic-name ellipsis" :href="scope.row.images[1].imagePath" target="_blank">{{scope.row.images[1].imageName}}</a><a href="javascript:;" class="btn-upload" :class="errId === scope.row.id && errType === 'image2' ? 'err' : ''" @click="trigger(scope.row.id, 1)">点击上传</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="200"
          v-if="adType === '3' || adType === '4'">
          <template slot-scope="scope">
            <input type="text" v-model="adList[scope.$index].title" placeholder="请输入广告标题" class="table-input" :class="errId === scope.row.id && errType === 'title' ? 'err' : ''">
          </template>
        </el-table-column>
        <el-table-column
          prop="link"
          label="广告链接"
          v-if="adType === '3' || adType === '4'">
          <template slot-scope="scope">
            <input type="text" v-model="adList[scope.$index].link" placeholder="请输入广告链接" class="table-input" :class="errId === scope.row.id && errType === 'link' ? 'err' : ''">
          </template>
        </el-table-column>
        <el-table-column
          prop="ppid"
          label="ppid"
          v-if="adType === '1' || adType === '2'">
          <template slot-scope="scope">
            <input type="text" v-model="adList[scope.$index].ppid" placeholder="请输入ppid" class="table-input"
            :class="errId === scope.row.id && errType === 'ppid' ? 'err' : ''">
          </template>
        </el-table-column>
        <el-table-column
          prop="soldoutTime"
          label="下架时间">
          <template slot-scope="scope">
            <el-date-picker
              v-model="adList[scope.$index].soldoutTime"
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
            <a href="javascript:;" @click="openChoseCity(scope.row.id, scope.row.areaCode, scope.$index)">{{scope.row.areaName}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click.native.prevent="save(scope.row.id, scope.$index)" type="text">保存</el-button>
            <el-button @click.native.prevent="changeArea" type="text" v-if="scope.$index === 0">增加分区</el-button>
            <el-button @click.native.prevent="deleteAd(scope.row.id, scope.$index)" type="text" v-if="scope.$index !== 0">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <cities ref="showCities" @chosedCities="handleChosedCities"></cities>
    <form ref="fileForm">
      <input class="hide" type="file" ref="file" @change="upload" accept="image/*" v-if="hasUpload">
    </form>
  </div>
</template>
<script>
  import cities from 'components/choseCities'
  export default {
    data () {
      return {
        floorId: '',
        adPositionId: '',
        adType: '',
        dlgShow: false,
        adList: [],
        loading: false,
        errId: '',
        errType: '',
        choseCitiesId: '',
        uploadingId: '',
        imageIndex: 0,
        hasUpload: true
      }
    },
    components: {
      cities
    },
    methods: {
      openAdPositionEdit (floorId, adPositionId, adType) {
        this.floorId = floorId // 楼层id
        this.adPositionId = adPositionId // 广告位id
        this.adType = adType + '' // 广告类型
        this.dlgShow = true
        this.fetchData()
      },
      fetchData () {
        let self = this
        let params = {
          adPositionId: self.adPositionId
        }
        self.loading = true
        self.$api.pageManagement.fetchAd(params, 'get').then(res => {
          if (res.code === 0) {
            let data = res.data
            self.adList = data
            if (data.length === 0) {
              self.changeArea()
            }
            self.loading = false
          } else {
            self.loading = false
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          self.$message.error('获取广告列表失败' + err)
        })
      },
      openChoseCity (id, areaCode, index) {
        let self = this
        if (index === 0) {
          this.$alert('此广告不能修改投放地区', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
          return
        }
        self.choseCitiesId = id || ''
        self.$refs.showCities.open(areaCode)
      },
      handleChosedCities (cities) {
        // 更改投放城市
        let self = this
        let adList = self.adList
        for (let i = 0; i < adList.length; i++) {
          if (adList[i].id === self.choseCitiesId) {
            adList[i].areaCode = cities.areaCode
            adList[i].areaName = cities.areaName
            break
          }
        }
      },
      changeArea () {
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
        if (self.adType === '4') {
          areaItem.images.push({
            imageId: '',
            imageName: '',
            imagePath: ''
          })
        }
        let now = new Date()
        now.setMonth(now.getMonth() + 1)
        areaItem.soldoutTime = self.formartDate(now)
        self.adList.push(areaItem)
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
      deleteAd (id, index) {
        // 删除广告
        let self = this
        this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id.length === 0) {
            self.adList.splice(index, 1)
            self.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            self.loading = true
            self.$api.pageManagement.fetchAd({}, 'delete', id).then(res => {
              if (res.code === 0) {
                self.adList.splice(index, 1)
                self.loading = false
                self.$message({
                  message: '删除成功',
                  type: 'success'
                })
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
      trigger (id, imageIndex) {
        let self = this
        self.uploadingId = id
        self.imageIndex = imageIndex
        self.$refs.file.click()
      },
      save (id, index) {
        // 保存广告编辑
        let self = this
        let adList = self.adList
        let adItem = adList[index]
        let params = Object.assign({}, adItem)
        params.soldoutTime = self.formartDate(adItem.soldoutTime)
        params.adType = self.adType // 广告类型
        params.adPositionId = self.adPositionId // 广告位id
        params.floorId = self.floorId // 楼层id
        self.errId = id
        // 输入验证
        if (self.adType === '3' || self.adType === '4') {
          // 类型为广告，adType === '3' or '4'时
          if (params.images[0].imagePath.length === 0) {
            // 未传图片1
            self.errType = 'image1'
            return
          }
          if (self.adType === '4') {
            // 广告类型为 '4'时，对图片2判空
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
             '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' +
             '(([0-9]{1,3}.){3}[0-9]{1,3}' +
             '|' +
             '([0-9a-z_!~*\'()-]+.)*' +
             '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' +
             '[a-z]{2,6})' +
             '(:[0-9]{1,4})?' +
             '((/?)|' +
             '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
            let re = new RegExp(strRegex)
            if (!re.test(params.link)) {
              self.errType = 'link'
              return
            }
          }
          self.errType = ''
          self.errId = ''
        } else {
          // 类型为普通商品，adType === '1'，以及抢购商品，adType === '2'时
          if (params.ppid.length === 0) {
            self.errType = 'ppid'
            return
          }
          self.errType = ''
          self.errId = ''
        }
        // 与服务端交互
        self.loading = true
        self.$api.pageManagement.fetchAd(params, 'post').then(res => {
          if (res.code === 0) {
            let data = res.data
            // 回填数据
            self.$set(self.adList, index, data)
            self.loading = false
            self.$message({
              message: '保存广告编辑成功',
              type: 'success'
            })
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
        /* eslint-disable */
        let form = new FormData()
        form.append('image', file)
        self.loading = true
        self.$api.common.upload(form).then(res => {
          if (res.code === 0) {
            let data = res.data
            // 回填数据
            let adList = self.adList
            for (var i = 0; i < adList.length; i++) {
              if (adList[i].id === self.uploadingId) {
                adList[i].images[self.imageIndex].imageId = data.imageId
                adList[i].images[self.imageIndex].imageName = data.imageName
                adList[i].images[self.imageIndex].imagePath = data.imagePath
                break
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
      }
    }
  }
</script>
<style lang="scss">
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
</style>
