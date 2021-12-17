<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <!-- 左边 -->
      <div class="IndexLeft">
        <titleBox width="596px" height="125px">
          <LeftTop :arr="arr" />
        </titleBox>
        <!-- 左边任务看板 -->
        <titleBox title="任务看板" width="596px" height="289px">
          <Indextable :arr="arr" />
        </titleBox>
        <!-- 左边原材料消耗 -->
        <titleBox title="原材料消耗" width="596px" height="416px">
          <leftButecharts :arr="arr" />
        </titleBox>
      </div>

      <!-- 右边列表 -->
      <div class="IndexRight">
        <RightTop :arr="arr" />
        <titleBox
          title="生产数据"
          width="596px"
          height="226px"
        >
          <EchaDash v-for="(v,i) in eclist" :key="i" :name="v.name" :company="v.company" :value="v.value" />
        </titleBox>
        <!-- 左边任务看板 -->
        <titleBox title="耗能监测" width="596px" height="200px">
          <RightIn :arr="arr" />
        </titleBox>
        <!-- 左边原材料消耗 -->
        <titleBox title="厂区人员管理" width="596px" height="320px">
          <RightBut :arr="arr" />
        </titleBox>
      </div>
    </div>
  </div>
</template>

<script>
import titleBox from '../../components/TitleBox/TitleBox' // 通用背景组件
import EchaDash from '../../components/EchaDash/EchaDash' // 通用仪表盘组件
import RightTop from './components/RightTop' // 右边顶部组件
import LeftTop from './components/LeftTop' // 左边边顶部组件
import Indextable from './components/Indextable' // tabl
import leftButecharts from './components/leftButecharts' // 左边底部柱状图
import RightIn from './components/RightIn' // 右侧中间 比率图
import RightBut from './components/RightBut' // 右侧下部人员出勤率
import WebSocketClass from '../../utils/websockd'
let sock
export default {
  name: 'Dashboard',
  components: {
    titleBox,
    RightTop,
    Indextable,
    leftButecharts,
    RightIn,
    LeftTop,
    EchaDash,
    RightBut
  },
  data() {
    return {
      arr: {}, // soket连接返回的到数据
      flg: true, // 初始为true 第一次得到数据后是false
      eclist: [
        {
          name: '骨料温度',
          value: 0,
          company: '℃'
        }, {
          name: '出料温度',
          value: 0,
          company: '℃'
        }, {
          name: '油石比',
          value: 0,
          company: '%'
        }
      ]
    }
  },
  created() {
    const obj = {
      url: 'wss://test.zgdrkj.cn:8443/cs/index', // 连接的url地址
      // url: 'wss://222.209.86.27:8082/cs/index', // 连接的url地址
      onMessage: this.massage, // 监听的服务器发送的消息
      typecllk: this.typecllk // 连接状态的回调
    }
    this.$nextTick(() => {
      // 实例化
      sock = new WebSocketClass(obj)
      // 创建链接
      sock.createdWebSocket()
      console.log('当前链接地址' + obj.url)
    })
  },
  beforeDestroy() {
    console.log('组建销毁之前断开连接')
    sock.closeWebSocket()
  },
  methods: {
    // 监听消息
    massage(data) {
      const dat = JSON.parse(JSON.stringify(JSON.parse(data.data)))
      // 初始
      if (this.flg) {
        this.arr = dat
        console.log('index获取到到消息')
        this.eclist[0].value = this.arr.glTemp // 骨料温度
        this.eclist[1].value = this.arr.outTemp // 出料温度
        this.eclist[2].value = this.arr.ysb // 油石比
      } else {
        if (dat.glTemp !== undefined) this.eclist[0].value = dat.glTemp // 骨料温度
        if (dat.outTemp !== undefined) this.eclist[1].value = dat.outTemp // 出料温度
        if (dat.ysb !== undefined) this.eclist[2].value = dat.ysb // 油石比

        if (dat.dayShipmentTotal !== undefined) this.arr.dayShipmentTotal = dat.dayShipmentTotal // 当日生产量
        if (dat.monthShipmentTotal !== undefined) this.arr.monthShipmentTotal = dat.monthShipmentTotal // 当月生产量
        if (dat.yearShipmentTotal !== undefined) this.arr.yearShipmentTotal = dat.yearShipmentTotal // 当年生产量

        if (dat.abnormalAllTotal !== undefined) this.arr.abnormalAllTotal = dat.abnormalAllTotal // 异常总次数
        if (dat.temperatureAbnormalTotal !== undefined) this.arr.temperatureAbnormalTotal = dat.temperatureAbnormalTotal // 温度异常次数
        if (dat.pbAbnormalTota !== undefined) this.arr.pbAbnormalTota = dat.pbAbnormalTota // 配比异常次数

        if (dat.mTask !== undefined) this.arr.mTask = dat.mTask // 任务看板

        if (dat.materialList !== undefined) this.arr.materialList = dat.materialList // 原材料消耗
        if (dat.listHN !== undefined) this.arr.listHN = dat.listHN // 耗能监测
        if (dat.personManagerList !== undefined) this.arr.personManagerList = dat.personManagerList // 厂区人员管理
      }
      this.flg = false
      console.log(this.arr)
    },
    // 监听链接是否成功
    typecllk(type) {
      if (!type) {
        // 重新链接
        sock.createdWebSocket()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.IndexLeft,
.IndexRight {
  padding-top: 20px;
  height: 100%;
  min-height: 895px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}
</style>
