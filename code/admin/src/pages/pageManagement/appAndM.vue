<template>
  <div class="pageMangement-wrapper">
    <!-- tabs -->
    <div class="pageMangement-head flex">
      <div class="left flex-child-average">
        <el-tabs v-model="activeName" type="card" >
          <el-tab-pane v-for="(item,index) in categories" :label="item.title" :name="item.id" :key="index"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <div class="btn-wrapper">
          <el-button @click="dlgCateVisible = true;">编辑分类</el-button>
          <el-button @click.native.prevent="dialogCategoryVisible = true;">添加分类</el-button>
          <el-button @click="openAddFloorDlg" v-if="categories.length > 0">添加楼层</el-button>
          <el-button @click="saveFloorOrder" v-show="showSaveOrder">保存楼层排序</el-button>
        </div>
      </div>
    </div>
    <div class="pageMangement-content">
      <!-- 楼层列表 -->
      <el-table
        :data="floorsList"
        v-loading="loading"
        class="pageManagement-table"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        show-overflow-tooltip>
        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="楼层类型">
          <template slot-scope="scope">
            {{scope.row.type | typeNameFilter(typeList)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="220" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="style"
          label="楼层样式">
          <template slot-scope="scope">
            {{scope.row.floorStyleId | styleNameFilter(scope.row.type, typeList)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="投放地区">
        </el-table-column>
        <el-table-column
          prop="categoryId"
          label="分类id">
        </el-table-column>
        <el-table-column
          prop="orders"
          label="排序">
          <template slot-scope="scope">
            <a href="javascript:;" class="fa fa-arrow-up" @click.stop="orderUp(scope.$index)"></a>
            <a href="javascript:;" class="fa fa-arrow-down" @click.stop="orderDown(scope.$index)"></a>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteItem(scope.row.id, scope.$index)" type="text" size="small" class="btn-delete">删除</el-button>
            <el-button @click.native.prevent="openFloorInfoEdit(scope.$index)" type="text" size="small" class="btn-delete">编辑楼层</el-button>
            <el-button @click.native.prevent="openFloorEdit(scope.row.id, scope.row.type, scope.row.floorStyleId)" type="text" size="small" class="btn-delete" v-if="scope.row.type != '6' && scope.row.type != '10' && scope.row.type != '11'">编辑广告位</el-button>
            <el-button @click.native.prevent="changeHide(scope.row.id, scope.row.hide)" type="text" size="small" class="btn-delete"><span v-if="!scope.row.hide">隐藏</span><span v-else>显示</span></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <!-- 新增类型 -->
    <el-dialog title="添加类型" :visible="dialogCategoryVisible" :show-close="false">
      <el-form :model="newCategoryForm" ref="newCategoryForm" label-width="100px" label-position="left" :rules="newCategoryRules">
        <el-form-item label="类型名称" prop="title">
          <el-input v-model="newCategoryForm.title" auto-complete="off" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="投放地区" prop="areaName">
          <el-input v-model="newCategoryForm.areaName" auto-complete="off" placeholder="请选择投放城市" readonly class="areaInput" @click.native="openChoseCity('newCategory','',newCategoryForm.areaCode)"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="newCategoryForm.noCache">不缓存数据</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCategoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增楼层 -->
    <el-dialog title="添加楼层" :visible="dialogFloorVisible" :show-close="false">
      <el-form :model="floorForm" ref="floorForm" label-width="100px" label-position="left" :rules="floorFormRules">
        <el-form-item label="楼层类型" prop="type">
          <el-select v-model="floorForm.type" placeholder="请选择楼层类型" @change="changeType">
            <el-option :label="item.name" :value="item.id" v-for="item in typeList" :key="item.id" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层样式" prop="floorStyleId">
          <el-select v-model="floorForm.floorStyleId" placeholder="请选择楼层样式" :disabled="noStyle" @change="generateAdsenseList">
            <el-option :label="item.name" :value="item.id" v-for="item in styleList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层标题" prop="title">
          <el-input v-model="floorForm.title" auto-complete="off" placeholder="请输入楼层标题"></el-input>
        </el-form-item>
        <el-form-item label="投放地区" prop="areaName">
          <el-input v-model="floorForm.areaName" auto-complete="off" placeholder="请选择投放城市" readonly class="areaInput" @click.native="openChoseCity('newFloor','',floorForm.areaCode)" :disabled="canNotChoseArea"></el-input>
        </el-form-item>
        <el-form-item label="分类id" prop="categoryId" v-if="adsenseEditable">
          <el-input v-model="floorForm.categoryId" auto-complete="off" placeholder="输入商品分类id"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="floorForm.hasInterval">楼层间距</el-checkbox>
        </el-form-item>
        <div class="adsense-wrapper" style="padding-left: 100px;">
          <div class="btn-row" v-if="adsenseEditable">
            <el-button @click="openEditAdsense(-1)">增加广告位</el-button>
          </div>
          <div class="adsense-list" :class="{editable: adsenseEditable}" v-if="adsenseEditable">
            <span class="adsense-item" v-for="(item, index) in floorFormAdsense"><span class="adsense-name" @click="openEditAdsense(index, item.adType)">广告位{{index + 1}}</span><i class="fa fa-times" aria-hidden="true" @click="deleteAdsense(index)"></i></span>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFloorVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFloor" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑楼层 -->
    <el-dialog title="编辑楼层" :visible="dialogFloorEditVisible" :show-close="false">
      <el-form :model="floorFormEdit" ref="floorEditForm" label-width="100px" label-position="left" :rules="floorFormRules">
        <el-form-item label="楼层类型" prop="">
          <span>{{floorFormEdit.type | typeNameFilter(typeList)}}</span>
        </el-form-item>
        <el-form-item label="楼层样式" prop="">
          <span>{{floorFormEdit.floorStyleId | styleNameFilter(floorFormEdit.type, typeList)}}</span>
        </el-form-item>
        <el-form-item label="楼层标题" prop="title">
          <el-input v-model="floorFormEdit.title" auto-complete="off" placeholder="请输入楼层标题"></el-input>
        </el-form-item>
        <el-form-item label="投放地区" prop="areaName">
          <el-input v-model="floorFormEdit.areaName" auto-complete="off" placeholder="请选择投放城市" readonly class="areaInput" @click.native="openChoseCity('editFloor','',floorFormEdit.areaCode)" :disabled="canNotChoseArea"></el-input>
        </el-form-item>
        <el-form-item label="分类id" prop="categoryId" v-if="floorFormEdit.type == 3">
          <el-input v-model="floorFormEdit.categoryId" auto-complete="off" placeholder="输入商品分类id"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="floorFormEdit.hasInterval">楼层间距</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFloorEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="seveEditFloor" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 类型编辑 -->
    <el-dialog title="类型编辑" :visible="dlgCateVisible" :show-close="false">
      <el-table
        :data="categories"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        class="pageManagement-table categories-edit-table">
        <el-table-column
          prop="name"
          label="分类名称">
          <template slot-scope="scope">
            <input type="text" v-model="categories[scope.$index].title" class="table-input" :class="errId === scope.row.id ? 'err' : ''">
          </template>
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="投放地区"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;" @click="openChoseCity('editCategory', scope.row.id, scope.row.areaCode)">{{scope.row.areaName}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="orders"
          label="排序">
          <template slot-scope="scope">
            <a href="javascript:;" class="fa fa-arrow-up" @click.stop="orderUpCategory(scope.$index)"></a>
            <a href="javascript:;" class="fa fa-arrow-down" @click.stop="orderDownCategory(scope.$index)"></a>
          </template>
        </el-table-column>
        <el-table-column
          prop="noCache"
          label="不缓存数据">
          <template slot-scope="scope">
            <el-checkbox v-model="categories[scope.$index].noCache"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteCategory(scope.row.id, scope.$index)" type="text" size="small" class="btn-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgCateVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCategory" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 瀑布流增加广告位 -->
    <el-dialog title="新增广告位" :visible.sync="dlgAdsenseVisible" size="tiny">
      <div class="choseAdType-wrapper">
        <el-row>
          <el-col :span="8"><span class="adType-label">广告位类型：</span></el-col>
          <el-col :span="10">
            <el-select v-model="adsenseType" placeholder="请选择广告位类型">
              <el-option label="普通商品" value="1"></el-option>
              <el-option label="抢购商品" value="2"></el-option>
              <!-- <el-option label="广告" value="3"></el-option> -->
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dlgAdsenseVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddAdsense" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
    <cities ref="showCities" @chosedCities="handleChosedCities"></cities>
    <adposition ref="adpositionEdit"></adposition>
  </div>
</template>
<script>
  import cities from 'components/choseCities'
  import adposition from 'pages/pageManagement/adPosition'

  export default {
    data () {
      // 分类id校验规则
      let validateCategoryId = (rule, value, callback) => {
        let reg = /^(\d+,?)+$/
        if (!reg.test(value)) {
          callback(new Error('分类id只能为数字并用英文逗号分隔'))
        } else {
          callback()
        }
      }
      return {
        activeName: '',
        categories: [],
        dialogCategoryVisible: false,
        newCategoryForm: {
          title: '',
          areaCode: '0',
          areaName: '全区',
          noCache: false
        },
        newCategoryRules: {
          title: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
          ],
          areaName: [
            { required: true, message: '请选择投放城市', trigger: 'blur' }
          ]
        },
        dialogLoading: false,
        floorsList: [],
        loading: false,
        dialogFloorVisible: false,
        dialogFloorEditVisible: false,
        floorForm: {
          type: '',
          floorStyleId: '',
          title: '',
          areaCode: '0',
          areaName: '全区',
          categoryId: '',
          hasInterval: false
        },
        floorFormEdit: {
          id: '',
          homeLabelId: '',
          sequence: 0,
          type: '',
          floorStyleId: '',
          title: '',
          areaCode: '0',
          areaName: '全区',
          categoryId: '',
          hasInterval: false
        },
        floorFormRules: {
          floorStyleId: [
            { required: true, message: '请选择楼层样式', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择楼层类型', trigger: 'change' }
          ],
          title: [
            { required: true, message: '请输入楼层名称', trigger: 'blur' }
          ],
          areaName: [
            { required: true, message: '请选择投放城市', trigger: 'change' }
          ],
          categoryId: [
            { required: true, message: '请输入分类id', trigger: 'blur' },
            {validator: validateCategoryId, trigger: 'blur'}
          ]
        },
        floorFormAdsense: [],
        showSaveOrder: false,
        styleList: [],
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
        noStyle: true,
        dlgCateVisible: false,
        errId: '',
        editFloorId: '',
        choseCitiesType: '',
        choseCitiesId: '',
        dlgAdsenseVisible: false,
        adsenseType: '1',
        adsenseEditable: false,
        editAdsenseIndex: -1,
        canNotChoseArea: false,
        floorEdit: {
          adsenses: [],
          pic: ''
        },
        deleteCategoriesIds: [],
        dlgTableLoading: false,
        orderId: '' // 正常排序的行id，用于样式标识
      }
    },
    components: {
      cities,
      adposition
    },
    created () {
      this.fetchCategoriesData()
    },
    filters: {
      typeNameFilter (val, typeList) {
        let str = ''
        let valStr = val + ''
        for (let i = 0; i < typeList.length; i++) {
          if (valStr === typeList[i].id) {
            str = typeList[i].name
            break
          }
        }
        return str
      },
      styleNameFilter (val, type, typeList) {
        let str = ''
        let typeStr = type + ''
        // 先找楼层类型
        let styleList = []
        for (let i = 0; i < typeList.length; i++) {
          if (typeStr === typeList[i].id) {
            styleList = typeList[i].styleList
            break
          }
        }
        for (let i = 0; i < styleList.length; i++) {
          if (val === styleList[i].id) {
            str = styleList[i].name
            break
          }
        }
        return str
      }
    },
    methods: {
      fetchCategoriesData () {
        // 获取分类列表
        let self = this
        self.$api.pageManagement.getCategories().then(res => {
          if (res.code === 0) {
            let data = res.data
            self.categories = data || []
            if (self.categories.length > 0) {
              if (self.activeName === '0') {
                self.activeName = self.categories[0].id
              }
            }
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('获取分类失败' + err)
        })
      },
      addCategory () {
        // 添加分类
        let self = this
        self.$refs.newCategoryForm.validate((valid) => {
          if (valid) {
            self.dialogLoading = true
            let params = {
              title: self.newCategoryForm.title,
              areaCode: self.newCategoryForm.areaCode,
              areaName: self.newCategoryForm.areaName,
              sequence: self.categories.length + 1,
              noCache: self.newCategoryForm.noCache
            }
            self.$api.pageManagement.addCategory(params).then(res => {
              if (res.code === 0) {
                let data = res.data
                self.categories.push(data)
                // 如果添加的是第一个分类时，选中
                if (self.categories.length === 1) {
                  self.activeName = data.id
                }
                self.dialogLoading = false
                self.dialogCategoryVisible = false
                self.$message({
                  message: '添加分类成功',
                  type: 'success'
                })
                self.$refs.newCategoryForm.resetFields()
                // 重新获取分类列表
                // self.fetchCategoriesData()
              } else {
                self.$message.error(res.userMsg)
              }
            }, err => {
              self.$message.error('添加分类失败' + err)
            })
          } else {
            return false
          }
        })
      },
      saveCategory () {
        // 保存类型编辑
        let self = this
        let categories = self.categories
        // 判空
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].title.length === 0) {
            self.errId = categories[i].id
          }
        }
        let params = {
          categories: self.categories,
          deleteCategoriesIds: self.deleteCategoriesIds
        }
        self.dialogLoading = true
        self.$api.pageManagement.editCategories(params).then(res => {
          if (res.code === 0) {
            self.dialogLoading = false
            self.dlgCateVisible = false
            self.$message({
              message: '编辑分类成功',
              type: 'success'
            })
            // 重新获取分类列表
            self.fetchCategoriesData()
            self.deleteCategoriesIds = []
            self.orderId = ''
          } else {
            self.dialogLoading = false
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.dialogLoading = false
          self.$message.error('编辑分类失败' + err)
        })
      },
      saveFloorOrder () {
        // 保存楼层排序
        let self = this
        let params = []
        for (let i = 0; i < self.floorsList.length; i++) {
          let temp = {
            id: self.floorsList[i].id,
            sequence: self.floorsList[i].sequence
          }
          params.push(temp)
        }
        self.$api.pageManagement.fetchFloor(params, 'put').then(res => {
          if (res.code === 0) {
            self.$message({
              message: '保存成功',
              type: 'success'
            })
            self.showSaveOrder = false
            self.orderId = ''
            self.fetchFloorsData()
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('保存楼层排序失败' + err)
        })
      },
      deleteItem (id, index) {
        // 删除楼层
        let self = this
        this.$confirm('此操作将永久删除该楼层, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$api.pageManagement.fetchFloor({}, 'delete', id).then(res => {
            if (res.code === 0) {
              self.floorsList.splice(index, 1)
              self.$message({
                message: '删除楼层成功',
                type: 'success'
              })
              // 重新获取当前分类下楼层列表
              self.fetchFloorsData()
            } else {
              self.$message.error(res.userMsg)
            }
          }, err => {
            self.$message.error('删除楼层失败' + err)
          })
        }).catch(() => {})
      },
      fetchFloorsData () {
        // 获取楼层列表
        let self = this
        if (self.activeName === '0') return
        let params = {
          homeLabelId: self.activeName
        }
        self.resetFloorTypeDisabled()
        self.$api.pageManagement.fetchFloor(params, 'get').then(res => {
          if (res.code === 0) {
            let data = res.data
            self.floorsList = data || []
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('获取获取楼层列表失败' + err)
        })
      },
      saveFloor () {
        // 添加楼层
        let self = this
        self.$refs.floorForm.validate((valid) => {
          if (valid) {
            self.dialogLoading = true
            let floors = {
              homeLabelId: self.activeName, // 楼层所属分类Id
              type: self.floorForm.type, // 楼层类型
              floorStyleId: self.floorForm.floorStyleId, // 楼层样式
              title: self.floorForm.title, // 楼层标题
              areaCode: self.floorForm.areaCode, // 楼层投放区域Id
              areaName: self.floorForm.areaName, // 楼层区域名称
              categoryId: self.floorForm.categoryId, // 分类Id
              sequence: self.floorsList.length + 1, // 楼层当前排序
              hasInterval: self.floorForm.hasInterval // 是否具有楼层间距
            }
            let params = {
              floor: floors,
              adsenses: self.floorFormAdsense
            }
            if ((floors.type + '') === '3' && params.adsenses.length === 0) {
              // 瀑布流
              self.$alert('请添加广告位！', '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              })
              self.dialogLoading = false
              return
            }
            self.$api.pageManagement.fetchFloor(params, 'post').then(res => {
              if (res.code === 0) {
                let data = res.data
                self.floorsList.push(data)
                self.$message({
                  message: '添加楼层成功',
                  type: 'success'
                })
                self.dialogLoading = false
                self.dialogFloorVisible = false
                self.$refs.floorForm.resetFields()
                self.floorFormAdsense = []
                self.canNotChoseArea = false
                self.adsenseEditable = false
                self.noStyle = true
                // self.fetchFloorsData()
              } else {
                self.$message.error(res.userMsg)
                self.dialogLoading = false
              }
            }, err => {
              self.$message.error('添加楼层失败' + err)
              self.dialogLoading = false
            })
          } else {
            return false
          }
        })
      },
      seveEditFloor () {
        // 编辑楼层信息
        let self = this
        self.$refs.floorEditForm.validate((valid) => {
          if (valid) {
            self.dialogLoading = true
            let floors = self.floorFormEdit
            let params = floors
            self.$api.pageManagement.updateFloor(params).then(res => {
              if (res.code === 0) {
                self.fetchFloorsData()
                self.$message({
                  message: '编辑楼层成功',
                  type: 'success'
                })
                self.dialogLoading = false
                self.dialogFloorEditVisible = false
                self.$refs.floorEditForm.resetFields()
                // self.fetchFloorsData()
              } else {
                self.$message.error(res.userMsg)
                self.dialogLoading = false
              }
            }, err => {
              self.$message.error('添加楼层失败' + err)
              self.dialogLoading = false
            })
          } else {
            return false
          }
        })
      },
      orderUp (index) {
        // 提升排序
        let self = this
        if (index === 0) return
        let floor = self.floorsList[index]
        self.orderId = floor.id
        let floorBefore = self.floorsList[index - 1]
        floor.sequence -= 1
        floorBefore.sequence += 1
        self.$set(self.floorsList, index - 1, floor)
        self.$set(self.floorsList, index, floorBefore)
        self.showSaveOrder = true
      },
      orderDown (index) {
        // 降低排序
        let self = this
        if (index === self.floorsList.length - 1) return
        let floor = self.floorsList[index]
        self.orderId = floor.id
        let floorAfter = self.floorsList[index + 1]
        floor.sequence += 1
        floorAfter.sequence -= 1
        self.$set(self.floorsList, index + 1, floor)
        self.$set(self.floorsList, index, floorAfter)
        self.showSaveOrder = true
      },
      changeType (val) {
        let self = this
        let typeList = self.typeList
        for (let i = 0; i < typeList.length; i++) {
          if (typeList[i].id === val) {
            self.noStyle = !typeList[i].hasStyle
            if (self.noStyle) {
              self.floorForm.floorStyleId = '0'
            } else {
              self.floorForm.floorStyleId = ''
            }
            self.styleList = typeList[i].styleList
            self.noStyle && self.generateAdsenseList('0')
            break
          }
        }
        if (val === '3') {
          // 选择的是瀑布流商品，广告位可编辑
          self.adsenseEditable = true
        } else {
          self.adsenseEditable = false
        }
        if (val === '5' || val === '6' || val === '7') {
          // 抢购楼层和资讯楼层禁用投放地区选择
          self.floorForm.areaName = '全区'
          self.floorForm.areaCode = '0'
          self.canNotChoseArea = true
        } else {
          self.canNotChoseArea = false
        }
      },
      generateAdsenseList (styleId) {
        let self = this
        let floorType = self.floorForm.type
        let adCount = 0
        self.typeList.forEach(function (type) {
          if (type.id === floorType) {
            let styleList = type.styleList
            styleList.forEach(function (style) {
              if (style.id === styleId) {
                adCount = style.adCount
              }
            })
          }
        })
        // 生成广告位list
        let adsenseList = []
        let adType = '3'
        if (floorType === '4') {
          // 底部图标，adType为'4'
          adType = '4'
        }
        for (let i = 0; i < adCount; i++) {
          let temp = {
            adType: adType,
            sequence: i + 1
          }
          adsenseList.push(temp)
        }
        self.floorFormAdsense = adsenseList
      },
      orderUpCategory (index) {
        // 提升排序
        let self = this
        if (index === 0) return
        let floor = self.categories[index]
        self.orderId = floor.id
        let floorBefore = self.categories[index - 1]
        floor.sequence -= 1
        floorBefore.sequence += 1
        self.$set(self.categories, index - 1, floor)
        self.$set(self.categories, index, floorBefore)
      },
      orderDownCategory (index) {
        // 降低排序
        let self = this
        if (index === self.categories.length - 1) return
        let floor = self.categories[index]
        self.orderId = floor.id
        let floorAfter = self.categories[index + 1]
        floor.sequence += 1
        floorAfter.sequence -= 1
        self.$set(self.categories, index + 1, floor)
        self.$set(self.categories, index, floorAfter)
      },
      deleteCategory (id, index) {
        // 删除分类
        let self = this
        let categories = self.categories
        let category = categories[index]
        if (categories.length === 1) {
          // 删除最后一个分类
          self.floorsList = []
          self.categories = []
        } else {
          // 分类数量大于等于2时
          if (category.id === self.activeName) {
            // 删除当前选中的
            if (index === 0) {
              // 当前选中第一个
              self.activeName = categories[1].id
            } else {
              self.activeName = categories[0].id
            }
          }
          self.deleteCategoriesIds.push(id)
          categories.splice(index, 1)
        }
      },
      openFloorEdit (id, type, floorStyleId) {
        // id-楼层id，type-楼层类型，floorStyleId-楼层样式id
        type = type + ''
        if (type === '5') {
          // 抢购跳转抢购编辑页
          window.open('/')
        } else if (type === '6' || type === '7') {
          // 资讯跳转资讯编辑页
          window.open('/')
        } else {
          window.open('#/pageManagement/mAndApp/floor/' + id)
        }
      },
      goEditAd (adPositionId, adType) {
        // adPositionId-广告位id，adType-广告位类型
        // floorId当前编辑楼层id
        let floorId = this.editFloorId + ''
        // 显示广告位编辑弹窗
        this.$refs.adpositionEdit.openAdPositionEdit(floorId, adPositionId, adType)
      },
      handleChosedCities (cities) {
        // 选择投放城市
        let self = this
        let type = self.choseCitiesType
        switch (type) {
          case 'newCategory':
            self.handleNewCategoryCities(cities)
            break
          case 'newFloor':
            self.handleNewFloorCitites(cities)
            break
          case 'editCategory':
            self.handleEditCategoryCities(cities)
            break
          case 'editFloor':
            self.handleEditFloorCitites(cities)
            break
        }
      },
      openChoseCity (type, id, areaCode) {
        let self = this
        if (self.canNotChoseArea) {
          return
        }
        self.choseCitiesType = type
        self.choseCitiesId = id || ''
        self.$refs.showCities.open(areaCode)
      },
      handleNewCategoryCities (cities) {
        this.newCategoryForm.areaCode = cities.areaCode
        this.newCategoryForm.areaName = cities.areaName
      },
      handleNewFloorCitites (cities) {
        this.floorForm.areaCode = cities.areaCode
        this.floorForm.areaName = cities.areaName
      },
      handleEditFloorCitites (cities) {
        this.floorFormEdit.areaCode = cities.areaCode
        this.floorFormEdit.areaName = cities.areaName
      },
      handleEditCategoryCities (cities) {
        let self = this
        let categories = self.categories
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id === self.choseCitiesId) {
            categories[i].areaCode = cities.areaCode
            categories[i].areaName = cities.areaName
            break
          }
        }
      },
      openEditAdsense (index, adType) {
        // 瀑布流添加or编辑广告位
        let self = this
        self.dlgAdsenseVisible = true
        self.editAdsenseIndex = index
        if (adType > -1) {
          self.adsenseEditable = adType
        } else {
          self.adsenseType = '1'
        }
      },
      handleAddAdsense () {
        // 编辑广告位
        let self = this
        let editAdsenseIndex = self.editAdsenseIndex
        let adType = self.adsenseType
        if (editAdsenseIndex > -1) {
          // 编辑
          self.floorFormAdsense[editAdsenseIndex].adType = adType
        } else {
          // 新增
          self.floorFormAdsense.push({adType: adType, sequence: self.floorFormAdsense.length + 1})
        }
        self.dlgAdsenseVisible = false
      },
      deleteAdsense (index) {
        // 删除广告位
        this.floorFormAdsense.splice(index, 1)
      },
      changeHide (id, hide) {
        let self = this
        let params = {hide: !hide}
        self.$api.pageManagement.fetchFloor(params, 'put', id).then(res => {
          if (res.code === 0) {
            self.$message({
              message: '保存成功',
              type: 'success'
            })
            let floorsList = self.floorsList
            for (let i = 0; i < floorsList.length; i++) {
              if (floorsList[i].id === id) {
                floorsList[i].hide = !hide
              }
            }
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('保存楼层排序失败' + err)
        })
      },
      tableRowClassName (row, index) {
        if (row.id === this.orderId) {
          return 'operation-row'
        }
        return ''
      },
      openAddFloorDlg () {
        let self = this
        let floorsList = self.floorsList
        for (let i = 0; i < floorsList.length; i++) {
          let type = floorsList[i].type + ''
          switch (type) {
            case '4':
              self.setFloorTypeDisabled('4')
              break
            case '8':
              self.setFloorTypeDisabled('8')
              break
            case '9':
              self.setFloorTypeDisabled('9')
              break
            case '10':
              self.setFloorTypeDisabled('10')
              break
            case '7':
              self.setFloorTypeDisabled('7')
              break
            case '11':
              self.setFloorTypeDisabled('11')
              break
          }
        }
        // 判断弹出层，浮动层，猜你喜欢，底部图标只能在第一个分类下添加
        if (self.categories.length > 0 && self.activeName !== self.categories[0].id) {
          self.setFloorTypeDisabled('4')
          self.setFloorTypeDisabled('8')
          self.setFloorTypeDisabled('9')
          self.setFloorTypeDisabled('10')
          self.setFloorTypeDisabled('11')
        }
        self.dialogFloorVisible = true
      },
      setFloorTypeDisabled (id) {
        let self = this
        let typeList = self.typeList
        for (let i = 0; i < typeList.length; i++) {
          if (typeList[i].id === id) {
            typeList[i].disabled = true
          }
        }
      },
      resetFloorTypeDisabled () {
        let self = this
        let typeList = self.typeList
        for (let i = 0; i < typeList.length; i++) {
          typeList[i].disabled = false
        }
      },
      openFloorInfoEdit (index) {
        // 编辑楼层信息
        let self = this
        let floor = self.floorsList[index]
        Object.assign(self.floorFormEdit, floor)
        self.dialogFloorEditVisible = true
      }
    },
    watch: {
      'activeName': 'fetchFloorsData'
    }
  }
</script>
<style lang="scss" scoped>
  .pageMangement-head {
    .left {
      width: 60%;
    }
    .right {
      height: 57px;
      .btn-wrapper {
        height: 41px;
        border-bottom: 1px solid #d1dbe5;
      }
    }
  }
  .pageMangement-content {
    .btn-wrapper {
      text-align: right;
      margin-bottom: 15px;
    }
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
  .pageManagement-table {
    &.categories-edit-table {
      table {
        tbody {
          tr:first-child {
            .btn-delete {
              display: none;
            }
          }
        }
      }
    }
  }
  .table-input {
    border: 1px solid #ccc;
    height: 24px;
    line-height: 22px;
    padding: 0 5px;
    &:focus {
      outline: none;
    }
    &.err {
      border: 1px solid #FF4949;
    }
  }
  .style-pic-box {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .advertisement-list-box {
    margin-top: 15px;
    border: 1px solid #dfe6ec;
    li {
      height: 35px;
      line-height: 34px;
      display: flex;
      & + li {
        border-top: 1px solid #dfe6ec;
      }
      .left {
        flex: 1;
        width: 200px;
        text-align: center;
      }
      .right {
        flex: 0 0 150px;
        width: 100px;
        text-align: center;
        border-left: 1px solid #dfe6ec;
      }
    }
  }
  .adsense-list {
    margin-top: 10px;
    line-height: 26px;
    .adsense-item {
      display: inline-block;
      margin-right: 10px;
      .fa {
        margin-left: 5px;
        cursor: pointer;
        display: none;
        &:hover {
          color: #20a0ff;
        }
      }
    }
    &.editable {
      .adsense-item {
        .adsense-name {
          cursor: pointer;
          &:hover {
            color: #20a0ff;
          }
        }
        .fa {
          display: inline-block;
        }
      }
    }
  }
  .adType-label {
    line-height: 36px;
  }
</style>
