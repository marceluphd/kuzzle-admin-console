<template>
  <div>
    <div class="row">
      <div class="col offset-s4 s2">
        <environment-switch
          @environment::create="editEnvironment"
          @environment::delete="deleteEnvironment"
          @environment::importEnv="importEnv"
        />
      </div>
    </div>
    <div class="row message-warning">
      <h5>{{ $store.state.kuzzle.errorFromKuzzle.message }}</h5>
      <div class="divider" />
      <div
        v-if="errorInternalStatus || errorInternalMessage"
        class="message"
      >
        <i class="fa fa-plug" />
        [{{ errorInternalStatus }}] {{ errorInternalMessage }}
      </div>
    </div>
    <div class="row kuzzle-disconnected">
      <div class="col s12">
        <p>Trying to connect to Kuzzle...</p>
      </div>

      <div class="col s1 offset-s5">
        <div class="preloader-wrapper active valign-wrapper">
          <div class="spinner-layer">
            <div class="circle-clipper left">
              <div class="circle" />
            </div>
            <div class="gap-patch">
              <div class="circle" />
            </div>
            <div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnvironmentSwitch from '../Common/Environments/EnvironmentsSwitch'

export default {
  name: 'KuzzleErrorPage',
  components: {
    EnvironmentSwitch
  },
  data() {
    return {
      host: null,
      port: null
    }
  },
  computed: {
    errorInternalStatus() {
      if (
        !this.$store.state.kuzzle.errorFromKuzzle ||
        !this.$store.state.kuzzle.errorFromKuzzle.internal
      ) {
        return null
      }
      return this.$store.state.kuzzle.errorFromKuzzle.internal.status
    },
    errorInternalMessage() {
      if (
        !this.$store.state.kuzzle.errorFromKuzzle ||
        !this.$store.state.kuzzle.errorFromKuzzle.internal
      ) {
        return null
      }
      return this.$store.state.kuzzle.errorFromKuzzle.internal.message
    }
  },
  methods: {
    editEnvironment(id) {
      this.$emit('environment::create', id)
    },
    deleteEnvironment(id) {
      this.$emit('environment::delete', id)
    },
    importEnv() {
      this.$emit('environment::importEnv')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.message-warning {
  h5 {
    font-size: 1.2rem;
  }
}
.kuzzle-disconnected {
  margin-top: 30px;

  .card {
    padding-bottom: 20px;
  }

  p {
    font-family: 'Roboto', 'Arial', sans-serif;
    font-size: 1.3em;
    font-weight: 300;

    .host {
      font-weight: bold;
    }
    margin-bottom: 0;
  }
}
</style>
