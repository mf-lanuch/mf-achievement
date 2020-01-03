<template>
    <div class="app-container">
        <div class="login-container">
            <div class="login-content">
                <h1>用户登录</h1>
                <div class="input_inner">
                    <span class="input_inner-body"><img src="../../assets/login/user@2x.png" /></span>
                    <input class="input_inner-body input_inner-input" placeholder="请输入登录名" v-model="form.userCode"/>
                </div>
                <div class="input_inner">
                    <span class="input_inner-body"><img src="../../assets/login/lock@2x.png" /></span>
                    <input type="password" class="input_inner-body input_inner-input" placeholder="请输入密码" v-model="form.password"/>
                </div>
                <div class="input_inner-validate">
                    <div class="input_inner">
                        <input class="input_inner-body input_inner-input" placeholder="验证码" v-model="form.validate"/>
                    </div>
                    <img :src="validateSrc" class="validate" @click="initImageCode" />
                </div>
                <el-button type="primary" @click="login" v-loading.fullscreen.lock="loading">登 录</el-button>
                <div class="forget-password">
                    <span>忘记密码？</span>
                </div>
            </div>
        </div>
        <div class="bg-container">
            <img src="../../assets/login/bg@2x.png" class='bg'>
            <img src="../../assets/login/login-logo@2x.png" class='logo'>
        </div>
    </div>
</template>

<script>
import util from '../../utils/utils'
import {postUserLogin} from '../../api/login'
export default {
  name: 'login',
  data () {
    return {
      loading: false,
      validateSrc: undefined,
      form: {
        userCode: undefined,
        password: undefined,
        validate: undefined
      }
    }
  },
  methods: {
    init () {
      this.initImageCode()
    },
    initImageCode () {
      this.validateSrc = '/api/image/getImageCode?time=' + new Date().getTime()
    },
    login () {
      if (util.isNull(this.form.userCode)) {
        this.$notify.error({
          title: '错误',
          message: '用户名称必填'
        })
        return
      }
      if (util.isNull(this.form.password)) {
        this.$notify.error({
          title: '错误',
          message: '密码必填'
        })
        return
      }
      if (util.isNull(this.form.validate)) {
        this.$notify.error({
          title: '错误',
          message: '验证码必填'
        })
        return
      }
      this.loading = true
      let that = this
      postUserLogin(this.form).then(res => {
        if (res.data.status === 200) {
          setTimeout(() => {
            that.loading = false
            that.$router.push('/homepage')
          }, 1000)
        } else {
          that.$notify.error({
            title: '错误',
            message: res.data.message
          })
        }
        setTimeout(() => {
          that.loading = false
        }, 1000)
      }).catch(error => {
        that.$notify.error({
          title: '错误',
          message: error
        })
        setTimeout(() => {
          that.loading = false
        }, 1000)
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang='scss' scoped>
@import "src/styles/login/login.scss";
</style>
