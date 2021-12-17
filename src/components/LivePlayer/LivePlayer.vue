<template>
  <div class="player-div">
    <LivePlayer :video-url="src" :show-custom-button="false" :hide-snapshot-button="true" :stretch="true" :autoplay="true" />
  </div>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
export default {
  name: 'Video',
  components: {
    LivePlayer
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['src'],
  create() {
    // console.log(this.data)
  }
}
</script>
<style lang="scss" >
.player-div {
  width: 100%;
  height: 100%;

}
.player-wrapper{
  width: 100%;
  height: 100%;
}
.video-wrapper{
   width: 100%;
  height: 100%;
}
</style>
