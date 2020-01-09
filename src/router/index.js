import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/pages/layout/layout'
import login from '@/pages/login/login'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '',
      name: 'login',
      component: login
    }, {
      path: '/welcome',
      name: 'welcome',
      component: require('@/pages/h5/welcome').default,
      meta: {
        title: '欢迎'
      }
    }, {
      path: '/logo',
      name: 'logo',
      component: require('@/pages/h5/logo').default,
      meta: {
        title: '登录'
      }
    }, {
      path: '/home',
      name: 'home',
      component: require('@/pages/h5/home').default,
      meta: {
        title: '主页'
      }
    }, {
      path: '/echartspage',
      name: 'echartspage',
      component: require('@/pages/h5/echarts').default,
      meta: {
        title: '加班统计'
      }
    }, {
      path: '/homepage',
      name: 'layout',
      component: layout,
      children: [{
        path: '/homepage',
        name: 'homepage',
        component: require('@/pages/homepage/homepage').default,
        meta: {
          title: '首页'
        }
      }, {
        path: '/achievement',
        name: 'achievement',
        component: require('@/pages/achievement/achievement').default,
        meta: {
          title: '绩效'
        }
      }, {
        path: '/overtimeRecord',
        name: 'overtimeRecord',
        component: require('@/pages/overtimeRecord/overtimeRecord').default,
        meta: {
          title: '加班记录'
        }
      }, {
        path: '/attendancDetails',
        name: 'attendancDetails',
        component: require('@/pages/attendancDetails/attendancDetails').default,
        meta: {
          title: '考勤明细'
        }
      }, {
        path: '/overtimeRecordAll',
        name: 'overtimeRecordAll',
        component: require('@/pages/overtimeRecord/overtimeRecordAll').default,
        meta: {
          title: '加班记录'
        }
      }, {
        path: '/times',
        name: 'times',
        component: require('@/pages/times/times').default,
        meta: {
          title: '倍率查询'
        }
      }, {
        path: '/breakoff',
        name: 'breakoff',
        component: require('@/pages/breakoff/breakoff').default,
        meta: {
          title: '调休查询'
        }
      }, {
        path: '/breakoffAll',
        name: 'breakoffAll',
        component: require('@/pages/breakoff/breakoffAll').default,
        meta: {
          title: '调休统计'
        }
      }]
    }
  ]
})
