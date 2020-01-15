<template>
  <div class="Api">
    {{ getPluginsInfos }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getPluginsInfos'])
  }
}
</script>

<style></style>
