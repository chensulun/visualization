<template>
  <div class="dashboard-container">
    <div class="back">
      <!-- 名称 -->
      <span>石料</span>
      <!-- 内容区域盒子 -->
      <ul>
        <li v-for="(v,i) in shiliaoBoxList" :key="i" class="shiliaoBox">
          <!-- name -->
          <p class="shiliaoBox-name">{{ v.name }}</p>
          <p class="shiliaoBox-cont">{{ v.value }}</p>
        </li>

      </ul>
    </div>
    <div class="back">
      <!-- 名称 -->
      <span>沥青</span>
      <!-- 内容区域盒子 -->
      <ul>
        <li v-for="(y,i) in NiqinBoxList" :key="i" class="NiqinBox">
          <!-- name -->
          <p class="NiqinBox-name">{{ y.name }}</p>
          <p class="NiqinBox-cont">{{ y.value.proportion }}</p>
        </li>

      </ul>
    </div>
    <div class="back">
      <!-- 名称 -->
      <span>矿粉</span>
      <!-- 内容区域盒子 -->
      <ul>

        <li v-for="(x,i) in kuangfengBoxList" :key="i" class="kuangfengBox">
          <!-- name -->
          <p class="kuangfengBox-name">{{ x.name }}</p>
          <p class="kuangfengBox-cont">{{ x.value }}</p>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { jsonstr } from '../../utils/index'
import WebSocketClass from '../../utils/websockd'
let sock
export default {
  name: 'Dashboard',
  data() {
    return {
      flg: true, // 初始为true 第一次得到数据后是false
      shiliaoBoxList: [], // 石料列表
      NiqinBoxList: [], // 沥青列表
      kuangfengBoxList: [] // 矿粉列表
    }
  },
  created() {
    const obj = {
      url: 'wss://test.zgdrkj.cn:8443/cs/material', // 连接的url地址
      // url: 'ws://222.209.86.27:8082/ps/material', // 连接的url地址
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
        console.log('物料管理获取到到消息')
        this.shiliaoBoxList = jsonstr(dat.buildingList) // 石料
        this.NiqinBoxList = jsonstr(dat.pitchList) // 沥青
        this.kuangfengBoxList = jsonstr(dat.mineralList) // 矿粉
      } else {
        if (dat.buildingList !== undefined) this.shiliaoBoxList = jsonstr(dat.buildingList) // 石料 // 石料
        if (dat.pitchList !== undefined) this.NiqinBoxList = jsonstr(dat.pitchList) // 沥青
        if (dat.mineralList !== undefined) this.kuangfengBoxList = jsonstr(dat.mineralList) // 矿粉
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
.dashboard-container{
  height: 100%;
  min-height: 895px;
  display: flex;
  flex-direction:column;
  justify-content:space-around;
}
.back {
  width: 100%;
  height: 231px;
  background: url("../../../static/物料管理/backgroun.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 30px;
  position: relative;
  padding-left: 90px;
  display: flex;

  > span {
    display: block;
    width: 30px;
    height: 100%;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #ffffff;
    text-shadow: 0 1px 3px #9bdefd;
    font-weight: 500;
    text-align: center;
    padding-top: 60px;
    background: -webkit-linear-gradient(top, #d5f1ff, #92dbfd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  > ul {
    flex: 80%;
  height: 209px;
    overflow-x: auto;
    margin-right: 50px;
    display:flex;
    align-items:center;/*垂直居中*/
    justify-content: left;/*水平居中*/
    list-style: none;
    .shiliaoBox,.NiqinBox,.kuangfengBox{
      width: 150px;
      min-width:150px;
      height: 211px;
    }
  }
}
// 石料盒子
.shiliaoBox{
background: url("../../../static/物料管理/1.png") no-repeat;
background-size: 100% 100%;

p{
  padding: 0;
  margin: 0;
  text-align: center;
}
&-name{
  width:100%;
height: 32px;
font-family: PingFangSC-Medium;
font-size: 18px;
color: #FFFFFF;
text-align: center;
font-weight: 500;
line-height: 35px;
}
&-cont{
width: 100%;
height: 25px;
font-family: PingFangSC-Medium;
font-size: 18px;
color: #050869;
text-align: center;
font-weight: 500;
margin-top: 46px !important;
}
}

// 沥青盒子
.NiqinBox{
background: url("../../../static/物料管理/2.png") no-repeat;
background-size: 100% 100%;
p{
  padding: 0;
  margin: 0;
  text-align: center;
}
&-name{
  width:100%;
height: 32px;
font-family: PingFangSC-Medium;
font-size: 18px;
color: #FFFFFF;
text-align: center;
font-weight: 500;
line-height: 32px;
margin-top: 20px !important;
}
&-cont{
width: 100%;
height: 25px;
font-family: PingFangSC-Medium;
font-size: 18px;
color: #050869;
text-align: center;
font-weight: 500;
margin-top: 75px !important;
}
}

// 矿粉盒子
.kuangfengBox{
background: url("../../../static/物料管理/3.png") no-repeat;
background-size: 100% 100%;
p{
  padding: 0;
  margin: 0;
  text-align: center;
}
&-name{
  width:100%;
height: 32px;
font-family: PingFangSC-Medium;
font-size: 18px;
color: #FFFFFF;
text-align: center;
font-weight: 500;
line-height: 32px;
margin-top: 20px !important;
}
&-cont{
width: 100%;
height: 25px;
font-family: PingFangSC-Medium;
font-size: 18px;
color: #050869;
text-align: center;
font-weight: 500;
margin-top: 50px !important;
}
}
</style>
