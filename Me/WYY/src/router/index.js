import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import index from '@/components/index'

import home from '@/components/home/home'



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
          	},
        ]
    }
]

export default new Router({
  mode: "history",
  routes
})
