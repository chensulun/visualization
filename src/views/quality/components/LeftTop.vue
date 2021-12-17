<template>
  <div class="IndexLeftTop">
    <div class="IndexLeftTop-left">
      <div class="IndexLeftTop-left-div">
        <p>当前任务：</p>
        <div>{{ arr.projectName ? arr.projectName : "" }}</div>
      </div>
      <div class="IndexLeftTop-left-div">
        <p>生产类型：</p>
        <div>{{ arr.taskProductionType ? arr.taskProductionType : "" }}</div>
      </div>
    </div>

    <div v-for="(v, i) in list" :key="i" class="div">
      <img :src="v.img" alt="">
      <div>
        <p>
          <span :style="{ color: v.color, fontSize: '24px' }">{{ v.cont }}</span>吨
        </p>
        <p>{{ v.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightTop',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arr: {
      type: Object
    }
  },
  data() {
    return {
      list: [
        {
          cont: '0',
          color: '#54f0ff',
          img: require('../../../../static/quality/zongji.png'),
          name: '计划总量'
        },
        {
          cont: '0',
          color: '#54f0ff',
          img: require('../../../../static/quality/shencan.png'),
          name: '生产总量'
        },
        {
          cont: '0',
          color: '#54f0ff',
          img: require('../../../../static/quality/yigong.png'),
          name: '已供数量'
        }
      ]
    }
  },
  watch: {
    arr() {
      this.list[0].cont = this.arr.taskPlannedQuantity ? this.arr.taskPlannedQuantity : 0 // 计划总量
      this.list[1].cont = this.arr.productionTotal ? this.arr.productionTotal : 0// 生产总量
      this.list[2].cont = this.arr.supplyTotal ? this.arr.supplyTotal : 0// 已供数量
    }
  }
}
</script>

<style lang="scss" scoped>
.IndexLeftTop {
  // width: 596px;
  height: 105px;
  margin: 14px 0 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  &-left {
    width: 419px;
    height: 100%;
    border-right: 1px solid #05c2e7;
    &-div {
      width: 419px;
      height: 50%;
      margin-top: 5px;
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
        width: 388px;
        text-align: left;
        height: 31px;
        // padding-left: 20px;
        background: linear-gradient(-90deg,rgba(#82bce9, 0) 0%,rgba(#3283c1, 0.34) 50%,rgba(#82bce9, 0.0) 100%);
        font-family: ArialMT;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 31px;
        letter-spacing: 0px;
        color: #00c3ff;
      }
    }
  }
  .div {
    width: 224px;
    height: 100%;
    padding: 0 15px;
    text-align: left;
    // border-right: 1px solid #16578d;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    img {
      width: 57px;
      height: 57px;
    }
    div {
      width: 150px;
      p {
        width: 100%;
        height: 38px;
        display: block;
        padding: 0;
        margin: 0;
        text-align: center;
        font-family: DINPro-Medium;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 58px;
        letter-spacing: 1px;
        color: #fff;
      }
    }
  }

  div:nth-child(4) {
    border-right: 0;
  }
}
</style>
