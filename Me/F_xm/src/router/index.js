import Vue from 'vue'
import Router from 'vue-router'


// import Hello from '@/components/Hello'
import index from '@/components/index'
import home from '@/components/home'
import homepage from '@/components/homepage'
import aboutpage from '@/components/aboutpage'
import signup from '@/components/sign-up'

//下面路由懒加载已经加载demoDetail && GoodsDetail
import demoDetail from '../components/detailsPage/demo-detail'  
import GoodsDetail from '../components/detailsPage/GoodsDetail'


import demoList from '@/components/listPage/demo-list'
import GoodsList from '@/components/listPage/GoodsList'
import phone from '@/components/listPage/phone'

//路由懒加载方式加载
const demoServer = resolve => require(['@/components/serverPage/demo-server'], resolve);
const serverDetail = resolve => require(['@/components/serverPage/serverDetail'], resolve);
//直接引用
// import demoServer from '@/components/serverPage/demo-server'
// import serverDetail from '@/components/serverPage/serverDetail'



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
        beforeEnter: (to, from, next) => {
          // ...
          console.log(to)
          console.log(from)
          console.log(next)
        }
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
      },
      {
        path: 'phone',
        name: 'phone',
        meta: { auth: true },
        component: phone,
        //路由懒加载方式加载
        //component: resolve => require(['../components/listPage/phone'], resolve),
        //路由守卫
        // beforeEnter(to,from,next){
        //     console.log('router beforeEnter');
        //     next();
        // },
        children: [
        ]
      }
    ]
  }
]

// 后退到原来位置  && 新页面scrollTop为零
// const scrollBehavior: function (to, from, savedPosition) {
//   return savedPosition || { x: 0, y: 0 }
// }
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
  // 后退到原来位置  && 新页面scrollTop为零
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
  // scrollBehavior() {
  //   if (savedPosition) {
  //     // savedPosition is only available for popstate navigations.
  //     return savedPosition
  //   } else {
  //     // new navigation.
  //     // scroll to anchor
  //     if (to.hash) {
  //         return { anchor: true }
  //     }
  //     // explicitly control scroll position
  //     // check if any matched route config has meta that requires scrolling to top
  //     if (to.matched.some(m => m.meta.scrollToTop)) {
  //       return { x: 0, y: 0 }
  //     }
  //   }
  // },
  meta: {isKeepAlive: true} //结合keep-alive来达到后退时不刷新数据，前进时刷新数据的效果。
})


