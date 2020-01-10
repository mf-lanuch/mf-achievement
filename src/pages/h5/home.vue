<template>
    <div class="app-container" style="background: rgb(223, 223, 223)">
      <img class="bg" src="../../assets/h5/background.png"/>
      <div class="app-body">
          <div class="app-body-header">
            <div class="myname"><span>熊孩子</span></div>
            <div class="werther">
              <span>22°</span><br />
              <span>{{formatDateAndWeek(new Date())}}</span>
            </div>
            <div class="weather-img">
                <img src="../../assets/h5/weather.png" />
            </div>
          </div>
          <div class="app-body-info">
            <div class="info-content">
              <span>19</span>
              <span>考勤天数</span>
            </div>
            <div class="info-content">
              <span>2</span>
              <span>休假天数</span>
            </div>
            <div class="info-content">
              <span>13</span>
              <span>我的申请</span>
            </div>
          </div>
          <div class="app-body-menu">
            <div class="menu-item">
              <img src="../../assets/h5/flow.png" />
              <span>常用流程</span>
            </div>
            <div class="menu-item">
              <img src="../../assets/h5/attendance.png" />
              <span>考勤明细</span>
            </div>
            <div class="menu-item">
              <img src="../../assets/h5/overtime.png" />
              <span>加班记录</span>
            </div>
            <div class="menu-item">
              <img src="../../assets/h5/holiday.png" />
              <span>休假记录</span>
            </div>
            <div class="menu-item" @click="handleClickOvertime">
              <img src="../../assets/h5/overtime-all.png" />
              <span>加班统计</span>
            </div>
            <div class="menu-item">
              <img src="../../assets/h5/calendar.png" />
              <span>工作日历</span>
            </div>
          </div>
          <div class="app-body-todo">
            <span>待办事项</span>
          </div>
          <div class="app-body-todo-info">
            <div class="app-body-todo-content app-body-todo-header">
              <img src="../../assets/h5/agency.png" />
              <span>UI组月末总结会议</span>
              <img src="../../assets/h5/more.png" />
            </div>
            <div class="app-body-todo-content app-body-todo-time">
              <span>13:50</span>
              <img src="../../assets/h5/down.png"/>
              <span>16:50</span>
            </div>
            <div class="app-body-todo-content app-body-todo-date">
              12.20 星期二
            </div>
            <div class="app-body-todo-content app-body-todo-person">
              <span>信息大楼603会议室</span>
              <img src="../../assets/h5/person1.png" class="first" />
              <img src="../../assets/h5/person2.png" class="second" />
              <img src="../../assets/h5/person3.png" />
            </div>
          </div>
      </div>
      <div class="app-footer">
        <div class="nav-button home">
          <img src="../../assets/h5/home.png"/>
          <span>首页</span>
        </div>
        <div class="nav-button affairs">
          <img src="../../assets/h5/affairs.png"/>
          <span>事务</span>
        </div>
        <div class="nav-button message">
          <img src="../../assets/h5/message.png"/>
          <span>消息</span>
        </div>
        <div class="nav-button mine">
          <img src="../../assets/h5/my.png"/>
          <span>我的</span>
        </div>
      </div>
    </div>
</template>
<script>
// import {Toast} from 'mint-ui'
import util from '../../utils/utils'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods: {
    formatDateAndWeek (date) {
      let days = ['一', '二', '三', '四', '五', '六', '日']
      let formateDate = util.parseTime(date, '{m}月{d}日')
      let day = date.getDay()
      if (day === 0) {
        day = 7
      }
      return formateDate + ' 星期' + days[day - 1]
    },
    handleClickOvertime () {
      this.$router.push('/echartspage')
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .app-body {
    flex-grow: 1;
    z-index: 2;
    padding: 0 1rem 1rem;
    overflow: auto;

    .app-body-header {
      display: flex;
      padding: 1rem 0 1rem;
      align-items: center;
      span {
        color: #fff;
      }
      .myname {
        flex-grow: 2;
        text-align: left;
        span {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
      .werther {
        text-align: right;
        span {
          font-size: 1rem;
          font-weight: bold;
        }
        span:last-child {
          font-size: 0.8rem;
        }
      }
      .weather-img {
        img {
          width: 3rem;
          height: 3rem;
          margin-left: 0.5rem;
        }
      }
    }
    .app-body-info {
      display: flex;
      padding: 0 0.5rem;
      .info-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33%;

        span {
          color: #fff;
          font-size: 0.8rem;
        }
        span:first-child{
          font-size: 2rem;
          font-weight: 200;
          margin-bottom: 2px;
        }
      }
    }
    .app-body-menu {
      display: flex;
      background: #fff;
      border-radius: 0.5rem;
      margin: 1rem 0;
      flex-wrap: wrap;
      padding-bottom: 1rem;

      .menu-item {
        display: flex;
        width: 33.33%;
        align-items: center;
        flex-direction: column;
        img {
          width: 2.7rem;
          height: 2.7rem;
          margin-top: 1rem;
        }
        span {
          font-size: 0.8rem;
          color: #000;
          margin: 0.5rem 0;
        }
      }
    }
    .app-body-todo {
      text-align: left;
      span {
        font-size: 13px;
        color: #000;
        font-weight: bold;
      }
    }
    .app-body-todo-info {
      display: flex;
      flex-direction: column;
      background: #fff;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;

      .app-body-todo-content {
        display: flex;
        align-items: center;
      }
      .app-body-todo-header {
        img {
          width: 1.5rem;
        }
        span {
          color: rgba(0, 0, 0, .5);
          font-size: 1rem;
          padding-left: 0.5rem;
          flex-grow: 2;
          text-align: left;
          font-weight: 700;
        }
        img:last-child{
          height: 0.25rem;
        }
      }
    }
    .app-body-todo-time {
      margin-top: 1.5rem;
      img {
        width: 0.5rem;
      }
      span {
        flex-grow: 1;
        font-size: 1.5rem;
        color: #000;
        text-align: left;
      }
      span:last-child {
        text-align: right;
      }
    }
    .app-body-todo-date {
      color: rgba(0, 0, 0, 0.52);
      font-size: 0.7rem;
      margin-top: 0.8rem;
    }
    .app-body-todo-person {
      margin-top: 1rem;
      span {
        text-align: left;
        flex-grow: 2;
        color: #000;
        font-size: 1rem;
        font-weight: bold;
      }
      img {
        width: 1.5rem;
        position: relative;
      }
      img.first {
        z-index: 3;
        left: 0.5rem;
      }
      img.second {
        z-index: 2;
        left: 0.25rem;
      }
    }
  }

  .app-footer {
    display: flex;
    width: 100%;
    padding-top: 0.5rem;
    height: 3.5rem;
    background: #fff;
    align-items: center;

    .nav-button {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 1.5rem;
        margin-top: 0.2rem;
      }
      span {
        font-size: 0.52rem;
        color: #afafaf;
        margin-top: 0.2rem;
      }
    }
    .home span {
      color: #6ca8fa
    }
  }
}
</style>
