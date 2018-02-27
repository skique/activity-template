<template>
  <div class="choseCities-wrap">
    <el-dialog title="选择投放城市" :visible.sync="showDialog" top="5%">
      <div class="cities-body" style="line-height:20px;">
        <dl class="checkbox diy-citybox col-md-12 border-bottom" style="padding-bottom:25px">
            <dt class="col-md-2" data-cityid="0"><label><input type="checkbox" v-model="allCheck"> <b>全区</b></label></dt>
            <dd class="col-md-10 red">选择该选项，则所有的区域都将投放该广告位</dd>
        </dl>
        <dl class="checkbox diy-citybox col-md-12 padding-top" v-for="(city,index) in item">
            <dt class="col-md-2" :data-cityid="city.id" :data-cityname="city.name"><b>{{city.name}}</b></dt>
            <dd class="col-md-10">
                <div class="col-md-3 city-child" :data-cityid="city.id" :data-cityname="city.name"><input type="checkbox" v-model="city.isChecked" :disabled="allCheck"> 全区</div>
                <div class="col-md-3 city-child" v-for="child in city.children" :data-cityid="child.id" v-if="!city.isChecked">
                    <input type="checkbox" v-model="city.isChecked ? false : child.isChecked" :disabled="city.isChecked || allCheck"> <a href="javascript:;" @click="showChild(child.id)">{{child.name}}({{child.isChecked ? child.children.length : child.checkNumber}}/{{child.children.length}})</a>
                    <template v-if="!allCheck">
                      <div class="city-childs" v-show="showChildId === child.id">
                          <div class="left"><label><input type="checkbox" :data-cityid="child.id" v-model="child.isChecked" @click="checkAreaAll(child)"> 全区</label></div>
                          <div class="left" v-for="childs in child.children" :data-cityid="childs.id"><label><input type="checkbox" v-model="child.isChecked ? childs.isChecked = false : childs.isChecked" :disabled="child.isChecked" v-on:click="childs.isChecked ? ++child.checkNumber : --child.checkNumber"> {{childs.name}}</label></div>
                          <div class="clear"></div>
                          <div class="text-center padding-top"><el-button v-on:click="showChildId = 0">关闭</el-button></div>
                      </div>
                    </template>
                </div>
            </dd>
        </dl>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="choseCities" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showDialog: false,
        dialogLoading: false,
        item: [],
        allCheck: true,
        citySel: [],
        showChildId: 0,
        chosedCities: '0',
        dataLoaded: false,
        loading: false
      }
    },
    created () {
      let self = this
      self.$api.common.getCities().then(res => {
        if (res.code === 0) {
          self.item = res.data
          self.dataLoaded = true
        } else {
          self.$message.error(res.userMsg)
        }
      }, err => {
        self.$message.error('获取城市失败' + err)
      })
    },
    methods: {
      choseCities () {
        let self = this
        self.dialogLoading = true
        self.citySel = []
        let cityIdArry = ''
        let name = ''
        if (self.allCheck) {
          // 全选
          cityIdArry = 0 + ''
          name = '全区'
        } else {
          self.item.forEach(function (city) {
            if (self.allCheck === false) {
              if (city.isChecked) {
                self.citySel.push({ 'name': city.name, 'id': city.id })
              } else {
                city.children.forEach(function (child) {
                  if (child.isChecked) {
                    self.citySel.push({ 'name': child.name, 'id': child.id })
                  } else {
                    child.children.forEach(function (childs) {
                      if (childs.isChecked) {
                        self.citySel.push({ 'name': childs.name, 'id': childs.id })
                      }
                    })
                  }
                })
              }
            }
          })
          if (self.citySel.length > 0) {
            self.citySel.forEach(function (item) {
              name += item.name + ','
              cityIdArry += item.id + ','
            })
            name = name.substring(0, name.length - 1)
            cityIdArry = cityIdArry.substring(0, cityIdArry.length - 1)
          } else {
            self.$alert('请选择投放区域', '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            })
            self.dialogLoading = false
            return
          }
        }
        let result = {
          areaCode: cityIdArry,
          areaName: name
        }
        self.dialogLoading = false
        self.$emit('chosedCities', result)
        self.showDialog = false
      },
      showChild (id) {
        if (this.allCheck) {
          return
        }
        this.showChildId = id
      },
      open (chosedCities) {
        let self = this
        self.chosedCities = chosedCities
        self.showDialog = true
        if (!self.dataLoaded) return
        self.checkChosedCities()
      },
      checkChosedCities () {
        let self = this
        let chosedCities = self.chosedCities
        // 重置
        self.allCheck = true
        self.item.forEach(function (city) {
          city.isChecked = false
          city.children.forEach(function (child) {
            child.isChecked = false
            child.children.forEach(function (childs) {
              childs.isChecked = false
            })
          })
        })
        // 勾选已选
        if (chosedCities && chosedCities.length > 0 && chosedCities !== '0') {
          self.allCheck = false
          // 勾选已选择的
          let arr = chosedCities.split(',')
          for (let i = 0; i < arr.length; i++) {
            let id = arr[i]
            for (let j = 0; j < self.item.length; j++) {
              if (self.item[j].id.toString() === id) {
                self.item[j].isChecked = true
                break
              } else {
                // 第二级
                let secondLevel = self.item[j].children || []
                for (let k = 0; k < secondLevel.length; k++) {
                  if (secondLevel[k].id.toString() === id) {
                    secondLevel[k].isChecked = true
                    break
                  } else {
                    // 第三级
                    let thirdLevel = secondLevel[k].children || []
                    for (let h = 0; h < thirdLevel.length; h++) {
                      if (thirdLevel[h].id.toString() === id) {
                        thirdLevel[h].isChecked = true
                        break
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      checkAreaAll (child) {
        if (child.isChecked) {
          child.checkNumber = 0
        }
      }
    },
    watch: {
      'dataLoaded': 'checkChosedCities'
    }
  }
</script>
<style lang="scss" scoped>
  .cities-body {
    position: relative;
  }
  .diy-citybox {
    font-size: 14px;
  }
  .diy-citybox .city-child {
    margin-bottom: 10px; cursor: pointer; position: relative;
  }
  .diy-citybox .city-childs {
    position: absolute;
    left: -5px;
    top: 30px;
    background: #fff;
    z-index: 9;
    padding: 10px 20px;
    box-shadow: 0 1px 3px #666;
    width: 280px;
  }
  .diy-citybox .city-childs label {
    width: 120px;
    display: block;
    margin: 5px 0;
  }
  .checkbox input[type=checkbox]{
    position: absolute;
    margin: 4px 0 0;
    margin-left: -20px;
    line-height: normal;
  }
  .checkbox{
      position: relative;
      display: block;
      margin-bottom: 10px;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .checkbox label{
    min-height: 20px;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
  }
  .col-md-12 {
    float: left;
    width: 100%;
  }
  .col-md-10,.col-md-2,.col-md-3 {
    float: left;
    padding-right: 15px;
    padding-left: 15px;
    webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .col-md-2 {
    width: 16.66666667%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-10 {
    width: 83.33333333%;
  }
</style>
