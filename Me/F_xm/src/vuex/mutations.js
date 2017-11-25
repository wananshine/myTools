import { HIDEDIALOG } from './mutation-types'

export default {
  [HIDEDIALOG] (state) {
    state.isHideDialog = !state.isHideDialog
    state.isHideMask = !state.isHideMask
  }
}
