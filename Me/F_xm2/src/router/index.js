import Vue from 'vue'
import Router from 'vue-router'


// import Hello from '@/components/Hello'
import index from '@/components/index'
import home from '@/components/home'
import homepage from '@/components/homepage'
import aboutpage from '@/components/aboutpage'
import signup from '@/components/sign-up'

//下面路由懒加载已经加载demoDetail && GoodsDetail
//import demoDetail from '../components/detailsPage/demo-detail'  
//import GoodsDetail from '../components/detailsPage/GoodsDetail'


import demoList from '@/components/listPage/demo-list'
import GoodsList from '@/components/listPage/GoodsList'


import demoServer from '@/components/serverPage/demo-server'
import serverDetail from '@/components/serverPage/serverDetail'



Vue.component('signup',signup)

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/index',
    component: index,
  },
  {
    path: "/index",
    name: "index",
    component: index,
    children: [
      {
        path: '/',
        name: 'homepage',
        component: homepage
      },
      {
        path: 'homepage',
        name: 'homepage',
        component: homepage,
      },
      {
        path: 'aboutpage',
        name: 'aboutpage',
        component: aboutpage,
      },
      {
        path: 'demoServer',
        name: 'demoServer',
        component: demoServer,
        children: [
          {
            path: '/',
            name: 'serverDetail',
            component: serverDetail,
          },
        ]
      },
      {
        path: 'demoList',
        name: 'demoList',
        component: demoList,
        children: [
          {
            path: '/',
            name: 'GoodsList',
            component: GoodsList,
          },
        ]
      },
      {
        path: 'demoDetail/:id',
        name: 'demoDetail',
        // component: demoDetail,
        //路由懒加载方式加载
        component: resolve => require(['../components/detailsPage/demo-detail'], resolve),
        children: [
          {
            path: '/',
            name: 'GoodsDetail',
            //component: GoodsDetail,
            //路由懒加载方式加载
            component: resolve => require(['../components/detailsPage/GoodsDetail'], resolve),
          },
        ]
      }
    ]
  },
  {
    path: '/phone',
    name: 'phone',
    // component: demoDetail,
    //路由懒加载方式加载
    component: resolve => require(['../components/listPage/phone'], resolve),
    children: [
    ]
  }
]
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}
export default new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition);
      setTimeout(() => {
           window.scrollTo(savedPosition.x, savedPosition.y)
      }, 0)
    } else {
      return { x: 0, y: 0 }
    }
  },
  meta: {isKeepAlive: true} //结合keep-alive来达到后退时不刷新数据，前进时刷新数据的效果。
})


