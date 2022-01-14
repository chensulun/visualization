<template>
  <div class="pa">
    <el-radio-group v-model="type" class="but" @change="changeType">
      <el-radio-button label="日" />
      <el-radio-button label="月" />
      <el-radio-button label="年" />
    </el-radio-group>
    <div ref="ratio" class="ratio" />
  </div>
</template>
<script >
import * as echarts from 'echarts'
var myChart = null
import { getEnergyList } from '@/api/api'
export default {
  name: 'LeftButecharts',
  data() {
    return {
      type: '月',
      getDate: {
        type: '4', // 1-电能（电加热沥青），2-天然气，3-电能（生产），4-水能
        phase: '2' // 1-日，2-月，3-年
      },
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
          min: 0
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '14',
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
            data: ['全部', '水(软化)', '水(清洗)']
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            data: ['0立方米', '0度', '0吨'],
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '14',
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
                color: '#fff',
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
            barWidth: 20,
            data: [0, 0, 0]
          }
        ]
      }
    }
  },
  created() {
    this.getdata()
    setInterval(() => {
      this.getdata()
    }, 180000)
  },
  methods: {
    // 初始表表
    init() {
      var chartDom = this.$refs['ratio']
      myChart = echarts.init(chartDom)
      this.option && myChart.setOption(this.option)
    },
    // 调用接口获取数据
    getdata() {
      getEnergyList(this.getDate).then(res => {
        if (res.list !== null) {
          this.option.series[0].data = res.list
          this.option.yAxis[1].data = [`${res.list[0]}立方`, `${res.list[1]}立方`, `${res.list[2]}立方`]
          // 重新赋值之后调用重绘
          this.init()
        }
      })
    },
    changeType(e) {
      if (e === '日') this.getDate.phase = '1'
      if (e === '月') this.getDate.phase = '2'
      if (e === '年') this.getDate.phase = '3'
      this.getdata()
    }

  }
}
</script>

<style lang="scss" scoped>
.ratio {
  width: 100%;
  background: transparent;
  height: 329px;
}

//选中样式
.pa {
  position: relative;
   width: 100%;
  background: transparent;
  .but {
    position: absolute;
    right: 0;
    top: -30px;
    z-index: 2;
  }
}
</style>
