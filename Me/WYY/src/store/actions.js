import * as types from './mutations_types'

const act = {
    sign_up: ({commit}, param) =>{
        commit(types.SIGN_UP)
    },

    server_show: ({commit}) =>{
        commit(types.SERVER_SHOW)
    }

    

    // server_show: ({
    //     commit
    // }) => {
    //     commit(types.SERVER_SHOW);
    // }

}

export default act;