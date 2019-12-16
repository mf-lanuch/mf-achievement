import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/pages/layout/layout'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '',
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
      }]
    }
  ]
})
