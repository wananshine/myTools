import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import index from '@/components/index'

import home from '@/components/home/home'


//商品列表
import indexList from '@/components/listPage/indexList'
import goodsList from '@/components/listPage/goodsList'




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
  }
]

export default new Router({
  mode: "history",
  routes
})
