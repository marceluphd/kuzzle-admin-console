<template>
  <div class="Main">
    <main-menu
      @environment::create="editEnvironment"
      @environment::delete="deleteEnvironment"
      @environment::importEnv="importEnv"
    />

    <main class="loader">
      <warning-header
        v-if="!$store.getters.adminAlreadyExists"
        :text="warningHeaderText"
      />
      <div class="wrapper">
        <router-view />
      </div>
    </main>

    <modal
      id="tokenExpired"
      class="small-modal"
      :has-footer="false"
      :can-close="false"
      :is-open="tokenExpiredIsOpen"
      :close="noop"
    >
      <h5>Your session has expired</h5>
      <h6>Please, relogin</h6>
      <login-form :on-login="onLogin" />
    </modal>

    <modal
      id="kuzzleDisconnected"
      class="small-modal"
      :has-footer="false"
      :can-close="false"
      :close="noop"
      :is-open="kuzzleDisconnectedIsOpen"
    >
      <h5><i class="fa fa-warning red-color" /> Can't connect to Kuzzle</h5>
      <kuzzle-disconnected
        :host="$store.state.kuzzle.host"
        :port="$store.state.kuzzle.port"
      />
    </modal>
  </div>
</template>

<script>
import MainMenu from './Common/MainMenu'
import WarningHeader from './Common/WarningHeader'
import LoginForm from './Common/Login/Form'
import Modal from './Materialize/Modal'
import KuzzleDisconnected from './Error/KuzzleDisconnected'
import * as types from '../vuex/modules/auth/mutation-types'

export default {
  name: 'Home',
  components: {
    LoginForm,
    MainMenu,
    Modal,
    KuzzleDisconnected,
    WarningHeader
  },
  data() {
    return {
      host: null,
      port: null,
      tokenExpiredIsOpen: false,
      kuzzleDisconnectedIsOpen: false,
      warningHeaderText: `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> <b>Warning!</b> Your Kuzzle has no administrator user. It is strongly recommended <a href="#/signup"> that you create one.</a><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>`
    }
  },
  watch: {
    '$store.state.auth.tokenValid'(valid) {
      if (!valid) {
        this.tokenExpiredIsOpen = true
      }
    },
    '$store.state.kuzzle.connectedTo'(isConnected) {
      if (!isConnected) {
        this.kuzzleDisconnectedIsOpen = true
        return
      }
      this.kuzzleDisconnectedIsOpen = false
    }
  },
  mounted() {
    this.$kuzzle.on('tokenExpired', () => this.onTokenExpired())
  },
  methods: {
    onLogin() {
      this.tokenExpiredIsOpen = false
      this.$emit('modal-close', 'tokenExpired')
    },
    editEnvironment(id) {
      this.$emit('environment::create', id)
    },
    deleteEnvironment(id) {
      this.$emit('environment::delete', id)
    },
    importEnv() {
      this.$emit('environment::importEnv')
    },
    onTokenExpired() {
      this.$store.commit(types.SET_TOKEN_VALID, false)
    },
    noop() {}
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
h6 {
  margin-bottom: 40px;
}

main {
  padding-left: $sidebar-width;

  .wrapper {
    padding: 20px;
  }
}

.loader {
  transition: opacity 0.5s ease-out;
  opacity: 1;

  &.loading {
    opacity: 0.3;
    z-index: 10;

    &:before {
      content: 'loading ...';
      position: fixed;
      text-align: center;
      left: 0;
      right: 0;
      bottom: 10px;
    }
  }
}
</style>
