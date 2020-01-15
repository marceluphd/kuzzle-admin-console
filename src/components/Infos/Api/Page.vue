<template>
  <div class="Api">
    {{ getApiInfos }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getApiInfos'])
  }
}
</script>

<style></style>
