<template>
  <div class="playbut">
    <LivePlayer
      class="LivePlayer"
      :src="url"
    />
  </div>
</template>

<script>
import LivePlayer from '../../../components/LivePlayer/LivePlayer' // 通用视频组件
export default {
  name: 'RightBut',
  components: { LivePlayer },
  props: {
    url: {
      // 异常总数
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.playbut {
  width: 100%;
  height: 100%;
  position: relative;
  .LivePlayer {
    width: 100%;
  height: 100%;
  }
}
</style>
