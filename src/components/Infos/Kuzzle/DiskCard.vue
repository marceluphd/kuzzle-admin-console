<template>
  <b-card title="Disk Usage">
    <b-card-text>
      <apexchart
        type="radialBar"
        height="390"
        :options="chartOptions"
        :series="series"
      />
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getDiskInfos'])
  },
  mounted() {
    for (const disk of Object.keys(this.getDiskInfos)) {
      this.chartOptions.labels.push(`${disk}`)
      this.series.push(this.getDiskInfos[disk].replace(/[^\d.-]/g, ''))
    }
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 390,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: [],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'left',
          offsetX: 160,
          offsetY: 10,
          labels: {
            useSeriesColors: true
          },
          markers: {
            size: 0
          },
          formatter: function(seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            horizontal: 3
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style></style>
