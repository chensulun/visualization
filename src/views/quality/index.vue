<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <!-- 左边 -->
      <div class="IndexLeft">
        <titleBox width="1150px" height="187px">
          <LeftTop :arr="arr" />
        </titleBox>
        <!-- 左边设计配比 -->
        <titleBox title="设计配比" width="1150px" height="218px">
          <Indextable :arr="arr" />
        </titleBox>
        <!-- 左边实际配比 -->
        <titleBox title="实际配比" width="1150px" height="435px">
          <LeftBut :arr="arr" />
        </titleBox>
      </div>

      <!-- 右边列表 -->
      <div class="IndexRight">
        <RightTop style=" width：692px " :arr="arr" />
        <titleBox title="生产数据" width="692px" height="236px">
          <EchaDash
            v-for="(v, i) in eclist"
            :key="i"
            :name="v.name"
            :value="v.value"
            :company="v.company"
          />
        </titleBox>
        <!-- 左边原材料消耗 -->
        <titleBox title="热成像画面" width="692px" height="533px">
          <play url="https://www.zgdrkj.cn:10813/nvc/888888/hls/stream_9/stream_9_live.m3u8" />
        </titleBox>
      </div>
    </div>
  </div>
</template>

<script>
import titleBox from '../../components/TitleBox/TitleBox' // 通用背景组件
import EchaDash from '../../components/EchaDash/EchaDash' // 通用仪表盘组件
import play from './components/play.vue' // 视频组件
import RightTop from './components/RightTop' // 右边顶部组件
import LeftTop from './components/LeftTop' // 左边边顶部组件
import Indextable from './components/Indextable' // 左边table 组件
import LeftBut from './components/LeftBut' // 左边底部table 组件
import WebSocketClass from '../../utils/websockd'
let sock
import { qualityParameters } from '@/api/api' // 获取接口
export default {
  name: 'Quality',
  components: {
    titleBox,
    RightTop,
    Indextable,
    LeftTop,
    EchaDash,
    play,
    LeftBut
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
      url: 'wss://test.zgdrkj.cn:8443/cs/qualityControl', // 连接的url地址
      // url: 'wss://222.209.86.27:8082/cs/qualityControl', // 连接的url地址
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
    sock.closeWebSocket()
  },
  methods: {
    // 监听消息
    massage(data) {
      const dat = JSON.parse(JSON.stringify(JSON.parse(data.data)))
      // 初始
      if (this.flg) {
        console.log('质量管理获取到到消息')
        console.log(dat)
        // 获取差值接口
        qualityParameters(dat.taskProductionType).then(res => {
          this.arr = dat
          this.eclist[0].value = this.arr.glTemp // 骨料温度
          this.eclist[1].value = this.arr.outTemp // 出料温度
          this.eclist[2].value = this.arr.ysb // 油石比
          this.$set(this.arr, 'qualityParameters', res.rows[0])
        })
      } else {
        if (dat.glTemp !== undefined) this.eclist[0].value = dat.glTemp // 骨料温度
        if (dat.outTemp !== undefined) this.eclist[1].value = dat.outTemp // 出料温度
        if (dat.ysb !== undefined) this.eclist[2].value = dat.ysb // 油石比

        if (dat.abnormalAllTotal !== undefined) this.arr.abnormalAllTotal = dat.abnormalAllTotal// 异常总次数
        if (dat.temperatureAbnormalTotal !== undefined) this.arr.temperatureAbnormalTotal = dat.temperatureAbnormalTotal// 温度异常
        if (dat.pbAbnormalTotal !== undefined) this.arr.pbAbnormalTotal = dat.pbAbnormalTotal// 配比异常

        if (dat.projectName !== undefined) this.arr.projectName = dat.projectName // 当前任务
        if (dat.taskProductionType !== undefined) this.arr.taskProductionType = dat.taskProductionType // 生产类型
        if (dat.taskPlannedQuantity !== undefined) this.arr.taskPlannedQuantity = dat.taskPlannedQuantity // 计划总量
        if (dat.productionTota !== undefined) this.arr.productionTota = dat.productionTota // 生产总量
        if (dat.supplyTotal !== undefined) this.arr.supplyTotal = dat.supplyTotal // 已供数量
        if (dat.designs !== undefined) this.arr.designs = dat.designs // 设计配比
        if (dat.practicals !== undefined) this.arr.practicals = dat.practicals // 实际配比

        if (dat.ysbList !== undefined) this.arr.ysbList = dat.ysbList // 油石比
        if (dat.outTempList !== undefined) this.arr.outTempList = dat.outTempList // 温度
        if (dat.oneList !== undefined) this.arr.oneList = dat.oneList // 仓1配比
      }
      this.flg = false
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
