<template>
  <div class="pa">
    <div ref="EchaDash" class="EchaDash" />
    <div class="pa-name"><span>{{ name }}</span></div>
  </div>
</template>
<script >
import * as echarts from 'echarts'
var myChart = null
export default {
  name: 'EchaDash',
  props: {
    name: {
      // 可选字段
      type: String,
      default: ''
    },
    value: {
      // 可选字段 必填字段
      type: Number,
      default: 0
    },
    company: {
      // 可选字段 必填字段
      type: String,
      default: '℃'
    }
  },
  data() {
    return {
      option: {
        series: [
          {
            name: '当日耗能',
            type: 'gauge',
            min: 0,
            max: 100,
            label: {
              show: false },
            data: [],
            center: ['50%', '50%'],
            radius: '75%',
            splitNumber: 4, // 刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLabel: {
              show: false
            }, // 刻度标签。
            axisLine: {
              lineStyle: {
                width: 15,
                color: [
                  [0.2, '#2ef7c5'],
                  [0.4, '#01a5ff'],
                  [0.6, '#59c8ff'],
                  [0.8, '#f9b008'],
                  [1, '#f07317']
                ]
              }
            },
            axisTick: {
              // 刻度线
              show: true,
              length: 5,
              splitNumber: 5,
              distance: -10,
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              // 分割线
              show: false,
              length: 10,
              lineStyle: {
                color: '#F8C232',
                width: 1
              }
            }, // 分隔线样式

            detail: {
              // 仪表盘 显示数据
              formatter: `{value} ${this.company}`,
              fontSize: 14,
              fontWeight: 'bold',
              textStyle: {
                padding: [0, 0, 0, 0],
                fontSize: 14,
                fontWeight: '500',
                color: '#2ef7c5'
              }
            },
            pointer: {
              // 仪表盘指针
              show: true,
              length: '50%',
              width: 3
            },
            itemStyle: {
              // 仪表盘指针样式
              color: 'rgba(248, 194, 50, 1)', // 指针颜色，默认(auto)取数值所在的区间的颜色
              opacity: 0.3, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
              borderWidth: 0, // 描边线宽,默认 0。为 0 时无描边。
              borderType: 'solid', // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
              borderColor: '#000', // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
              shadowBlur: 1, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
              shadowColor: '#fff' // 阴影颜色。支持的格式同color。
            }
          }
        ]
      }
    }
  },
  watch: {
    value() {
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
      var chartDom = this.$refs['EchaDash']
      this.$set(this.option.series[0], 'data', [{ value: this.value !== 0 ? this.value.toFixed(2) : 0, name: '' }])
      myChart = echarts.init(chartDom)
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>
<style lang="scss" >
.EchaDash {
  width: 160px;
  background: transparent;
  height: 160px;
}

//选中样式
.pa {
  position: relative;
  &-name {
    min-width: 100%;
    height: 22px;
    position: absolute;
    z-index: 3;
    top: 115px;
    text-align: center;
    span{
    padding:  5px;
    background-color: rgba(#26ddff, 0.12) !important;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 0px;
    color: #00caff !important;
    }
  }
}
</style>
