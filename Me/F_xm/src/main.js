// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import VueResource from 'vue-resource'
import store from './store';
import Vuex from 'vuex'


Vue.use(VueResource)
Vue.use(Vuex)

Vue.config.productionTip = false

//自定义全局过滤器  start
Vue.filter("time",function(value) {
    // var date =  new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    // date = date.toString();
    // var pos = date.indexOf(' ');
    // var date2 = date.substring(0 , pos);
    // return  date2;
    var date =  new Date(parseInt(value));
    date = date.getDay();
    // var pos = date.indexOf(' ');
    // var date2 = date.substring(0 , pos);
    return  date;
});
//自定义全局过滤器  end

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


//路由拦截 && 判断是否登录
router.beforeEach((to, from, next) => {
    if(to.meta.auth) { //是否验证
        if(window.localStorage.access_token) { //是否登录
            next()
        } else { //未登录则跳转到登录页面
            next({
                name: 'homepage',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})