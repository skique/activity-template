<style>
  .login{width:360px;height:360px;background:rgba(255,255,255,.9);border-radius:3px;}
  .login h2{text-align: center;padding:40px 0;font-size:30px;font-weight:normal;color:#8492A6}
  .form-box{margin:0 30px;}
  .bg{background:url('../assets/images/bg.jpg') no-repeat center / cover;}
</style>
<template>
  <div class="flex flex-center full-height bg">
    <div class="login">
      <h2>登录系统</h2>
      <div class="form-box">
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input v-model="form.userName" placeholder="用户名">
              <template slot="prepend"><i class="fa fa-user-o"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="form.password" placeholder="密码">
              <template slot="prepend"><i class="fa fa-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" :disabled="disable" style="width:100%;" @click.native.prevent="submit" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: false,
        disable: true,
        form: {
          userName: '',
          password: ''
        }
      }
    },
    created () {
      // window.location.href = 'http://www.9ji.com/admin/Login.aspx'
      const self = this
      self.$watch('form', () => {
        if (self.form.userName && self.form.password) {
          self.disable = false
        } else {
          self.disable = true
        }
      }, {deep: true})
    },
    methods: {
      submit () {
        const self = this
        self.loading = true
      // 请求登录，完成后执行以下
        const token = 'asdasaSDFASFJKASsdsjhfajkh'
        self.$store.commit('setToken', token)
        window.sessionStorage.setItem('authorization', token)
        const url = self.$route.query.redirect || '/'
        self.$router.replace(url)
      }
    }
  }
</script>
