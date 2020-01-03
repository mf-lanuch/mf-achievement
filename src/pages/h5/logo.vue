<template>
    <div class="app-container">
        <div class='img'>
          <img src="../../assets/h5/login.png" width="70%"/>
        </div>
        <div class="login-info">
          <div class="login_input">
            <input type='text' name='pcode' placeholder="请输入手机号码"/>
          </div>
          <div class="login_input">
            <input type='text' name='validate' v-model="validate" placeholder="请输入验证码"/>
            <span v-if="!loading" @click="handleClick">获取验证码</span>
            <span class="loading" v-else>{{second}}s重新获取</span>
          </div>

          <mt-button @click="handleLogin">登录</mt-button>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  name: 'logo',
  data () {
    return {
      loading: false,
      second: 60,
      validate: undefined
    }
  },
  methods: {
    handleClick () {
      Toast('获取验证码成功')
      this.loading = true
      this.countDown()
    },
    countDown () {
      if (this.second === 0) {
        this.second = 60
        this.loading = false
        return
      }
      let that = this
      setTimeout(() => {
        that.second--
        that.countDown()
      }, 1000)
    },
    handleLogin () {
      if (this.validate !== '1111') {
        Toast({
          message: '验证码错误',
          className: 'error'
        })
      } else {
        this.$router.push('/home')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    .img {
      margin-top: 3rem;
    }
    .login-info {
      display: flex;
      flex-direction: column;
      width: 88%;
      flex-grow: 1;
      padding: 2rem 6%;
    }

    .login-info {
      align-items: center;
      .login_input {
        width: 75%;
        height: 7%;
        padding: 10px 2%;
        display: flex;
        border-radius: 7px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, .1);
        margin-top: 1rem;

        span {
          width: 4rem;
          color: rgba(98, 172, 255, 1);
          font-size: 12px;
          line-height: 28px
        }
        span.loading {
          width: 4.5rem;
          color: rgba(121, 121, 121, 0.43)
        }

        input {
          flex-grow: 1;
          border: none;
          outline: none;
        }
      }
      button {
        width: 79%;
        color: #fff;
        font-weight: bold;
        height: 3rem;
        font-size: 1rem;
        margin-top: 3rem;
        border-radius: 0.5rem;
        background-image: linear-gradient(to right, #6BC5FA, #62ACFF);
        box-shadow: 2px 2px 8px rgba(118, 176, 255, 0.39);
        border: 0;
      }
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: rgba(121, 121, 121, 0.43)
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: rgba(121, 121, 121, 0.43)
    }
    /* 以上两个属性分别针对火狐浏览器不同版本 */

    input:-ms-input-placeholder { /* IE */
      color: rgba(121, 121, 121, 0.43)
    }

    input::-webkit-input-placeholder{/* webkit内核的浏览器，如谷歌，edge */
      color: rgba(121, 121, 121, 0.43)
    }
}
</style>
