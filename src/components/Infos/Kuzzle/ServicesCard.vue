<template>
  <b-card title="Services">
    <b-container fluid>
      <b-row>
        <b-col>
          <b-card-sub-title class="text-center m-3">
            Redis
          </b-card-sub-title>
          <b-card-text>
            <b-list-group>
              <b-list-group-item>
                Version:
                <b-badge variant="white" pill>
                  {{ getRedisInfos.version }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Mode:
                <b-badge variant="white" pill>
                  {{ getRedisInfos.mode }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Memory used:
                <b-badge variant="white" pill>
                  {{ getRedisInfos.memoryUsed }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Memory peak:
                <b-badge variant="white" pill>
                  {{ getRedisInfos.memoryPeak }}
                </b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card-text>
        </b-col>
        <b-col>
          <b-card-sub-title class="text-center m-3">
            ElasticSearch
          </b-card-sub-title>
          <b-card-text>
            <b-list-group>
              <b-list-group-item>
                Version:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.version }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Lucene version:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.lucene }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Space used:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.spaceUsed }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Total Disk space:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.fs.total }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Free Disk space:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.fs.free }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Available Disk space:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.fs.available }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                JVM heap used:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.jvm.mem.heap_used }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                JVM heap max:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.jvm.mem.heap_max }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Total nodes:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.count.total }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Data nodes:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.count.data }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Ingest nodes:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.count.ingest }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item>
                Master nodes:
                <b-badge variant="white" pill>
                  {{ getElasticInfos.nodes.count.master }}
                </b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card-text>
        </b-col>
      </b-row>
    </b-container>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getServicesInfos']),
    getRedisInfos() {
      return this.getServicesInfos.memoryStorage
    },
    getElasticInfos() {
      return this.getServicesInfos.publicStorage
    }
  },
  mounted() {
    console.log(this.getElasticInfos)
  }
}
</script>

<style></style>
