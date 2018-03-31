import * as types from './mutations_types'

export default{
    [types.SIGN_UP] (states, obj){
        states.singUp = true;
    },

    [types.SERVER_SHOW] (states, obj){
        states.serverShow = !states.serverShow;
    },
}