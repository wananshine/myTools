import * as types from './mutations_types';

const act = {
    clear_local: ({
        commit
    }, param ) => {
        commit(types.ADD_DB, {id: param});
    },
    clear_cart: ({
        commit
    }) => {
        commit(types.CLEAR_CART);
    },
    sign_in: ({
        commit
    }) => {
        commit(types.SINGN_IN);
    },
    sign_out: ({
        commit
    }) => {
        commit(types.SINGN_OUT);
    },
    update_cur_shop_status: ({
        commit
    }, obj) => {
        commit(types.UPDATE_CUR_SHOP_STATUS, obj);
    },
    delete_db: ({
        commit
    }) => {
        commit(types.DELETE_DB);
        commit(types.UPDATE_LOCAL);
    },
    create_db: ({
        commit
    }, {
        shop
    }) => {
        commit(types.CREATE_DB, shop);
        commit(types.UPDATE_LOCAL);
    },
    add_db: ({
        commit
    }) => {
        commit(types.ADD_DB);
        commit(types.UPDATE_LOCAL);
    },
    reduce_db: ({
        commit
    }) => {
        commit(types.REDUCE_DB);
        commit(types.UPDATE_LOCAL);
    },
    check_db: ({
        commit
    }, obj) => {
        commit(types.CHECK_DB, obj);
    }
}

export default act;