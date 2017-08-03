import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Home from './components/HelloFromVux'
// import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // 异步加载组件

    {path: '/index', redirect: '/home'},
    {
      path: '/',
      component: function (resolve) {
        require(['@/components/login'], resolve)
      }
    },
    {
      path: '/index',
      component: function (resolve) {
        require(['@/components/index'], resolve)
      },
      children: [
        {
          path: '/home',
          name: '主页',
          component: function (resolve) {
            require(['@/components/home'], resolve)
          }
        },
        {
          path: '/waitOrderList',
          name: '待处理',
          component: function (resolve) {
            require(['@/components/order/waitOrderList'], resolve)
          }
        },
        {
          path: '/orderList',
          name: '订单',
          component: function (resolve) {
            require(['@/components/order/orderList'], resolve)
          }
        },
        {
          path: '/orderView/:id',
          component: function (resolve) {
            require(['@/components/order/orderView'], resolve)
          }
        },
        {
          path: '/orderManage/:id',
          component: function (resolve) {
            require(['@/components/order/orderManage'], resolve)
          }
        },
        {
          path: '/about',
          name: '关于我',
          component: function (resolve) {
            require(['@/components/about'], resolve)
          }
        }
      ]
    }
  ]
})
