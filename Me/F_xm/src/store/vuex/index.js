import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// import state from './state';
// import mutations from './mutations';
// import getters from './getters';
// import actions from './actions';

// module.exports = {
//     state,
//     mutations,
//     getters,
//     actions
// };


import state from 'state'
import mutations from 'mutations'
import getters from 'getters'
import actions from 'actions'
import store from 'store'

export default new Vuex.Store({
  	state,
    mutations,
    getters,
    actions,
    store,
})



// module.exports = new Vuex.Store({
//     modules: {
//         cart
//     }
// });