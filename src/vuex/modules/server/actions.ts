import * as types from './mutation-types'
import Vue from 'vue'

export default {
  async [types.FETCH_INFOS]({ commit }) {
    const serverInfos = await Vue.prototype.$kuzzle.server.info();
    commit(types.SET_INFOS, serverInfos.serverInfo)
  },
}
