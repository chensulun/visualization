<template>
  <div class="pa">
    <div id="ratio" />
  </div>
</template>
<script >
import * as echarts from 'echarts'
var myChart = null
console.log(echarts)
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
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '10%',
          containLabel: true
        },
        backgroundColor: 'transparent',
        xAxis: {
          show: false,
          type: 'value',
          max: 100
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '12',
                color: '#03fcfe'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: ['天然气', '水', '电']
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            data: ['0立方米', '0吨', '0度'],
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '12',
                color: '#ffffff'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
              borderRadius: 20
            },
            label: {
              show: true,
              position: 'right',
              formatter: '',
              textStyle: {
                color: '#03fcfe',
                fontSize: '18'
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgb(52,236,255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(254,225,143,100)'
                  }
                ])
              }
            },
            barWidth: 10,
            data: [0, 0, 0]
          }
        ]
      }
    }
  },
  watch: {
    'arr'(newVal, oldVal) {
      if (this.arr.listHN && this.arr.listHN.length > 0) {
        this.option.series[0].data = this.arr.listHN
        this.option.yAxis[1].data = [`${this.arr.listHN[0]}立方米`, `${this.arr.listHN[1]}吨`, `${this.arr.listHN[2]}度`]
      }
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
      var chartDom = document.getElementById('ratio')
      myChart = echarts.init(chartDom)
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>
<style lang="scss" >
#ratio {
  width: 546px;
  background: transparent;
  height: 165px;
}

//选中样式
.pa {
  position: relative;
  .but {
    position: absolute;
    right: 0;
    top: -30px;
    z-index: 2;
  }
}
</style>
