import Vue from 'vue'
import VueRouter from 'vue-router'
import VueKuzzle from './plugins/kuzzle'
import './plugins/logger'

import App from './App.vue'
import store from './vuex/store'
import * as types from './vuex/modules/common/kuzzle/mutation-types'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueKuzzle)
Vue.component('apexchart', VueApexCharts)

store.dispatch(types.LOAD_ENVIRONMENTS)
store
  .dispatch(types.SWITCH_LAST_ENVIRONMENT)
  .then(() => {
    let router = require('./services/router').default

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  })
  .catch(() => {
    let router = require('./services/router').default

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  })
