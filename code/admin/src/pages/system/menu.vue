<template>
  <div class="page-menu">
    <div class="page-header">
      <i class="fa fa-clone" aria-hidden="true"></i>
      <template v-if="level1.length > 0 && level2.length === 0">二级菜单</template>
      <template v-else-if="level1.length > 0 && level2.length > 0">三级菜单</template>
      <template v-else>一级菜单</template>
    </div>
    <div class="tool-box flex flex-justify-between">
      <div class="search-box">
        <el-input placeholder="请输入关键词" icon="search" v-model="searchText" :on-icon-click="fetchData"></el-input>
      </div>
      <div class="tool-box-right">
        <el-button @click="dialogVisible=true;">添加菜单</el-button>
      </div>
    </div>
    <el-table
      :data="menuList"
      v-loading.body="loading"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="400">
        <template slot-scope="scope">
          <template v-if="(level1.length > 0 && level2.length > 0) || !scope.row.hasChildren">
            {{scope.row.name}}
          </template>
          <el-button type="text" @click="goNextLevel(scope.row.id)" v-else>{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="150">
        <template slot-scope="scope">
          <i class="fa" :class="'fa-'+scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="link"
        label="地址">
      </el-table-column>
      <el-table-column prop="" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="editItem(scope.$index)">编辑</el-button>
          <el-button type="text" @click="deleteItem(scope.row.id, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增弹窗 -->
    <el-dialog title="添加菜单" :visible.sync="dialogVisible" @close="closeAddDialog">
      <el-form :model="newMenuForm" ref="newMenuForm" label-width="100px" label-position="left" :rules="newMenuRules">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="newMenuForm.name" auto-complete="off" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="link">
          <el-input v-model="newMenuForm.link" auto-complete="off" placeholder="请输入菜单地址" :disabled="newMenuForm.hasChildren"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input placeholder="请输入图标名称" v-model="newMenuForm.icon" auto-complete="off">
            <template slot="append"><a href="http://fontawesome.dashgame.com/" target="_blank">查看所有图标</a></template>
          </el-input>
        </el-form-item>
        <el-form-item label="" v-show="showHasChildren">
          <el-checkbox v-model="newMenuForm.hasChildren" @change="handleHasChildren">是否有子菜单</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMenu" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        searchText: '',
        menuList: [],
        loading: false,
        dialogVisible: false,
        dialogLoading: false,
        newMenuForm: {
          id: '',
          parentId: '',
          name: '',
          link: '',
          icon: '',
          hasChildren: false
        },
        newMenuRules: {
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请输入图标名称', trigger: 'blur' }
          ],
          link: [
            { required: false, message: '请输入菜单地址', trigger: 'blur' }
          ]
        },
        Level1: '',
        Level2: '',
        parentId: '',
        showHasChildren: true
      }
    },
    created () {
      this.switchLevel()
    },
    methods: {
      fetchData () {
        let self = this
        let params = {
          searchText: self.searchText
        }
        if (self.level1 && self.level2) {
          // 获取第三级数据
          params.parentId = self.level2
          self.parentId = self.level2
        } else if (self.level1 && !self.level2) {
          // 获取第二级数据
          params.parentId = self.level1
          self.parentId = self.level1
        } else {
          params.parentId = ''
          self.parentId = ''
        }
        self.loading = true
        self.$api.system.fetchMenuData(params, 'get').then(res => {
          if (res.code === 0) {
            let data = res.data
            self.menuList = data || []
          } else {
            self.$message.error(res.userMsg)
          }
          self.loading = false
        }, err => {
          self.loading = false
          self.$message.error('获取菜单列表失败' + err)
        })
      },
      addMenu () {
        // 新增菜单
        let self = this
        self.$refs.newMenuForm.validate((valid) => {
          if (valid) {
            self.dialogLoading = true
            let params = {
              id: self.newMenuForm.id,
              parentId: self.newMenuForm.parentId,
              name: self.newMenuForm.name,
              link: self.newMenuForm.link,
              icon: self.newMenuForm.icon,
              hasChildren: self.newMenuForm.hasChildren
            }
            let methods = 'post'
            if (params.id.length > 0) {
              methods = 'put'
            }
            self.dialogLoading = true
            self.$api.system.fetchMenuData(params, methods).then(res => {
              if (res.code === 0) {
                self.$message({
                  message: '添加菜单成功',
                  type: 'success'
                })
                self.dialogLoading = false
                self.dialogVisible = false
                self.$refs.newMenuForm.resetFields()
                self.resetForm()
                // 重新获取菜单列表
                self.fetchData()
              } else {
                self.$message.error(res.userMsg)
              }
            }, err => {
              self.$message.error('添加菜单失败' + err)
            })
          } else {
            return false
          }
        })
      },
      handleHasChildren () {
        if (this.newMenuForm.hasChildren) {
          // 有子菜单时，当前菜单的地址 link不能修改，值为空字符串、
          this.newMenuForm.link = ''
        }
      },
      deleteItem (id, index) {
        // 删除菜单
        let self = this
        this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$api.system.fetchMenuData({}, 'delete', id).then(res => {
            if (res.code === 0) {
              self.menuList.splice(index, 1)
              self.$message({
                message: '删除菜单成功',
                type: 'success'
              })
            } else {
              self.$message.error(res.userMsg)
            }
          }, err => {
            self.$message.error('删除菜单失败' + err)
          })
        }).catch(() => {})
      },
      editItem (index) {
        // 编辑菜单
        let self = this
        let menu = self.menuList[index]
        let newMenuForm = self.newMenuForm
        newMenuForm.id = menu.id
        newMenuForm.name = menu.name
        newMenuForm.link = menu.link
        newMenuForm.icon = menu.icon
        newMenuForm.hasChildren = menu.hasChildren
        self.dialogVisible = true
      },
      resetForm () {
        let form = {
          id: '',
          parentId: '',
          name: '',
          link: '',
          icon: '',
          hasChildren: false
        }
        Object.assign(this.newMenuForm, form)
      },
      closeAddDialog () {
        this.$refs.newMenuForm.resetFields()
        this.resetForm()
      },
      switchLevel () {
        let self = this
        if (self.$route.params.level1) {
          self.level1 = self.$route.params.level1
          if (self.$route.params.level2) {
            self.level2 = self.$route.params.level2
            self.newMenuRules.link[0].required = true
            self.newMenuRules.icon[0].required = false
            self.showHasChildren = false
          } else {
            self.level2 = ''
            self.newMenuRules.link[0].required = false
            self.newMenuRules.icon[0].required = true
            self.showHasChildren = true
          }
        } else {
          self.level1 = ''
          self.level1 = ''
          self.newMenuRules.link[0].required = false
          self.newMenuRules.icon[0].required = true
          self.showHasChildren = true
        }
        self.searchText = ''
        self.fetchData()
      },
      goNextLevel (id) {
        if (this.level1.length > 0) {
          // 第二级去往第三级
          this.$router.push(this.level1 + '/' + id)
        } else {
          // 第一级去往第二级
          this.$router.push('menu/' + id)
        }
      }
    },
    watch: {
      '$route': 'switchLevel'
    }
  }
</script>
<style lang="scss" scope>
  .page-header {
    margin-bottom: 12px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #bfcbd9;
    font-size: 16px;
    i {
      margin-right: 10px;
    }
  }
  .tool-box {
    margin-bottom: 12px;
  }
  .form-row {
    padding-left: 100px;
  }
  .link {
    color: #20a0ff;
  }
</style>
