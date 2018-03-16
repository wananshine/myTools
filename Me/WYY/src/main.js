// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
Vue.prototype.$axios = axios
//Vue.prototype.$http= axios

// import VueResource from 'vue-resource'
// Vue.use(VueResource)





// 路由拦截  1
// router.beforeEach((to, from, next) =>{
//   if(to.path == '/login'){
//     sessionStorage.removeItem('userInfo');
//   }
//   let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
//   // if(!userInfo && to.path != '/account/login'){
//   //   next({ path: '/account/login' });
//   // }else{
//   //   next();
//   // }        //默认可选择暂时不登录
//   next();
// })


// 路由拦截  2
// router.beforeEach((to, from, next) => {
//   if(to.meta.reuqireAuth){  // 判断该路由是否需要登录权限
//     // let data;
//     this.$http.get('/api/login2').then( (res)=>{
//       // data = res.data;
//       if(res.data == 1){
//         next();
//       }else{
//         next({
//           path: '/login',
//           // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         })
//       }
//     }, err =>{
//       next({
//         path: '/login',
//         // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }).catch( (error)=>{
//       next({
//         path: '/login',
//         // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     });
//   }
// })

router.beforeEach( (to, from, next)=> {
  if(to.meta.requireAuth){  // 判断该路由是否需要登录权限
    var data;
    VueResource.get('/api/login1').then((res)=>{
      if(res.body.data.data === 1){
        next();
      }else{
        next({
          path: '/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    }, (error)=>{
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    })
  }else{
    next();
  } 
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
