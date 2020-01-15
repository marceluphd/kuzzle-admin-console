<template>
  <b-card title="Memory Usage">
    <b-card-text>
      Ram:
      <b-progress :max="totalValue" height="2rem">
        <b-progress-bar :value="usedValue">
          Used:
          <strong>{{ usedLabel }} / {{ totalLabel }}</strong>
        </b-progress-bar>
      </b-progress>
      <b-list-group>
        <b-list-group-item>
          Kuzzle used:
          <b-badge variant="white" pill>
            {{ getSize(getMemoryInfos.kuzzleUsed) }}
          </b-badge>
        </b-list-group-item>
        <b-list-group-item>
          Redis used:
          <b-badge variant="white" pill>
            {{ getMemoryInfos.redisUsed }}
          </b-badge>
        </b-list-group-item>
        <b-list-group-item>
          Redis peak:
          <b-badge variant="white" pill>
            {{ getMemoryInfos.redisPeak }}
          </b-badge>
        </b-list-group-item>
      </b-list-group>
      JVM Heap:
      <b-progress :max="heapMax" height="2rem">
        <b-progress-bar :value="heapValue">
          Used:
          <strong
            >{{ getMemoryInfos.jvmHeap.heap_used }} /
            {{ getMemoryInfos.jvmHeap.heap_max }}</strong
          >
        </b-progress-bar>
      </b-progress>
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getMemoryInfos']),
    totalValue() {
      return this.getSizeWithoutUnity(this.getMemoryInfos.total)
    },
    totalLabel() {
      return this.getSize(this.getMemoryInfos.total)
    },
    usedLabel() {
      return this.getSize(this.getMemoryInfos.total - this.getMemoryInfos.free)
    },
    usedValue() {
      return this.getSizeWithoutUnity(
        this.getMemoryInfos.total - this.getMemoryInfos.free
      )
    },
    heapValue() {
      return this.getMemoryInfos.jvmHeap.heap_used_in_bytes
    },
    heapMax() {
      return this.getMemoryInfos.jvmHeap.heap_max_in_bytes
    }
  },
  methods: {
    getSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes == 0) return '0 Byte'
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return (
        Math.round((bytes / Math.pow(1024, i)) * 100, 2) / 100 + ' ' + sizes[i]
      )
    },
    getSizeWithoutUnity(bytes) {
      if (bytes == 0) return '0 Byte'
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round((bytes / Math.pow(1024, i)) * 100, 2) / 100
    }
  },
  data() {
    return {
      // series: [],
      // chartOptions: {
      //   chart: {
      //     height: 390,
      //     type: 'radialBar'
      //   },
      //   plotOptions: {
      //     radialBar: {
      //       offsetY: 0,
      //       startAngle: 0,
      //       endAngle: 270,
      //       hollow: {
      //         margin: 5,
      //         size: '30%',
      //         background: 'transparent',
      //         image: undefined
      //       },
      //       dataLabels: {
      //         name: {
      //           show: false
      //         },
      //         value: {
      //           show: false
      //         }
      //       }
      //     }
      //   },
      //   colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      //   labels: [],
      //   legend: {
      //     show: true,
      //     floating: true,
      //     fontSize: '16px',
      //     position: 'left',
      //     offsetX: 160,
      //     offsetY: 10,
      //     labels: {
      //       useSeriesColors: true
      //     },
      //     markers: {
      //       size: 0
      //     },
      //     formatter: function(seriesName, opts) {
      //       return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
      //     },
      //     itemMargin: {
      //       horizontal: 3
      //     }
      //   },
      //   responsive: [
      //     {
      //       breakpoint: 480,
      //       options: {
      //         legend: {
      //           show: false
      //         }
      //       }
      //     }
      //   ]
      // }
    }
  }
}
</script>

<style></style>
