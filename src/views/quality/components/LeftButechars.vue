<template>
  <div class="LeftButechars">
    <div ref="LeftBut" class="LeftBut" />
  </div>
</template>
<script >
import * as echarts from 'echarts'
var myChart = null

export default {
  name: 'LeftButechars',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arrayData: {
      // 数组
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    // eslint-disable-next-line vue/prop-name-casing
    Company: {
      // 单位
      type: String,
      default: ''
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
            color: '#1bb4f6'
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: '#30eee9'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#397cbc'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#195384'
              }
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: this.Company,
            // min: 0,
            // max: 1000,
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#2ad1d2'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#27b4c2'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#11366e'
              }
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            stack: '',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#0092f6',
                lineStyle: {
                  color: '#0092f6',
                  width: 1
                }
                //           areaStyle: {
                // 			//color: '#94C9EC'
                // 			color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                // 				offset: 0,
                // 				color: 'rgba(7,44,90,0.3)'
                // 			}, {
                // 				offset: 1,
                // 				color: 'rgba(0,146,246,0.9)'
                // 			}]),
                //           }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            },
            data: this.arrayData
          }
        ]
      }
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
<style lang="scss" >
.LeftButechars {
  width: 100%;
  background: transparent;
  height: 100%;
  position: relative;
  .LeftBut {
    width: 100%;
    height: 100%;
    margin-right: 5px;
  }
}
</style>
