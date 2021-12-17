<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="scgl">
        <div class="top">
          <div>
            <div>
              <p><span>{{ arr.dayShipmentTotal !== undefined ? arr.dayShipmentTotal : 0 }}</span>吨</p>
              <p>当日生产量</p>
            </div>
          </div>
          <div>
            <div>
              <p><span>{{ arr.monthShipmentTotal !== undefined ? arr.monthShipmentTotal : 0 }}</span>吨</p>
              <p>当月生产量</p>
            </div>
          </div>
          <div>
            <div>
              <p><span>{{ arr.yearShipmentTotal !== undefined ? arr.yearShipmentTotal : 0 }}</span>吨</p>
              <p>当年生产量</p>
            </div>
          </div>
        </div>
        <titleBox
          title="生产任务"
          width="1191px"
          height="738px"
        ><ProductionTable :arr="arr" /></titleBox>
      </div>

      <!-- 右边 -->
      <titleBox
        title="正供项目运输车辆GPS定位图"
        width="644px"
        height="895px"
      ><baidumap /> </titleBox>
    </div>
  </div>
</template>

<script>
import titleBox from '../../components/TitleBox/TitleBox' // 通用背景组件
import ProductionTable from './components/ProductionTable.vue'
import baidumap from './components/Map.vue'// 地图
import WebSocketClass from '../../utils/websockd'
let sock
export default {
  name: 'Dashboard',
  components: {
    titleBox,
    ProductionTable,
    baidumap
  },
  data() {
    return {
      arr: {}, // soket连接返回的到数据
      flg: true // 初始为true 第一次得到数据后是false
    }
  }, created() {
    const obj = {
      url: 'wss://test.zgdrkj.cn:8443/cs/productionManagement', // 连接的url地址
      // url: 'wss://222.209.86.27:8082/cs/productionManagement', // 连接的url地址
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
        console.log('生产管理获取到到消息')
      } else {
        if (dat.productionTaskVOList !== undefined) this.arr.productionTaskVOList = dat.productionTaskVOList // 生产任务
        if (dat.dayShipmentTotal !== undefined) this.arr.dayShipmentTotal = dat.dayShipmentTotal // 当日生产量
        if (dat.monthShipmentTotal !== undefined) this.arr.monthShipmentTotal = dat.monthShipmentTotal // 当月生产量
        if (dat.yearShipmentTotal !== undefined) this.arr.yearShipmentTotal = dat.yearShipmentTotal // 当年生产量
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
.scgl {
    height: 100%;
  min-height: 895px;
  .top {
    width: 1191px;
    height: 132px;
    margin: 10px 0;
    display: flex;
    > div {
      width: 33.3% !important;
      height: 132px;
      position: relative;
      > div {
        width: 208px;
        height: 100%;
        float: right;
        margin-right: 80px;
        padding-top: 20px;
        text-align: center;
        p {
          padding: 0;
          margin: 0;
          color: #fff;
          font-size: 14px;
          span {
            color: #54f0ff;
            font-size: 28px;
          }
        }
        p:nth-child(2) {
          font-size: 16px;
        }
      }
    }
    > div:nth-child(1) {
      background: url("../../../static/生产管理/当日生产量.png") no-repeat !important;
      background-size: 100% 100%;
    }
    > div:nth-child(2) {
      background: url("../../../static/生产管理/当月生产量.png") no-repeat !important;
      background-size: 100% 100%;
    }
    > div:nth-child(3) {
      background: url("../../../static/生产管理/当年生产量.png") no-repeat !important;
      background-size: 100% 100%;
    }
  }
}
</style>
