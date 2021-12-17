<template>
  <div id="directxcc" />
</template>
<script >
import * as echarts from "echarts";
var myChart = null;
// var myColor = ["#fbc25b", "#2ab6ff"];
export default {
  name: "LeftButecharts",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arr: {
      type: Object,
    },
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // show: false,
            position: "top",
            data: [],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize:'20',
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false, //不显示坐标轴刻度线
            },
            axisLine: {
              show: false, //不显示坐标轴线
            },
            axisLabel: {
              show: false, //不显示坐标轴上的文字
            },
            splitLine: {
              //网格线
              show: false,
            },
          },
        ],
        series: [
          {
            name: "Email",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "inside", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 16,
                  },
                },
              },
            },
          },
          // {
          //   name: "Union Ads",
          //   type: "bar",
          //   stack: "Ad",
          //   emphasis: {
          //     focus: "series",
          //   },
          //   data: [],
          //   itemStyle: {
          //     normal: {
          //       label: {
          //         show: true, //开启显示
          //         position: "inside", //在上方显示
          //         textStyle: {
          //           //数值样式
          //           color: "white",
          //           fontSize: 16,
          //         },
          //       },
          //     },
          //   },
          // },
        ],
      },
    };
  },
  watch: {
    arr(newVal, oldVal) {
      var that = this;
      // console.log(that.arr);
      if (that.arr && that.arr.length > 0) {
        var array = [];
        var y1 = [];
        var y2 = [];
        that.arr.forEach((e) => {
          console.log(e);
          array.push(e.name);
          y1.push(e.value.proportion);
          y2.push(e.value.weight);
        });
        that.option.xAxis[0].data = array;
        that.option.series[0].data = y1;
        // that.option.series[1].data = y2;
      }
      myChart.setOption(that.option);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    // 初始表表
    init() {
      var chartDom = document.getElementById("directxcc");
      // if (this.arr.materialList) this.option.series[0].data = this.arr.materialList
      myChart = echarts.init(chartDom);
      this.option && myChart.setOption(this.option);
    },
  },
};
</script>
<style lang="scss" scoped>
#directxcc {
  width: 100%;
  height: 200px;
  // background-color: red;
}
</style>
