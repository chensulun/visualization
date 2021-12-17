<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <titleBox title="电能（电加热沥青）" width="724PX" height="374PX"> <LeftDianneng /> </titleBox>
      <titleBox title="天然气" width="724PX" height="374PX"> <LeftTanranqi /></titleBox>
      <titleBox title="电能（生产）" width="724PX" height="374PX"> <LeftBut /> </titleBox>
      <titleBox title="水能" width="724PX" height="374PX"> <RightBut /> </titleBox>
    </div>
  </div>
</template>

<script>
import titleBox from '../../components/TitleBox/TitleBox' // 通用背景组件
import LeftDianneng from './components/LeftDianneng.vue'
import LeftTanranqi from './components/LeftTanranqi.vue'
import LeftBut from './components/LeftBut.vue'
import RightBut from './components/RightBut.vue'
export default {
  name: 'Energy',
  components: {
    titleBox,
    LeftBut,
    RightBut,
    LeftDianneng,
    LeftTanranqi
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.dashboard-text{
    height: 100%;
  min-height: 895px;
}

</style>
