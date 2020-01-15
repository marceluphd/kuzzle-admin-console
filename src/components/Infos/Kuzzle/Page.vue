<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <GenericCard />
      </b-col>
      <b-col>
        <CPUCard />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <MemoryCard />
      </b-col>
      <b-col>
        <DiskCard />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GenericCard from './GenericCard'
import CPUCard from './CPUCard'
import DiskCard from './DiskCard'
import MemoryCard from './MemoryCard'

export default {
  components: {
    GenericCard,
    CPUCard,
    DiskCard,
    MemoryCard
  }
}
</script>

<style></style>
