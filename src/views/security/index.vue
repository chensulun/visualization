<template>
  <div class="dashboard-container">
    <div class="dashboard-text Security">
      <!-- 左边盒子 -->
      <div class="Security-left">
        <titleBox title="安全记事" width="440px" height="352px">
          <div class="anquanjishi">
            <div>
              <div class="topleft" />
              <div class="topBUT">
                <p>安全生产天数</p>
                <div class="topbac">{{ arr.securityDay !== undefined ? arr.securityDay < 100 ? `00${arr.securityDay}`: arr.securityDay < 1000 ? `0${arr.securityDay}` : arr.securityDay : '0000' }}</div>
              </div>
            </div>
            <div>
              <div class="butleft" />
              <div class="topBUT">
                <p>安全事故</p>
                <div class="butbac">{{ arr.securityNumber !== undefined ? arr.securityNumber< 10 ? `0${arr.securityNumber}`: arr.securityNumber : '00' }}</div>
              </div>
            </div>
          </div>
        </titleBox>
        <titleBox title="安全检查" width="440px" height="513px">
          <SecurityCheck :arr="arr" />
        </titleBox>
      </div>
      <!-- 右边边盒子 -->
      <div class="Security-right">
        <titleBox title="视频1" width="446px" height="428px">
          <play url="https://www.zgdrkj.cn:10813/nvc/888888/hls/stream_1/stream_1_live.m3u8" />
        </titleBox>
        <titleBox title="视频2" width="446px" height="428px">
          <play url="https://www.zgdrkj.cn:10813/nvc/888888/hls/stream_2/stream_2_live.m3u8" />
        </titleBox>
        <titleBox title="视频3" width="446px" height="428px">
          <play url="https://www.zgdrkj.cn:10813/nvc/888888/hls/stream_3/stream_3_live.m3u8" />
        </titleBox>
        <titleBox title="视频4" width="446px" height="428px">
          <play url="https://www.zgdrkj.cn:10813/nvc/888888/hls/stream_7/stream_7_live.m3u8" />
        </titleBox>
        <titleBox title="视频5" width="446px" height="428px">
          <play url="https://www.zgdrkj.cn:10813/nvc/888888/hls/stream_5/stream_5_live.m3u8" />
        </titleBox>
        <titleBox title="视频6" width="446px" height="428px">
          <play url="https://www.zgdrkj.cn:10813/nvc/888888/hls/stream_6/stream_6_live.m3u8" />
        </titleBox>
      </div>
    </div>
  </div>
</template>

<script>
import titleBox from '../../components/TitleBox/TitleBox' // 通用背景组件
import play from './components/play.vue' // 视频组件
import SecurityCheck from './components/SecurityCheck.vue' // 视频组件
import WebSocketClass from '../../utils/websockd'
let sock
export default {
  name: 'Security',
  components: {
    titleBox,
    play,
    SecurityCheck
  },
  data() {
    return {
      arr: {}, // soket连接返回的到数据
      flg: true // 初始为true 第一次得到数据后是false
    }
  },
  created() {
    const obj = {
      url: 'wss://test.zgdrkj.cn:8443/cs/securityManagement', // 连接的url地址
      // url: 'wss://222.209.86.27:8082/cs/securityManagement', // 连接的url地址
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
        console.log('安全管理获取到到消息')
        console.log(dat)
        this.arr = dat
      } else {
        if (dat.securityDay !== undefined) this.arr.securityDay = dat.securityDay // 生产安全天数
        if (dat.securityNumber !== undefined) this.arr.securityNumber = dat.securityNumber // 当日生产量
        if (dat.list !== undefined) this.arr.list = dat.list // 安全检查
        if (dat.safetyRecordsVOList !== undefined) this.arr.safetyRecordsVOList = dat.safetyRecordsVOList // 安全检查记录 -
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
.Security {
  &-left {
    width: 440px;  height: 100%;
  min-height: 895px;
  }
  &-right {
    width: 1378px;
      height: 100%;
  min-height: 895px;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }
}
.anquanjishi {
  width: 100%;
  height: 100%;

  > div {
    width: 100%;
    height: 45%;
    margin-top: 3%;
    background-image: linear-gradient(
      to right,
      rgba(#3c9df5, 0.6) 0%,
      rgba(#31d6ff, 0) 100%
    );
    display: flex;
    align-items: center; /*垂直居中*/
    justify-content: left; /*水平居中*/
    .topleft {
      width: 80px;
      height: 80px;
      background: url("../../../static/安全管理/安全生产天数.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 30px;
    }
    .butleft {
      width: 80px;
      height: 80px;
      background: url("../../../static/安全管理/安全事故数.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 30px;
    }
    .topBUT {
      flex: 1;
      height: 126px;
      p {
        margin: 0;
        padding: 0;
        width: 96px;
        height: 17px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        // line-height: 58px;
        letter-spacing: 0px;
        color: #ffffff;
        margin-top: 5px;
      }
      > div {
        margin-top: 30px;
      }
      .topbac {
        width: 170px;
        height: 54px;
        background: url("../../../static/安全管理/组7.png") no-repeat;
        background-size: 100% 100%;
        font-family: DINPro-Medium;
        font-size: 48px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 58px;
        letter-spacing: 2px;
        color: #2076d9;
        box-shadow: -3px 2px 7px 0px rgba(0, 0, 0, 0.35);
        letter-spacing: 14px;
        padding-left: 5px;
      }
      .butbac {
        width: 80px;
        height: 54px;
        background: url("../../../static/安全管理/组8.png") no-repeat;
        background-size: 100% 100%;
        font-family: DINPro-Medium;
        font-size: 48px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 58px;
        letter-spacing: 2px;
        color: #ff3b3b;
        box-shadow: -3px 2px 7px 0px rgba(255, 59, 59, 0.35);
        letter-spacing: 14px;
        padding-left: 5px;
      }
    }
  }
}
</style>
