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


//购物车
// import indexCart from '@/components/cartPage/indexCart'
// import cartList from '@/components/cartPage/cartList'
const indexCart = resolve => require(['@/components/cartPage/indexCart'], resolve);
const cartList = resolve => require(['@/components/cartPage/cartList'], resolve);


//分类
// import indexTypes from '@/components/typePage/indexTypes'
// import typesList from '@/components/typePage/typesList'
const indexTypes = resolve => require(['@/components/typePage/indexTypes'], resolve);
const typesList = resolve => require(['@/components/typePage/typesList'], resolve);

//个人中心
// import indexUser from '@/components/userPage/indexUser'
// import userInfo from '@/components/userPage/userInfo'
const indexUser = resolve => require(['@/components/userPage/indexUser'], resolve);
const userInfo = resolve => require(['@/components/userPage/userInfo'], resolve);

//订单列表
// import order from '@/components/orderPage/order'
// import orderList from '@/components/orderPage/orderList'
// import orderDetail from '@/components/orderPage/orderDetail'
const order = resolve => require(['@/components/orderPage/order'], resolve);
const orderList = resolve => require(['@/components/orderPage/orderList'], resolve);
const orderDetail = resolve => require(['@/components/orderPage/orderDetail'], resolve);


//搜索页
// import search from '@/components/searchPage/search'
// import searchList from '@/components/searchPage/searchList'
const search = resolve => require(['@/components/searchPage/search'], resolve);
const searchList = resolve => require(['@/components/searchPage/searchList'], resolve);




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
    path: '/search',
    name: 'search',
    component: search,
    children: [
      {
        path: '/',
        name: 'searchList',
        component: searchList
      },
      {
        path: 'searchList',
        name: 'searchList',
        component: searchList
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
  },
  {
    path: '/indexCart',
    name: 'indexCart',
    component: indexCart,
    children: [
      {
        path: '/',
        name: 'cartList',
        component: cartList
      },
      {
        path: 'cartList',
        name: 'cartList',
        component: cartList
      }
    ]
  },
  {
    path: '/indexTypes',
    name: 'indexTypes',
    component: indexTypes,
    children: [
      {
        path: '/',
        name: 'typesList',
        component: typesList
      },
      {
        path: 'typesList',
        name: 'typesList',
        component: typesList
      }
    ]
  },
  {
    path: '/indexUser',
    name: 'indexUser',
    component: indexUser,
    children: [
      {
        path: '/',
        name: 'userInfo',
        component: userInfo
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: userInfo
      },
      {
        path: 'order',
        name: 'order',
        component: order,
        children: [
          {
            path: '/',
            name: 'orderList',
            component: orderList
          },
          {
            path: 'orderList',
            name: 'orderList',
            component: orderList
          },
          {
            path: 'orderDetail/:orderID',
            name: 'orderDetail',
            component: orderDetail
          }
        ]
      }
    ]
  },
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
