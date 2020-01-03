<template>
    <transition name='fade'>
        <div class="app-container" v-show='init'>
            <img src="../../assets/h5/welcome.png" width="100%"/>
            <div class="system-info">
                <img src="../../assets/h5/system.png" class='system-info-img' />
                <div class="logo">
                    <img src="../../assets/h5/logo.png" />
                    <span>厦门航空传媒科技有限公司</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      init: false
    }
  },
  created () {
  },
  mounted () {
    let that = this
    this.init = true
    setTimeout(() => {
      that.init = false
    }, 3000)
    setTimeout(() => {
      that.$router.push('/logo')
    }, 4000)
  }
}
</script>
<style lang="scss" scoped>
.app-container {
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    .system-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex-grow: 1;
        align-self: middle;
        .system-info-img {
            height: 31px
        }
    }
    .logo {
      margin-top: 20px;
      span {
        font-size: 20px;
        line-height: 24px;
        display: inline-block;
        vertical-align: bottom;
        color: rgba(185, 185, 185, 1);
      }
      img {
        height: 15px;
        display: inline-block;
        vertical-align: bottom;
      }
    }
}

// 搜索面板
@keyframes fadeLeave
{
    0%{opacity: 100;}
    100%{opacity: 0;}
}
// Safari and Chrome
@-webkit-keyframes fadeLeave
{
    0%{opacity: 100;}
    100%{opacity: 0;}
}
// firefox
@-moz-keyframes fadeLeave
{
    0%{opacity: 100;}
    100%{opacity: 0;}
}
@keyframes fadeEnter
{
    0%{opacity: 0;}
    100%{opacity: 100;}
}
// Safari and Chrome
@-webkit-keyframes fadeEnter
{
    0%{opacity: 0;}
    100%{opacity: 100;}
}
// firefox
@-moz-keyframes fadeEnter
{
    0%{opacity: 0;}
    100%{opacity: 100;}
}

.fade-enter-active {
   animation: fadeEnter 2s;
}
.fade-leave-active {
   animation: fadeLeave 1s;
}
</style>
