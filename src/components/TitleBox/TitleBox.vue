<template>
  <div class="bg" :style="{ width: width, height: height }">
    <!-- 标题 如果title 不为空则显示 否则不显示 -->
    <div v-if="title !== ''" class="title">
      <span>{{ title }}</span>
    </div>
    <div class="cont">
      <slot />
    </div>
  </div>
</template>
<script >
export default {
  name: 'TitleBox',
  props: {
    title: {
      // 可选字段
      type: String,
      default: ''
    },
    width: {
      // 可选字段 必填字段
      type: String,
      default: '100px'
    },
    height: {
      // 可选字段 必填字段
      type: String,
      default: '50px'
    }
  },
  data() {
    return {}
  },

  mounted() {
    this.$nextTick(() => {
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  padding: 5px;
  margin-top: 10px;
  background: url("../../../static/commonimg/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
 flex-flow: column;
}
.cont{
  width: 100%;
  // height: 100%-45px;
  flex: 1;
  padding:0 20px 10px;
  display: flex;flex-flow: row nowrap; justify-content: space-between;

}
.title {
  width: 120px;
  height: 45px;
  background: url("../../../static/commonimg/title.png") no-repeat;
  margin-top: 5px;
  background-size: 100% 100%;
  // 文字渐变
  span {
    width: 240px;
    display: block;
    margin-left: 40px;
    display: inline-block;
    color: green;
    font-size: 10em;
    font-weight: bold;
    font-family: ´微软雅黑´;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(rgba(219,244,255, 1)),
      to(rgba(140,217,253, 1))
    );
    font-size: 18px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
