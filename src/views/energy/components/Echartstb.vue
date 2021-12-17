<template>
  <div class="Echartstb">
    <div ref="LeftBut" class="LeftBut" />
  </div>
</template>
<script >
import * as echarts from 'echarts'
var myChart = null

export default {
  name: 'Echartstb',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    data: {
      // 数组
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    // eslint-disable-next-line vue/require-default-prop
    name: {
      type: String
    }
  },
  data() {
    return {
      option: {
        backgroundColor: 'transparent',
        grid: {
          left: '5%',
          right: '10%',
          top: '20%',
          bottom: '15%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255,255,255,0)' // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255,255,255,1)' // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,255,255,0)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        },
        legend: {
          show: false,
          x: 'center',
          y: '35',
          icon: 'stack',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#999999'
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: '#999999'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            data: this.data.time
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            min: 0,
            // max: 1000,
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
                width: 1
              }
            }
          }
        ],
        series: [
          {
            name: this.name,
            type: 'line',
            stack: '总量',
            // symbol:'none',
            smooth: 'true',
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: '#52CCA3 '

              }
            },
            itemStyle: {
              normal: {
                color: '#0092f6',
                lineStyle: {
                  color: '#0092f6',
                  width: 2
                }

              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            },
            data: this.data.data
          }
        ]
      }
    }
  },
  watch: {
    data() {
      this.option.series[0].data = this.data.data
      this.option.xAxis[0].data = this.data.time
      this.init()
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },

  methods: {
    // 初始表表
    init() {
      var chartDom = this.$refs['LeftBut']
      myChart = echarts.init(chartDom)
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss">
.Echartstb {
  width: 674px;
  background: transparent;
  height: 310px;
  position: relative;
   .LeftBut {
    width: 100%;
    height: 100%;
    margin-right: 5px;
  }
}
</style>
