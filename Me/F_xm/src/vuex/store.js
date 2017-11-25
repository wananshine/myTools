import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)


const state = {
  isHideMask: true,
  isHideDialog: true
}


const store = new Vuex.Store({
  state,
  mutations
})

// if (module.hot) {
//   module.hot.accept(['./mutations'], () => {
//     const mutations = require('./mutations').default
//     store.hotUpdate({
//       mutations
//     })
//   })
// }

export default store
