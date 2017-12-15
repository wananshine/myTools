import * as types from './mutations_types'

export default {
  [types.ADD_DB] (states, obj) {
    states.count = 2;
    //local.set(states);
    //state => state.count++,
  },
  [types.CREATE_CART] (states, obj) {
  	localStorage.setItem('vuex_cart','123')
  	console.log(localStorage)
  },
  // 登录窗口显示
  [types.SINGN_IN] (states, obj) {
    states.signinDefault = true;
    console.log(states.signinDefault)
  },
  // 登录窗口隐藏
  [types.SINGN_OUT] (states, obj) {
    states.signinDefault = false;
    console.log(states.signinDefault)
  }
}
