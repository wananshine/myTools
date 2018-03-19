//在store的入口文件index.js中：
// 组装模块并导出 store 的文件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// 导出需要的模块
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});