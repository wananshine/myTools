import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import index from '@/components/index'

import home from '@/components/home/home'


//商品列表
import indexList from '@/components/listPage/indexList'
import goodsList from '@/components/listPage/goodsList'

//商品详情
// import indexDetail from '@/components/detailPage/indexDetail'
// import goodsDetail from '@/components/detailPage/goodsDetail'
const indexDetail = resolve => require(['@/components/detailPage/indexDetail'], resolve);
const goodsDetail = resolve => require(['@/components/detailPage/goodsDetail'], resolve);



Vue.use(Router)

const routes = [
	{
    path: '/',
    name: 'index',
    redirect: 'index',
    component: index,
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: '/',
        name: 'home',
        redirect: 'home',
        component: home
	    },
	    {
        path: 'home',
        name: 'home',
        component: home,
      }
    ]
  },
  {
    path: '/indexList',
    name: 'indexList',
    component: indexList,
    children: [
      {
        path: '/',
        name: 'goodsList',
        component: goodsList
      },
      {
        path: 'goodsList',
        name: 'goodsList',
        component: goodsList
      }
    ]
  },
  {
    path: '/indexDetail/:goodsId',
    name: 'indexDetail',
    component: indexDetail,
    children: [
      {
        path: '/',
        name: 'goodsDetail',
        component: goodsDetail
      },
      {
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: goodsDetail
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
  mode: "history",
  routes,
  // 后退到原来位置  && 新页面scrollTop为零
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition);
      setTimeout(() => {
           document.getElementById("hotView").scrollTo(savedPosition.x, savedPosition.y)
      }, 3)
    } else {
      return { x: 0, y: 0 }
    }
  }
  //   scrollBehavior(to, from, savedPosition) {
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
  // }
})
