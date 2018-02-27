<template>
  <div class="page-topicList">
    <div class="tool-box flex flex-justify-between">
      <div class="search-box">
        <el-input placeholder="请输入标题" icon="search" v-model="searchText" :on-icon-click="handleSearch"></el-input>
      </div>
      <div class="tool-box-right">
        <el-button @click="dialogVisible=true;">添加专题</el-button>
      </div>
    </div>
    <el-table
      :data="list"
      v-loading.body="loading"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="" label="操作" width="450">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.type != 1" @click="editTemplate(scope.row.id)">编辑基本信息</el-button>
          <el-button type="text" v-if="scope.row.type != 1" @click="goEditPage(scope.row.type, scope.row.id)">编辑页面</el-button>
          <el-button type="text" @click="templateDelete(scope.row.id)">删除模板</el-button>
          <el-button type="text" v-if="scope.row.type != 1" @click="templateClone(scope.row.id)">克隆模板</el-button>
          <el-button type="text" v-if="scope.row.locked" @click="unlock(scope.row.id)">解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-pagenation">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="15"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 添加模板 -->
    <el-dialog :title="dialogTitle" :visible="dialogVisible" :show-close="false">
      <el-form :model="templateForm" ref="templateForm" label-width="100px" label-position="left" :rules="templateFormRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="templateForm.title" auto-complete="off" placeholder="请输入模板标题"></el-input>
        </el-form-item>
        <el-form-item label="SEO描述" prop="SEODescription">
          <el-input v-model="templateForm.SEODescription" auto-complete="off" placeholder="请输入SEO描述"></el-input>
        </el-form-item>
        <el-form-item label="SEO关键词" prop="SEOKeyword">
          <el-input v-model="templateForm.SEOKeyword" auto-complete="off" placeholder="请输入SEO关键词语"></el-input>
          <p class="grey-9 font-12">使用英文逗号,隔开</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTemplate" :loading="dialogLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        searchText: '',
        current: 1,
        total: 1,
        dialogVisible: false,
        list: [],
        loading: false,
        dialogTitle: '添加模板',
        dialogLoading: false,
        templateForm: {
          id: 0,
          title: '',
          SEODescription: '',
          SEOKeyword: ''
        },
        templateFormRules: {
          title: [
            { required: true, message: '请输入模板标题', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        // 获取列表数据
        let self = this
        let params = {
          searchText: self.searchText,
          current: self.current
        }
        self.$api.activity.fetchTopicListData(params, 'get').then(res => {
          if (res.code === 0) {
            let data = res.data
            self.list = data.list
            self.total = data.total
            self.loading = false
          } else {
            self.loading = false
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          this.$message.error('获取列表数据失败' + err)
        })
      },
      handleCurrentChange (val) {
        // 列表页面切换
        this.current = val
        this.fetchData()
      },
      handleSearch () {
        this.handleCurrentChange(1)
      },
      unlock (id) {
        // 解锁
        let self = this
        self.loading = true
        self.$api.activity.unlock({id: id}).then(res => {
          self.loading = false
          if (res.code === 0) {
            let list = self.list
            for (let i = 0; i < list.length; i++) {
              if (list[i].id === id) {
                list[i].locked = false
                self.$message({
                  message: '解锁成功',
                  type: 'success'
                })
                break
              }
            }
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          this.$message.error('解锁失败' + err)
        })
      },
      templateClone (id) {
        // 克隆模板
        let self = this
        self.loading = true
        self.$api.activity.templateClone({id: id}).then(res => {
          self.loading = false
          if (res.code === 0) {
            self.$message({
              message: '克隆成功',
              type: 'success'
            })
            self.handleCurrentChange(1)
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          this.$message.error('克隆失败' + err)
        })
      },
      templateDelete (id) {
        // 删除模板
        let self = this
        self.loading = true
        self.$api.activity.fetchTopicListData({}, 'delete', id).then(res => {
          self.loading = false
          if (res.code === 0) {
            let list = self.list
            for (let i = 0; i < list.length; i++) {
              if (list[i].id === id) {
                self.$message({
                  message: '删除模板成',
                  type: 'success'
                })
                self.fetchData()
                break
              }
            }
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          this.$message.error('删除模板失败' + err)
        })
      },
      saveTemplate () {
        // 保存模板新建、编辑
        let self = this
        let params = self.templateForm
        let method = params.id ? 'put' : 'post'
        self.dialogLoading = true
        self.$api.activity.fetchTopicListData(params, method).then(res => {
          self.dialogLoading = false
          if (res.code === 0) {
            self.dialogVisible = false
            self.$refs.templateForm.resetFields()
            self.resetForm()
            if (!params.id) {
              // 新增
              self.$message({
                message: '添加模板成功',
                type: 'success'
              })
              self.handleCurrentChange(1)
            } else {
              // 编辑
              self.$message({
                message: '编辑模板成功',
                type: 'success'
              })
              self.fetchData()
            }
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.dialogLoading = false
          this.$message.error('操作失败' + err)
        })
      },
      editTemplate (id) {
        // 编辑
        let self = this
        self.loading = true
        self.$api.activity.templateInfo({id: id}, 'get').then(res => {
          self.loading = false
          if (res.code === 0) {
            let data = res.data
            let form = self.templateForm
            form.id = data.id
            form.title = data.title
            form.SEODescription = data.SEODescription
            form.SEOKeyword = data.SEOKeyword
            self.dialogVisible = true
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.loading = false
          this.$message.error('获取模板基本信息失败' + err)
        })
      },
      resetForm () {
        let form = {
          id: 0,
          title: '',
          SEODescription: '',
          SEOKeyword: ''
        }
        Object.assign(this.templateForm, form)
      },
      goEditPage (type, id) {
        if (type === 2) {
          // 跳转2.0编辑页
          window.open('http://www.9ji.com/admin/zt/topic.aspx?id=' + id)
        } else {
          // 打开新的3.0编辑页
          window.open('#/activity/topic/topic?platform=m&id=1342')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tool-box {
    margin-bottom: 12px;
  }
  .table-pagenation {
    text-align: right;
    margin-top: 12px;
  }
</style>
