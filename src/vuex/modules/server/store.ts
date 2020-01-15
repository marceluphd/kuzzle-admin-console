import { SET_INFOS } from './mutation-types'
import actions from './actions'
import * as getters from './getters'

const state = {
  infos: null
}

export const mutations = {
  [SET_INFOS](state, infos) {
    state.infos = infos
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}
