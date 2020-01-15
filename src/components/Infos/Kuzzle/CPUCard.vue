<template>
  <b-card title="CPU Frequencies">
    <!-- <b-card-sub-title class="text-center m-3">
      <i class="fa fa-memory" aria-hidden="true" />
      Memory
    </b-card-sub-title>
    <b-card-text>
      <b-list-group>
        <b-list-group-item>
          Free:
          {{ getSize(getMachineInfos.memory.free) }}
        </b-list-group-item>
        <b-list-group-item>
          Total:
          {{ getSize(getMachineInfos.memory.total) }}
        </b-list-group-item>
      </b-list-group>
    </b-card-text> -->
    <!-- <b-card-sub-title class="text-center m-3">
      <i class="fa fa-microchip" aria-hidden="true" />
      CPUs
    </b-card-sub-title> -->
    <b-card-text>
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <!-- <b-list-group>
        <b-list-group-item
          v-for="(cpu, index) of getMachineInfos.cpus"
          :key="index"
        >
          {{ cpu.model }}
          <b-badge variant="white" pill> {{ cpu.speed }} MHz </b-badge>
        </b-list-group-item>
      </b-list-group> -->
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  watch: {
    getCpuInfos: {
      deep: true,
      handler() {
        this.chartOptions.xaxis.categories = []
        this.series = []
        for (const [index, cpu] of this.getCpuInfos.entries()) {
          this.chartOptions.xaxis.categories.push(`${index}`)
          this.series.push({
            name: cpu.model,
            data: [cpu.speed]
          })
        }
      }
    }
  },
  mounted() {
    for (const [index, cpu] of this.getCpuInfos.entries()) {
      this.chartOptions.xaxis.categories.push(`${index}`)
      this.series.push({
        name: cpu.model,
        data: [cpu.speed]
      })
    }
  },
  computed: {
    ...mapGetters(['getCpuInfos']),
    getMemory() {
      return (
        this.getMachineInfos.memory.total - this.getMachineInfos.memory.free
      )
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
    }
  },
  data() {
    return {
      series: [],
      chartOptions: {
        legend: {
          show: false
        },
        chart: {
          height: 350,
          type: 'bar',
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top' // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: false,
          formatter: function(val) {
            return val + 'Mhz'
          },
          offsetY: 10,
          style: {
            fontSize: '10px',
            colors: ['#304758']
          }
        },
        xaxis: {
          title: {
            text: 'CPU cores'
          },
          labels: {
            show: true,
            formatter: function(val) {
              return `${parseInt(val) + 1}`
            }
          },
          categories: [],
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          }
        },
        tooltip: {
          enabled: false
        },
        fill: {
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          title: {
            text: 'Frequency (Mhz)'
          },
          min: 0,
          max: 7000,
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: true,
            formatter: function(val) {
              return val
            }
          }
        }
      }
    }
  }
}
</script>

<style></style>
