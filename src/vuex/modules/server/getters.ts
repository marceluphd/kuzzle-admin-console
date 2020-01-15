export const getKuzzleInfos = state => {
  return {
    version: state.infos.kuzzle.version,
    nodeVersion: state.infos.kuzzle.nodeVersion,
    memoryUsed: state.infos.kuzzle.memoryUsed,
    uptime: state.infos.kuzzle.uptime
  }
}

export const getGenericInfos = state => {
  return {
    upTime: state.infos.kuzzle.uptime,
    versions: {
      kuzzle: state.infos.kuzzle.version,
      node: state.infos.kuzzle.nodeVersion,
      redis: state.infos.services.memoryStorage.version,
      elastic: state.infos.services.publicStorage.version,
      lucene: state.infos.services.publicStorage.lucene,
    },
    redisMode: state.infos.services.memoryStorage.mode,
    elasticNodes: {
      data: state.infos.services.publicStorage.nodes.count.data,
      master: state.infos.services.publicStorage.nodes.count.master,
      ingest: state.infos.services.publicStorage.nodes.count.ingest,
      total: state.infos.services.publicStorage.nodes.count.total
    }
  }
}

export const getUpTime = state => {
  return state.infos.kuzzle.uptime
}

export const getCpuInfos = state => {
  return state.infos.kuzzle.system.cpus
}

export const getDiskInfos = state => {
  return {
    total: state.infos.services.publicStorage.nodes.fs.total,
    free: state.infos.services.publicStorage.nodes.fs.free,
    available: state.infos.services.publicStorage.nodes.fs.available
  }
}

export const getMemoryInfos = state => {
  return {
    kuzzleUsed: state.infos.kuzzle.memoryUsed,
    redisUsed: state.infos.services.memoryStorage.memoryUsed,
    redisPeak: state.infos.services.memoryStorage.memoryPeak,
    elasticUsed: state.infos.services.publicStorage.spaceUsed,
    jvmHeap: state.infos.services.publicStorage.nodes.jvm.mem,
    total: state.infos.kuzzle.system.memory.total,
    free: state.infos.kuzzle.system.memory.free
  }
}

export const getPluginsInfos = state => {
  return state.infos.kuzzle.plugins
}


// TO DELETE
export const getApiInfos = state => {
  return state.infos.kuzzle.api
}

export const getServicesInfos = state => {
  return state.infos.services
}

export const getMachineInfos = state => {
  return state.infos.kuzzle.system
}
