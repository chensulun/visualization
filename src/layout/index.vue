<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 顶部导航 -->
    <sidebar class="sidebar-container" />
    <!-- 内容区域 -->
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    width: 100%;
    min-height: 100vh;
    background: url("../../static/index/背景.png");
    background-size: 100% 100%;
    position: relative;

    // overflow: hidden;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }

</style>
