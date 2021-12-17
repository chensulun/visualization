<template>
  <div class="IndexRightTop">
    <div>
      <p>{{ arr.abnormalAllTotal ? arr.abnormalAllTotal : 0 }}</p>
      <p>异常总数(次)</p>
    </div>
    <div>
      <p>{{ arr.temperatureAbnormalTotal ? arr.temperatureAbnormalTotal :0 }}</p>
      <p>温度异常(次)</p>
    </div>
    <div>
      <p>{{ arr.pbAbnormalTotal ? arr.pbAbnormalTotal : 0 }}</p>
      <p>配比异常(次)</p>
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
  }
}
</script>

<style lang="scss" scoped>
.IndexRightTop {
  width: 692px;
  height: 86px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  div {
    width: 183px;
    height: 84px;
    p {
      height: 30px;
      display: block;
      padding: 0;
      margin: 0;
      text-align: center;
      font-family: DINPro-Medium;
      font-size: 26px;
      font-weight: bold;
      font-stretch: normal;
      line-height: 58px;
      letter-spacing: 1px;
    }
    p:nth-child(1) {
      color: #ffd74a;
    }
    p:nth-child(2) {
      color: #ffffff;
      font-size: 16px;
    }
  }

  div:nth-child(1) {
    background: url("../../../../static/index/IndexRightTopLeft.png") no-repeat;
    background-size: 100% 100%;
  }
  div:nth-child(2) {
    background: url("../../../../static/index/IndexRightTopEyewitness.png")
      no-repeat;
    background-size: 100% 100%;
  }
  div:nth-child(3) {
    background: url("../../../../static/index/IndexRightTopRight.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
