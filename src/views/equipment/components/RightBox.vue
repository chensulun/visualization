<template>
  <div class="pa">
    <div ref="ratio" class="ratio" />
  </div>
</template>
<script >
import * as echarts from 'echarts'
var myChart = null

var xingm = [' 引风机电流 ', '搅拌缸电流', '振动筛电流', '原生骨料提升机电流', '原生料烘干筒电流', '再生料烘干筒电流', '沥青泵电流', '除尘器风道进出口负压', '烘干筒进出口负压']

export default {
  name: 'RightBox',
  props: {
    arr: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      option: {
        backgroundColor: 'transparent',
        // color: ['#61A8FF'], //进度条颜色
        /* grid: {
         left: '-10%',  //如果离左边太远就用这个......
         //right: '14%',
         bottom: '5%',
         top: '5%',
         containLabel: true
     },*/
        xAxis: [{
          show: false
        },
        // 由于下边X轴已经是百分比刻度了,所以需要在顶部加一个X轴,刻度是金额,也隐藏掉
        {
          show: false
        }
        ],
        yAxis: [{
          type: 'category',
          axisLabel: {
            show: false // 让Y轴数据不显示
          },
          itemStyle: {

          },
          axisTick: {
            show: false // 隐藏Y轴刻度
          },
          axisLine: {
            show: false // 隐藏Y轴线段
          },
          data: xingm.reverse()
        }, {
          show: true,
          inverse: true,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          axisLabel: {
            margin: 6,
            textStyle: {
              interval: 0,
              shadowOffsetX: '-20px',
              color: '#fff',
              align: 'right',
              verticalAlign: 'bottom',
              lineHeight: 40,
              fontSize: 12
            }
            // formatter: '{value} 万元'
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: [
        // 蓝条--------------------我是分割线君------------------------------//
          {
            show: true,
            type: 'bar',
            barGap: '-100%',
            backgroundStyle: {
              // color: 'rgba(180, 180, 180, 0.2)',
              borderRadius: 30
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
            // max: 1,
            labelLine: {
              show: false
            },
            // z: 2,
            barWidth: 20,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          // 数据条--------------------我是分割线君------------------------------//
          {
            show: true,
            type: 'bar',
            xAxisIndex: 1, // 代表使用第二个X轴刻度!!!!!!!!!!!!!!!!!!!!!!!!
            barGap: '-100%',
            barWidth: '20', // 统计条宽度
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: 'rgba(22,203,115,0.05)'
              }
            },
            label: {
              normal: {
                show: true,
                // label 的position位置可以是top bottom left,right,也可以是固定值
                // 在这里需要上下统一对齐,所以用固定值
                position: [0, '-100%'],
                rich: { // 富文本
                  white: { // 自定义颜色
                    color: '#03fcfe'
                  }
                },
                formatter: function(data) {
                  // 富文本固定格式{colorName|这里填你想要写的内容}
                  return '{white|' + xingm[data.dataIndex] + '}'
                }
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          }

        ]
      }
    }
  },
  watch: {
    arr() {
      this.option.series[0].data = JSON.parse(JSON.stringify(this.arr.runningStateList.reverse()))
      this.option.series[1].data = JSON.parse(JSON.stringify(this.arr.runningStateList.reverse()))
      // 右边显示
      this.option.yAxis[1].data = JSON.parse(JSON.stringify(this.arr.runningStateList))
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
      var chartDom = this.$refs['ratio']
      myChart = echarts.init(chartDom)
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
.ratio {
  width: 100%;
  background: transparent;
  height: 764px;
}

//选中样式
.pa {
  position: relative;
   width: 100%;
  background: transparent;
}
</style>
