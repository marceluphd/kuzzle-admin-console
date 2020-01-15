<template>
  <b-card title="Generic">
    <p>Kuzzle Up Time: {{ getTime(getGenericInfos.upTime) }}</p>
    Versions:
    <b-list-group>
      <b-list-group-item>
        Kuzzle Version:
        <b-badge variant="white" pill>
          {{ getGenericInfos.versions.kuzzle }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Node Version:
        <b-badge variant="white" pill>
          {{ getGenericInfos.versions.node }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Redis Version:
        <b-badge variant="white" pill>
          {{ getGenericInfos.versions.redis }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Elastic Version:
        <b-badge variant="white" pill>
          {{ getGenericInfos.versions.elastic }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Lucene Version:
        <b-badge variant="white" pill>
          {{ getGenericInfos.versions.lucene }}
        </b-badge>
      </b-list-group-item>
    </b-list-group>
    Redis:
    <b-list-group>
      <b-list-group-item>
        Mode:
        <b-badge variant="white" pill>
          {{ getGenericInfos.redisMode }}
        </b-badge>
      </b-list-group-item>
    </b-list-group>
    Elastic Nodes:
    <b-list-group horizontal>
      <b-list-group-item>
        Master:
        <b-badge variant="white" pill>
          {{ getGenericInfos.elasticNodes.master }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Data:
        <b-badge variant="white" pill>
          {{ getGenericInfos.elasticNodes.data }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Ingest:
        <b-badge variant="white" pill>
          {{ getGenericInfos.elasticNodes.ingest }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        Total:
        <b-badge variant="white" pill>
          {{ getGenericInfos.elasticNodes.total }}
        </b-badge>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getGenericInfos'])
  },
  methods: {
    getTime(value) {
      var date = new Date(null)
      date.setSeconds(value.split('.')[0]) // specify value for SECONDS here
      return date.toISOString().substr(11, 8)
    }
  }
}
</script>

<style></style>
