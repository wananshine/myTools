import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'
// import store from './store.js'


export default new Vuex.Store({
  	state,
    mutations,
    getters,
    actions,
    //store,
})



// module.exports = {
//     state,
//     getters,
//     actions,
//     mutations
// }

// module.exports = new Vuex.Store({
//     modules: {
//         cart
//     }
// });