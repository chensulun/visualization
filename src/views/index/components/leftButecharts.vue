<template>
  <div id="directxcc" />
</template>
<script >
import * as echarts from 'echarts'
var myChart = null
var myColor = ['#fbc25b', '#2ab6ff']
export default {
  name: 'LeftButecharts',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arr: {
      type: Object
    }

  },
  data() {
    return {
      option: {
        backgroundColor: 'transparent',
        title: {
          text: '吨',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          top: '3%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          // top: '15%',
          right: '4%',
          left: '5.5%'
          // bottom: '%'
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1#石灰岩S16', '2#玄武岩S16', '3#玄武岩S12', '4#玄武岩S10', '5#石灰岩S11B', '6#石灰岩S9B', '7#石灰岩S11A', '8#石灰岩S9A', '9#石灰岩S14', '10#石灰岩S8', '11#玄武岩S14'
            ],
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.12)'
              }
            },
            axisLabel: {
              margin: 2,
              color: '#fff',
              textStyle: {
                fontSize: 10
              },
              interval: 0,
              rotate: -40// 角度顺时针计算的
            }
          }
        ],
        yAxis: [
          {
            splitNumber: 3,
            axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff'
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#233e64'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            barWidth: '10px',
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length
                  return myColor[params.dataIndex % num]
                },
                barBorderRadius: [10, 10, 10, 10],
                shadowColor: 'rgba(0,160,221,1)',
                shadowBlur: 4
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    'arr'(newVal, oldVal) {
      console.log(this.arr.materialList);
      if (this.arr.materialList && this.arr.materialList.length > 0) this.option.series[0].data = this.arr.materialList
      myChart.setOption(this.option)
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
      var chartDom = document.getElementById('directxcc')
      // if (this.arr.materialList) this.option.series[0].data = this.arr.materialList
      myChart = echarts.init(chartDom)
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>
<style lang="scss" scoped>
#directxcc {
  width: 546px;
  height: 356px;
}
</style>
