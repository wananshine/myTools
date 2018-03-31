// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

import store from './store';
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
Vue.prototype.$axios = axios
//Vue.prototype.$http= axios

// import VueResource from 'vue-resource'
// Vue.use(VueResource)





//路由拦截  1
// router.beforeEach((to, from, next) =>{
//   if(to.path == '/login'){
//     sessionStorage.removeItem('userInfo');
//   }
//   let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
//   if(!userInfo && to.path != '/login'){
//     next({ path: '/login' });
//   }else{
//     next();
//   }        //默认可选择暂时不登录
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

// router.beforeEach((to, from, next) => {
//   if(to.path==='/login'){
//     next()
//   }else{
//     if(to.meta.requiresAuth && !sessionStorage.getItem('accessToken')){
//       next({
//         path: '/login'
//       })
//     }else{
//       next()
//     }
//   }
// })




// router.beforeEach( (to, from, next)=> {
//   if(to.matched.some(record => record.meta.requiresAuth)){  // 判断该路由是否需要登录权限
//     console.log(123)
//     // if(store.state.token){
//     //   next()
//     // }else{
//     //   next({
//     //     path: "/login",
//     //     query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     //   })
//     // }
//   }else{
//     console.log(456)
//     next();
//   } 
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
