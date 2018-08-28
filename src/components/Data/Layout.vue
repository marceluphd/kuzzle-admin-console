<template>
  <div class="Data">
    <treeview
      :route-name="$route.name"
      :index="$route.params.index"
      :collection="$route.params.collection">
    </treeview>
    <div class="Data-content">
      <router-view
        v-if="routeExist"
        :index="$route.params.index"
        :collection="$route.params.collection">
      </router-view>
      <notFound v-else></notFound>
    </div>
  </div>
</template>

<script>
import { canSearchIndex } from '../../services/userAuthorization'
import { LIST_INDEXES_AND_COLLECTION } from '../../vuex/modules/index/mutation-types'
import { FETCH_COLLECTION_DETAIL } from '../../vuex/modules/collection/mutation-types'
import Treeview from './Leftnav/Treeview'
import NotFound from '../404'
import { SET_TOAST } from '../../vuex/modules/common/toaster/mutation-types'

export default {
  name: 'DataLayout',
  components: {
    Treeview,
    NotFound
  },
  data() {
    return {
      routeExist: true
    }
  },
  methods: {
    setRouteExist() {
      this.routeExist = true
      const { index, collection } = this.$route.params
      if (
        typeof index !== 'undefined' &&
        this.$store.state.index.indexes.indexOf(index) === -1
      ) {
        this.routeExist = false
      } else {
        if (
          typeof collection !== 'undefined' &&
          this.$store.getters
            .indexCollections(index)
            .stored.indexOf(collection) === -1
        ) {
          this.routeExist = false
        }
      }
    }
  },
  mounted() {
    if (canSearchIndex()) {
      this.$store
        .dispatch(LIST_INDEXES_AND_COLLECTION)
        .then(() => {
          this.setRouteExist()
          return this.$store.dispatch(FETCH_COLLECTION_DETAIL, {
            index: this.$route.params.index,
            collection: this.$route.params.collection
          })
        })
        .catch(err => console.error(err))
    }
  },
  watch: {
    $route() {
      if (canSearchIndex()) {
        this.$store
          .dispatch(LIST_INDEXES_AND_COLLECTION)
          .then(() => {
            this.setRouteExist()
            return this.$store.dispatch(FETCH_COLLECTION_DETAIL, {
              index: this.$route.params.index,
              collection: this.$route.params.collection
            })
          })
          .catch(err => this.$store.commit(SET_TOAST, { text: err.message }))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Data {
  height: 100%;
}

.Data-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
