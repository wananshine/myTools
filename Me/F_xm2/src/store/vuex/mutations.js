import * as types from 'mutations_types'

export default {
  [types.ADD_DB] (state) {
    state.count = 2
    //state => state.count++,
  }
}
