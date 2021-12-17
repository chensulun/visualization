<template>
  <div class="RightBut">
    <div ref="leftechar" class="leftechar" />
    <div class="RightButTitl">
      <div class="RightButTitl-div">
        <p>今日峰值</p>
        <div>{{ arr.personManagerList ? arr.personManagerList[0].value : 0 }}人</div>
      </div>
      <div class="RightButTitl-div">
        <p>今日出勤率</p>
        <div>{{ arr.personManagerList ? arr.personManagerList[1].value : 0 }}%</div>
      </div>
    </div>
  </div>
</template>
<script >
import * as echarts from 'echarts'
var myChart = null

export default {
  name: 'LeftButecharts',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arr: {
      type: Object
    }

  },
  data() {
    return {}
  },
  watch: {
    'arr'(newVal, oldVal) {
      if (this.arr.personManagerList !== undefined) {
        const list = JSON.parse(JSON.stringify(this.arr.personManagerList))
        list.shift() // 删除第一个之后传日图表渲染
        list.shift() // 删除第一个之后传日图表渲染
        this.init(list)
      }
    }

  },

  mounted() {
    this.$nextTick(() => {
      this.init([])
    })
  },

  methods: {
    // 初始表表
    init(list) {
      var chartDom = this.$refs['leftechar']
      myChart = echarts.init(chartDom)
      this.option && myChart.setOption(this.option(list))
    },
    // 组织参数函数
    option(list) {
      var img = require('/static/index/87.png')
      const colorList = [
        '#FFC67E',
        '#5DB7D2',
        '#BF8AF2',
        '#FF945E',
        '#1773DD',
        '#61D79B'
      ]
      return {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}' + '人',
          backgroundColor: 'rgba(67,100,247,1)',
          textStyle: {
            color: '#fff'
          },
          // padding: [10, 10],
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: '#fff'
            }
          }
        },
        graphic: {
          elements: [
            {
              type: 'image',
              z: 3,
              style: {
                image: img,
                width: 117,
                height: 115
              },
              // left: 'center',
              top: 'center',
              position: [77, 100]
            }
          ]
        },
        legend: {
          orient: 'vertical',
          right: '5%',
          align: 'left',
          top: 'middle',
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle',
          itemGap: 6,
          data: list,
          formatter: function(name) {
            var res = ''
            for (var i = 0; i < list.length; i++) {
              if (list[i].name === name) {
                res +=
                  '{a|' +
                  name +
                  '}' +
                  ' ' +
                  '{b|' +
                  list[i].value +
                  '} {c|人}'
              }
            }
            return res
          },
          textStyle: {
            color: '#000',
            rich: {
              a: {
                fontSize: 16,
                color: '#49c9ff',
                padding: [0, 10, 0, 6]
              },
              b: {
                fontSize: 16,
                color: '#ffd426',
                padding: [0, 6, 0, 6]
              },
              c: {
                fontSize: 16,
                color: '#fff',
                padding: [0, 6, 0, 6]
              }
            }
          }
        },
        series: [
          {
            type: 'pie',
            zlevel: 3,
            radius: ['60', '85'],
            center: ['25%', '50%'],
            color: colorList,
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: 'transparent'
              }
            },
            data: list,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              show: false
            }
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" >
.RightBut {
  width: 546px;
  background: transparent;
  height:260px;
  position: relative;
  .leftechar {
    width: 100%;
    height: 100%;
    margin-right: 5px;
  }
  .RightButTitl {
    width: 193px;
    height: 59px;

    position: absolute;
    right: 20px;
    top: -28px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    &-div {
      width: 85px;
      height: 100%;
      p {
        width: 63px;
        height: 12px;
        font-family: SourceHanSansCN-Regular;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28px;
        letter-spacing: 0px;
        color: #eff0f1;
        margin: 0 0 14px 0;
        padding: 0;
        display: block;
      }
      div {
        width: 85px;
        height: 31px;
        background-color: rgba(#373942, 0.8);
        border: solid 1px #00b5ed;
        background: url("../../../../static/index/88.png") no-repeat;
        background-size: 100% 100%;
        font-family: ArialMT;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 31px;
        letter-spacing: 0px;
        color: #00c3ff;
        text-align: center;
      }
    }
  }
}
</style>
