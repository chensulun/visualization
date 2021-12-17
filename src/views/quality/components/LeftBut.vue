<template>
  <div class="letBut">

    <el-radio-group v-model="type" class="letBut-but">
      <el-radio-button label="数据" />
      <el-radio-button label="图形" />
    </el-radio-group>
    <ButTable v-show="type === '数据'" :arr="arr" />
    <div v-if="type === '图形'" class="echa">
      <LeftButechars class="ech" company="石油比(%)" :array-data="arr.ysbList !== undefined? arr.ysbList : []" />
      <LeftButechars class="ech" company="温度(%)" :array-data="arr.outTempList !== undefined? arr.outTempList : []" />
      <LeftButechars class="ech" company="仓1配比(%)" :array-data="arr.oneList !== undefined? arr.oneList : []" />
    </div>

  </div>
</template>

<script>
import ButTable from './ButTable.vue'// 左边底部表格
import LeftButechars from './LeftButechars.vue'// 左边底部图表
export default {
  name: 'LetBut',
  components: {
    ButTable,
    LeftButechars
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    arr: {
      type: Object
    }
  },
  data() {
    return {
      type: '数据'
    }
  }
}
</script>

<style lang="scss" scoped>
.letBut{
  width: 100%;
  height: 100%;
  position: relative;
  &-but{
    // border: 1px solid red;
    position: absolute;
    top: -30px;
    right: 50px;
    z-index: 6;
   display: flex;
  }
  .echa{
  width: 100%;
  height: 340px;
  display: flex;
  .ech{
    width: 33.3%;
  }
  }
}
</style>
