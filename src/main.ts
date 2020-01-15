import Vue from 'vue'
import VueRouter from 'vue-router'
import VueKuzzle from './plugins/kuzzle'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import './plugins/logger'

import App from './App.vue'
import store from './vuex/store'
import * as types from './vuex/modules/common/kuzzle/mutation-types'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.use(VueRouter)
Vue.use(VueKuzzle)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component('apexchart', VueApexCharts)

store.dispatch.kuzzle.loadEnvironments(null)
store.dispatch.kuzzle
  .switchLastEnvironment(null)
  .then(() => {
    const router = require('./services/router').default

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store: store.original,
      render: h => h(App)
    })
  })
  .catch(() => {
    const router = require('./services/router').default

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store: store.original,
      render: h => h(App)
    })
  })
