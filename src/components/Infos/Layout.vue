<template>
  <div id="infos-layout">
    <aside>
      <ul
        class="Treeview-container sidenav fixed leftside-navigation ps-container ps-active-y"
      >
        <router-link
          class="bold"
          tag="li"
          :to="{ name: 'InfosKuzzle' }"
          active-class="active"
        >
          <a class="waves-effect">
            <i class="fa fa-rocket" aria-hidden="true" />
            <span>Kuzzle</span>
          </a>
        </router-link>
        <router-link
          class="bold"
          tag="li"
          :to="{ name: 'InfosApi' }"
          active-class="active"
        >
          <a class="waves-effect">
            <i class="fa fa-book-open" aria-hidden="true" />
            <span>Api</span>
          </a>
        </router-link>
        <router-link
          class="bold"
          tag="li"
          :to="{ name: 'InfosPlugins' }"
          active-class="active"
        >
          <a class="waves-effect">
            <i class="fa fa-plug" aria-hidden="true" />
            <span>Plugins</span>
          </a>
        </router-link>
      </ul>
    </aside>
    <section class="view">
      <div class="wrapper">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import * as types from '../../vuex/modules/server/mutation-types'

export default {
  name: 'InfosLayout',
  components: {},
  data() {
    return {
      infos: null
    }
  },
  watch: {},
  async mounted() {
    setInterval(async () => {
      await this.$store.dispatch(types.FETCH_INFOS)
    }, 1000)
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Treeview-container {
  @media (max-width: $medium-screen) {
    // @HACK this is nasty, but we need it to override the default
    // MaterializeCSS behavior, hiding the side menu whenever the
    // screen is less than medium-width.
    transform: translateX(0);
  }
}
.sidenav {
  top: 50px;
  width: $sidebar-width;
  a {
    i.fa {
      color: #646464;
    }
    height: 54px;
    line-height: 54px;
  }
  transform: translateX(0%) !important;
}
aside {
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
  a {
    padding: 0 20px;
  }
  .fa {
    width: 18px;
  }
}
</style>
