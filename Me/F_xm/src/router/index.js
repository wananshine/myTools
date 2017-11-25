import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import index from '../components/index'
import home from '../components/home/home'
import homepage from '../components/home/homepage'
import aboutpage from '../components/home/aboutpage'
import signup from '../components/home/sign-up'


import demoDetail from '../components/home/detailsPage/demo-detail'
import GoodsDetail from '../components/home/detailsPage/GoodsDetail'


import demoList from '../components/home/listPage/demo-list'
import GoodsList from '../components/home/listPage/GoodsList'


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
        name: 'home',
        redirect: 'home',
        component: home
      },
      {
        path: 'home',
        name: 'home',
        component: home,
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
        ]
      },
      {
        path: 'GoodsDetail/:id',
        name: 'demoDetail',
        component: demoDetail,
        children: [
          {
            path: '/',
            name: 'GoodsDetail',
            component: GoodsDetail,
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
      }
    ]
  }
]
export default new Router({
  mode: 'history',
  routes
})
