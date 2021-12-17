<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <!-- 左边 -->
      <div class="IndexLeft">
        <div width="1228px" class="fld" height="71px">
          <div class="fld-tod">
            <img
              style="margin: 0 10px 0"
              src="../../../static/设备管理/警告总数.png"
              alt=""
            >
            <span style="font-size:16px">警告总数</span>
            <span style="color:#54f0ff">{{ arr.warningTotal !== undefined ? arr.warningTotal : 0 }}</span>
            <span style="font-size:16px">个</span>
          </div>
          <div class="fld-tod">
            <img
              style="margin: 0 10px 0"
              src="../../../static/设备管理/已处理.png"
              alt=""
            >
            <span style="font-size:16px">已处理</span>
            <span style="color:#e4a746">{{ arr.dealWithTotal !== undefined ? arr.dealWithTotal : 0 }}</span>
            <span style="font-size:16px">个</span>
          </div>
          <div class="fld-tod">
            <img
              style="margin: 0 10px 0"
              src="../../../static/设备管理/未处理.png"
              alt=""
            >
            <span style="font-size:16px">未处理</span>
            <span style="color:#ff4866">{{ arr.untreatedTotal !== undefined ? arr.untreatedTotal : 0 }}</span>
            <span style="font-size:16px">个</span>
          </div>
        </div>

        <!-- 左边任务看板 -->
        <div
          style="
            margin-bottom: 10px;
            width: 1228px;
            height: 268px;
            display: flex;
            justify-content: space-between;
          "
        >
          <titleBox title="设备事故情况" width="609px" height="262px">
            <LeftTable :arr="arr" />
          </titleBox>
          <titleBox title="设备保养记录" width="609px" height="262px">
            <RightTable :arr="arr" />
          </titleBox>
        </div>

        <!-- 左边温度监控 -->
        <titleBox title="温度监控" width="1228px" height="511px">
          <div class="wendu">
            <EchaDash
              v-for="(v, i) in eclist"
              :key="i"
              :name="v.name"
              :value="v.value"
              :company="v.company"
            />
          </div>
        </titleBox>
      </div>

      <!-- 右边列表 -->
      <div class="IndexRight">
        <titleBox title="运行状态监测" width="596px" height="865px">
          <RightBox :arr="arr" />
        </titleBox>
      </div>
    </div>
  </div>
</template>

<script>
import titleBox from '../../components/TitleBox/TitleBox' // 通用背景组件
import EchaDash from '../../components/EchaDash/EchaDash' // 通用仪表盘组件
import RightBox from './components/RightBox.vue' // 右边
import RightTable from './components/RightTable.vue' // 右边table
import LeftTable from './components/LeftTable.vue' // 左边table
import WebSocketClass from '../../utils/websockd'
let sock
export default {
  name: 'Quality',
  components: {
    titleBox,
    EchaDash,
    RightBox,
    RightTable,
    LeftTable
  },
  data() {
    return {
      arr: {}, // soket连接返回的到数据
      flg: true, // 初始为true 第一次得到数据后是false
      eclist: [
        {
          name: '振动筛电机温度',
          value: 0,
          company: '℃'
        },
        {
          name: '搅拌缸减速机温度 ',
          value: 0,
          company: '℃'
        },
        {
          name: '骨料提升机减速机温度',
          value: 0,
          company: '℃'
        },
        {
          name: '再生料烘干筒电机温度',
          value: 0,
          company: '℃'
        },
        {
          name: '除尘器风道烟气温度',
          value: 0,
          company: '℃'
        },
        {
          name: '再生料料提升机减速机温度',
          value: 0,
          company: '℃'
        },
        {
          name: '原生料烘干筒电机温度',
          value: 0,
          company: '℃'
        },
        {
          name: '引风机电机温度',
          value: 0,
          company: '℃'
        }
      ]
    }
  },
  created() {
    const obj = {
      url: 'wss://test.zgdrkj.cn:8443/cs/equipment', // 连接的url地址
      // url: 'wss://222.209.86.27:8082/cs/equipment', // 连接的url地址
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
        console.log('设备管理获取到到消息')
        this.arr = dat
        console.log(dat)
        this.eclist[0].value = this.arr.zdsTemp // 振动筛电机温度
        this.eclist[1].value = this.arr.jbgTemp // 搅拌缸减速机温度
        this.eclist[2].value = this.arr.glTemp // 骨料提升机减速机温度
        this.eclist[3].value = this.arr.zslhgTemp // 再生料烘干筒减速机温度
        this.eclist[4].value = this.arr.ccqTemp // 除尘器风道烟气温度
        this.eclist[5].value = this.arr.zsltsTemp // 再生料提升机减速机温度
        this.eclist[6].value = this.arr.yslTemp // 原生料烘干筒电机温度
        this.eclist[7].value = this.arr.yfjTemp // 引风机电机温度
      } else {
        if (dat.equipmentConditionVOList !== undefined) this.arr.equipmentConditionVOList = dat.equipmentConditionVOList // 设备事故情况
        if (dat.equipmentRecordsVOList !== undefined) this.arr.equipmentRecordsVOList = dat.equipmentRecordsVOList // 设备保养记录
        if (dat.runningStateList !== undefined) this.arr.runningStateList = dat.runningStateList // 运行状态监测

        if (dat.warningTotal !== undefined) this.arr.warningTotal = dat.warningTotal // 警告总数
        if (dat.dealWithTotal !== undefined) this.arr.dealWithTotal = dat.dealWithTotal // 已处理
        if (dat.untreatedTotal !== undefined) this.arr.untreatedTotal = dat.untreatedTotal // 未处理

        if (dat.zdsTemp !== undefined) this.eclist[0].value = this.arr.zdsTemp // 振动筛电机温度
        if (dat.jbgTemp !== undefined) this.eclist[1].value = this.arr.jbgTemp // 搅拌缸减速机温度
        if (dat.glTemp !== undefined) this.eclist[2].value = this.arr.glTemp // 骨料提升机减速机温度
        if (dat.zslhgTemp !== undefined) this.eclist[3].value = this.arr.zslhgTemp // 再生料烘干筒减速机温度
        if (dat.ccqTemp !== undefined) this.eclist[4].value = this.arr.ccqTemp // 除尘器风道烟气温度
        if (dat.zsltsTemp !== undefined) this.eclist[5].value = this.arr.zsltsTemp // 再生料提升机减速机温度
        if (dat.yslTemp !== undefined) this.eclist[6].value = this.arr.yslTemp // 原生料烘干筒电机温度
        if (dat.yfjTemp !== undefined) this.eclist[7].value = this.arr.yfjTemp // 引风机电机温度
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

.wendu {
  width: 1228px;
  height: 360px;
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
   align-content:space-between;
  .pa {
    height: 160px !important;
    margin: 0 65px;
  }
}
.fld {
  display: flex;
  align-items: center;
  justify-content: inherit;
  padding: 5px !important;
  border: 2px solid rgba($color: #00a8ff, $alpha: 0.2);
  &-tod {
    width: 33%;
    height: 100%;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    border-right: 1px solid #16578d;
    text-align: center;
    padding-left: 8%;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      margin-right: 5px;
    }
  }
  .fld-tod:nth-child(3) {
    border: 0;
  }
}
</style>
