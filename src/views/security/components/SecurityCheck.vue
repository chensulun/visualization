<template>
  <div>
    <!-- 柱状图 -->
    <TopBox :arr="arr" />
    <!-- table -->
    <SecurityCheckTable :arr="arr" />
  </div>
</template>

<script>
import SecurityCheckTable from './SecurityCheck/SecurityCheckTable.vue'
import TopBox from './SecurityCheck/TopBox.vue'
export default {
  name: 'SecurityCheck',
  components: { SecurityCheckTable, TopBox },
  props: {
    arr: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
