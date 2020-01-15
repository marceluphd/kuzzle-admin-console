/* istanbul ignore next */
export default [
  {
    path: '/infos/kuzzle',
    name: 'InfosKuzzle',
    meta: {
      section: 'kuzzle'
    },
    component(resolve) {
      require(['../../components/Infos/Kuzzle/Page'], resolve)
    }
  },
  {
    path: '/infos/api',
    name: 'InfosApi',
    meta: {
      section: 'api'
    },
    component(resolve) {
      require(['../../components/Infos/Api/Page'], resolve)
    }
  },
  {
    path: '/infos/plugins',
    name: 'InfosPlugins',
    meta: {
      section: 'plugins'
    },
    component(resolve) {
      require(['../../components/Infos/Plugins/Page'], resolve)
    }
  }
]
